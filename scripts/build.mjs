import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const output = resolve(root, 'dist');
const entries = ['index.html', 'images', 'scripts', 'styles'];

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

for (const entry of entries) {
  cpSync(resolve(root, entry), resolve(output, entry), {
    recursive: true,
    force: true,
  });
}

console.log('LUXU static site built successfully in dist/.');
