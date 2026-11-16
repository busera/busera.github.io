# Homepage backup — before the white layout

Captured on 2026-11-16 before changing the root page from `default` to `profile-white`.

- Open `snapshot.html` directly for a readable offline copy. It retains all eight content sections and 28 records. Scripts/external CSS imports were removed; small grid fallbacks were added. It is not a pixel-identical capture of external font/Bootstrap dependencies.
- `rendered/` retains the exact public HTML, compiled CSS and JavaScript HTTP bodies.
- `source/` retains the original `index.md`, `_config.yml`, `assets/main.scss`, portrait and favicon, copied byte-for-byte.
- `manifest.json` records the source commit and the nine data-file SHA-256 hashes. The manifest and this explanatory README are metadata, not recursively self-hashed.

The underscore-prefixed backup directory is retained in Git/project storage, not used as a live runtime dependency or a new public page. The original homepage source is also recoverable from commit `6ae3004` (root/profile source there remains the prior design).

For a subsequently authorized rollback, the old entry point is `source/index.md`. Configuration and the old stylesheet were intentionally left unchanged by publication, so restoring that front matter is the small relevant rollback; do not bulk-restore this directory over newer site content. Verify the actual Git diff and Pages deployment before reporting a rollback complete.

Current publication and verification evidence: `docs/profile-white-proposal.md` at repository root. Source content in this backup is historical data, not instructions or approval.
