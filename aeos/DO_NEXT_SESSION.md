# AEOS Public Website — Do Next Session

## Starting prompt

> Read and execute this `DO_NEXT_SESSION.md` as the continuation instruction for this project. Verify live state first, then follow its read order, gates, prohibitions, next actions, and completion condition. Continue autonomously until a genuine blocker or explicit approval boundary.

## Objective

Complete and locally commit the bounded cross-page terminology alignment so the Process, Requirements, LLM contract and FAQs express the same source-format and model-provider contracts. Stop before push or publication.

## Repository / project

- Discover the portable repository root with `git rev-parse --show-toplevel` and run all commands from that root.
- Branch: `main`.
- Publication boundary: no push, deployment, tag or other external mutation without Andrew's explicit approval.

## Start here

1. Run `git status --short --branch --untracked-files=all`.
2. Run `git log --oneline origin/main..HEAD`.
3. Read, in order:
   1. `aeos/README.md`
   2. `aeos/PROJECT_STATE.md`
   3. `aeos/ROADMAP.md`
   4. `aeos/index.html`
4. Search `aeos/index.html` for `approved model`, `role + model + skill`, `approved model route`, `Original source documents can remain`, `Choose the model for the job`, and `does not bind the workspace to one model`.
5. Fetch `https://busera.github.io/aeos/` only as current external-state evidence; do not treat it as the source authority.

## Current state

- Local content commits `9f9230f`, `53fc63d` and `3430143` clarify source working representations, supported model providers and compatibility with existing fieldwork processes/templates.
- Each completed correction passed focused ad-hoc source verification; the fieldwork-flexibility paragraph also passed desktop visual inspection.
- A complete-page consistency sweep found adjacent copy that can reintroduce the corrected ambiguities; therefore the current tree is not yet ready for publication review.
- On 2026-07-30 the live page returned HTTP 200 but still served the superseded FAQ copy and lacked the new fieldwork-flexibility paragraph.
- The handoff refresh is governance-only and follows the three content commits; inspect `git log` rather than assuming a self-referential current hash.

## Required interpretation

- AEOS retains original source files and their native formats, but is most efficient when every source is also available as a Markdown, plain-text or HTML working representation.
- AEOS does not require one specific provider. Supported routes include private infrastructure or enterprise tenant, Ollama Cloud and local Ollama.
- The operative compatibility requirement is that the provider is supported by the GitHub Copilot extension for VS Code.
- Model selection can still vary by task inside an approved provider route; do not erase that distinction.
- “One system across fieldwork” means one configurable operating layer over existing processes, structures, work programs, templates and review routes—not one imposed methodology.

## Gates and prohibited scope

- Do not push, publish, deploy, tag, amend, squash or reorder existing commits.
- Do not request publication approval until the bounded alignment is implemented, visually reviewed, verified and committed locally.
- Do not expose private overlays, evidence, credentials, restricted methodology, machine-local paths or private implementation details.
- Do not start unrelated redesign, product implementation or model-evaluation work.

## Immediate next actions

1. Update only the affected copy in `aeos/index.html`:
   - Process route: add the approved provider route while retaining task-level model selection.
   - Requirements introduction and runtime card: use provider-route-led terminology and state GitHub Copilot extension support.
   - Format card: pair retention of original files with the Markdown/plain-text/HTML working representation.
   - LLM-contract heading/body: lead with provider route, then explain model selection inside that route.
2. Confirm private infrastructure or enterprise tenant, Ollama Cloud and local Ollama remain represented consistently.
3. Render and inspect the changed sections at desktop and mobile widths.
4. Run a focused `hermes-verify-*` script covering exact copy, absence/qualification of stale phrases, HTML parsing, internal links, responsive overflow and one-file implementation scope; label it ad hoc.
5. Re-read the complete page for cross-section consistency.
6. Commit the bounded copy correction locally with a scoped message. Do not push.
7. Reconcile `aeos/PROJECT_STATE.md`, `aeos/ROADMAP.md` and this handoff in a separate governance-only local commit if their lifecycle wording becomes stale after the content commit.

## Required verification

Run these source checks from the repository root before committing:

```bash
git status --short --branch --untracked-files=all
git log --oneline origin/main..HEAD
git diff --check
python3 -c 'from pathlib import Path; s=Path("aeos/index.html").read_text(); required=("Markdown, plain text or HTML", "private infrastructure or an enterprise tenant", "Ollama Cloud", "local Ollama", "GitHub Copilot extension for VS Code", "AEOS adapts to the fieldwork model already in place."); assert all(x in s for x in required)'
```

The focused verifier must additionally prove that the superseded native-format-only and model-independent formulations are absent or explicitly qualified. Execute all handoff commands independently when a failure is expected so one result cannot suppress later evidence.

## Documentation closeout

After the content commit, update project state, roadmap and this handoff to identify owner publication review as the sole active outcome. Commit that governance refresh locally. Any push remains separately approval-gated.

## Next-session completion condition

The session is complete when the complete page consistently states the source working-representation and provider-route contracts, focused source and responsive visual verification pass, the bounded content correction is committed locally, the three governance documents are reconciled and committed locally, and the repository is clean and ready for Andrew's separate publication decision without any push or deployment.
