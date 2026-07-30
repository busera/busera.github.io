# AEOS Public Website — Project State

## Status

- **Lifecycle:** Cross-page terminology alignment required before publication review.
- **Branch:** `main`.
- **External state:** Local `main` contains three committed, focused-verification-passed corrections that are not yet on `origin/main`.
- **Live site:** `https://busera.github.io/aeos/` returned HTTP 200 on 2026-07-30 but still served the superseded FAQ wording and did not include the new fieldwork-flexibility paragraph.
- **Publication boundary:** Push and GitHub Pages deployment require Andrew's explicit approval.

## Active outcome

Reconcile the remaining Requirements, Process and LLM-contract wording with Andrew's corrected product contracts before asking for publication approval. The page must consistently distinguish retained original source files from Markdown/plain-text/HTML working representations and consistently frame runtime choice around a GitHub-Copilot-supported model provider.

## Completed local corrections

1. `9f9230f` — clarify that AEOS works most efficiently with Markdown, plain-text or HTML working representations while retaining original source files and formats;
2. `53fc63d` — frame runtime choice around supported model providers: private infrastructure or enterprise tenant, Ollama Cloud, or local Ollama, with GitHub Copilot extension support as the compatibility requirement;
3. `3430143` — state directly beneath “One system across fieldwork” that AEOS adapts to existing processes, engagement structures, work programs, templates and review routes rather than imposing one standard method.

These commits are durable evidence, but the complete page is not yet a publication-ready candidate because adjacent copy can reintroduce the corrected ambiguities.

## Open consistency findings

`aeos/index.html` still contains adjacent wording that requires a bounded editorial correction:

- Process: “approved model” and `role + model + skill` omit the provider compatibility layer.
- Requirements introduction/card: “approved model route” should be provider-route-led.
- Format card: “Original source documents can remain in their native format” needs the paired MD/TXT/HTML working-representation requirement.
- LLM contract: “Choose the model for the job” and “does not bind the workspace to one model” should be reframed around the supported, approved provider route while preserving task-level model selection within that route.

## Verification evidence

- Each completed correction passed a focused ad-hoc verifier covering exact copy, removal of superseded wording, HTML parsing, `git diff --check`, and one-file scope.
- The fieldwork-flexibility paragraph was rendered locally and visually checked at desktop width; it was readable, subordinate to the heading, aligned to the capability grid, and free of clipping or overlap.
- The repository was clean after each local content commit.
- This is focused ad-hoc evidence, not a canonical suite-green claim; the repository has no detected canonical build/test command for this static page.

## Boundaries and deferred work

- Do not push, publish, deploy, tag, amend or reorder the existing commits without explicit owner approval.
- Do not ask for publication approval until the open consistency findings are corrected, visually reviewed and committed locally.
- Do not treat HTTP 200 as release proof; any future live response must contain the complete corrected copy contract.
- Do not expose private overlays, engagement evidence, credentials, restricted methodology, machine-local paths or private implementation material.
- Further redesign or AEOS product implementation is outside the active outcome.

## Next decision

Complete and verify the bounded cross-page terminology correction, commit it locally, then present Andrew with the exact complete commit stack for an explicit publication decision. The executable continuation is [`DO_NEXT_SESSION.md`](DO_NEXT_SESSION.md); lifecycle status is tracked in [`ROADMAP.md`](ROADMAP.md).
