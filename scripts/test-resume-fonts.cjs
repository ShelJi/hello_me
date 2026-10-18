const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('../vendor/oh-my-cv/node_modules/typescript');
const root = path.resolve(__dirname, '../vendor/oh-my-cv/site/src');
const cache = new Map();
function load(file) {
  const candidates = [file, file.replace(/\.js$/, '.ts'), file + '.ts', path.join(file, 'index.ts')];
  file = candidates.find(candidate => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
  if (!file) throw new Error('Missing source module');
  if (cache.has(file)) return cache.get(file);
  const exports = {};
  cache.set(file, exports);
  const requireSource = id => {
    if (id === '@ohmycv/google-fonts-loader') return class {};
    const target = id.startsWith('~/') ? path.join(root, id.slice(2)) : path.resolve(path.dirname(file), id);
    return load(target);
  };
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
  }).outputText;
  vm.runInNewContext(js, { exports, require: requireSource }, { filename: file });
  return exports;
}
(async () => {
  const { GoogleFontsService } = load(path.join(root, 'utils/font.ts'));
  const service = new GoogleFontsService();
  let remoteLoads = 0;
  service.loader = async () => { remoteLoads++; return null; };
  for (const font of [{name:'Arial'}, {name:'Times New Roman'}, {name:'华康宋体',fontFamily:'HKST'}]) {
    assert.equal(service.includes(font), false);
    await service.resolve(font);
  }
  assert.equal(remoteLoads, 0, 'Local fonts must not call the Google Fonts loader');
  assert.equal(service.includes({name:'A Remote Font'}), true);
  await service.resolve({name:'A Remote Font'});
  assert.equal(remoteLoads, 1);
  console.log('Font registry checks passed: local font objects resolve without throwing or network access.');
})().catch(error => { console.error(error); process.exitCode = 1; });
