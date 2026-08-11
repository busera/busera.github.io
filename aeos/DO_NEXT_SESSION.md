# AEOS Public Website — Do Next Session

## Starting prompt

> Read and execute this `DO_NEXT_SESSION.md` as the continuation instruction for the AEOS public website. Verify live and local state first. Treat AEOS-033 in the canonical product backlog as the owner of the next reader-first introduction. Do not implement, commit, push or deploy unless Andrew explicitly activates and approves the relevant action.

## Objective

Maintain the published clarity baseline and route the next reader-first introductory redesign through AEOS-033.

## Repository state

- Repository root: discover with `git rev-parse --show-toplevel`.
- Branch: `main`.
- Published content commit: `a577d3082aebeb0562d2e58c53b788c3c1e386e7`.
- Previous live baseline: `0136ef1757095bf8eb4c8359b090fba5d902dc2a`, preserved under `aeos/_snapshots/2026-08-11-live-before-clarity-publish/`.
- Local base before redesign: `cbfc77701b5d0022aa8b7c13e03535a7970f3fbf`.
- Candidate page SHA-256: `b298a9867938737eff8fac1c125af3e7ba268ff57636093bdb9db54032601e13`.
- Candidate CSS SHA-256: `e2286e9b53493f22e1d1676a417b09d3d5ad68ad9b8b59e62d76ef7b7f2ebb4e`.
- Component visual SHA-256: `a2a045fe0bda61f248cb39889bd72932af2266ebe4d01734b2c3c0e5e57c7bf1`.
- Workspace visual SHA-256: `797070e0f133b8e8c4ae8ea0a7ef10349d1bcb5b725bac75f9baaecd85bc837d`.
- Exact manifest: `/Users/busera/Temp/Hermes/aeos-article-yellow-remediation/final-candidate-hashes-v5.json` — 33 bound files, complete HTML/CSS dependency coverage, final verdict Green.
- GitHub Pages successfully rebuilt unchanged commit `a577d30`; cache-busted checks confirmed the page, stylesheet, favicon and both active images are live and byte-identical to local source.

## Start here

1. Run `git status --short --branch --untracked-files=all -- aeos`.
2. Rehash `aeos/index.html`, `aeos/styles.css` and both linked images.
3. Read `README.md`, `PROJECT_STATE.md`, `ROADMAP.md` and the current diff.
4. Read `/Users/busera/Developer/AEOS/backlog/items/AEOS-033.md` and the matching row in `backlog/AEOS-BACKLOG.md`; that tracker is authoritative for the next outcome.
5. If published bytes differ from the hashes above, investigate drift before implementation. If AEOS-033 is activated, preserve the current live snapshot and create a new reviewed local candidate.

## Published clarity baseline

The published redesign:

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

## AEOS-033 follow-up and approval boundary

- AEOS-033 is Proposed and not queued. Backlog refinement did not authorize implementation.
- The item requires an appealing first-screen introduction that explains AEOS before architecture, components and inner workings, with first-time-reader behavioral acceptance.
- When Andrew activates the item, preserve the current published baseline, implement only the backlog contract, and rerun affected structural, responsive, accessibility, privacy, claims and independent-reader checks.
- A reviewed local result is not approval to commit or push. Commit and deployment remain separate approvals.

## Required checks before any future approved push

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

Current publication closeout is complete. The next work starts only when AEOS-033 is activated. That outcome closes only after its reader-first acceptance criteria pass and any separately approved deployment is verified live.
