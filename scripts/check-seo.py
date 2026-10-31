"""Check homepage SEO invariants without third-party dependencies."""
import json
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
        self.stack = []
        self.text = []
        self.links = []
        self.current_link = None
        self.schema = []
        self.json_text = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if tag in ('script', 'style'):
            self.stack.append(tag)
        if tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.json_text = ''
        if tag == 'a':
            assert self.current_link is None, 'Nested anchor'
            self.current_link = [attrs, '']

    def handle_endtag(self, tag):
        if tag == 'script' and self.json_text is not None:
            self.schema.append(json.loads(self.json_text))
            self.json_text = None
        if tag in ('script', 'style') and self.stack:
            self.stack.pop()
        if tag == 'a' and self.current_link is not None:
            self.links.append(self.current_link)
            self.current_link = None

    def handle_data(self, data):
        if self.json_text is not None:
            self.json_text += data
        if not self.stack:
            self.text.append(data)
            if self.current_link is not None:
                self.current_link[1] += data


page = Page()
source = (ROOT / 'index.html').read_text(encoding='utf-8')
page.feed(source)
assert sum(tag == 'h1' for tag, _ in page.tags) == 1
descriptions = [a['content'] for t, a in page.tags if t == 'meta' and a.get('name') == 'description']
assert len(descriptions) == 1 and 50 <= len(descriptions[0]) <= 160
ids = [a['id'] for _, a in page.tags if 'id' in a]
assert len(ids) == len(set(ids)), 'Duplicate IDs'
for attrs, text in page.links:
    assert text.strip(), f'Link has no visible label: {attrs}'
    target = urlsplit(attrs.get('href', ''))
    if not target.scheme and not target.netloc:
        if target.path:
            assert (ROOT / unquote(target.path.lstrip('/'))).is_file(), target.path
        elif target.fragment:
            assert target.fragment in ids, target.fragment
images = [a for t, a in page.tags if t == 'img']
for image in images:
    assert image.get('alt', '').strip(), image
    assert image.get('loading') in ('eager', 'lazy'), image
    assert int(image['width']) > 0 and int(image['height']) > 0
scripts = [a for t, a in page.tags if t == 'script' and a.get('type') != 'application/ld+json']
for script in scripts:
    assert script.get('src') and 'defer' in script, script
    if not urlsplit(script['src']).scheme:
        assert (ROOT / script['src']).is_file(), script
graph = page.schema[0]['@graph']
webpage = next(node for node in graph if 'ProfilePage' in node.get('@type', []))
assert webpage['dateModified'] == '2026-10-31'
for selector in webpage['speakable']['cssSelector']:
    assert selector.startswith('#') and selector[1:] in ids
for question in webpage['mainEntity']:
    if question.get('@type') == 'Question':
        assert question['name'] in source
        assert question['acceptedAnswer']['text'] in source
assert descriptions[0] == webpage['description']
words = len(re.findall(r"\b[\w'-]+\b", ' '.join(page.text)))
assert words >= 300, words
assert not any(t == 'table' for t, _ in page.tags), 'Review data table headers'
ET.parse(ROOT / 'sitemap.xml')
print(f'PASS: {words} visible words; {len(descriptions[0])}-character description; '
      f'{len(images)} labeled images; {len(page.links)} labeled links; '
      f'{len(scripts)} deferred scripts; schema and local destinations valid.')
