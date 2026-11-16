# AEOS — Studio edition

A separate visual edition of the AEOS introduction. Open `index.html` directly in a browser. The original remains at `../index.html`; this edition does not replace it or change its theme preference.

## Design and scope

- AAIR Studio's Atlas supplied the visual reference: fine rules, two-column overview, serif emphasis, Avenir body text, monospaced labels and squared controls.
- Neutral charcoal `#181a1c`, raised surface `#202326`, light-blue accent `#9bd5f5` in place of the reference's lime/green tones.
- A six-stage linked overview leads to the matching support-list items. The underlying AEOS main content, boundary statement and footer disclaimer remain unchanged.
- Fixed dark appearance by design; the original page retains its independent light/dark toggle.
- Shared structural styles, gallery script and existing dark diagrams are referenced from the parent directory. No new dependency, remote font, server or model is required. Existing diagram assets remain unchanged; this edition desaturates their display slightly to suit charcoal surfaces.

## Acceptance evidence — 2026-11-16

Requested outcome: a second version of the existing AEOS introduction using Studio's design language with light blue instead of green. Stop condition: separate local edition with intact content, working links/dialogs and readable desktop/mobile layouts. Publishing and replacement of the original are out of scope.

Implementation route: parent-owned HTML/CSS. A small, reversible output-only change with deterministic content comparisons did not justify a separate builder. The follow-on test activity also remained parent-owned: built-in Node assertions, no new dependency or processing route.

- Before implementation, the published AEOS HTML was compared byte-for-byte with `aeos/index.html`: identical. The clean-worktree preflight followed a separate checkpoint of an existing `.gitignore` executable-bit change; that checkpoint did not certify its correctness or alter content.
- `node --test`: **29 passed, 0 failed** (23 existing tests and 6 Studio tests).
- Studio tests compare normalized main text (excluding the added overview) and the moved original boundary, preserve the original footer, resolve all local resources/fragments and unique IDs, verify six atlas destinations and retain five dialog bindings / ten dark image references.
- Browser entry point: this edition's actual `index.html`, opened directly from disk. View emulation at **1440, 1024, 768, 390 and 320 px**: document scroll width equals viewport width; one H1; navigation targets at least 44 px high.
- All five diagram dialogs opened and closed through the actual linked controls. The provider-contract disclosure toggled and restored.
- Desktop hero, 390 px mobile hero and desktop operating model were visually inspected. No text overlap/clipping was observed. Header metadata remains deliberately compact.
- Two stylesheets loaded; computed background `rgb(24, 26, 28)`; computed accent `#9bd5f5`; no broken loaded images. A diagnostic attempt to read CSS rules was blocked by the browser's file-origin security; computed styles and rendering were used instead. No blanket console-clean assertion is made.
- `git diff --check`: clean. Original tracked website files are unchanged by the Studio implementation.
- Design self-audit: no generic feature-tile hero, ornamental gradients, glass blur, icon toppers or fabricated metrics. The six overview nodes encode actual AEOS stages rather than decorative features. Typography intentionally follows the supplied Studio reference.

Limits: view emulation is not physical-device testing. No deployment, push or GitHub Pages build was performed. The content is preserved, not newly researched or requalified for current software requirements.

## Recommended owner review

- `aeos/studio/index.html` — header, hero and six-stage overview: assess the fit with AAIR Studio and whether the editorial hierarchy suits AEOS.
- `aeos/studio/studio.css` — palette and narrow-screen rules: assess the chosen blue, contrast and mobile density.

This is optional visual review, not permission to publish. Source checks are complete; publishing requires a separate explicit decision.

## Repository follow-up

The repository has a `CLAUDE.md` guide, but no root `AGENTS.md` authority map. No instruction-file or repository-governance migration was included in this visual change.
