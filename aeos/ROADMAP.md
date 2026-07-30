# AEOS Public Website — Roadmap

## WIP policy

One active outcome at a time. Further publication remains approval-gated.

## Lifecycle

| Outcome | State | Evidence / gate |
|---|---|---|
| Clarify source working-format requirement | Published and verified | Commit `9f9230f`; live in Pages build `0136ef1`; cache-busted copy check passed |
| Clarify supported model-provider routes | Published and verified | Commit `53fc63d`; live in Pages build `0136ef1`; cache-busted copy check passed |
| State compatibility with existing fieldwork models | Published and verified | Commit `3430143`; live in Pages build `0136ef1`; focused visual and cache-busted copy checks passed |
| Cross-page terminology alignment across Process, Requirements and LLM-contract copy | **Active** | Remove contradictory/ambiguous model-led and native-format-only wording; focused source and responsive visual verification; local commit |
| Owner publication decision for the aligned page | Planned — approval required | Present the later bounded alignment commit only after its verification and governance closeout pass |
| Publish and verify the aligned page | Planned — approval required | Explicit push approval, successful Pages build for the exact pushed commit, and complete live contract verification |

## Active outcome acceptance

Terminology alignment is complete only when:

1. Process routing names the supported/approved provider route as well as task-level model selection;
2. Requirements state that original source files are retained alongside Markdown, plain-text or HTML working representations;
3. Requirements and LLM-contract headings/body are provider-route-led and name GitHub Copilot extension compatibility as the operative constraint;
4. private infrastructure or enterprise tenant, Ollama Cloud and local Ollama remain the supported provider-route examples;
5. old ambiguous phrases are absent or explicitly qualified;
6. the resulting HTML passes focused structural/copy verification and responsive visual inspection;
7. the bounded correction is committed locally without pushing; and
8. project state, this roadmap and the handoff are reconciled in a separate local governance commit if the content commit makes them stale.

## Publication acceptance

Future publication of the aligned page is complete only after the active outcome is closed and Andrew separately approves the push, the intended commit is on `origin/main`, GitHub Pages builds that exact commit, and the live page contains the complete corrected contract.

## Unqueued

No visual redesign, model-evaluation evidence or AEOS product implementation work is queued by this handoff.
