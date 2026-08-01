# AEOS Public Website — Do Next Session

## Starting prompt

> Read and execute this `DO_NEXT_SESSION.md` as the continuation instruction for this project. Verify live and local state first. Do not push or deploy unless Andrew explicitly approves the exact local candidate.

## Objective

Present the exact independently verified local RC2 website candidate to Andrew for a publication decision. Do not push, deploy, tag or publish without a separate explicit approval.

## Repository / project

- Discover the repository root with `git rev-parse --show-toplevel`.
- Branch: `main`.
- Published baseline: `0136ef1757095bf8eb4c8359b090fba5d902dc2a`.
- Verified local content commit: `b171a3c`.
- Source-format FAQ correction commit: `c2f1151`.
- Provider-route correction commit: `f681d2f`.
- Website-aligned body-visual asset commit: `b7cadf2`.
- Governance handoff commit: `2416fbd`.
- The live site remains on that published baseline until a later approved push.
- Publication boundary: no push, deployment, tag, amend, squash or reorder without Andrew's explicit approval.

## Start here

1. Run `git status --short --branch --untracked-files=all`.
2. Run `git log --oneline origin/main..HEAD` and `git rev-parse origin/main`.
3. Read `README.md`, `PROJECT_STATE.md`, `ROADMAP.md`, `index.html` and the independent exact-candidate review.
4. Rehash `index.html`, `styles.css` and the five article-authority asset copies.
5. If any reviewed hash differs, stop and reconcile the change before relying on the review.

## Current candidate

The local candidate:

- adds a visible RC2 maturity/status section;
- states that RC2 is local, package-reviewed, not a validated release or production-ready, and still lacks clean supported Windows invocation evidence;
- completes provider-route and source-working-format terminology alignment;
- presents three agent profiles and nine governed skills without exposing implementation alternatives as product components;
- uses corrected article-authority renders for core interactions, route matrix and the synthetic TOE workspace;
- adds the evidence-to-conclusion gate with matching prose, alt text and caption;
- adds the typical AWP lifecycle with the AEOS-061 close-out/observation extension visibly marked as planned and not in RC2;
- aligns all five website figures to the exact article-authority website-style renders while leaving the article cover unchanged;
- passed focused semantic, HTML, asset-parity, desktop and 390 px mobile checks;
- passed independent exact-candidate rereview GREEN at P0/P1/P2 `0/0/0`, bound to `index.html` SHA-256 `9abb71b7b2b37003bedadac254965a33743b26cb92687322ca65b2d8903e7333` and article SHA-256 `0c1a928deb1fe3c56b2860f498d6117fa35800249041a3e32bc7d05f489f5cd6`;
- passed independent exact body-visual style review with no material P0/P1/P2 defect;
- remains unpushed and unpublished.

## Approval boundary

- Owner review of the local candidate is not approval to push.
- If Andrew requests changes, preserve the current bytes, apply only the approved scope, and rerun the affected deterministic, visual and independent checks.
- If Andrew explicitly approves publication, confirm the exact local commit first, then push only that commit and verify the resulting Pages build and cache-busted live page.
- Do not infer Medium packaging or publication approval from a website decision.

## Required checks before any approved push

```bash
git status --short --branch --untracked-files=all
git log --oneline origin/main..HEAD
git diff --check
python3 -m http.server 8000
```

Reconfirm:

- all internal anchors and image targets resolve;
- no obsolete model-led/native-format-only wording has returned;
- status and maturity claims still match live AEOS authority;
- the five website asset hashes match their article-authority renders;
- desktop and 390 px mobile layouts have no clipping or horizontal overflow;
- browser console is clean;
- no local path, credential, restricted identifier or private material is public.

## Completion condition

Complete when Andrew either rejects/changes the local candidate or explicitly approves the exact local commit for push. Without that explicit push approval, stop with the verified candidate local and unchanged on the live site.
