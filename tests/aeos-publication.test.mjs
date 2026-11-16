import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read=p=>readFileSync(resolve(root,p),'utf8');
const published=read('aeos/index.html');
const white=read('aeos/studio/white.html');
const text=s=>s.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();

test('Published main is the accepted white edition with only relative paths relocated',()=>{
  assert.equal(text(published),text(white));
  assert.match(published,/data-theme="studio-white"/);
  assert.match(published,/href="styles.css"/);
  assert.match(published,/href="studio\/studio.css"/);
  assert.match(published,/href="studio\/white.css"/);
  assert.match(published,/src="demo-gallery.js"/);
  assert.match(published,/href="original.html#main"/);
  assert.doesNotMatch(published,/theme-toggle.js|localStorage/);
});

test('Published and all retained versions have valid local resources and fragments',()=>{
  for(const relative of ['aeos/index.html','aeos/original.html','aeos/studio/initial.html','aeos/studio/index.html','aeos/studio/white.html']) {
    const html=read(relative);
    const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
    assert.equal(new Set(ids).size,ids.length,relative);
    for(const [,ref] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
      if(/^https?:/.test(ref)) continue;
      const [file,fragment]=ref.split('#');
      if(!file) assert.ok(ids.includes(fragment),relative+' '+ref);
      else {
        const target=file.startsWith('/')?resolve(root,file.slice(1)):resolve(root,dirname(relative),file);
        assert.ok(existsSync(target),relative+' '+ref);
        if(fragment && file.endsWith('.html')) assert.ok(readFileSync(target,'utf8').includes(`id="${fragment}"`),relative+' '+ref);
      }
    }
  }
});

test('Main and companion have matching image sources and figure captions',()=>{
  const imgs=s=>[...s.matchAll(/<img[^>]+src="([^"]+)"/g)].map(m=>m[1].replace(/^\.\.\//,''));
  assert.deepEqual(imgs(published),imgs(white));
  assert.equal(imgs(published).length,10);
  assert.equal([...published.matchAll(/data-dialog="/g)].length,5);
});
