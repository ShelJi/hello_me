<template>
  <form class="fields" @submit.prevent="apply">
    <h2>Fill your resume</h2>
    <p>Use standard headings and relevant, truthful keywords from the job description.
      Applying creates a plain, single-column resume using Arial. No ATS score is guaranteed.</p>
    <p>Your current resume stays unchanged until you apply. Custom layout and styling will be replaced.
      Export Markdown first if you want a backup. Apply before switching tabs to keep field edits.</p>
    <label>Full name<input v-model="name" autocomplete="name" required /></label>
    <label>Contact details<textarea v-model="contact" rows="3"
      placeholder="Email, phone, city, LinkedIn and portfolio (plain text, one per line)" /></label>
    <section v-for="(section, index) in sections" :key="index">
      <label>Section heading<input v-model="section.title" required /></label>
      <label>Details<textarea v-model="section.body" rows="6"
        placeholder="Role, employer and dates. Put each achievement on a new line starting with - ." /></label>
      <button type="button" @click="sections.splice(index, 1)">Remove section</button>
    </section>
    <button type="button" @click="sections.push({ title: 'Additional Information', body: '' })">Add section</button>
    <button type="submit">Apply ATS-friendly format</button>
    <p role="status">{{ status }}</p>
    <p>After applying, use Save to keep the resume. You can switch to Markdown for further edits.
      Export PDF as text, then check that selecting and copying its text preserves the reading order.</p>
  </form>
</template>

<script setup lang="ts">
import { FrontMatterParser } from '@ohmycv/front-matter';

const { data, setAndSyncToMonaco } = useDataStore();
const { setStyle } = useStyleStore();
const status = ref('');
const plain = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent?.trim() || '';
};
// Read the latest Markdown whenever this mode opens. No changes on mode switch.
let body = data.markdown;
let initialName = '';
let initialContact = '';
try {
  const parsed = new FrontMatterParser<{
    name?: string; header?: { text: string }[];
  }>().parse(body);
  body = parsed.body;
  initialName = plain(parsed.frontMatter.name || '');
  initialContact = (parsed.frontMatter.header || []).map(item => plain(item.text)).join('\n');
} catch {
  status.value = 'Could not read the existing header. Enter your details below; review before applying.';
}
const nameLine = body.match(/^# ([^\n]+)\n?/);
if (nameLine) {
  initialName ||= nameLine[1];
  body = body.slice(nameLine[0].length);
}
const name = ref(initialName);
const contact = ref(initialContact);
const sections = ref<{ title: string; body: string }[]>([]);
for (const part of body.split(/^## /m)) {
  if (!part.trim()) continue;
  const newline = part.indexOf('\n');
  if (sections.value.length === 0 && !body.startsWith('## ') && part === body.split(/^## /m)[0]) {
    sections.value.push({ title: 'Summary', body: part.trim() });
  } else {
    sections.value.push({ title: newline < 0 ? part.trim() : part.slice(0, newline).trim(),
      body: newline < 0 ? '' : part.slice(newline + 1).trim() });
  }
}
if (!sections.value.length) {
  sections.value = ['Summary', 'Experience', 'Education', 'Skills', 'Projects'].map(title => ({ title, body: '' }));
}
// Escape HTML and Markdown punctuation in plain fields; details support Markdown bullets.
const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/([\\`*_{}\[\]()#+!|])/g, '\\$1');
const apply = async () => {
  const htmlText = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const header = contact.value.trim().split('\n').filter(Boolean).map(line =>
    `  - text: ${JSON.stringify(htmlText(line))}\n    newLine: true`).join('\n');
  const markdown = [`---\nname: ${JSON.stringify(htmlText(name.value.trim()))}\nheader:${header ? '\n' + header : ' []'}\n---`,
    ...sections.value.filter(section => section.body.trim()).map(section =>
      `## ${escape(section.title.trim())}\n\n${section.body.trim()}`)].filter(Boolean).join('\n\n');
  setAndSyncToMonaco('markdown', markdown);
  const selector = '#resume-preview';
  setAndSyncToMonaco('css', `
${selector} { font-family: Arial, Helvetica, sans-serif; color: #111; }
${selector} [data-part="page"] { background: white; color: #111; text-align: left; hyphens: none; }
${selector} h1 { font-size: 24px; margin: 0 0 8px; }
${selector} h2 { font-size: 17px; margin: 16px 0 6px; border-bottom: 1px solid #333; }
${selector} h3 { font-size: 15px; margin: 10px 0 4px; }
${selector} p { margin: 0 0 6px; }
${selector} ul, ${selector} ol { padding-left: 20px; margin: 4px 0; }
${selector} dl { display: block; }
${selector} .resume-header, ${selector} .resume-header h1 { text-align: left; }
${selector} .resume-header h1 { line-height: 1.2; }
${selector} .resume-header-item::after { content: none; }
${selector} a { color: #111; text-decoration: underline; }
`);
  await setStyle('fontEN', { name: 'Arial' });
  await setStyle('fontSize', 15);
  await setStyle('themeColor', '#111111');
  await setStyle('lineHeight', 1.35);
  status.value = 'Applied. Review the preview, then click Save.';
};
</script>

<style scoped>
.fields { overflow: auto; padding: 16px; display: flex; flex-direction: column; gap: 16px; }
h2 { font-weight: 700; }
p { font-size: 13px; line-height: 1.5; }
label { display: flex; flex-direction: column; gap: 6px; font-size: 14px; }
input, textarea { border: 1px solid #888; border-radius: 5px; padding: 8px; background: transparent; width: 100%; }
section { display: flex; flex-direction: column; gap: 10px; border-top: 1px solid #888; padding-top: 14px; }
button { border: 1px solid #888; border-radius: 5px; padding: 8px; }
button[type="submit"] { background: #2563eb; color: white; }
</style>
