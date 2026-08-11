# AEOS public website

This directory contains the sanitized public product website for the **AI-Augmented Engagement Operating System (AEOS)**.

## Public URL

<https://busera.github.io/aeos/>

The live site remains unchanged until Andrew explicitly approves a push.

## Reader purpose

The page is structured so a first-time reader can quickly answer:

- what AEOS is and why it exists;
- where its scope starts and ends;
- what practical benefits it is designed to provide;
- what audit work it supports;
- which components it contains and how they relate;
- what remains under auditor authority;
- the current release-candidate and validation boundary; and
- what software, working formats and provider routes are required.

## Public boundary

The site explains the product at operating-model level. It excludes organization-specific overlays, engagement evidence, credentials, restricted methodology, machine-local paths and private implementation material.

## Design authority

The page applies **Andrew Blue Design System 1.1**, the canonical standard maintained in the PA Standards wiki. The implementation uses the approved light/dark palette, spacing, typography, flat containers, button radii and responsive rules. The design system remains authoritative; this directory contains only the website implementation.

## Local preview

From the repository root:

```bash
python3 -m http.server 8000
```

Open <http://127.0.0.1:8000/aeos/>.

## Source boundaries

- Website copy and layout: `aeos/index.html`
- Website styles: `aeos/styles.css`
- Public visual copies: `aeos/assets/`
- Canonical editable visual sources: the AEOS writing project, not this website directory
- Pre-redesign local rollback snapshot: ignored local path `aeos/_snapshots/2026-08-11-pre-clarity-redesign/`

## Project continuation

- Current state: [`PROJECT_STATE.md`](PROJECT_STATE.md)
- Roadmap and lifecycle status: [`ROADMAP.md`](ROADMAP.md)
- Executable continuation: [`DO_NEXT_SESSION.md`](DO_NEXT_SESSION.md)

Publication or push remains a separate approval action.
