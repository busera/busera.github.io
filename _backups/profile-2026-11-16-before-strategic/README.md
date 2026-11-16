# Profile before strategic repositioning

Baseline: `966cbd2634b3c870196a35679c2fd00d1956eccf`. Owner-requested backup before any positioning edits.

- `source/`: exact profile source, assets, tests and current delivery record.
- `served/`: exact HTTP bodies captured from the published site. Stylesheet, portrait, favicon and active video thumbnail byte-match the source.
- `snapshot.html`: derived, self-contained offline copy of the served page, with the same CSS and image bytes embedded. All 29 entries remain present; external links still require network when followed. No JavaScript, remote fonts or media are needed for display.
- `manifest.json`: hashes and byte lengths for every retained data file.

Restore only as an explicit owner-requested operation; the backup itself does not authorize restoration or publishing. Older backups remain unchanged.
