import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const vinextCli = resolve('node_modules/vinext/dist/cli.js');
const result = spawnSync(process.execPath, [vinextCli, 'build'], {
  cwd: process.cwd(),
  env: { ...process.env, STATIC_EXPORT: 'true' },
  stdio: 'inherit',
});

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
