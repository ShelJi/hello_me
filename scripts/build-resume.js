const { spawnSync } = require('node:child_process');
const { cpSync, existsSync, mkdirSync, readdirSync, rmSync } = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const source = path.join(root, 'vendor', 'oh-my-cv');
const output = path.join(source, 'site', '.output', 'public');
const destination = path.join(root, 'build-resume');

for (const script of ['build-fast:pkg', 'build']) {
  const result = spawnSync(process.platform === 'win32' ? 'corepack.cmd' : 'corepack', ['pnpm', script], {
    cwd: source,
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
}

if (!existsSync(path.join(output, 'index.html'))) throw new Error('Resume build did not produce index.html');
mkdirSync(destination, { recursive: true });
// Remove only the app's generated output, after a successful build.
for (const entry of readdirSync(destination)) {
  rmSync(path.join(destination, entry), { recursive: true, force: true });
}
cpSync(output, destination, { recursive: true });
cpSync(path.join(source, 'LICENSE'), path.join(destination, 'LICENSE.txt'));
console.log('Resume builder generated at build-resume/');
