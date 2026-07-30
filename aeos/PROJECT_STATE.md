# AEOS Public Website — Project State

## Status

- **Lifecycle:** Published correction baseline; cross-page terminology alignment remains active.
- **Branch:** `main`.
- **Published baseline:** GitHub Pages successfully built commit `0136ef1757095bf8eb4c8359b090fba5d902dc2a` on 2026-07-30.
- **Live site:** A cache-busted request to `https://busera.github.io/aeos/` returned HTTP 200 and contained all three published corrections; the superseded FAQ wording was absent.
- **Publication boundary:** Any further push or GitHub Pages deployment requires Andrew's explicit approval.

## Active outcome

Reconcile the remaining Requirements, Process and LLM-contract wording with Andrew's corrected product contracts. The page must consistently distinguish retained original source files from Markdown/plain-text/HTML working representations and consistently frame runtime choice around a GitHub-Copilot-supported model provider.

## Published corrections

1. `9f9230f` — clarify that AEOS works most efficiently with Markdown, plain-text or HTML working representations while retaining original source files and formats;
2. `53fc63d` — frame runtime choice around supported model providers: private infrastructure or enterprise tenant, Ollama Cloud, or local Ollama, with GitHub Copilot extension support as the compatibility requirement;
3. `3430143` — state directly beneath “One system across fieldwork” that AEOS adapts to existing processes, engagement structures, work programs, templates and review routes rather than imposing one standard method;
4. `0136ef1` — publish the three corrections together with the first executable terminology-alignment handoff.

These corrections are live and verified. They do not close the active alignment outcome because adjacent copy still reintroduces the corrected ambiguities.

## Open consistency findings

`aeos/index.html` still contains adjacent wording that requires a bounded editorial correction:

- Process: “approved model” and `role + model + skill` omit the provider compatibility layer.
- Requirements introduction/card: “approved model route” should be provider-route-led.
- Format card: “Original source documents can remain in their native format” needs the paired MD/TXT/HTML working-representation requirement.
- LLM contract: “Choose the model for the job” and “does not bind the workspace to one model” should be reframed around the supported, approved provider route while preserving task-level model selection within that route.

## Verification evidence

- Each published correction passed a focused ad-hoc verifier covering exact copy, removal of superseded wording, HTML parsing, `git diff --check`, and one-file scope.
- The fieldwork-flexibility paragraph was rendered locally and visually checked at desktop width; it was readable, subordinate to the heading, aligned to the capability grid, and free of clipping or overlap.
- GitHub Pages reported `status: built` for exact commit `0136ef1757095bf8eb4c8359b090fba5d902dc2a`.
- A cache-busted live request confirmed the three new strings and absence of the two superseded FAQ strings.
- This is focused ad-hoc and live publication evidence, not a canonical suite-green claim; the repository has no detected canonical build/test command for this static page.

## Boundaries and deferred work

- Do not push, publish, deploy, tag, amend or reorder existing commits without explicit owner approval.
- Do not treat the published FAQ corrections as proof that the complete page is contract-consistent.
- Do not expose private overlays, engagement evidence, credentials, restricted methodology, machine-local paths or private implementation material.
- Further redesign or AEOS product implementation is outside the active outcome.

## Next decision

Complete and verify the bounded cross-page terminology correction and commit it locally without pushing. The executable continuation is [`DO_NEXT_SESSION.md`](DO_NEXT_SESSION.md); lifecycle status is tracked in [`ROADMAP.md`](ROADMAP.md).
