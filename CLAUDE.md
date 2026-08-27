# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

`busera.github.io` — a GitHub Pages site containing **two independent systems** that share only a domain and a favicon:

1. **Root: the personal profile site** — a Jekyll site with no local templates. Everything is content in `_config.yml`.
2. **`aeos/`: the AEOS product page** — hand-written static HTML/CSS/vanilla JS with no build step.

Treat them separately. Changing one never requires touching the other.

## Commands

Tests cover the AEOS page only (`tests/aeos-theme.test.mjs`, Node's built-in runner, no dependencies, no `package.json`):

```bash
node --test                                  # all 9 tests, from repo root
node --test tests/aeos-theme.test.mjs        # single file
node --test --test-name-pattern="closing position"   # single test case
```

`node --test tests/` (directory argument) fails with `MODULE_NOT_FOUND` — use the bare form or the file path.

There is no local build/serve command in use. GitHub Pages builds the Jekyll site on push to `main`. The `aeos/` page needs no build at all — open `aeos/index.html` in a browser to preview it. (`Gemfile` pins the `github-pages` gem, but `Gemfile.lock` is gitignored and no local Ruby setup exists; `bundle exec jekyll serve` is unverified here.)

## Root profile site

- **All page content lives in `_config.yml`.** `index.md` is an empty front-matter stub; there is no `_layouts/`, `_includes/`, `_posts/`, or `_sass/` in this repo. Rendering comes from `remote_theme: sproogen/resume-theme`.
- Content is `about_content:` (a YAML block scalar) plus a `content:` list of sections. Each section has `title`, `layout: list`, and a list of entries shaped like:
  ```yaml
  - layout: left          # or top
    border: weak          # or no
    title: AEOS
    sub_title: AI-Augmented Engagement Operating System
    caption: Release-candidate project
    link: https://busera.github.io/aeos/
    link_text: Explore AEOS
    quote: >
      One-line positioning statement.
    description: |
      Markdown body.
  ```
  Reordering sections or entries means moving YAML blocks, nothing else.
- **`assets/main.scss` is the only styling override.** It carries front matter (required so Jekyll processes it), then `@import 'modern-resume-theme'` — note the import name differs from the theme repo name `sproogen/resume-theme`. Everything after the import is a custom light/blue design system built on `--profile-*` CSS variables. `darkmode: false` in `_config.yml`, and the SCSS deliberately overrides `body.dark` rules to force light styling.

## AEOS product page (`aeos/`)

Single page: `index.html` + `styles.css` + `theme-toggle.js` + `demo-gallery.js`. Section anchors: `#overview`, `#how-it-works`, `#work`, `#demo`, `#components`, `#scope`, `#requirements`.

**Theming is the part that breaks easily.** Light/dark is driven by `data-theme` on `<html>`, with color tokens defined twice in `styles.css` (`:root` and `:root[data-theme="dark"]`). Three constraints must hold together:

- An inline `data-theme-bootstrap` script in `<head>` sets the theme **before** `<link rel="stylesheet" href="styles.css">` to avoid a flash. The test asserts this ordering — never move the stylesheet above it.
- The theme-color hex values `#07111f` (dark) and `#f8fbfe` (light) appear in `aeos/index.html` (meta tag), `aeos/theme-toggle.js`, `aeos/styles.css` (as `--canvas`/`--ink`), and the test. Changing one means changing all of them.
- Diagram images swap per theme via `data-theme-light` / `data-theme-dark` attributes; `theme-toggle.js` rewrites both the `<img src>` and the enclosing `a[data-dialog]` lightbox `href`. Every themed image needs both asset files present.

`demo-gallery.js` wires `[data-dialog]` links to native `<dialog>.showModal()`.

## The test suite is a content contract, not a unit suite

`tests/aeos-theme.test.mjs` pins things that look like editorial choices. Expect failures from edits that don't feel code-related:

- Exact dark-mode token hex values in `styles.css`.
- The final CTA `<h2>` must equal the literal string `AEOS helps auditors use AI across an engagement.` and appear **exactly once** in the page.
- Specific retired copy (the old "trust readiness" section, older closing claims) must stay **absent** from `index.html`.
- **draw.io geometry**: the `.drawio` sources under `aeos/assets/source/` must keep a `canvas-bounds` cell at 1600×900, contain no `grid-*` cells, and place label cells at fixed y-baselines (operating model: 282/328/405/500; component interactions: 307/350/410). Re-exporting or nudging a diagram in the draw.io editor will fail these assertions.

Diagrams are maintained as `.drawio` sources plus exported light and dark `.png` pairs — edit the source, re-export both, keep the geometry constraints.

## Local-only directories

`.git/info/exclude` (not `.gitignore` — it is local and not committed) excludes `/aeos/_snapshots/`, `/aeos/redesign/`, and `/aeos/ollama-blue/` (the last no longer exists). What is on disk there is **untracked and never pushed**, so it is not part of the published site:

- `aeos/_snapshots/2026-08-14-light-approved/` — a frozen pre-dark-mode copy of the AEOS site with a `SHA256SUMS.json` manifest, kept for reference.
- `aeos/redesign/` — a divergent, older AEOS variant with no theme toggle. Not covered by tests, not the live page. Don't confuse it with `aeos/index.html`.
- `aeos/_Archive/` — empty.

Because they are untracked, a routine `git status` stays clean while these directories change. Don't "restore" them into git without asking.

Note: this `CLAUDE.md` has no front matter, so once committed Jekyll copies it verbatim and it is served at `/CLAUDE.md` (same as `LICENSE`). Add it to an `exclude:` list in `_config.yml` if that is unwanted.

## Commit conventions

Split by area, matching existing history:

- AEOS work uses Conventional Commits with an `(aeos)` scope: `feat(aeos): …`, `fix(aeos): …`, `docs(aeos): …`, `style(aeos): …`.
- Profile / `_config.yml` edits use plain sentence subjects: `Reorder sections: move Data Science below Publications`.
