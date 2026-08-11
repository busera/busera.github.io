# AEOS Public Website — Project State

## Status

- **Lifecycle:** Reader-clarity redesign is an uncommitted, independently Green local candidate; owner content/design decision remains required.
- **Branch:** `main`.
- **Published baseline:** `0136ef1757095bf8eb4c8359b090fba5d902dc2a`. The live GitHub Pages site remains on this baseline.
- **Local base:** `cbfc77701b5d0022aa8b7c13e03535a7970f3fbf`, ten commits ahead of `origin/main` before the redesign.
- **Current page SHA-256:** `b298a9867938737eff8fac1c125af3e7ba268ff57636093bdb9db54032601e13`.
- **Current CSS SHA-256:** `e2286e9b53493f22e1d1676a417b09d3d5ad68ad9b8b59e62d76ef7b7f2ebb4e`.
- **Current component-visual SHA-256:** `a2a045fe0bda61f248cb39889bd72932af2266ebe4d01734b2c3c0e5e57c7bf1`.
- **Current workspace-visual SHA-256:** `797070e0f133b8e8c4ae8ea0a7ef10349d1bcb5b725bac75f9baaecd85bc837d`.
- **Publication boundary:** Any commit, push or GitHub Pages deployment requires Andrew's separate explicit approval.

## 2026-08-11 clarity redesign

The previous page was accurate but too abstract for a first-time reader. The new local candidate changes the reader journey:

1. The hero defines AEOS in one sentence and states its start and end boundary.
2. A 30-second overview separates purpose, scope and benefit.
3. A four-stage relationship map shows approved inputs → AEOS operating core → draft audit work → human decisions.
4. Practical benefits are stated as designed outcomes rather than unsupported measured claims.
5. Supported audit work is separated from the component inventory.
6. A component table explains the job and relationship of the workspace, profiles, skills, prompts, templates, controls and Python checks.
7. Scope is explicit across three columns: AEOS supports, the auditor owns, and current exclusions.
8. A concise RC2/not-validated/not-production-ready boundary appears in the hero; the detailed status section pins the three-profile/nine-skill inventory to the frozen RC2 source snapshot rather than current governed source.
9. The page applies Andrew Blue Design System 1.1 from the PA Standards wiki.
10. Desktop and mobile navigation, the relationship map and component inventory remain usable without JavaScript.

## Verification evidence

- Canonical `DESIGN.md` lint: PASS with 0 errors and 0 warnings.
- HTML parsing, duplicate IDs, internal anchors, image targets and alt text: PASS.
- Standards-based HTML validation and CSS syntax validation: PASS.
- Native table semantics for the component inventory: PASS.
- Lifecycle-state semantics: draft TOD/TOE outputs precede the separate review gate; the reviewed workpaper follows it.
- WCAG 2.0/2.1 A/AA axe-core scan at desktop and mobile viewports: PASS with zero violations.
- Manual step-badge contrast check: PASS at 8.70:1.
- Required purpose/scope/benefit/component/relationship copy: PASS.
- Public-boundary scan for local paths, credentials and private-overlay wording: PASS.
- CSS brace and Andrew Blue token reconciliation: PASS.
- `git diff --check`: PASS.
- Local HTTP preview: page, CSS and both retained images return HTTP 200; browser console and failed-request checks are clean.
- Desktop full-page render at 1440 × 1000 viewport: PASS; no material clipping or overlap observed.
- Mobile full-page render at 390 × 844 viewport: PASS after two header refinements; all five navigation links are visible and the layout has no observed horizontal overflow.
- Final exact review: GREEN. Editorial review found no material issue. Governance closure verified all 33 manifest-bound article, website, dependency and authority files at opening and closing; local HTML/CSS dependency coverage is complete in both directions, with no documentation, privacy or IP concern. Article/page hashes remain `60b6465…` / `b298a986…`.

## Public boundaries

- Do not expose private overlays, engagement evidence, credentials, restricted methodology, machine-local paths or private implementation material.
- Do not treat exact package review as supported Windows invocation, validated-release or production-readiness evidence.
- Do not turn designed benefits into quantified outcome claims without evidence.
- Do not push, publish, deploy, tag, amend or reorder existing commits without explicit owner approval.

## Next decision

Present the exact local candidate to Andrew for content/design review. Content approval is not commit or push approval; publication requires separate approval of the exact commit followed by a successful Pages build and cache-busted live verification.
