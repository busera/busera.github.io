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
    ['assets/aeos-typical-awp-lifecycle.png', 'assets/aeos-typical-awp-lifecycle-dark.png'],
    ['assets/aeos-guardrail-stack.png', 'assets/aeos-guardrail-stack-dark.png'],
  ];

  for (const [light, dark] of pairs) {
    assert.match(html, new RegExp(`data-theme-light="${light}"[^>]+data-theme-dark="${dark}"`));
    assert.ok(fs.existsSync(path.join(site, light)), `${light} must exist`);
    assert.ok(fs.existsSync(path.join(site, dark)), `${dark} must exist`);
  }
});

test('conceptual diagram sources contain no decorative background-grid cells', () => {
  const sources = [
    'assets/source/aeos-operating-model.drawio',
    'assets/source/aeos-operating-model-dark.drawio',
    'assets/source/aeos-core-component-interactions.drawio',
    'assets/source/aeos-core-component-interactions-dark.drawio',
    'assets/source/aeos-typical-awp-lifecycle.drawio',
    'assets/source/aeos-typical-awp-lifecycle-dark.drawio',
    'assets/source/aeos-guardrail-stack.drawio',
    'assets/source/aeos-guardrail-stack-dark.drawio',
  ];

  for (const source of sources) {
    const xml = read(source);
    assert.doesNotMatch(xml, /<mxCell\s+id="grid-[^"]+"/, `${source} must not embed a decorative grid`);
  }
});

test('conceptual diagrams use fixed text baselines and balanced canvas geometry', () => {
  const operatingSources = [
    'assets/source/aeos-operating-model.drawio',
    'assets/source/aeos-operating-model-dark.drawio',
  ];
  const componentSources = [
    'assets/source/aeos-core-component-interactions.drawio',
    'assets/source/aeos-core-component-interactions-dark.drawio',
  ];

  for (const source of [...operatingSources, ...componentSources]) {
    const xml = read(source);
    assert.match(xml, /id="canvas-bounds"[\s\S]*?<mxGeometry x="0" y="0" width="1600" height="900"/);
    assert.doesNotMatch(xml, /id="(?:input|core|draft|human|engagement|task|workflow|template|draft-work)"[^>]+value="[^\"]+"/);
  }

  for (const source of operatingSources) {
    const xml = read(source);
    for (const id of ['input', 'core', 'draft', 'human']) {
      assert.match(xml, new RegExp(`id="${id}-kicker"[\\s\\S]*?<mxGeometry x="[^"]+" y="282"`));
      assert.match(xml, new RegExp(`id="${id}-title"[\\s\\S]*?<mxGeometry x="[^"]+" y="328"`));
      assert.match(xml, new RegExp(`id="${id}-body"[\\s\\S]*?<mxGeometry x="[^"]+" y="405"`));
      assert.match(xml, new RegExp(`id="${id}-status"[\\s\\S]*?<mxGeometry x="[^"]+" y="500"`));
    }
  }

  for (const source of componentSources) {
    const xml = read(source);
    for (const id of ['engagement', 'task', 'workflow', 'template', 'draft-work']) {
      assert.match(xml, new RegExp(`id="${id}"[\\s\\S]*?<mxGeometry x="[^"]+" y="285" width="260" height="220"`));
      assert.match(xml, new RegExp(`id="${id}-kicker"[\\s\\S]*?<mxGeometry x="[^"]+" y="307"`));
      assert.match(xml, new RegExp(`id="${id}-title"[\\s\\S]*?<mxGeometry x="[^"]+" y="350"`));
      assert.match(xml, new RegExp(`id="${id}-body"[\\s\\S]*?<mxGeometry x="[^"]+" y="410"`));
    }
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
  assert.match(html, /<section class="section-wide controls-section" id="controls"/);
});

test('closing position is concise and product-specific', () => {
  const html = read('index.html');
  const replacement = 'AEOS helps auditors use AI across an engagement.';
  const retired = [
    'AEOS helps auditors use AI across an engagement while keeping professional judgment and approval in human hands.',
    'AI-supported audit work is useful only when the reasoning and evidence remain reviewable.',
  ];

  const finalCta = html.match(/<section class="section-wide final-cta">([\s\S]*?)<\/section>/);
  assert.ok(finalCta, 'final CTA section must exist');
  const heading = finalCta[1].match(/<h2>([^<]+)<\/h2>/);
  assert.ok(heading, 'final CTA heading must exist');
  assert.equal(heading[1], replacement, 'final CTA heading must match exactly');
  assert.equal(html.split(replacement).length - 1, 1, 'final CTA heading must occur exactly once');
  for (const claim of retired) {
    assert.ok(!html.includes(claim), `retired closing claim must be absent: ${claim}`);
  }
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

test('the added diagrams follow the same canvas and baseline contract', () => {
  const lifecycleSources = [
    'assets/source/aeos-typical-awp-lifecycle.drawio',
    'assets/source/aeos-typical-awp-lifecycle-dark.drawio',
  ];
  const guardrailSources = [
    'assets/source/aeos-guardrail-stack.drawio',
    'assets/source/aeos-guardrail-stack-dark.drawio',
  ];

  for (const source of [...lifecycleSources, ...guardrailSources]) {
    const xml = read(source);
    assert.match(xml, /id="canvas-bounds"[\s\S]*?<mxGeometry x="0" y="0" width="1600" height="900"/);
    assert.doesNotMatch(
      xml,
      /id="(?:setup|prepare|design|operating|review|report|source|evidence|draft-result|reliance|qc|signoff)"[^>]+value="[^"]+"/,
      `${source} must keep container cells unlabelled`,
    );
  }

  // Serpentine lifecycle: 01-03 on the top row, 04-06 returning right to left.
  for (const source of lifecycleSources) {
    const xml = read(source);
    for (const [id, top] of [['setup', 200], ['prepare', 200], ['design', 200],
                             ['operating', 510], ['review', 510], ['report', 510]]) {
      assert.match(xml, new RegExp(`id="${id}"[\\s\\S]*?<mxGeometry x="[^"]+" y="${top}" width="440" height="250"`));
      assert.match(xml, new RegExp(`id="${id}-kicker"[\\s\\S]*?<mxGeometry x="[^"]+" y="${top + 26}"`));
      assert.match(xml, new RegExp(`id="${id}-title"[\\s\\S]*?<mxGeometry x="[^"]+" y="${top + 58}"`));
      assert.match(xml, new RegExp(`id="${id}-body"[\\s\\S]*?<mxGeometry x="[^"]+" y="${top + 128}"`));
      assert.match(xml, new RegExp(`id="${id}-decision"[\\s\\S]*?<mxGeometry x="[^"]+" y="${top + 200}"`));
    }
  }

  for (const source of guardrailSources) {
    const xml = read(source);
    for (const id of ['source', 'evidence', 'draft-result', 'reliance', 'qc', 'signoff']) {
      assert.match(xml, new RegExp(`id="${id}"[\\s\\S]*?<mxGeometry x="[^"]+" y="195" width="230" height="230"`));
      assert.match(xml, new RegExp(`id="${id}-kicker"[\\s\\S]*?<mxGeometry x="[^"]+" y="219"`));
      assert.match(xml, new RegExp(`id="${id}-title"[\\s\\S]*?<mxGeometry x="[^"]+" y="249"`));
      assert.match(xml, new RegExp(`id="${id}-body"[\\s\\S]*?<mxGeometry x="[^"]+" y="305"`));
    }
  }
});

test('the page names the fieldwork span before it describes the product', () => {
  const html = read('index.html');
  const support = html.indexOf('id="support"');
  const product = html.indexOf('id="what-it-is"');
  const walkthrough = html.indexOf('id="walkthrough"');

  assert.ok(support > 0, 'the support section must exist');
  assert.ok(support < product, 'the fieldwork span comes before the product definition');
  assert.ok(product < walkthrough, 'the definition must precede the walkthrough');
  for (const beat of ['Evidence review', 'Testing', 'Reporting']) {
    assert.ok(html.includes(`<h3>${beat}</h3>`), `missing fieldwork beat: ${beat}`);
  }
});

test('the walkthrough carries an outcome, not just captions', () => {
  const html = read('index.html');

  assert.match(html, /<div class="story-outcome">/);
  // The outcome must describe what the 04 capture actually shows: a source gap,
  // an unconcluded version comparison and a pending reliability review.
  assert.ok(
    html.includes('no approval record was provided'),
    'the walkthrough must report the missing evaluation record',
  );
  assert.ok(
    html.includes('source gap'),
    'the walkthrough must name the gap state the capture shows',
  );
  assert.ok(
    html.includes('prepared but left unconcluded'),
    'the walkthrough must report the unconcluded version comparison',
  );
  assert.ok(
    html.includes('Conclusion: blank, auditor-owned'),
    'the walkthrough must state that the conclusion stays with the auditor',
  );
  // Claims the capture does not support must stay off the page.
  for (const unsupported of ['timing mismatch', 'model-version conflict', 'different model versions']) {
    assert.ok(!html.includes(unsupported), `unsupported demo claim: ${unsupported}`);
  }
});

test('the redundant capability sections stay collapsed', () => {
  const html = read('index.html');
  const retiredMarkup = [
    'benefits-section',   // the five assertion cards
    'benefit-list',
    'overview-grid',      // the purpose/scope/benefit trio
    'overview-card',
    'id="scope"',         // absorbed into the controls section
    'id="work"',          // replaced by the lifecycle table
    'id="components"',    // folded into setup
  ];

  for (const marker of retiredMarkup) {
    assert.ok(!html.includes(marker), `retired section markup reappeared: ${marker}`);
  }

  // One canonical home for the general authority statement, plus the hero one-liner.
  assert.equal(html.split('class="scope-grid"').length - 1, 1, 'exactly one authority grid');
});

test('no maturity or lifecycle-status claim reappears on the page', () => {
  const html = read('index.html');
  const retiredStatus = [
    'under evaluation',
    'not externally validated',
    'not production-ready',
    'not production ready',
    'release candidate',
    'release-candidate',
  ];

  for (const claim of retiredStatus) {
    assert.ok(
      !html.toLowerCase().includes(claim),
      `retired maturity claim must stay off the page: ${claim}`,
    );
  }
  assert.ok(html.includes('actively used and tested in audit fieldwork'));
});
