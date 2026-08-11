# AEOS public website

This directory contains the sanitized public product website for the **AI-Augmented Engagement Operating System (AEOS)**.

## Public URL

<https://busera.github.io/aeos/>

The published pre-media baseline remains live from content commit `8bd1634ea58aafc2abe049bb80125f67105bc0e0`. The repository contains a newer screenshot-integrated local candidate; it has not been pushed or deployed.

## Reader purpose

The local candidate explains:

- what AEOS is and why it exists;
- where the audit-fieldwork scope starts and ends;
- the intended practical benefits;
- the supported route from an audit work program (AWP) into fieldwork, review and reporting drafts;
- the requirement to provide reviewed Markdown working copies while retaining and linking native originals;
- one four-frame synthetic demonstration across Obsidian and Visual Studio Code;
- the core components and their relationships; and
- the decisions and communications that remain with the auditor.

The public copy does not claim broad advisory-engagement support. AEOS v1 evidence remains centred on AWP intake, TOD and TOE fieldwork.

## Publication prose gate

Every publication-bound website copy change must receive a targeted Humanizer Lite pass through `pa/humanizer` after factual and structural editing but before exact-candidate review and publication approval. Public copy uses **AWP = Audit Work Program**, expands it near first use, and does not repeat “approved” as a work-program modifier. EWP/Engagement Work Program and public RC2/current-product-state copy are excluded from this candidate. Humanizer Lite must preserve audit meaning, formal names, technical labels, citations and authority boundaries, and must not invent anecdotes, evidence or benefit claims. Any later prose change requires an affected rerun.

## Public boundary

The site explains the product at operating-model level. It excludes organization-specific overlays, engagement evidence, credentials, restricted methodology, machine-local paths and private implementation material.

## Design authority

The page applies **Andrew Blue Design System 1.1** using the approved light/dark palette, spacing, typography, flat containers, button radii and responsive rules. The demonstration frames use this system without recolouring or annotating the captured application pixels.

## Local preview

From the repository root:

```bash
python3 -m http.server 8000
```

Open <http://127.0.0.1:8000/aeos/>.

## Source boundaries

- Website copy and layout: `aeos/index.html`
- Website styles: `aeos/styles.css`
- Full-size gallery behavior: `aeos/demo-gallery.js`
- Public visual copies: `aeos/assets/`
- Reviewed screenshot copies: `aeos/assets/demo/`
- Canonical editable visual sources: the AEOS writing project
- Actual previous live-site rollback snapshot: `aeos/_snapshots/2026-08-11-live-before-clarity-publish/`

## Project continuation

- Current state: [`PROJECT_STATE.md`](PROJECT_STATE.md)
- Roadmap and lifecycle status: [`ROADMAP.md`](ROADMAP.md)
- Executable continuation: [`DO_NEXT_SESSION.md`](DO_NEXT_SESSION.md)

Andrew authorized a local commit once validation and external exact review pass. Push and deployment remain separate explicit approvals.
