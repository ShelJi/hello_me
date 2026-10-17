// Exercise the form's output with the same front-matter parser used by the app.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('../vendor/oh-my-cv/node_modules/typescript');
const { FrontMatterParser } = require('../vendor/oh-my-cv/packages/front-matter/dist/index.js');
const source = fs.readFileSync('vendor/oh-my-cv/site/src/components/editor/Fields.vue', 'utf8');
const script = source.match(/<script setup lang="ts">([\s\S]*?)<\/script>/)[1];
const outputLogic = script.slice(script.indexOf('const escape ='));
async function check(contact) {
  const changes = {};
  const styles = {};
  const context = {
    name: { value: 'Jane "JJ" Doe <Engineer>' },
    contact: { value: contact },
    sections: { value: [
      { title: 'Experience', body: '### Engineer | Example | 2024–Present\n\n- Reduced latency by 30%.' },
      { title: 'Skills', body: 'Python, C++, SQL' },
      { title: 'Empty section', body: '' }
    ] },
    status: { value: '' },
    setAndSyncToMonaco: (key, value) => { changes[key] = value; },
    setStyle: async (key, value) => { styles[key] = value; }
  };
  vm.createContext(context);
  const js = ts.transpileModule(outputLogic + '\nglobalThis.run = apply;', {
    compilerOptions: { target: ts.ScriptTarget.ES2022 }
  }).outputText;
  vm.runInContext(js, context);
  await context.run();
  const parsed = new FrontMatterParser().parse(changes.markdown);
  assert.equal(parsed.frontMatter.name, 'Jane "JJ" Doe &lt;Engineer&gt;');
  assert.equal(parsed.frontMatter.header.length, contact ? 2 : 0);
  assert.ok(parsed.body.includes('## Experience'));
  assert.ok(parsed.body.includes('- Reduced latency by 30%.'));
  assert.ok(!parsed.body.includes('Empty section'));
  assert.equal(styles.fontEN.name, 'Arial');
  assert.ok(changes.css.includes('text-align: left'));
  assert.ok(context.status.value.includes('click Save'));
}
(async () => {
  await check('jane@example.com\n+1 555 0100');
  await check('');
  console.log('Resume form output: header escaping, contact details, sections and ATS style checks passed.');
})().catch(error => { console.error(error); process.exitCode = 1; });
