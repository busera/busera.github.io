import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFileSync(resolve(root,p),'utf8');
const yaml=p=>JSON.parse(execFileSync('ruby',['-r','yaml','-r','json','-e','puts JSON.generate(YAML.load_file(ARGV[0]))',resolve(root,p)],{encoding:'utf8'}));
const cfg=yaml('_config.yml');
const frozenCfg=yaml('_backups/profile-2026-11-16-before-white/source/_config.yml');
const page=yaml('profile-proposal.html');
const layout=read('_layouts/profile-white.html');
const include=read('_includes/profile-white-item.html');
const preview=read('previews/profile-white.html');
const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');

test('Previous homepage backup has intact hashes and unchanged legacy assets',()=>{
  const folder='_backups/profile-2026-11-16-before-white/';
  const manifest=JSON.parse(read(folder+'manifest.json'));
  assert.equal(Object.keys(manifest.files).length,9);
  for(const [file,info] of Object.entries(manifest.files)) {
    const bytes=readFileSync(resolve(root,folder,file));
    assert.equal(bytes.length,info.bytes,file);
    assert.equal(createHash('sha256').update(bytes).digest('hex'),info.sha256,file);
  }
  for(const file of ['assets/main.scss','images/profile_andre_buser.jpeg','images/favicon.ico']) {
    assert.deepEqual(readFileSync(resolve(root,folder+'source/'+file)),readFileSync(resolve(root,file)),file);
  }
  assert.doesNotMatch(read(folder+'snapshot.html'),/<script|@import/i);
});

test('Current config retains frozen content with only approved project edits and the Videos section',()=>{
  const expected=structuredClone(frozenCfg);
  expected.content.flatMap(s=>s.content).find(i=>i.title==='AEOS').caption='September 2026';
  const airum=expected.content.flatMap(s=>s.content).find(i=>i.title==='AIRUM Public Demo');
  assert.ok(airum);
  airum.title='AIRUM';
  airum.sub_title='AI Risk Universe Matrix';
  airum.quote='An interactive AI risk universe that helps audit teams explore and select relevant AI risks for audit planning.\n';
  expected.content.splice(1,0,{
    title:'Videos',layout:'list',
    link:'https://www.youtube.com/channel/UCeylEhSPTmVaLhWg3xsfbXg',
    link_text:'View YouTube channel',
    content:[{layout:'left',border:'weak',title:'API-CLI-MCP',
      link:'https://youtu.be/yngNlZ7N0Jc',link_text:'Watch on YouTube',
      quote:'A short introduction to the differences between APIs, CLIs and MCP.\n'}]
  });
  assert.deepEqual(cfg,expected);
  assert.match(include,/item\.sub_title \| escape/);
});

test('Proposal is a separate Jekyll front-matter page with all source sections',()=>{
  assert.equal(page.layout,'profile-white');
  assert.equal(page.permalink,'/profile-proposal/');
  assert.equal(page.draft_preview,true);
  assert.deepEqual([...page.section_order].sort(),cfg.content.map(s=>s.title).sort());
  assert.equal(new Set(page.section_order).size,9);
  assert.match(layout,/site\.content \| where:/);
  assert.match(layout,/site\.about_content \| markdownify/);
  assert.match(layout,/include profile-white-item\.html item=item/);
  assert.match(layout,/noindex,nofollow/);
  assert.match(layout,/<p class="eyebrow">Portfolio<\/p>/);
  assert.doesNotMatch(layout,/<p class="eyebrow">Professional portfolio<\/p>/);
  const home=yaml('index.md');
  assert.equal(home.layout,'profile-white');
  assert.equal(home.permalink,'/');
  assert.equal(home.draft_preview,false);
  assert.deepEqual(home.section_order,page.section_order);
  assert.equal(home.positioning,page.positioning);
  assert.equal(yaml('_backups/profile-2026-11-16-before-white/source/index.md').layout,'default');
});

test('Videos reuse list markup, have navigation/channel links, and introduce no player embeds',()=>{
  assert.deepEqual(page.section_order.slice(0,3),['AI and Audit','Videos','Publications']);
  assert.match(layout,/<a href="#videos">Videos<\/a>/);
  assert.match(layout,/section\.link \| escape/);
  assert.match(layout,/section\.link_text \| escape/);
  assert.doesNotMatch(layout+include,/<iframe|youtube\.com\/embed|youtube-nocookie|<video/i);
});

test('Native Liquid block nesting and local includes/assets resolve (not a Jekyll compilation)',()=>{
  for(const source of [layout,include]) {
    const stack=[];
    for(const [,raw] of source.matchAll(/{%\s*([\s\S]*?)\s*%}/g)) {
      const tag=raw.trim().split(/\s+/)[0];
      if(['for','if','unless','case','capture'].includes(tag)) stack.push(tag);
      else if(tag.startsWith('end')) assert.equal(stack.pop(),tag.slice(3));
    }
    assert.deepEqual(stack,[]);
  }
  for(const path of ['_includes/profile-white-item.html','assets/profile-white.css',cfg.about_profile_image]) assert.ok(existsSync(resolve(root,path)),path);
  assert.doesNotMatch(layout,/<script|cdn\.|fonts\.google/);
});

test('Historical preview includes every frozen record once, with the same embedded stylesheet',()=>{
  const records=frozenCfg.content.flatMap(s=>s.content);
  assert.equal(records.length,28);
  assert.equal([...preview.matchAll(/data-source-title=/g)].length,records.length);
  for(const item of records) {
    assert.equal(preview.split('data-source-title="'+esc(item.title)+'"').length-1,1,item.title);
    if(item.link) {
      let url=item.link;
      if(!/^(?:https?:)?\/\//.test(url))url='https://'+url;
      assert.ok(preview.includes('href="'+esc(url)+'"'),url);
    }
  }
  assert.equal(preview.match(/<style>([\s\S]*?)<\/style>/)[1],read('assets/profile-white.css'));
  assert.equal([...preview.matchAll(/<h1\b/g)].length,1);
  assert.doesNotMatch(preview,/<script|<link[^>]+stylesheet/);
  const ids=[...preview.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length);
  for(const [,id] of preview.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(id),id);
});
