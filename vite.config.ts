import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  base: '/',
  build: {
    target: 'es2022',
    cssMinify: 'lightningcss',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        checkout: resolve(__dirname, 'checkout.html'),
        orderSuccess: resolve(__dirname, 'order-success.html'),
        orderFailed: resolve(__dirname, 'order-failed.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        offer: resolve(__dirname, 'offer.html'),
      },
    },
  },
});
