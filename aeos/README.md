# AEOS introduction website

The white-background Studio design is the selected main version at `index.html`, following the owner's explicit publication instruction on 2026-11-16. The personal profile site at the repository root is unchanged. Publication/deployment evidence is recorded below after remote verification.

## Saved versions

| Version | Project file | Web path |
| --- | --- | --- |
| Selected white main page | `aeos/index.html` | `/aeos/` |
| Original light/dark-switching introduction | `aeos/original.html` | `/aeos/original.html` |
| Initial dark Studio design | `aeos/studio/initial.html` + `initial.css` | `/aeos/studio/initial.html` |
| Refined charcoal Studio design | `aeos/studio/index.html` + `studio.css` | `/aeos/studio/` |
| White Studio companion | `aeos/studio/white.html` + `white.css` | `/aeos/studio/white.html` |

These are concrete retained files, not only Git history. `original.html` is byte-identical to the prior main page. The initial dark HTML/CSS was recovered from commit `73bf5d8`; its stylesheet reference and original-version link were adjusted for its saved filename. The refined and white companions retain their design, with the original-version link corrected to `../original.html#main` now that the main page is white.

## Structure and safe changes

The main page loads `styles.css` for shared structural rules, then `studio/studio.css` for the refined layout, then `studio/white.css` for the white palette. It loads `demo-gallery.js` for diagram dialogs. It deliberately has no theme toggle; `theme-toggle.js` remains for `original.html`. Existing light/dark images and Draw.io sources remain unchanged.

Keep the selected main and white companion's content aligned. Their relative asset paths differ because they are at different directory depths. No new framework, package, model, analytics, backend or service is introduced. The site uses the existing GitHub Pages branch/root route; no publishing configuration was changed.

## Acceptance and publication scope — 2026-11-16

Owner authorization: save the white version, retain the other versions in the project folder, and publish the white version. This authorizes the scoped website commit/push and existing Pages deployment, not unrelated changes to the profile, repository settings or other projects.

Implementation and test routes: parent-owned bounded static HTML/CSS/path promotion and focused Node tests. No separate builder or new dependency is justified. Recovery: the prior main page is retained as `original.html`; all design commits remain in Git. Stop condition: the main URL serves the accepted white design, saved alternatives resolve, and the exact deployment/readback has been verified.

Pre-publication checks:

- Clean `main` baseline `4f2b129`; remote had no divergent commits. Pages API identified the existing source as `main`, path `/`, legacy branch deployment.
- `node --test`: **35 passed, 0 failed**. Existing theme-switching assertions target the preserved original; Studio content parity uses that same preserved source. New publication tests verify the selected main's parity with the accepted white companion, correct relocated styles/scripts/images, and all saved versions' local resources/fragments.
- Main browser entry point tested at 1440 and 390 px: white canvas, no horizontal overflow or broken loaded images; all five diagram dialogs open/close through their real controls.
- Prior white-edition five-width visual/contrast evidence is retained in `studio/README.md`; promotion changes paths only, not its design or claims. Emulation is not physical-device testing.
- Original HTML byte-preserved; initial Studio CSS byte-identical to `73bf5d8`; shared images and original styles/scripts unchanged. `git diff --check` clean.

## Recommended owner review

- Main `/aeos/` hero and overview: confirm the accepted white design is the first page visitors see.
- Saved-version links above: confirm the expected alternatives remain available.

## Deployment verification

Pending the approved push and live readback. This is not a deployment-success claim.
