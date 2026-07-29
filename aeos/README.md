# AEOS public website

This directory contains the sanitized public product website for the **AI-Augmented Audit Engagement Operating System (AEOS)**.

## Public URL

<https://busera.github.io/aeos/>

## Scope

The site explains:

- the AEOS operating model;
- the post-approved-work-program workflow;
- product components and control layers;
- setup and data-governance routes;
- current maturity and release boundaries;
- a synthetic fieldwork example; and
- the validation-led roadmap.

It deliberately excludes organization-specific overlays, engagement evidence, credentials, restricted methodology, private implementation material, and any claim that AEOS is a validated release or production-ready.

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

Publication or push remains a separate approval action.
