import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],
  format: ['esm'],
  target: 'es2022',
  clean: true,
  sourcemap: true,
  minify: false,
  noExternal: [],  
  skipNodeModulesBundle: true,
  splitting: false,
  treeshake: true,
});
