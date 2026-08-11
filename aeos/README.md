# AEOS public website

This directory contains the sanitized public product website for the **AI-Augmented Engagement Operating System (AEOS)**.

## Public URL

<https://busera.github.io/aeos/>

The reader-clarity baseline is live from content commit `a577d3082aebeb0562d2e58c53b788c3c1e386e7`. GitHub Pages built that exact commit, and cache-busted checks confirmed byte parity for the page, stylesheet, favicon and both active images.

## Reader purpose

The published page contains the following product information:

- what AEOS is and why it exists;
- where its scope starts and ends;
- what practical benefits it is designed to provide;
- what audit work it supports;
- which components it contains and how they relate;
- what remains under auditor authority;
- the current release-candidate and validation boundary; and
- what software, working formats and provider routes are required.

AEOS-033 in the canonical AEOS product backlog now owns the next presentation outcome: a more appealing, reader-first introduction that makes AEOS understandable before architecture, components and inner workings. That outcome is Proposed, not active.

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
- Actual previous live-site rollback snapshot: tracked path `aeos/_snapshots/2026-08-11-live-before-clarity-publish/`, with source URLs, response metadata and SHA-256 hashes in `LIVE_BACKUP.json`

## Project continuation

- Current state: [`PROJECT_STATE.md`](PROJECT_STATE.md)
- Roadmap and lifecycle status: [`ROADMAP.md`](ROADMAP.md)
- Executable continuation: [`DO_NEXT_SESSION.md`](DO_NEXT_SESSION.md)

Any future implementation, commit or push remains separately approval-gated. Reader-first changes must be executed through AEOS-033 rather than edited ad hoc.
