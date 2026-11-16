# White portfolio proposal

## Current handoff

Prepared an **unpublished** white-background portfolio proposal in the repository's existing GitHub Pages/Jekyll format. The live homepage, its content configuration and styling, and AEOS are unchanged. Review `previews/profile-white.html` locally; the intended native review route is `/profile-proposal/` if a subsequent push is explicitly approved.

**Remaining gate:** the native Liquid/Jekyll page has not been compiled. No local Jekyll, Liquid or Kramdown gems were installed, and no dependency installation or remote build/publication was authorized. Static native-source checks and a real browser-tested visual preview are complete; they do not prove a GitHub Pages build. One next action: review the preview's hero, selected work and expandable background, then decide whether to stage/publish the native review route or revise the design.

## Goal and boundary

Owner requested a drafted homepage proposal, then clarified that the new site/layout must use GitHub's required format. For this repository that means its existing Jekyll/GitHub Pages structure, not a new framework or a pasted screenshot. Scope is an opt-in proposal page/layout and a working review artifact, not replacing the root page or deploying it.

The surface is a professional portfolio (Decide/Learn), not an application dashboard. Use white `#ffffff`, charcoal text, blue `#21658c`, fine rules, restrained serif headings, an understated rectangular portrait, and no gradients, decorative dashboard tiles or heavy shadows.

## Authoritative source and files

| Role | File |
| --- | --- |
| Existing content authority, unchanged | `_config.yml` |
| Native Jekyll page/front matter and section order | `profile-proposal.html` |
| Isolated native Liquid layout | `_layouts/profile-white.html` |
| Reusable record rendering include | `_includes/profile-white-item.html` |
| Isolated readable stylesheet | `assets/profile-white.css` |
| Self-contained browser review artifact | `previews/profile-white.html` |
| Compact source/coverage evidence | `previews/profile-white-evidence.json` |
| Focused source/preview checks | `tests/profile-proposal.test.mjs` |

The custom layout does not inherit or replace the remote theme's `default` layout. Root `index.md` remains unchanged and still uses `default`. The proposal front matter supplies the ordering and short positioning sentence; existing descriptions, roles, dates, titles and links continue to come from `_config.yml` in the native source. Jekyll's standard `markdownify`, `relative_url`, `slugify`, `where` and Liquid loops/includes are used; no plugins, package changes, JavaScript rendering, fonts service or tracking are added. The proposal is marked `noindex,nofollow` while it is a draft.

## Layout and content decisions

- Lead with the person's name, concise professional positioning, existing first biography paragraph and portrait; offer work and LinkedIn links.
- Retain the other biography paragraphs and the complete original professional title under “More about my background.”
- Put the two AI/audit projects first; use editorial rows rather than generic feature cards.
- Show the first three publications directly, with the remainder under “More writing.”
- Follow with experience, education, then expandable qualifications, experiments, other projects and earlier publications.
- Preserve all eight original content groups and all 28 records. Existing self-reported claims, dates, statuses and credentials are retained, not independently reverified or rewritten. In particular, existing duration/status wording is not newly certified current by this design exercise.
- Preserve all 26 distinct source link destinations (normalizing protocol-relative and equivalent percent-encoded URL forms only for the comparison).

The local review HTML is a **derived visual artifact, not the editable content authority**. It was generated from canonical YAML metadata and a bounded read-only capture of the existing public site's Jekyll-rendered item bodies/biography. Source HTML was allowlisted to text/list/link/formatting elements; source scripts were not copied. Its stylesheet is byte-identical to the native stylesheet, and its portrait is embedded so it opens offline. This lets the owner review the design without claiming that the native Liquid template was executed locally.

## Verification and limits — 2026-11-16

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

Not verified: a native Jekyll/Pages compile, physical devices, external link availability, currentness of retained biographical claims or production replacement. No files were pushed and nothing was published.

## Recommended owner review

1. `previews/profile-white.html` — name/positioning/portrait balance, whether selected work is prominent enough, and the amount of material visible versus expandable.
2. `profile-proposal.html` — proposed section order and positioning sentence; existing record prose is unchanged.
3. `_layouts/profile-white.html` — context for later native-build verification; do not treat the working visual preview as evidence this template has compiled.

After approval, validate the native route through an authorized existing build path before changing the root page. Promotion would be a separate scoped change to the root page's front matter and draft indexing state; preserve the old homepage and verify the actual Pages output. No installation, push, publication or root replacement follows automatically from this prepared proposal.
