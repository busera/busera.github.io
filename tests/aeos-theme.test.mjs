import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const site = path.resolve(here, '../aeos');
const read = (name) => fs.readFileSync(path.join(site, name), 'utf8');

function makeHarness({ initialTheme = 'dark', storedTheme = null } = {}) {
  const buttonListeners = new Map();
  const mediaListeners = new Map();
  const storage = new Map();
  if (storedTheme !== null) storage.set('aeos-theme', storedTheme);

  const label = { textContent: '' };
  const icon = { textContent: '' };
  const button = {
    attrs: new Map(),
    addEventListener(type, handler) { buttonListeners.set(type, handler); },
    setAttribute(name, value) { this.attrs.set(name, String(value)); },
    querySelector(selector) {
      if (selector === '[data-theme-label]') return label;
      if (selector === '[data-theme-icon]') return icon;
      return null;
    },
  };
  const themeMeta = {
    content: '',
    setAttribute(name, value) {
      if (name === 'content') this.content = String(value);
    },
  };
  const diagramLink = {
    href: 'assets/aeos-operating-model.png',
    setAttribute(name, value) {
      if (name === 'href') this.href = String(value);
    },
  };
  const themedImages = [
    {
      dataset: {
        themeLight: 'assets/aeos-operating-model.png',
        themeDark: 'assets/aeos-operating-model-dark.png',
      },
      src: '',
      setAttribute(name, value) {
        if (name === 'src') this.src = String(value);
      },
      closest(selector) {
        return selector === 'a[data-dialog]' ? diagramLink : null;
      },
    },
  ];
  const media = {
    matches: initialTheme === 'dark',
    addEventListener(type, handler) { mediaListeners.set(type, handler); },
  };

  const context = {
    document: {
      documentElement: { dataset: { theme: initialTheme } },
      getElementById(id) {
        if (id === 'theme-toggle') return button;
        if (id === 'theme-color') return themeMeta;
        return null;
      },
      querySelectorAll(selector) {
        return selector === '[data-theme-light][data-theme-dark]' ? themedImages : [];
      },
    },
    localStorage: {
      getItem(key) { return storage.has(key) ? storage.get(key) : null; },
      setItem(key, value) { storage.set(key, String(value)); },
      removeItem(key) { storage.delete(key); },
    },
    matchMedia() { return media; },
    console,
  };
  context.window = context;
  vm.createContext(context);
  vm.runInContext(read('theme-toggle.js'), context, { filename: 'theme-toggle.js' });

  return {
    button,
    buttonListeners,
    context,
    diagramLink,
    icon,
    label,
    media,
    mediaListeners,
    storage,
    themeMeta,
    themedImages,
  };
}

test('page boots the theme before CSS and exposes an accessible toggle', () => {
  const html = read('index.html');
  const bootstrap = html.indexOf('data-theme-bootstrap');
  const stylesheet = html.indexOf('<link rel="stylesheet" href="styles.css">');

  assert.ok(bootstrap > 0, 'theme bootstrap must be present');
  assert.ok(bootstrap < stylesheet, 'theme bootstrap must run before CSS loads');
  assert.match(html, /<meta[^>]+id="theme-color"[^>]+name="theme-color"/);
  assert.match(html, /<button[^>]+id="theme-toggle"[^>]+aria-pressed="false"/);
  assert.match(html, /<span[^>]+data-theme-icon[^>]+aria-hidden="true"/);
  assert.match(html, /<span[^>]+data-theme-label/);
  assert.match(html, /<script src="theme-toggle\.js" defer><\/script>/);
});

test('dark theme uses the approved Andrew Blue dark surface tokens', () => {
  const css = read('styles.css');

  assert.match(css, /:root\[data-theme="dark"\]/);
  assert.match(css, /--canvas:\s*#07111f/i);
  assert.match(css, /--card:\s*#0e1b2c/i);
  assert.match(css, /--surface-soft:\s*#0b1726/i);
  assert.match(css, /--ink:\s*#f8fafc/i);
  assert.match(css, /--body:\s*#e5eef8/i);
  assert.match(css, /--mute:\s*#94a3b8/i);
  assert.match(css, /--hairline:\s*#24364d/i);
  assert.match(css, /color-scheme:\s*dark/);
  assert.match(css, /\.theme-toggle/);
});

test('both conceptual diagrams declare existing light and dark assets', () => {
  const html = read('index.html');
  const pairs = [
    ['assets/aeos-operating-model.png', 'assets/aeos-operating-model-dark.png'],
    ['assets/aeos-core-component-interactions.png', 'assets/aeos-core-component-interactions-dark.png'],
  ];

  for (const [light, dark] of pairs) {
    assert.match(html, new RegExp(`data-theme-light="${light}"[^>]+data-theme-dark="${dark}"`));
    assert.ok(fs.existsSync(path.join(site, light)), `${light} must exist`);
    assert.ok(fs.existsSync(path.join(site, dark)), `${dark} must exist`);
  }
});

test('retired trust-readiness section is absent from the page', () => {
  const html = read('index.html');
  const retiredCopy = [
    'What must work in practice',
    'What AEOS must get right before its output can be trusted.',
    'id="challenges"',
    'challenges-title',
    'Current foundation ·',
    'Still being developed ·',
  ];

  for (const phrase of retiredCopy) {
    assert.ok(!html.includes(phrase), `retired section residue: ${phrase}`);
  }
  assert.match(html, /<section class="section-wide scope-section" id="scope"/);
});

test('toggle reflects dark mode and switches to a persisted light choice', () => {
  const harness = makeHarness({ initialTheme: 'dark' });

  assert.equal(harness.button.attrs.get('aria-pressed'), 'true');
  assert.equal(harness.label.textContent, 'Dark');
  assert.equal(harness.button.attrs.get('aria-label'), 'Switch to light mode');
  assert.equal(harness.themeMeta.content, '#07111f');
  assert.equal(harness.themedImages[0].src, 'assets/aeos-operating-model-dark.png');
  assert.equal(harness.diagramLink.href, 'assets/aeos-operating-model-dark.png');

  harness.buttonListeners.get('click')();

  assert.equal(harness.context.document.documentElement.dataset.theme, 'light');
  assert.equal(harness.storage.get('aeos-theme'), 'light');
  assert.equal(harness.button.attrs.get('aria-pressed'), 'false');
  assert.equal(harness.label.textContent, 'Light');
  assert.equal(harness.button.attrs.get('aria-label'), 'Switch to dark mode');
  assert.equal(harness.themeMeta.content, '#f8fbfe');
  assert.equal(harness.themedImages[0].src, 'assets/aeos-operating-model.png');
  assert.equal(harness.diagramLink.href, 'assets/aeos-operating-model.png');
});

test('system-theme changes are followed only before the reader chooses explicitly', () => {
  const automatic = makeHarness({ initialTheme: 'light' });
  automatic.media.matches = true;
  automatic.mediaListeners.get('change')({ matches: true });
  assert.equal(automatic.context.document.documentElement.dataset.theme, 'dark');

  const explicit = makeHarness({ initialTheme: 'light', storedTheme: 'light' });
  explicit.media.matches = true;
  explicit.mediaListeners.get('change')({ matches: true });
  assert.equal(explicit.context.document.documentElement.dataset.theme, 'light');
});
