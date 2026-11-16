# AEOS — Studio edition

The owner selected the white edition for publication on 2026-11-16. The main page is published at `../index.html`; the preserved original is `../original.html`. The saved comparison pages are `white.html` (white), `index.html` (refined charcoal) and `initial.html` (initial dark Studio). Current publication authority and verified deployment evidence: [AEOS website README](../README.md). The design-stage evidence below is historical for its named stage; its earlier no-publication statements are superseded only by the owner's subsequent explicit publication instruction.

## White-background version — 2026-11-16

Owner direction: keep a white page background, not light grey. `white.html` uses the same refined layout and content as the charcoal edition, with a final colour-only layer in `white.css`. Main canvas and panels are white `#ffffff`; text is charcoal, with restrained blue `#21658c` for links/actions and subtle pale section/table surfaces. Existing light diagrams are used without the charcoal edition's desaturation filter. Original assets are unchanged.

Route: parent-owned output-only HTML/CSS and separately assessed focused test activity; no external dependencies, builder delegation or new processing route. Goal/stop condition: a distinct white edition with unchanged main content and working desktop/mobile controls; no publication. Existing charcoal and original-site HTML/CSS remain byte-unchanged against `b05c059`.

Verification: `node --test` **32 passed, 0 failed**, including three new white-edition tests for content/footer parity, colour-layer/metadata isolation and resources/fragments/five dialog bindings. Browser emulation at **1440, 1024, 768, 390 and 320 px** showed no horizontal overflow and no navigation/stage/button target below 44 px high. All five dialogs opened/closed and the contract disclosure toggled/restored. Desktop and mobile screenshots showed no observed overlap/clipping. Computed canvas is `rgb(255, 255, 255)`.

Scoped token contrast checks across white and the two pale text-bearing surfaces: body text **7.35–8.17:1**, secondary text **5.26–5.85:1**, blue text **5.72–6.35:1**. Not a full accessibility certification. The self-contained downloadable edition was separately exercised: white canvas, no broken loaded images, zero remote resource requests and all five dialogs working. `git diff --check` is clean. View emulation is not physical-device acceptance. Nothing was published.

Recommended owner review: `white.html` hero/overview and `white.css` palette — confirm the white background, blue accent and restrained density. The charcoal edition below is retained for comparison, not silently restyled.

## Charcoal edition — design and scope

- AAIR Studio's Atlas supplied the starting visual reference. The refined edition retains fine rules, a two-column introduction, Avenir body text, restrained serif section headings and compact monospaced labels, without the oversized italic headline or decorative dotted panels.
- Lighter slate-charcoal `#2b3035`, raised surface `#353c43`, light-blue accent `#9bd5f5` in place of the reference's lime/green tones. Brighter text and clearer surface separation support longer reading.
- A six-stage linked overview leads to the matching support-list items. The underlying AEOS main content, boundary statement and footer disclaimer remain unchanged.
- Fixed dark appearance by design; the original page retains its independent light/dark toggle.
- Shared structural styles, gallery script and existing dark diagrams are referenced from the parent directory. No new dependency, remote font, server or model is required. Existing diagram assets remain unchanged; this edition desaturates their display slightly to suit charcoal surfaces.

## Charcoal refinement and acceptance — 2026-11-16

Owner direction: lighten the dark edition and improve it toward a professional appearance without generic AI-template styling. This is a visual refinement, not a content rewrite or authorization to publish.

The initial implementation is retained in Git commit `73bf5d8`. Before-images were also captured before this refinement. The current section supersedes the earlier palette/appearance evidence below; the original public site remains untouched.

Implementation route: parent-owned bounded CSS and matching HTML theme-color/test-token change. The test activity was assessed separately and also kept parent-owned: existing deterministic checks plus browser rendering are sufficient; no library, model route or additional builder is needed.

Changes:

- Lighter slate-charcoal canvas and raised panels, brighter body and secondary text; the light-blue accent is unchanged.
- Smaller, upright headline rather than oversized blue italic emphasis.
- Six linked rows replace the overview tile grid. Dotted textures, dashed slogan frame and large blue closing slab are removed. Blue is reserved primarily for navigation/actions and restrained structural emphasis.
- Existing content, disclaimers, sources, six destinations and five diagram dialogs are unchanged. HTML differs only in the browser theme-color metadata.

Verification:

- `node --test`: **29 passed, 0 failed**, including original-site regression checks and normalized main-content/footer/boundary parity.
- Browser emulation at **1440, 1024, 768, 390 and 320 px**: no horizontal overflow, one H1, no broken loaded images; navigation, stage links and buttons are at least 44 px high.
- All five diagram dialogs open/close using their real controls. The provider-contract disclosure toggles/restores.
- Desktop and 390 px mobile screenshots inspected: no observed clipping or overlap. Computed desktop H1 is 59.04 px, its emphasis is upright, and overview background-image is `none`.
- Calculated contrast over the three main text-bearing surfaces: body text **7.04–9.62:1**, secondary text **5.55–7.57:1**, light-blue text **6.14–8.39:1**; dark text on the blue button **10.29:1**. These are scoped token checks, not a full accessibility certification or diagram-image audit.
- Design self-audit: **0/10** against the skill's ten template tells. No glossy gradient, default indigo, generic feature-card grid, accent rail, blur, oversized metric, icon topper, centered-stack composition, unchosen default type or wrong surface. The remaining numbered rows describe real engagement stages; compact labels and serif section headings retain the intended editorial reference. This is a design judgment, not an objective guarantee of taste.
- `git diff --check` and byte-diff of original-site HTML/CSS/scripts against the pre-refinement commit: clean/unchanged.

Stop condition met: a lighter and restrained local edition with preserved content and exercised controls. View emulation is not physical-device testing. No publishing or deployment is included.

## Historical initial-edition acceptance — before refinement, 2026-11-16

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

- `aeos/studio/studio.css` — palette, H1, overview rows and closing section: assess the lighter appearance, readable hierarchy and restrained use of blue. Check the mobile density as well as desktop.
- `aeos/studio/index.html` — unchanged main content and matching theme-color metadata; context only for this CSS-led refinement.

This is optional visual review, not permission to publish. Source checks are complete; publishing requires a separate explicit decision.

## Repository follow-up

The repository has a `CLAUDE.md` guide, but no root `AGENTS.md` authority map. No instruction-file or repository-governance migration was included in this visual change.
