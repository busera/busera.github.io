# AEOS Public Website — Do Next Session

## Starting prompt

> Read and execute this `DO_NEXT_SESSION.md` as the continuation instruction for the AEOS public website. Verify live and local state first. Do not commit, push or deploy unless Andrew explicitly approves the exact action.

## Objective

Present the independently Green local candidate to Andrew and keep commit, deployment and publication as separate approval decisions.

## Repository state

- Repository root: discover with `git rev-parse --show-toplevel`.
- Branch: `main`.
- Published baseline: `0136ef1757095bf8eb4c8359b090fba5d902dc2a`.
- Local base before redesign: `cbfc77701b5d0022aa8b7c13e03535a7970f3fbf`.
- Candidate page SHA-256: `b298a9867938737eff8fac1c125af3e7ba268ff57636093bdb9db54032601e13`.
- Candidate CSS SHA-256: `e2286e9b53493f22e1d1676a417b09d3d5ad68ad9b8b59e62d76ef7b7f2ebb4e`.
- Component visual SHA-256: `a2a045fe0bda61f248cb39889bd72932af2266ebe4d01734b2c3c0e5e57c7bf1`.
- Workspace visual SHA-256: `797070e0f133b8e8c4ae8ea0a7ef10349d1bcb5b725bac75f9baaecd85bc837d`.
- Exact manifest: `/Users/busera/Temp/Hermes/aeos-article-yellow-remediation/final-candidate-hashes-v5.json` — 33 bound files, complete HTML/CSS dependency coverage, final verdict Green.
- The live site remains unchanged until an approved push.

## Start here

1. Run `git status --short --branch --untracked-files=all -- aeos`.
2. Rehash `aeos/index.html`, `aeos/styles.css` and both linked images.
3. Read `README.md`, `PROJECT_STATE.md`, `ROADMAP.md` and the current diff.
4. Confirm current handoff hashes match the final manifest named above. Treat the v3 reviews as retained authority only for the unchanged article, page, CSS, assets, shared favicon and product-authority bytes; older Green reviews remain historical evidence.
5. If any hash differs, rerun affected structural, privacy, visual and exact-candidate checks before relying on the Green verdict.

## Current candidate

The local redesign:

- defines AEOS immediately as a file-based operating system for audit fieldwork and testing;
- states the approved audit work program → reviewed draft audit work boundary in the hero;
- states RC2/local-candidate/not-validated/not-production-ready status in the hero;
- presents purpose, scope and benefit within the opening reader path;
- shows approved inputs → AEOS operating core → draft audit work → human decisions;
- separates supported work from the product-component inventory;
- explains each component's job and relationship;
- makes auditor authority and current exclusions explicit;
- preserves RC2 maturity, source-format and provider-route boundaries;
- pins the three-profile/nine-skill inventory to the frozen RC2 receipt-bound source snapshot rather than current governed source;
- defines the separate read-only QC route without implying organizational independence;
- shows the synthetic example as pre-TOE readiness with no test result until approvals are complete;
- applies Andrew Blue Design System 1.1; and
- has rendered cleanly at 1440 px desktop and 390 px mobile widths.

## Approval boundary

- Owner review of the local candidate is not approval to commit or push.
- If Andrew requests changes, preserve the current snapshot, apply only the agreed scope and rerun affected checks.
- If Andrew approves a local commit, commit only the exact reviewed website files and synchronized project documents. Do not push.
- If Andrew separately approves publication, verify the exact commit, push it, confirm the Pages build and perform a cache-busted live check.

## Required checks before any approved push

```bash
git status --short --branch --untracked-files=all -- aeos
git log --oneline origin/main..HEAD
git diff --check -- aeos
python3 -m http.server 8000
```

Reconfirm:

- all internal anchors and image targets resolve;
- all five mobile navigation links are visible at 390 px;
- purpose, scope, benefits, components and relationships remain explicit;
- maturity and authority claims still match AEOS project authority;
- no local path, credential, restricted identifier or private material is public;
- desktop and mobile renders have no clipping or horizontal overflow; and
- browser console and network requests are clean.

## Completion condition

Complete when Andrew either requests changes, rejects the candidate, approves a local commit, or separately approves publication of an exact commit. Without explicit push approval, leave the live site unchanged.
