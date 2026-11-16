# White portfolio proposal

## Current handoff — strategic profile published and verified

Owner requested the snapshot and strategic repositioning, accepted the working preview, then explicitly approved publication. **Published at https://busera.github.io/ and verified using the actual native Jekyll output.** Accepted source `91044ebc1bff4b63f3d6817f78bd98c2fef8e1bb` was fast-forwarded from `review/strategic-profile-2026-11-16` onto `main` without product changes. Exact-head [Pages run 43960471110](https://github.com/busera/busera.github.io/actions/runs/43960471110) built/deployed successfully and the Pages API returned `built` for that SHA. Prior public baseline `966cbd2634b3c870196a35679c2fd00d1956eccf` remains backed up in separate checkpoint `6e88ab3`.

**Review artifact:** [strategic offline preview](../previews/profile-strategic.html). **Previous version:** [offline snapshot](../_backups/profile-2026-11-16-before-strategic/snapshot.html). The new backup preserves exact source, exact served HTML/assets and a derived offline copy, with 19 data-file hashes checked. Its README explains restore boundaries. Older backups and the original white preview remain unchanged.

### Published implementation

- Opening leads with **AI governance, risk and independent assurance**, with a short current-role statement rather than a technical skills inventory.
- Experience precedes perspectives, projects and videos. Existing leadership responsibilities are visible in the role description; advisory participation is professional context rather than “outside the day job.”
- Experience copy focuses on governance, responsibilities and evidence. The conflicting tenure totals and unverified days-to-hours claim are omitted; the existing date range is explicitly labelled as roles across functions, not tenure in the current role.
- AEOS/AIRUM descriptions lead with audit purpose and intended value. Existing auditor-authority and reduced-demonstration boundaries remain; practitioner projects are presented separately from corporate responsibilities.
- Featured writing leads with use-case risk, algorithmic feedback and the previously verified September AEOS article. The latter is the only added record. Original article titles and destinations are preserved.
- Education is shorter, with no GPA, unsourced ranking or course inventory in the active narrative. Credentials/issuers/dates are unchanged. All earlier technical projects remain available under one closed technical-background group; their detailed source text is preserved.
- The latest video description, replacement link, thumbnail, all original record identities and all existing external destinations are retained. No stylesheet, image, include, AEOS product page, third-party player or dependency change is included.

### Evidence, source boundaries and review

`node --test tests/profile-proposal.test.mjs`: **9 passed, 0 failed**. Checks cover both backup manifests, exact retention of all 29 prior records and their non-editorial fields, explicit editable-field limits, one sourced additional article, current-source/preview fingerprints, all 30 item bodies/titles/destinations, template block nesting and local assets. The 28 previous external destinations remain, with one Medium destination added. The same white stylesheet bytes are used. Browser evidence: [offline layout and controls](evidence/profile-strategic-browser.json); source fingerprints: [preview identity](../previews/profile-strategic-evidence.json).

The actual offline preview was exercised at 1440/1024/768/390/320 px: no horizontal overflow, broken images, missing fragment targets or undersized checked navigation/button/disclosure/social controls. All 18 disclosures toggled/restored, the technical archive starts closed and both snapshot and draft made zero external display requests. Desktop/mobile screenshot review found no clipping/overlap and confirmed experience-first positioning. After the small career-period clarification, a focused 390 px readback reconfirmed its exact wording, 30 records and no overflow. These are emulated widths, not physical-device tests.

Local Jekyll/Liquid gems remain absent. **The saved offline preview is a derived render using installed Ruby YAML and Pandoc 3.14; the native compile gate is now closed by the actual exact-head Pages build above.** No package, container or model was installed/downloaded. Rebuild the derived preview with `python3 scripts/build-strategic-preview.py`; its historical draft-status evidence records the preview-generation stage, not current publication state. The accepted preview/fingerprint bytes remain unchanged in this publication wave.

**Native live verification:** [publication evidence](evidence/profile-strategic-publication.json). All 30 item bodies match the accepted preview after accounting for block-boundary whitespace and known apostrophe typography. Nine sections follow the accepted order; the technical archive contains its three sections and starts closed. All 28 prior absolute-HTTP destinations remain, with one new article destination; both video links use the latest owner-supplied URL. All 18 disclosures toggled/restored; five widths 1440/1024/768/390/320 px had no overflow, broken images or undersized checked controls. Root has one H1, no missing fragment targets and no draft noindex. The thumbnail decoded at 1280×720; live stylesheet, portrait, video thumbnail and AEOS main HTML byte-match the project. No YouTube media requests were recorded. Focused native desktop/mobile screenshot reviews found no clipping, overlap or styling regression. Physical-device tests and underlying career requalification remain outside scope.

Verification-harness corrections did not change the product: the first text extractor omitted spaces between block elements; exact diffs identified nine spaces only. A hidden test tab delayed the lazy image until that owned tab was activated. The URL comparator was corrected to use the same absolute-HTTP class on both sides, including own-domain project destinations. After these bounded corrections, all native checks passed. This closing wave changes only this document and the publication evidence JSON; source, assets, previews and backups remain at the accepted candidate bytes.

Writing used the loaded practitioner-style baseline and the full Workbench style profile as unpromoted supporting evidence, not action authority. Voice review: direct, problem-led and restrained; strategic review: priorities, governance, assurance and leadership precede implementation detail. No new title, impact metric, enterprise-adoption claim or employer endorsement was invented. The team size, advisory roles and underlying role history are carried from existing published material, **not independently requalified against private employment records**. Degree labels and certification claims were not revalidated in this editorial task.

Route assessment: parent-owned editorial/data/markup work, followed by a parent-owned deterministic adaptation of the existing preview generator and focused test changes. No delegated model route was needed or used; total coordination/qualification overhead would exceed the benefit for this bounded output-only change. Assurance budget was a focused source/parity suite, one desktop/mobile visual pass and one small caption readback—not a new release programme. `git diff --check` and unchanged-surface checks pass.

**Outcome:** owner-accepted strategic profile is published; no remaining publication gate. Optional owner review is the live opening and experience section. The current published handoff supersedes earlier review/publish-next-action prose below and the draft-time status retained in offline evidence; historical sections preserve the initial white-layout and incremental-publication record.

## Historical — initial white-layout publication handoff

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

## Portfolio label refinement — 2026-11-16

Owner requested the visible eyebrow “Professional portfolio” be renamed to “Portfolio.” The shared native layout now uses that exact label, affecting the root and native review route. The saved rendered previews and previous-site backup remain historical and byte-unchanged. No other suggested copy changes are bundled into this request.

Parent-owned one-line output change with a focused source assertion; no delegation, dependency, data/configuration or style change. `node --test tests/profile-proposal.test.mjs`: **4 passed, 0 failed**, including backup hash checks and the exact new label. `git diff --check` is clean, and diff against `3f2aee5` proves configuration, entry front matter, styles, AEOS, backups and previews unchanged. Publish through the existing owner-approved Pages route and verify the exact live eyebrow after deployment. Recommended owner review: the visible eyebrow only; no additional owner code review is recommended for this wording-only delta.

## AIRUM title and expansion — 2026-11-16

Owner requested “AIRUM Public Demo” become “AIRUM,” with “AI Risk Universe Matrix” on the next line, matching AEOS. Current `_config.yml` changes only that title and adds `sub_title`; the existing shared subtitle markup provides the presentation without a template or stylesheet change. The public-demo URL, link wording, description and scope qualifications remain unchanged. This is a display-name change, not a lifecycle or adoption claim.

Parent-owned bounded content/test edit; no builder delegation or new dependency. Focused checks: **5 passed, 0 failed**. A full parsed-config comparison against the frozen backup permits exactly these two fields and proves all remaining content unchanged. Historical preview tests now use their frozen source, rather than requiring an old snapshot to mirror later approved edits; all backup hashes remain checked. Diff against `1ed6d71` confirms layouts/includes, entry point, assets, AEOS, backups and previews are unchanged. Deployment verification contract: exact new live title/subtitle, the same markup treatment as AEOS, and unchanged destination. Owner review is limited to the AIRUM heading.

## AIRUM summary refinement — 2026-11-16

Subsequent owner direction replaces the AIRUM standfirst with: “An interactive AI risk universe that helps audit teams explore and select relevant AI risks for audit planning.” This describes its purpose rather than framing it as a public selection demo. Only `quote` changes in this wave; title/subtitle, destination, longer description, disclosure of the demo's limited scope, assets and historical copies remain unchanged.

Parent-owned one-line content/test edit. Focused checks: **5 passed, 0 failed**; full parsed-config comparison now permits the previously approved title/subtitle plus this exact summary, with everything else unchanged. The earlier two-field comparison records the heading-only stage, not the current total delta. `git diff --check` passes. Deploy via the existing approved Pages route and read back the exact live standfirst; no broader editorial or lifecycle claim change is included.

## Videos section — 2026-11-16

Owner requested a section for YouTube videos, starting with `https://youtu.be/yngNlZ7N0Jc`, and the channel `https://www.youtube.com/channel/UCeylEhSPTmVaLhWg3xsfbXg`. Signed-out YouTube player metadata returned playability `OK`, title `API-CLI-MCP`, channel ID matching the supplied channel, author `Mixture of Experts (MoE)`, and a short API/CLI/MCP introduction description. This qualifies the link/title/summary, not a review of the video's content. The attached extraction's private-video warning was not reproduced by the browser.

The native root and native review route now place Videos after AI and Audit and before Publications, with a navigation anchor, channel link and one standard editorial list entry. Canonical video records live in `_config.yml` → `content` → `Videos` → `content`; add future entries there using the existing title/link/quote fields. No iframe, autoplay, thumbnail fetch, new JavaScript, dependency, automatic feed or new style is introduced. YouTube receives no player/media request from the page until a link is followed. Historical rendered previews and previous-site backups stay frozen.

Route: parent-owned lightweight output change using existing Liquid/list markup, with focused parent verification instead of builder delegation. `node --test tests/profile-proposal.test.mjs`: **6 passed, 0 failed**; strict parsed-config preservation permits exactly the earlier AIRUM edits and this new section. Root/review section ordering matches; navigation/channel link and no-embed assertions pass. `git diff --check` passes; styles, includes, AEOS and historical backups/previews are byte-unchanged against `d0be81e`. Acceptance: exact-head native Pages success, live video/channel destinations, correct section order, desktop/mobile no-overflow and existing content retention. No broader wording changes are bundled. Current repository guidance in `CLAUDE.md` predates the new templates; the existing document above maps the actual layout/include/content and native build route used here, without changing protected instructions in this wave.

**Publication verified:** source `6f068ca9ef0eac06a3197d49a39d59cb2cc9e02b` built/deployed successfully in [Pages run 43950905818](https://github.com/busera/busera.github.io/actions/runs/43950905818). Live `https://busera.github.io/#videos` has the exact supplied video/channel destinations, all 29 expected entries and nine sections in the accepted order. Widths 1440/768/390/320 px had no horizontal overflow or broken images; the checked navigation/video/channel links met 44 px target height. No player embeds or YouTube/media resource requests were present. A focused mobile screenshot review found no clipping, overlap or readability defect in the new section. No physical-device test or video-content review is claimed. This closing documentation update does not change the accepted source candidate.

## AEOS publication-month caption — 2026-11-16

Owner requested the AEOS caption “Used and tested in audit fieldwork” be replaced by its article publication month/year. The [Medium article](https://medium.com/@buser.andre/aeos-the-ai-augmented-engagement-operating-system-a5dc7ca8b5ad) was read directly and its byline displays **Sep 28, 2026**. Canonical `_config.yml` now uses **September 2026** as the caption. This is the article's publication month, not a claim about AEOS's release or adoption date.

Parent-owned one-line content/test change; no delegation or new dependency. **6 focused tests pass**, including the strict full-config preservation comparison and backup hashes. `git diff --check` passes; native templates, styles, entry points, AEOS, Videos and frozen backups/previews are unchanged against `bee2a1a`. The live acceptance check is the exact new caption and absence of the retired status phrase in the current AEOS entry. Historical snapshots retain their original wording.

## Video description and thumbnail — 2026-11-16

Owner supplied replacement copy; the Videos entry uses it verbatim: “What’s the difference between an API, a CLI, and MCP (Model Context Protocol)? This short introduction explains the basics and how each helps people, software, and AI tools interact with other systems.” No summary or claim was added by the model.

The video-published thumbnail was obtained from the signed-out player metadata for `yngNlZ7N0Jc`, whose playability remained `OK`. The source is YouTube's `https://i.ytimg.com/vi/yngNlZ7N0Jc/maxresdefault.jpg` with the variant query supplied by the player. Original response bytes are stored at `images/videos/yngNlZ7N0Jc.jpg`: **69,007 bytes**, JPEG **1280×720**, SHA-256 `43723548272e3872ce8e1474734f1585464bb3bd772832c4c72dd31fe5d56df4`. Native `sips` verified format/dimensions; image inspection confirmed the API/CLI/MCP educational frame, not an unavailable-video placeholder. No model generation, image processing, new package or runtime dependency was used; missing Pillow was handled with native inspection, not installation.

The linked, lazy-loaded image is optional metadata in the existing item include, with alt text and intrinsic dimensions; twelve CSS lines scoped to `.video-thumbnail` provide responsive sizing and a restrained border. Its destination is the same video link. It is hosted locally, with no YouTube iframe, automatic feed or remote thumbnail load. The earlier no-thumbnail description records that initial stage; this section supersedes that presentation only. Frozen preview CSS is compared after excluding exactly the new marked thumbnail block, and the historical preview/backup bytes remain unchanged.

Route: parent-owned bounded content/markup/style/test change within the existing editorial layout; no delegated builder overhead. **7 focused tests pass**, covering exact owner wording, image hash/metadata/template, no embeds, full content preservation and frozen backup hashes. `git diff --check` passes; native outer layout, entry points, legacy stylesheet, AEOS and historical snapshots are untouched against `c90def3`. Acceptance: exact-head Pages success, exact live copy, decoded local image and correct link/aspect ratio at desktop/mobile widths, with no overflow or YouTube media requests.

### Current video binding — owner replacement link

Before closure, the owner supplied `https://youtu.be/r2bWqIfu64E` as the new link. This supersedes the `yngNlZ7N0Jc` destination and thumbnail binding above, without adding a second video. Signed-out metadata confirms playability `OK`, the same `API-CLI-MCP` title and owner channel, and the exact replacement description. The current local thumbnail is `images/videos/r2bWqIfu64E.jpg`, fetched from the new video's player-supplied `https://i.ytimg.com/vi/r2bWqIfu64E/maxresdefault.jpg` variant. Original bytes: **66,117**, JPEG **1280×720**, SHA-256 `8dcc25f18c6dd7829fd9f3d6107a96e40b2eb96ff2713afd8fa8f8d4583606b8`. Native format/dimension and visual checks confirm the definitions graphic, not a placeholder; the generic alt text remains accurate. The earlier image stays retained and unchanged, but is no longer referenced by the current entry.

Follow-on route: parent-owned deterministic link/asset/fixture update; no markup, stylesheet or description changes from `81b1ce4`. **7 focused tests pass** after the replacement. The initially published `81b1ce4` had already passed exact-head native Pages run `43952749082`, exact live owner text, image/CSS byte parity, correct linked image and no-overflow/aspect-ratio checks at 1440/768/390/320 px; those results identify the initial slice, not proof the replacement was deployed. **Replacement publication verified:** source `6c4fcef131413ca14d6ad2f93937c11eb40bc883` built/deployed in [Pages run 43953258776](https://github.com/busera/busera.github.io/actions/runs/43953258776). Live copy matches the owner's description exactly; both thumbnail and Watch links resolve to `https://youtu.be/r2bWqIfu64E`, the old video link is absent from the live main content, and there is still one video entry. The live local thumbnail byte-matches the new asset, decodes at 1280×720 and retains its aspect ratio with no overflow at 1440/390 px. No YouTube media requests were recorded. A focused mobile screenshot check confirmed full copy, thumbnail and links without clipping/overlap. Physical-device testing is not claimed. This closing evidence change is documentation-only and leaves the verified source candidate unchanged.
