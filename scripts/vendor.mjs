import { mkdir, copyFile } from 'node:fs/promises';
await mkdir('vendor', { recursive: true });
for (const file of ['three.module.min.js', 'three.core.min.js']) await copyFile(`node_modules/three/build/${file}`, `vendor/${file}`);
await copyFile('node_modules/three/LICENSE', 'vendor/THREE-LICENSE.txt');
