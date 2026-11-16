# White portfolio proposal

## Current publication handoff

The owner approved backing up the previous homepage and publishing the white layout on 2026-11-16. The prior source and exact rendered HTTP bodies are retained at `_backups/profile-2026-11-16-before-white/`, with a separately derived readable offline `snapshot.html` and a SHA-256 manifest. The five source files were byte-verified before root promotion; ongoing tests verify all nine retained file hashes.

Root `index.md` now selects `profile-white`, the accepted positioning and section order, with `permalink: /` and `draft_preview: false`. `_config.yml`, the old stylesheet and all AEOS files are unchanged. The review route remains `/profile-proposal/` and retains its draft noindex marker. This is layout publication, not a new factual qualification of the copied biography, credentials, statuses or tenure wording.

**Published and verified:** the real native Jekyll build and deployment succeeded for source commit `b51e139f423f78b3480fac883b775899b3cf413c` in [Pages run 43947081302](https://github.com/busera/busera.github.io/actions/runs/43947081302). Pages API returned `built` for that exact commit. No local install or image pull was performed. The root at `https://busera.github.io/` now uses the native white layout; the earlier unexecuted-template limitation is closed by this actual build, not by the derived preview.

Publication verification: `node --test` **39 passed, 0 failed**. Live native output retained all eight sections, 28 item bodies, four biography paragraphs and 26 source link destinations. The first strict text comparison exposed two straight-to-curly apostrophe differences introduced by `markdownify` in quote fields; exact diff confirmed those were the only non-whitespace differences before the comparison normalized that typography. All 17 disclosure controls toggled/restored. Live widths 1440/1024/768/390/320 px had no horizontal overflow or broken images and selected navigation/button/disclosure/social targets were at least 44 px high. Root has no draft noindex marker; the native review route retains it. Live stylesheet and AEOS main HTML matched their project bytes exactly; local diff proves the full AEOS tree unchanged. Compact evidence: [native publication checks](evidence/profile-white-publication.json).

Implementation and follow-on test routes: parent-owned bounded front-matter/static-site change and focused source/backup tests, no new builder/provider route. Acceptance: retained backup verified, native Pages build successful, live root uses the white layout with all 28 records and source links, no mobile overflow, working disclosures, AEOS unchanged. Recommended owner review: the live root's introduction, selected-work ordering and disclosure density; source review of `index.md` is optional.

## Historical proposal handoff — before publication approval

Prepared an **unpublished** white-background portfolio proposal in the repository's existing GitHub Pages/Jekyll format. The live homepage, its content configuration and styling, and AEOS were unchanged at that stage. Review `previews/profile-white.html` locally; the intended native review route was `/profile-proposal/` pending approval.

The original proposal stage did not compile the native template because no local Jekyll, Liquid or Kramdown gems were installed. That limitation is historical evidence, not a claim about the subsequently observed Pages build. Static native-source checks and the browser-tested visual preview did not themselves prove a GitHub Pages build.

## Historical proposal goal and boundary

Owner requested a drafted homepage proposal, then clarified that the new site/layout must use GitHub's required format. For this repository that means its existing Jekyll/GitHub Pages structure, not a new framework or a pasted screenshot. Scope is an opt-in proposal page/layout and a working review artifact, not replacing the root page or deploying it.

The surface is a professional portfolio (Decide/Learn), not an application dashboard. Use white `#ffffff`, charcoal text, blue `#21658c`, fine rules, restrained serif headings, an understated rectangular portrait, and no gradients, decorative dashboard tiles or heavy shadows.

## Authoritative source and files

| Role | File |
| --- | --- |
| Existing content authority, unchanged | `_config.yml` |
| Published root entry point and accepted section order | `index.md` |
| Native Jekyll page/front matter and section order | `profile-proposal.html` |
| Isolated native Liquid layout | `_layouts/profile-white.html` |
| Reusable record rendering include | `_includes/profile-white-item.html` |
| Isolated readable stylesheet | `assets/profile-white.css` |
| Self-contained browser review artifact | `previews/profile-white.html` |
| Compact source/coverage evidence | `previews/profile-white-evidence.json` |
| Focused source/preview checks | `tests/profile-proposal.test.mjs` |

The custom layout does not inherit or overwrite the remote theme's `default` layout. Root `index.md` now selects `profile-white`; the backed-up entry point selected `default`. Root and review-page front matter supply the same ordering and short positioning sentence; existing descriptions, roles, dates, titles and links continue to come from unchanged `_config.yml`. Jekyll's standard `markdownify`, `relative_url`, `slugify`, `where` and Liquid loops/includes are used; no plugins, package changes, JavaScript rendering, fonts service or tracking are added. Only the separate proposal route is marked `noindex,nofollow`; the published root is not.

## Layout and content decisions

- Lead with the person's name, concise professional positioning, existing first biography paragraph and portrait; offer work and LinkedIn links.
- Retain the other biography paragraphs and the complete original professional title under “More about my background.”
- Put the two AI/audit projects first; use editorial rows rather than generic feature cards.
- Show the first three publications directly, with the remainder under “More writing.”
- Follow with experience, education, then expandable qualifications, experiments, other projects and earlier publications.
- Preserve all eight original content groups and all 28 records. Existing self-reported claims, dates, statuses and credentials are retained, not independently reverified or rewritten. In particular, existing duration/status wording is not newly certified current by this design exercise.
- Preserve all 26 distinct source link destinations (normalizing protocol-relative and equivalent percent-encoded URL forms only for the comparison).

The local review HTML is a **derived visual artifact, not the editable content authority**. It was generated from canonical YAML metadata and a bounded read-only capture of the existing public site's Jekyll-rendered item bodies/biography. Source HTML was allowlisted to text/list/link/formatting elements; source scripts were not copied. Its stylesheet is byte-identical to the native stylesheet, and its portrait is embedded so it opens offline. This lets the owner review the design without claiming that the native Liquid template was executed locally.

## Historical proposal verification and limits — 2026-11-16

Routing assessment: parent-owned bounded output-only HTML/CSS work, with a separately assessed parent-owned test/correction activity. A builder adds overhead without a concrete benefit for this reversible design preview. No new model/delegation route, acquisition, dependency or service was used.

- Clean starting commit: `3f14421`.
- Canonical data parsed through the existing Ruby YAML reader: eight sections, 28 entries. All four original biography paragraphs and every original rendered item body were mechanically found in the preview; each record has exactly one source-title marker.
- Original source link coverage: **26/26**, no missing destinations.
- `node --test tests/profile-proposal.test.mjs`: **3 passed, 0 failed**. Checks cover native page front matter/section coverage, Liquid block nesting/include/resource paths, all 28 preview records, configured item links, embedded stylesheet parity, unique IDs and fragments. Block nesting is a static check, not a Liquid interpreter or Jekyll compilation.
- Actual file entry point opened in a browser: one H1, 28 record markers, no broken portrait, no unresolved in-page links and **zero remote resource requests**.
- View emulation at 1440, 1024, 768, 390 and 320 px: no horizontal overflow; navigation/buttons/disclosure/social targets at least 44 px high. All native disclosure controls toggled and restored.
- Desktop/mobile screenshots inspected. One bounded correction moved the mobile positioning sentence below the name/portrait row to avoid a narrow column. Recheck at 390 px confirmed full-width positioning and no overflow. Stylesheet formatting preserved all non-whitespace bytes and preview parity.
- `git diff --check` clean. Byte-diff against the starting commit confirmed `_config.yml`, `index.md`, `assets/main.scss` and the whole `aeos/` tree unchanged.
- Design self-audit: no glossy gradients, generic indigo, equal feature-card hero, accent rails, blur, fabricated statistics, icon toppers, centered-stack composition or unchosen default typography. The visual vocabulary follows the accepted white AEOS direction. This is a design judgment, not an objective guarantee of taste or a full accessibility audit.

At the proposal stage, a native Jekyll/Pages compile and production replacement had not been verified; no files had been pushed. Those two gates are now closed by the current publication evidence above. Physical devices, external link availability and factual currentness of retained biographical claims remain outside this layout-only scope.

## Recommended owner review

1. Live `https://busera.github.io/` — name/positioning/portrait balance, selected-work prominence and disclosure density. The self-contained preview remains a historical review artifact, not today's live authority.
2. `index.md` — accepted root layout, section order and positioning sentence; `_config.yml` record prose is unchanged.
3. `_backups/profile-2026-11-16-before-white/snapshot.html` — readable previous version. Its exact original HTTP bodies and source files are retained alongside it; the snapshot's grid fallbacks are a documented offline-rendering limit.

The owner-approved publication and native verification are complete. This evidence-only closure changes this document and the compact verification JSON, not the deployed layout, source content, styles, backup or AEOS. No further installation, redesign or claim rewrite is authorized by closing this publication.
