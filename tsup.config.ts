import { defineConfig } from 'tsup'

export default defineConfig({
  target: 'es2020',
  format: ['cjs', 'esm'],
  splitting: false,
  // sourcemap: true,
  clean: true,
  dts: true,
  // BTW, we can ship this module to neutral because we don't have any couopled part with Node.js
  platform: 'node'
  // minify: true
});
