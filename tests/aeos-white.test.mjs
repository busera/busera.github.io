import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const folder = resolve(root, 'aeos/studio');
const dark = readFileSync(resolve(folder, 'index.html'), 'utf8');
const white = readFileSync(resolve(folder, 'white.html'), 'utf8');
const css = readFileSync(resolve(folder, 'white.css'), 'utf8');
const text = html => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

test('White edition retains all main content and the disclaimer', () => {
  for (const tag of ['main', 'footer']) {
    const part = html => text(html.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`))[1]);
    assert.equal(part(white), part(dark));
  }
});

test('White edition loads its isolated colour layer last and uses white metadata', () => {
  assert.match(white, /data-theme="studio-white"/);
  assert.match(white, /name="theme-color" content="#ffffff"/);
  assert.ok(white.indexOf('href="white.css"') > white.indexOf('href="studio.css"'));
  assert.match(css, /color-scheme: light;/);
  assert.match(css, /--canvas: #ffffff;/);
  assert.match(css, /--accent: #21658c;/);
  assert.doesNotMatch(white, /localStorage|theme-toggle/);
});

test('White edition resources, fragments and all five dialogs resolve', () => {
  const ids = [...white.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const [,href] of white.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (href.startsWith('#')) assert.ok(ids.includes(href.slice(1)), href);
    else if (!/^https?:/.test(href)) assert.ok(existsSync(resolve(folder, href.split('#')[0])), href);
  }
  const dialogs = [...white.matchAll(/data-dialog="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(dialogs.length, 5);
  for (const id of dialogs) assert.ok(ids.includes(id));
  const images = [...white.matchAll(/<img[^>]+src="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(images.length, 10);
  assert.ok(images.every(src=>!src.includes('-dark.png')));
});
