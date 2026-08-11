# AEOS Public Website — Project State

## Status

- **Live site:** published AWP/auditor-benefit baseline at content commit `8bd1634ea58aafc2abe049bb80125f67105bc0e0`.
- **Local candidate:** four approved public-safe VS Code/Obsidian captures are integrated with accessible full-size dialogs; short-video production remains open, and exact review is an external pre-commit gate.
- **Branch:** `main`; the published baseline is synchronized with `origin/main`, while the local candidate remains unpushed.
- **Publication boundary:** Andrew authorized the local media-integration commit once validation and external exact review pass. Push and Pages deployment remain separately approval-gated.

## Published baseline

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
9. A four-step “See AEOS in action” section follows one synthetic GenAI change-governance procedure across Obsidian and Visual Studio Code.
10. The captures retain their reviewed pixels. Andrew Blue framing, sequence labels and captions are applied outside the images.
11. Every image opens in an accessible full-size dialog, with the original PNG available as a no-JavaScript fallback.
12. Native originals remain linked and authoritative, but information used by AEOS agents and workflows must be provided as reviewed Markdown. Users can convert it themselves or use the separate file-converter product.

## Local candidate hashes

- Page: `ec1ad94fe6711ae3b2919c8b7b084a285bd21fe35c6521ab3bc0b07e7434ce7c`
- CSS: `439d283005f178e5e20b7f374c5902b43b874bb55ba77260fdd3e5db8bc30a85`
- Gallery JavaScript: `35684874cc1dc005670b935c979b7576f6e818acca68a1512a5fd051fa325015`
- Screenshot copies match the four manifest masters byte for byte.

## Verification evidence

- HTML, CSS and JavaScript validators: PASS.
- `git diff --check`: PASS.
- Desktop browser audit at 1440 px: PASS; all four 16:9 figures and dialogs work with no overflow, broken anchors, failed images, page errors or failed responses.
- Mobile browser audit at 390 px: PASS; all six navigation links remain available and there is no horizontal overflow.
- Axe WCAG A/AA scan at both viewports: PASS with zero violations.
- Humanizer/terminology/state scan: PASS; zero EWP, Engagement Work Program, approved-work-program, public current-state, watched AI-vocabulary, chat-artifact or prose em-dash findings.
- Final visual inspection: PASS; the frames fit Andrew Blue, the screenshots remain authentic and undistorted, and the full-size overlay is legible.
- Writing Projects validator: AEOS recognized with 14 assets; overall workspace remains red for two unrelated register/migration defects.
- Independent exact-candidate review: external receipt required before commit; the candidate does not self-certify.
- GitHub Pages run `31492930176`: PASS; build, deploy and report jobs succeeded.
- Cache-busted live parity: PASS for HTML and both active visual assets; live SHA-256 values match the source bytes listed above.
- The earlier pre-media exact manifest and review evidence remain superseded; they do not certify the future AEOS-079 media candidate.

## Public boundaries

- Do not expose private overlays, engagement evidence, credentials, restricted methodology, machine-local paths or private implementation material.
- Do not imply broad non-assurance support from terminology alone.
- Do not turn intended benefits into measured outcome claims without evidence.
- The local commit is owner-authorized but review-gated. Do not push, deploy or publish without separate owner approval.

## Next decision

After the owner-authorized, review-gated local commit, run the remaining AEOS-079 short-video kickoff separately or seek a separate push/deployment decision. Future publication-byte commits require fresh approval.
