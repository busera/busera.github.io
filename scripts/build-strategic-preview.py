"""Derived offline review copy, not a native Jekyll compiler. No network calls.
Uses the installed Ruby YAML reader and Pandoc; does not install dependencies.
Run from any cwd: python3 scripts/build-strategic-preview.py
"""
from pathlib import Path
import base64, hashlib, html, json, re, subprocess

ROOT=Path(__file__).resolve().parents[1]
def read(p): return (ROOT/p).read_text()
def yaml(p):
    return json.loads(subprocess.check_output(['ruby','-r','yaml','-r','json','-e','puts JSON.generate(YAML.load_file(ARGV[0]))',str(ROOT/p)]))
def esc(s): return html.escape(str(s),quote=True)
def md(s):
    if not s: return ''
    return subprocess.check_output(['pandoc','--from=gfm','--to=html'],input=s,text=True).strip()
def image(path):
    p=ROOT/path.lstrip('/');mime='image/x-icon' if p.suffix=='.ico' else 'image/jpeg'
    return 'data:'+mime+';base64,'+base64.b64encode(p.read_bytes()).decode()
def slug(s): return re.sub(r'[^a-z0-9]+','-',s.lower()).strip('-')

cfg=yaml('_config.yml');page=yaml('profile-proposal.html');template=read('_layouts/profile-white.html')
values={'site.name | escape':esc(cfg['name']),'page.positioning | escape':esc(page['positioning']),
        'site.linkedin_username | escape':esc(cfg['linkedin_username']),
        'site.github_username | escape':esc(cfg['github_username']),
        'site.youtube_username | escape':esc(cfg['youtube_username']),
        'site.about_profile_image | relative_url':image(cfg['about_profile_image']),
        "'/images/favicon.ico' | relative_url":image('images/favicon.ico')}
def expand(s,extra=None):
    mapping=values| (extra or {})
    return re.sub(r'{{\s*(.*?)\s*}}',lambda m:mapping[m.group(1)],s)

prefix=template[:template.index('    <section class="hero"')]
prefix=re.sub(r'{% if page.draft_preview %}(.*?){% endif %}',r'\1',prefix)
prefix=prefix.replace('<link rel="stylesheet" href="{{ \'/assets/profile-white.css\' | relative_url }}">','<style>'+read('assets/profile-white.css')+'</style>')
parts=[expand(prefix)]
paragraphs=md(cfg['about_content']).split('</p>')
hero=template[template.index('    <section class="hero"'):template.index('    <details class="about-disclosure"')]
hero=re.sub(r'{% assign biography = .*?%}','',hero)
hero=hero.replace('{{ biography.first }}</p>',paragraphs[0]+'</p>')
parts.append(expand(hero))
parts.append('<details class="about-disclosure"><summary>More about my background <span aria-hidden="true">+</span></summary><div class="about-body"><p class="source-positioning">'+esc(cfg['title'])+'</p>'+''.join(p+'</p>' for p in paragraphs[1:] if p.strip())+'</div></details>')
labels={}
for line in template.splitlines():
    match=re.fullmatch(r"\s*{% when '([^']+)' %}(.*)",line)
    if match: labels[match[1]]=match[2]
collapsed={'Key Certifications','Earlier Publications (LinkedIn Pulse)','Data Science and Machine Learning Projects','Audit Analytics Utilities / Experiments'}
def item_html(item):
    heading='<h3>'+esc(item['title'])+'</h3>'
    for field,cls in [('sub_title','item-subtitle'),('caption','item-date')]:
        if item.get(field): heading+='<p class="'+cls+'">'+esc(item[field])+'</p>'
    if item.get('link'):
        url=item['link'];url=url if url.startswith(('https://','http://','//')) else 'https://'+url
        if item.get('thumbnail'):
            heading+='<a class="video-thumbnail" href="'+esc(url)+'" aria-label="Watch '+esc(item['title'])+'"><img src="'+image(item['thumbnail'])+'" alt="'+esc(item['thumbnail_alt'])+'" width="'+str(item['thumbnail_width'])+'" height="'+str(item['thumbnail_height'])+'" loading="lazy" decoding="async"></a>'
        heading+='<a class="item-link" href="'+esc(url)+'">'+esc(item.get('link_text','View source'))+' <span aria-hidden="true">↗</span></a>'
    body=('<div class="item-standfirst">'+md(item['quote'])+'</div>') if item.get('quote') else ''
    body+=md(item.get('description',''))
    for link in item.get('additional_links',[]): body+='<p><a href="'+esc(link['url'])+'">'+esc(link['title'])+'</a></p>'
    return '<article class="portfolio-item" data-source-title="'+esc(item['title'])+'"><div class="item-heading">'+heading+'</div><div class="item-body">'+body+'</div></article>'
for title in page['section_order']:
    if title==page['archive_sections'][0]: parts.append('<details class="collection-disclosure" id="technical-background"><summary>Technical background and earlier projects <span aria-hidden="true">+</span></summary><div>')
    section=next(s for s in cfg['content'] if s['title']==title);sid=slug(title)
    heading=expand(labels.get(title,'<h2 id="heading-{{ section_id }}">'+esc(title)+'</h2>'),{'section_id':sid})
    extra='<p>Selected practitioner projects, presented separately from corporate responsibilities.</p>' if title=='AI and Audit' else ''
    if section.get('link'): extra+='<a class="item-link" href="'+esc(section['link'])+'">'+esc(section['link_text'])+' <span aria-hidden="true">↗</span></a>'
    parts.append('<section class="portfolio-section" id="'+sid+'" aria-labelledby="heading-'+sid+'"><div class="section-heading"><div>'+heading+'</div>'+extra+'</div>')
    for idx,item in enumerate(section['content']):
        if title=='Publications' and idx==3: parts.append('<details class="collection-disclosure"><summary>More writing <span aria-hidden="true">+</span></summary><div>')
        block=item_html(item)
        if title in collapsed:
            block='<details class="entry-disclosure"><summary><span><strong>'+esc(item['title'])+'</strong>'+('<small>'+esc(item['sub_title'])+'</small>' if item.get('sub_title') else '')+'</span><span class="summary-meta">'+esc(item.get('caption',''))+' <i aria-hidden="true">+</i></span></summary><div>'+block+'</div></details>'
        parts.append(block)
    if title=='Publications' and len(section['content'])>3: parts.append('</div></details>')
    parts.append('</section>')
    if title==page['archive_sections'][-1]: parts.append('</div></details>')
footer=template[template.index('    <section class="connect"'):]
footer=re.sub(r'{% for link in site.additional_links %}.*?{% endfor %}',''.join('<a href="'+esc(link['url'])+'">'+esc(link['title'])+' ↗</a>' for link in cfg['additional_links']),footer)
parts.append(expand(footer))
result='\n'.join(parts)
assert '{{' not in result and '{%' not in result and '<script' not in result.lower()
out=ROOT/'previews/profile-strategic.html';out.write_text(result)
paths=['_config.yml','index.md','profile-proposal.html','_layouts/profile-white.html','_includes/profile-white-item.html','assets/profile-white.css','scripts/build-strategic-preview.py']
evidence={'kind':'derived offline preview, not native Jekyll compilation','source_sha256':{p:hashlib.sha256((ROOT/p).read_bytes()).hexdigest() for p in paths},'sections':len(page['section_order']),'records':sum(len(s['content']) for s in cfg['content']),'preview_sha256':hashlib.sha256(out.read_bytes()).hexdigest(),'publication':'not pushed or published; owner review required'}
(ROOT/'previews/profile-strategic-evidence.json').write_text(json.dumps(evidence,indent=2)+'\n')
print(json.dumps(evidence,indent=2))
