# AEOS Public Website — Project State

## Status

- **Live site:** published reader-clarity baseline at content commit `a577d3082aebeb0562d2e58c53b788c3c1e386e7`.
- **Local working draft:** AWP terminology, Humanizer Lite pass, current-state-copy removal, a seven-authority publication union (six Medium visuals plus one website-only workspace visual), and explicit auditor-support/quality/consistency/efficiency copy.
- **Branch:** `main`; local candidate is uncommitted and unpushed.
- **Publication boundary:** commit, push and Pages deployment each require Andrew’s separate explicit approval.

## Current local draft

- Page SHA-256: `f384ea08beb624636dde82f367cc9380a60c0222782211ba3f0df6a3add9bace`
- CSS SHA-256: `baa7ede54279523fe797935d75a954ce48828e7580ac12582bccf9827415c741`
- Component visual SHA-256: `bb013ecd3d94257f932adaa2988d23ee4838f8b740033420f917052b3e8bbc33`
- Workspace visual SHA-256: `eeed564f3e26bc6bda9221f11cb052ff89617fde22213dd38ce59c2347acff05`

## Local candidate changes

1. The hero leads with “From AWP to traceable fieldwork and reviewed workpapers.”
2. AWP is expanded as **Audit Work Program** near first use.
3. “Approved” is not repeated as an AWP modifier; authorization remains explicit through the auditor-owned scope and reliance boundary.
4. EWP/Engagement Work Program is absent because AEOS v1 evidence remains audit-fieldwork focused; broader advisory/review support is not claimed.
5. The public RC2/current-product-state block and wording are removed.
6. Reader-facing prose received Humanizer Lite after substantive edits.
7. The component and synthetic workspace visuals are synchronized with their editable article authorities and use AWP terminology.
8. The page now states which tasks AEOS performs for the auditor and separately explains the intended quality, consistency and efficiency benefits.

## Verification evidence

- HTML and CSS validators: PASS.
- `git diff --check`: PASS.
- Desktop browser audit at 1440 px: PASS; no overflow, broken anchors or failed images.
- Mobile browser audit at 390 px: PASS; all five navigation links visible and no horizontal overflow.
- Axe WCAG A/AA scan at both viewports: PASS with zero violations.
- Humanizer/terminology/state scan: PASS; zero EWP, Engagement Work Program, approved-work-program, public current-state, watched AI-vocabulary, chat-artifact or prose em-dash findings.
- Final visual inspection: PASS; no material clipping, overlap, truncation or connector damage.
- The earlier exact manifest and review evidence are superseded by later benefit-copy changes and Andrew's request for real VS Code/Obsidian screenshots and demo media.

## Public boundaries

- Do not expose private overlays, engagement evidence, credentials, restricted methodology, machine-local paths or private implementation material.
- Do not imply broad non-assurance support from terminology alone.
- Do not turn intended benefits into measured outcome claims without evidence.
- Do not commit, push, deploy or publish without explicit owner approval.

## Next decision

Prepare and review the synthetic screenshot/demo-media package, integrate the approved assets, rerun Humanizer and validation, then freeze a new exact candidate. A Green local result is not approval to commit or deploy.
