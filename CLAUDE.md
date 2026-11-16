# Repository guide

This file maps the repository's sources and safe workflow for coding assistants. Current release identities, publication status and verification evidence belong in the mapped delivery records, not in this guide.

For PA-assisted work, also follow `/Users/busera/Wikis/pa-standards/wiki/concepts/pa-cross-project-development-standard.md`. This map does not grant implementation, installation, publishing or restoration permission.

## Two separate website surfaces

- **Root profile:** Jekyll, with local layout/include sources and canonical YAML content. It is not rendered solely by the remote theme.
- **AEOS introduction:** static HTML/CSS/JavaScript under `aeos/`, with a selected entry point and retained alternatives.

They share a repository and deployment, not a content authority. A profile change does not require an AEOS change, or vice versa. Preserve the unrelated surface.

## Source and evidence map

| Responsibility | Authority |
| --- | --- |
| Profile biography, section records, project/article/video metadata and links | `_config.yml` |
| Root layout selection, positioning, section order and technical archive membership | `index.md` |
| Native profile structure, navigation, headings and disclosure placement | `_layouts/profile-white.html` |
| Shared item rendering, optional linked local thumbnail and body content | `_includes/profile-white-item.html` |
| White profile typography, palette and responsive rules | `assets/profile-white.css` |
| Separate native review route and its noindex state | `profile-proposal.html` |
| Current profile handoff, approvals, backup/restore pointers, checks and publication evidence | `docs/profile-white-proposal.md` and its linked `docs/evidence/` records |
| AEOS selected main, retained alternatives, assets and applicable checks | `aeos/README.md`, with variant detail in `aeos/studio/README.md` |
| Executable profile and AEOS content contracts | `tests/` |
| Historical source/served/offline snapshots and integrity manifests | `_backups/` and each backup's README/manifest |
| Derived review artifacts and source fingerprints | `previews/`; these are not the content authority |

Read the current handoff before relying on a preview's historical status. An offline artifact's generation record can correctly say "draft" after that candidate has subsequently been approved and published.

`assets/main.scss`, the remote-theme configuration and `Gemfile` remain legacy/build sources. They are not the only styling mechanism, and the local profile layout does not inherit the remote default layout. Do not remove those retained sources or change dependencies as a side effect of a content edit.

## Bounded content changes

1. Inspect the actual branch, status and diff. Preserve unrelated work and establish a clean, recoverable baseline before implementation.
2. Make the requested delta in its owning source. YAML record order and page `section_order` serve different purposes; keep the root and native review route consistent when changing presentation order.
3. Keep professional responsibilities distinct from practitioner projects. Do not add tenure totals, savings, leadership responsibilities, adoption, endorsement or maturity claims without supporting evidence. Existing copied prose is not independent verification.
4. Preserve exact owner-supplied links and brand/title/subtitle strings. A replacement video link updates the existing entry and its thumbnail; it does not add a duplicate entry.
5. Use local linked thumbnail assets and existing markup for videos, not embedded players, autoplay, remote thumbnails or automatic feeds. Retain source provenance, dimensions and integrity evidence in the delivery record.
6. Preserve original record identities, relevant links, qualifications and agreed boundaries unless the owner explicitly changes them. Move supporting technical material into the governed archive presentation rather than deleting its history.
7. Keep frozen previews and backups unchanged. A new review edition is a separate artifact; do not overwrite an earlier accepted copy merely to make it resemble today's source.

## Verification and preview commands

Run from the repository root, using already available tools:

```bash
node --test tests/profile-proposal.test.mjs  # focused profile contracts
node --test tests/aeos-publication.test.mjs # focused AEOS publication contracts
node --test                               # broader contracts when the delta warrants them
```

Use a test file path or the bare runner, not `node --test tests/`. Test counts and exact pinned copy/geometry are defined by the current tests; do not carry a historical count forward as today's baseline. Theme-switching tests concern the retained original AEOS edition, not necessarily the selected main.

The derived strategic review copy can be rebuilt with:

```bash
python3 scripts/build-strategic-preview.py
```

That helper uses installed Ruby YAML and Pandoc, reads canonical content and static chrome, and writes its named review HTML/fingerprint files. Run it only when the owning change authorizes regenerating that artifact. It is **not** a Jekyll compiler, and a working derived preview does not prove the native Liquid template compiles. Resolve current build capability and evidence from the profile delivery record; do not install gems, containers, packages or models merely to obtain a preview.

For UI changes, check the actual changed surface at desktop and narrow widths, fragment targets, loaded images and applicable real controls. Inspect a screenshot rather than inferring readability from dimensions alone. A background browser tab can defer lazy-image loading; distinguish that test condition from a broken asset before changing production code.

## Publishing and recovery

- Draft/review approval is not publication approval. Push or publish only within explicit owner authorization, through the existing approved deployment route; do not change Pages settings, workflows or branches by implication.
- Resolve the current deployment binding from the Pages configuration and delivery record. Require an exact-source build/deploy result and read back the actual live content, destinations and assets before claiming success.
- Record completion in the existing delivery record, preserving historical evidence. A documentation-only closure must not change the verified product candidate. Commit scoped changes and report actual final Git state; never claim remote synchronization for an intentionally unpushed draft.
- Before a significant replacement, preserve the prior source and served page as required by the owning task. Backup existence is not restoration permission. Prefer reversible recovery and never reset/discard unrelated work.
- Ignored/local-only directories are not current or published authority merely because they exist. Inspect their actual status, preserve them and do not restore them into tracked/live sources without approval.

## AEOS-specific safeguards

Read `aeos/README.md` before editing: the selected white main and the preserved light/dark original have different theme/script responsibilities. Do not apply original-edition theme-toggle assumptions to every version. Preserve the comparison-only differences and path depths documented there.

Gallery links and native dialogs must still open and close after structural/path changes. Diagram originals, exported assets and contract tests remain linked evidence. When diagram work is explicitly authorized, preserve the canvas/geometry requirements in the applicable tests; do not silently redraw, replace sources or relax assertions to make a changed export pass.

Keep commits scoped by surface and use descriptive subjects. Publication, dependency changes and repository-setting changes retain their separate approval gates.
