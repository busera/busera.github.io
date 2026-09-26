import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const site = path.resolve(here, '../aeos');
const read = (name) => fs.readFileSync(path.join(site, name), 'utf8');
const normalizeSpace = (value) => value.replace(/\s+/g, ' ').trim();
const attribute = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];
const sha256 = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');

const visualContracts = [
  {
    id: 'current-scope',
    dialogId: 'diagram-dialog-current-scope',
    light: 'assets/aeos-current-future-scope.png',
    dark: 'assets/aeos-current-future-scope-dark.png',
    alt: 'AEOS scope diagram showing EWP and test-procedure creation as a future release outside the current boundary, with the current version starting from an available EWP or AWP and supporting fieldwork planning, execution, Draft work and review under auditor authority.',
    caption: 'Current and future scope. The current version starts with an available EWP or AWP; creating the EWP and its test procedures remains under development. Select the diagram to enlarge it.',
  },
  {
    id: 'operating-model',
    dialogId: 'diagram-dialog-operating-model',
    light: 'assets/aeos-operating-model.png',
    dark: 'assets/aeos-operating-model-dark.png',
    alt: 'An available EWP or AWP enters a bounded core made up of the workspace, selected audit agent, task skill, prompt and template, knowledge, memory and guardrails. The route produces a source-linked Draft that returns to auditor checkpoints.',
    caption: 'Operating model. The bounded core combines the workspace, selected audit agent, task skill, prompt and template, knowledge, memory and guardrails. The auditor owns scope, testing basis, reliance, conclusions, sign-off and communication. Select the diagram to enlarge it.',
  },
  {
    id: 'lifecycle',
    dialogId: 'diagram-dialog-lifecycle',
    light: 'assets/aeos-typical-awp-lifecycle.png',
    dark: 'assets/aeos-typical-awp-lifecycle-dark.png',
    alt: 'A six-stage Audit route from the available EWP or AWP through engagement setup, testing, separate read-only review, controlled correction, verification and reporting. The reviewed output remains Draft until the auditor completes the required decisions and approvals.',
    caption: 'Detailed Audit route. The diagram adds engagement setup, then expands the testing stage into design and implementation work followed by operating-effectiveness work. Each stage has a permitted source set and an auditor checkpoint; outputs remain Draft. Select the diagram to enlarge it.',
  },
  {
    id: 'guardrails',
    dialogId: 'diagram-dialog-guardrails',
    light: 'assets/aeos-guardrail-stack.png',
    dark: 'assets/aeos-guardrail-stack-dark.png',
    alt: 'AEOS authority chain from authorized source through an evidence candidate, Draft result, auditor reliance, separate read-only quality review, controlled correction and auditor sign-off to a reporting Draft. The auditor owns the testing basis, exception evaluation, conclusions, sign-off and communication.',
    caption: 'The authority chain. Received material remains an evidence candidate until the auditor decides reliance. Deterministic checks verify bounded structural properties; approved corrections are applied separately and verified. The auditor retains the testing basis, exception evaluation, conclusions, sign-off and communication. Select the diagram to enlarge it.',
  },
  {
    id: 'components',
    dialogId: 'diagram-dialog-components',
    light: 'assets/aeos-core-component-interactions.png',
    dark: 'assets/aeos-core-component-interactions-dark.png',
    alt: 'The governed operating core groups the selected audit agent, task skill, workpaper template and supporting layer inside the human-owned boundary. Engagement inputs enter the core and only Draft work leaves it. Guardrails, source controls and separate review constrain the route, while the auditor owns scope, the applicable testing basis, reliance, conclusions, sign-off and communication.',
    caption: 'How the parts connect. The governed operating core groups the selected audit agent, task skill, workpaper template and supporting layer inside the human-owned boundary. That layer provides prompts, operating guides, knowledge and memory. Engagement inputs enter the core and only Draft work leaves it; the auditor retains the professional decisions. Select the diagram to enlarge it.',
  },
];

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

test('legacy conceptual diagrams remain available in light and dark variants', () => {
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
      const statusY = id === 'human' ? '510' : '500';
      assert.match(xml, new RegExp(`id="${id}-status"[\\s\\S]*?<mxGeometry x="[^"]+" y="${statusY}"`));
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
  const replacement = 'AEOS supports supervised fieldwork while the auditor retains the professional decisions.';
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
  for (const beat of ['Meetings and evidence', 'Testing and documentation', 'Reporting and continuity']) {
    assert.ok(html.includes(`<h3>${beat}</h3>`), `missing fieldwork beat: ${beat}`);
  }
});

test('the practice section keeps the synthetic example bounded and unconcluded', () => {
  const html = read('index.html');

  assert.match(html, /<div class="story-outcome">/);
  assert.ok(html.includes('The records and engagement are synthetic.'));
  assert.ok(html.includes('routes it for follow-up'));
  assert.ok(html.includes('It does not turn the issue into a tested exception'));
  assert.ok(html.includes('the auditor evaluates exceptions and owns the conclusion'));
  for (const staleScreenshot of ['assets/demo/01-', 'assets/demo/02-', 'assets/demo/03-', 'assets/demo/04-']) {
    assert.ok(!html.includes(staleScreenshot), `stale synthetic screenshot must not be active: ${staleScreenshot}`);
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
  assert.ok(html.includes('Its current focus is fieldwork planning and execution.'));
  assert.ok(html.includes('EWP creation, including its test procedures, is a future capability under development.'));
});

test('the public scope contract matches the available-EWP current boundary', () => {
  const html = read('index.html');
  const banned = [
    /approved\s+(?:EWP|AWP|audit work program|engagement work program)/i,
    /authorized\s+(?:EWP|AWP|audit work program|engagement work program)/i,
    /starts?\s+after\s+(?:the\s+)?(?:EWP|AWP|audit work program|engagement work program)/i,
    /post[- ](?:EWP|AWP|authorization)/i,
  ];

  assert.ok(html.includes('Available EWP / AWP'));
  assert.ok(html.includes('Its current focus is fieldwork planning and execution.'));
  assert.ok(html.includes('Creating the EWP and its test procedures (future release)'));
  for (const pattern of banned) assert.doesNotMatch(html, pattern);
});

test('Git and Python remain optional extensions rather than AEOS core requirements', () => {
  const html = read('index.html');

  assert.ok(html.includes('Python for repeatable processing and Git for background versioning and recovery.'));
  assert.ok(html.includes('Neither is required for the default AEOS core'));
  assert.ok(html.includes('AEOS does not require a separate application backend, database, Python environment or Git repository for its default core.'));
  assert.doesNotMatch(html, /\/tod-analysis-to-workpaper/);
});

test('the active operating-model visual uses the available-work-program boundary', () => {
  const sources = [
    'assets/source/aeos-operating-model.drawio',
    'assets/source/aeos-operating-model-dark.drawio',
  ];

  for (const source of sources) {
    const xml = read(source);
    assert.match(xml, /id="input-status" value="AVAILABLE INPUT"/);
    assert.doesNotMatch(xml, /AUTHORIZED INPUT/);
  }
});

test('the retained website visuals use the current AEOS public ontology', () => {
  const operatingSources = [
    'assets/source/aeos-operating-model.drawio',
    'assets/source/aeos-operating-model-dark.drawio',
  ];
  const lifecycleSources = [
    'assets/source/aeos-typical-awp-lifecycle.drawio',
    'assets/source/aeos-typical-awp-lifecycle-dark.drawio',
  ];
  const guardrailSources = [
    'assets/source/aeos-guardrail-stack.drawio',
    'assets/source/aeos-guardrail-stack-dark.drawio',
  ];
  const componentSources = [
    'assets/source/aeos-core-component-interactions.drawio',
    'assets/source/aeos-core-component-interactions-dark.drawio',
  ];

  for (const source of operatingSources) {
    const xml = read(source);
    for (const label of [
      'Available EWP / AWP',
      'Workspace · selected agent',
      'skill · prompt/template',
      'knowledge · memory · guardrails',
      'Scope · testing basis',
      'Sampling · reliance',
      'Exceptions · conclusions',
      'Sign-off · communication',
      'scope, testing basis, reliance, conclusions and communication remain human-owned',
    ]) {
      assert.ok(xml.includes(label), `${source} must include ${label}`);
    }
    assert.doesNotMatch(xml, /Workspace · task context|workflow · template|reliance changes only through human decision/);
  }

  for (const source of lifecycleSources) {
    const xml = read(source);
    for (const label of [
      'AVAILABLE EWP / AWP → REVIEWED DRAFT AUDIT WORK',
      'the available EWP / AWP',
      'Approved controlled corrections are applied separately and verified before finalization',
      'outputs remain Draft',
    ]) {
      assert.ok(xml.includes(label), `${source} must include ${label}`);
    }
    assert.doesNotMatch(xml, /verified before merge|REVIEWED AUDIT WORK/);
  }

  for (const source of guardrailSources) {
    const xml = read(source);
    for (const label of [
      'Evidence candidate',
      'Reliance pending',
      'Quality review + correction',
      'Approved corrections are applied separately and verified',
      'Approves testing basis and exceptions',
      'owns conclusions, sign-off and communication',
      'The auditor owns testing basis, reliance, exceptions, conclusions, sign-off and communication',
    ]) {
      assert.ok(xml.includes(label), `${source} must include ${label}`);
    }
    assert.doesNotMatch(xml, /Reviewed evidence/);
  }

  for (const source of componentSources) {
    const xml = read(source);
    for (const label of [
      'GOVERNED OPERATING CORE',
      'Available EWP / AWP',
      'criteria · permitted evidence',
      '02 · AGENT',
      'Selected audit agent',
      'Role · perspective ·',
      'handoff boundary',
      '03 · SKILL',
      'Task skill',
      'Procedure · checks · stop ·',
      'SUPPORTING LAYER',
      'Prompts · operating guides · knowledge · memory',
      'GUARDRAILS + SOURCE CONTROLS',
      'Auditor-owned decisions',
      'Scope · applicable testing basis · reliance',
      'conclusions · sign-off · communication',
      'Draft work',
    ]) {
      assert.ok(xml.includes(label), `${source} must include ${label}`);
    }
    assert.doesNotMatch(xml, /02 · BOUNDARY|Task context|03 · ROUTE|id="workflow-title" value="Workflow"|OPERATING GUIDES|id="draft-work-title" value="Audit work"/);
  }

  const html = read('index.html');
  assert.ok(html.includes('An available EWP or AWP enters a bounded core made up of the workspace, selected audit agent, task skill, prompt and template, knowledge, memory and guardrails.'));
  assert.ok(html.includes('The reviewed output remains Draft until the auditor completes the required decisions and approvals.'));
  assert.ok(html.includes('Received material remains an evidence candidate until the auditor decides reliance.'));
  assert.ok(html.includes('The governed operating core groups the selected audit agent, task skill, workpaper template and supporting layer inside the human-owned boundary.'));
});

test('each active diagram independently binds its figure alt, dialog alt and caption', () => {
  const html = read('index.html');
  const figures = [...html.matchAll(/<figure class="product-figure">[\s\S]*?<\/figure>/g)].map((match) => match[0]);

  for (const contract of visualContracts) {
    const matchingFigures = figures.filter((figure) => figure.includes(`data-dialog="${contract.dialogId}"`));
    assert.equal(matchingFigures.length, 1, `${contract.id} must have exactly one active figure`);

    const figure = matchingFigures[0];
    const anchor = figure.match(/<a\b[^>]*class="product-image-link"[^>]*>/)?.[0];
    const figureImages = figure.match(/<img\b[^>]*>/g) ?? [];
    const caption = figure.match(/<figcaption>([\s\S]*?)<\/figcaption>/)?.[1];
    assert.ok(anchor, `${contract.id} figure must have an enlargement link`);
    assert.equal(figureImages.length, 1, `${contract.id} figure must have exactly one image`);
    assert.ok(caption, `${contract.id} figure must have a caption`);
    assert.equal(attribute(anchor, 'href'), contract.light, `${contract.id} enlargement must open the light render by default`);
    assert.equal(attribute(anchor, 'data-dialog'), contract.dialogId, `${contract.id} enlargement must target its own dialog`);
    assert.equal(attribute(figureImages[0], 'src'), contract.light, `${contract.id} figure src`);
    assert.equal(attribute(figureImages[0], 'data-theme-light'), contract.light, `${contract.id} figure light render`);
    assert.equal(attribute(figureImages[0], 'data-theme-dark'), contract.dark, `${contract.id} figure dark render`);
    assert.equal(attribute(figureImages[0], 'alt'), contract.alt, `${contract.id} figure alt`);
    assert.equal(normalizeSpace(caption), contract.caption, `${contract.id} figcaption`);

    const dialogPattern = new RegExp(`<dialog\\b[^>]*\\bid="${contract.dialogId}"[\\s\\S]*?<\\/dialog>`, 'g');
    const dialogs = [...html.matchAll(dialogPattern)].map((match) => match[0]);
    assert.equal(dialogs.length, 1, `${contract.id} must have exactly one matching dialog`);
    const dialogImages = dialogs[0].match(/<img\b[^>]*>/g) ?? [];
    assert.equal(dialogImages.length, 1, `${contract.id} dialog must have exactly one image`);
    assert.equal(attribute(dialogImages[0], 'src'), contract.light, `${contract.id} dialog src`);
    assert.equal(attribute(dialogImages[0], 'data-theme-light'), contract.light, `${contract.id} dialog light render`);
    assert.equal(attribute(dialogImages[0], 'data-theme-dark'), contract.dark, `${contract.id} dialog dark render`);
    assert.equal(attribute(dialogImages[0], 'alt'), contract.alt, `${contract.id} dialog alt`);
  }
});

test('the visual-chain manifest freezes every reviewed Draw.io source and active PNG render', () => {
  const manifestPath = path.join(here, 'fixtures/aeos-visual-chain-manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  assert.equal(manifest.schema_version, 1);
  assert.equal(manifest.authority, 'AEOS Intro 0.9.0');
  assert.deepEqual(
    manifest.diagrams.map((diagram) => diagram.id),
    visualContracts.map((contract) => contract.id),
    'the manifest must cover every active diagram exactly once and in page order',
  );

  for (const [index, diagram] of manifest.diagrams.entries()) {
    const contract = visualContracts[index];
    for (const variant of ['light', 'dark']) {
      const source = diagram.sources[variant];
      const render = diagram.renders[variant];
      const sourceBytes = fs.readFileSync(path.join(site, source.path));
      const renderBytes = fs.readFileSync(path.join(site, render.path));

      assert.equal(sha256(sourceBytes), source.sha256, `${diagram.id} ${variant} Draw.io source hash`);
      assert.equal(sha256(renderBytes), render.sha256, `${diagram.id} ${variant} PNG render hash`);
      assert.equal(render.path, contract[variant], `${diagram.id} ${variant} manifest-to-page render binding`);
      assert.equal(renderBytes.toString('ascii', 1, 4), 'PNG', `${diagram.id} ${variant} render signature`);
      assert.equal(renderBytes.readUInt32BE(16), 1600, `${diagram.id} ${variant} render width`);
      assert.equal(renderBytes.readUInt32BE(20), 900, `${diagram.id} ${variant} render height`);
    }
  }
});

test('the provider installation route is explicit across setup, requirements and FAQ', () => {
  const html = read('index.html');
  const extension = 'official <code>Ollama.ollama</code> provider extension';
  const runtime = 'Ollama installed and running';
  const model = 'at least one local or cloud model available';
  const signIn = 'Ollama Cloud also requires Ollama sign-in';
  const setup = html.slice(
    html.indexOf('<section class="section-wide setup-section" id="setup"'),
    html.indexOf('<section class="section-wide requirements-section" id="requirements"'),
  );
  const requirements = html.slice(
    html.indexOf('<section class="section-wide requirements-section" id="requirements"'),
    html.indexOf('<section class="section-narrow faq-section"'),
  );
  const setupRoute = setup.match(/<h3>Choose the provider route<\/h3><p>([\s\S]*?)<\/p>/)?.[1];
  const desktop = requirements.match(/<article>\s*<span class="tag">Desktop<\/span>([\s\S]*?)<\/article>/)?.[1];
  const provider = requirements.match(/<article>\s*<span class="tag">Runtime<\/span>([\s\S]*?)<\/article>/)?.[1];
  const faq = html.match(/<dt>What do I actually install\?<\/dt><dd>([\s\S]*?)<\/dd>/)?.[1];

  for (const [name, scope] of [['setup route', setupRoute], ['Desktop requirements', desktop], ['Runtime requirements', provider], ['installation FAQ', faq]]) {
    assert.ok(scope, `${name} must exist`);
    for (const phrase of [extension, runtime, model, signIn]) {
      assert.ok(scope.includes(phrase), `${name} must include: ${phrase}`);
    }
  }
  assert.ok(desktop.includes('Visual Studio Code 1.127 or newer'));
  assert.ok(faq.includes('Visual Studio Code 1.127 or newer'));
  assert.ok(setupRoute.includes('Copilot-hosted models use an approved service boundary'));
  assert.ok(desktop.includes('For local Ollama or Ollama Cloud: Ollama installed and running'));
  assert.ok(provider.includes('Local Ollama and Ollama Cloud require Ollama installed and running'));
});

test('the current-versus-future scope visual is present, source-backed and semantically bound', () => {
  const html = read('index.html');
  const sourcePath = path.join(site, 'assets/source/aeos-current-future-scope.drawio');
  const darkSourcePath = path.join(site, 'assets/source/aeos-current-future-scope-dark.drawio');
  const pngPath = path.join(site, 'assets/aeos-current-future-scope.png');
  const darkPngPath = path.join(site, 'assets/aeos-current-future-scope-dark.png');
  const svgPath = path.join(site, 'assets/aeos-current-future-scope.svg');
  const darkSvgPath = path.join(site, 'assets/aeos-current-future-scope-dark.svg');

  assert.ok(fs.existsSync(sourcePath));
  assert.ok(fs.existsSync(darkSourcePath));
  assert.ok(fs.existsSync(pngPath));
  assert.ok(fs.existsSync(darkPngPath));
  assert.ok(fs.existsSync(svgPath));
  assert.ok(fs.existsSync(darkSvgPath));
  assert.match(html, /src="assets\/aeos-current-future-scope\.png"[^>]+data-theme-light="assets\/aeos-current-future-scope\.png"[^>]+data-theme-dark="assets\/aeos-current-future-scope-dark\.png"/);
  assert.match(html, /future release outside the current boundary/);

  const xml = fs.readFileSync(sourcePath, 'utf8');
  const darkXml = fs.readFileSync(darkSourcePath, 'utf8');
  for (const label of ['FUTURE RELEASE', 'EWP creation + test procedures', 'AVAILABLE EWP / AWP', 'FIELDWORK PLANNING', 'FIELDWORK EXECUTION', 'DRAFT WORK + REVIEW', 'AUDITOR AUTHORITY']) {
    assert.ok(xml.includes(label), `scope source must include ${label}`);
    assert.ok(darkXml.includes(label), `dark scope source must include ${label}`);
  }
  for (const [source, target] of [['future', 'input'], ['input', 'planning'], ['planning', 'execution'], ['execution', 'draft-review']]) {
    assert.match(xml, new RegExp(`edge="1" source="${source}" target="${target}"`));
    assert.match(darkXml, new RegExp(`edge="1" source="${source}" target="${target}"`));
  }

  for (const renderPath of [pngPath, darkPngPath]) {
    const png = fs.readFileSync(renderPath);
    assert.equal(png.toString('ascii', 1, 4), 'PNG');
    assert.equal(png.readUInt32BE(16), 1600);
    assert.equal(png.readUInt32BE(20), 900);
  }
});

test('all active image references resolve inside the site', () => {
  const html = read('index.html');
  const refs = [...html.matchAll(/(?:src|data-theme-light|data-theme-dark)="(assets\/[^"]+)"/g)].map((match) => match[1]);

  assert.ok(refs.length > 0);
  for (const ref of new Set(refs)) {
    assert.ok(fs.existsSync(path.join(site, ref)), `active asset must exist: ${ref}`);
  }
});
