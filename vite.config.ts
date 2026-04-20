import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/summeroom/' : '/',
  build: {
    target: 'es2022',
    cssMinify: 'lightningcss',
    sourcemap: true,
  },
});
