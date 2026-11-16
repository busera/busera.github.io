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

test('Strategic revision preserves prior records, links, credentials and non-editorial configuration',()=>{
  const before=yaml('_backups/profile-2026-11-16-before-strategic/source/_config.yml');
  const editable={AEOS:['description'],AIRUM:['description'],
    'Major Global Pharmaceutical Company':['sub_title','caption','quote','description'],
    'University of Michigan':['quote','description'],
    'Building an AI prototype for audit planning, without handing judgment to the machine':['description'],
    'The Importance of AI Use Cases in System Classification and Risk Assessment':['description'],
    'Applying Data Analysis in Internal Audit':['description']};
  for(const [key,value] of Object.entries(before)) if(!['title','about_content','content'].includes(key)) assert.deepEqual(cfg[key],value,key);
  assert.deepEqual(cfg.content.map(s=>s.title),before.content.map(s=>s.title));
  const old=before.content.flatMap(s=>s.content),now=cfg.content.flatMap(s=>s.content);
  assert.equal(old.length,29);assert.equal(now.length,30);
  for(const item of old){
    const found=now.find(i=>i.title===item.title);assert.ok(found,item.title);
    const a={...item},b={...found};
    for(const key of editable[item.title]||[]){delete a[key];delete b[key];}
    assert.deepEqual(b,a,item.title);
  }
  const added=now.filter(i=>!old.some(p=>p.title===i.title));
  assert.equal(added.length,1);
  assert.equal(added[0].link,'https://medium.com/@buser.andre/aeos-the-ai-augmented-engagement-operating-system-a5dc7ca8b5ad');
  assert.equal(added[0].caption,'September 2026');
  for(const field of [cfg.about_content,now.find(i=>i.title==='Major Global Pharmaceutical Company').description,now.find(i=>i.title==='University of Michigan').description]) assert.doesNotMatch(field,/20\+ years|16\+ Years|3\.97|days to hours|ranked among|YAML-driven|GPT-4|Llama2/);
  assert.doesNotMatch(now.find(i=>i.title==='AEOS').description,/public site/i);
});

test('Before-strategic snapshot has intact source, served and offline-copy hashes',()=>{
  const folder='_backups/profile-2026-11-16-before-strategic/';
  const manifest=JSON.parse(read(folder+'manifest.json'));
  assert.equal(manifest.baseline_commit,'966cbd2634b3c870196a35679c2fd00d1956eccf');
  assert.equal(Object.keys(manifest.files).length,19);
  for(const [file,info] of Object.entries(manifest.files)){
    const bytes=readFileSync(resolve(root,folder,file));
    assert.equal(bytes.length,info.bytes,file);
    assert.equal(createHash('sha256').update(bytes).digest('hex'),info.sha256,file);
  }
  assert.equal([...read(folder+'snapshot.html').matchAll(/data-source-title=/g)].length,29);
  assert.doesNotMatch(read(folder+'snapshot.html'),/<script|src="\/images\//i);
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
  assert.deepEqual(page.section_order.slice(0,4),['Experience','Publications','AI and Audit','Videos']);
  assert.deepEqual(page.archive_sections,page.section_order.slice(-3));
  assert.match(layout,/id="technical-background"/);
  assert.match(layout,/section_title == page\.archive_sections\.first/);
  assert.match(layout,/Selected projects/);
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

test('Video thumbnail is a local image with intrinsic sizing, alt text and a linked lazy-loading template',()=>{
  const video=cfg.content.find(s=>s.title==='Videos').content[0];
  const bytes=readFileSync(resolve(root,video.thumbnail.slice(1)));
  assert.equal(createHash('sha256').update(bytes).digest('hex'),'8dcc25f18c6dd7829fd9f3d6107a96e40b2eb96ff2713afd8fa8f8d4583606b8');
  assert.match(include,/class="video-thumbnail" href="{{ item_href \| escape }}"/);
  assert.match(include,/item\.thumbnail_alt \| escape/);
  assert.match(include,/loading="lazy" decoding="async"/);
  assert.match(include,/item\.thumbnail_width/);
  assert.match(include,/item\.thumbnail_height/);
  assert.match(read('assets/profile-white.css'),/\.video-thumbnail img\s*{/);
});

test('Historical preview retains frozen records/styles except the scoped live-only thumbnail rules',()=>{
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
  const cssWithoutNewThumbnailRules=read('assets/profile-white.css').replace(/\/\* Video thumbnail: start \*\/[\s\S]*?\/\* Video thumbnail: end \*\/\n/,'');
  assert.equal(preview.match(/<style>([\s\S]*?)<\/style>/)[1],cssWithoutNewThumbnailRules);
  assert.equal([...preview.matchAll(/<h1\b/g)].length,1);
  assert.doesNotMatch(preview,/<script|<link[^>]+stylesheet/);
  const ids=[...preview.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length);
  for(const [,id] of preview.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(id),id);
});

test('Strategic offline preview matches source fingerprints, all bodies, titles and destinations',()=>{
  const render=read('previews/profile-strategic.html');
  const evidence=JSON.parse(read('previews/profile-strategic-evidence.json'));
  for(const [path,hash] of Object.entries(evidence.source_sha256)) assert.equal(createHash('sha256').update(readFileSync(resolve(root,path))).digest('hex'),hash,path);
  assert.equal(createHash('sha256').update(render).digest('hex'),evidence.preview_sha256);
  assert.equal(evidence.records,30);assert.equal(evidence.sections,9);
  assert.equal([...render.matchAll(/data-source-title=/g)].length,30);
  const markdown=s=>execFileSync('pandoc',['--from=gfm','--to=html'],{input:s,encoding:'utf8'}).trim();
  for(const item of cfg.content.flatMap(s=>s.content)){
    assert.equal(render.split('data-source-title="'+esc(item.title)+'"').length-1,1,item.title);
    for(const key of ['quote','description']) if(item[key]) assert.ok(render.includes(markdown(item[key])),item.title+' '+key);
    if(item.link){const url=/^(?:https?:)?\/\//.test(item.link)?item.link:'https://'+item.link;assert.ok(render.includes('href="'+esc(url)+'"'),item.title);}
  }
  assert.match(render,/noindex,nofollow/);assert.doesNotMatch(render,/<script|<iframe/);
  assert.equal(render.match(/<style>([\s\S]*?)<\/style>/)[1],read('assets/profile-white.css'));
});
