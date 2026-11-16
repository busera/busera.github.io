import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const original = readFileSync(resolve(root, 'aeos/index.html'), 'utf8');
const editionPath = resolve(root, 'aeos/studio/index.html');
const edition = readFileSync(editionPath, 'utf8');
const css = readFileSync(resolve(root, 'aeos/studio/studio.css'), 'utf8');
const main = html => html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1];
const text = html => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const withoutAside = html => main(html).replace(/<aside\b[\s\S]*?<\/aside>/g, '');

test('Studio retains all original main content outside the overview aside', () => {
  assert.equal(text(withoutAside(edition)), text(withoutAside(original)));
  const boundary = original.match(/<aside class="hero-boundary"[^>]*>([\s\S]*?)<\/aside>/)[1];
  const moved = edition.match(/<div class="hero-boundary"[^>]*>([\s\S]*?)<\/div>\s*<\/aside>/)[1];
  assert.equal(text(moved), text(boundary));
});

test('Studio preserves the original footer/disclaimer', () => {
  const footer = html => text(html.match(/<footer>([\s\S]*?)<\/footer>/)[1]);
  assert.equal(footer(edition), footer(original));
});

test('Studio is isolated, fixed dark, and does not load or mutate original theme preferences', () => {
  assert.match(edition, /data-theme="studio"/);
  assert.match(edition, /href="\.\.\/styles.css"/);
  assert.match(edition, /href="studio.css"/);
  assert.doesNotMatch(edition, /localStorage|theme-toggle|data-theme-bootstrap/);
  assert.match(css, /--canvas: #2b3035;/);
  assert.match(css, /--accent: #9bd5f5;/);
  assert.doesNotMatch(css, /#d8f36a|#151714|#20231e/i);
});

test('All local resources and link destinations exist', () => {
  for (const [,value] of edition.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (/^(?:https?:|#|data:)/.test(value)) continue;
    const target = value.split('#')[0];
    assert.ok(existsSync(resolve(dirname(editionPath), target)), value);
  }
  const ids = [...edition.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length, 'duplicate ids');
  for (const [,fragment] of edition.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(ids.includes(fragment), fragment);
  }
});

test('All six atlas links point at their corresponding support item', () => {
  const nodes = edition.match(/<div class="studio-nodes">([\s\S]*?)<\/div>/)[1];
  const links = [...nodes.matchAll(/href="#support-step-(\d)"/g)].map(m => m[1]);
  assert.deepEqual(links, ['1','2','3','4','5','6']);
  for (const n of links) assert.match(edition, new RegExp(`<li id="support-step-${n}">`));
});

test('All five original image dialogs remain wired to the shared script and dark assets', () => {
  assert.match(edition, /src="\.\.\/demo-gallery.js"/);
  const dialogs = [...edition.matchAll(/data-dialog="([^"]+)"/g)].map(m => m[1]);
  assert.equal(dialogs.length, 5);
  for (const id of dialogs) assert.ok(edition.includes(`id="${id}"`));
  const images = [...edition.matchAll(/<img[^>]+src="([^"]+)"/g)].map(m => m[1]);
  assert.equal(images.length, 10);
  for (const image of images) assert.match(image, /-dark\.png$/);
});
