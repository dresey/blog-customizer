import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';
import readableClassnames from 'vite-plugin-readable-classnames';
import sassDts from 'vite-plugin-sass-dts';

const sourceDirectory = fileURLToPath(new URL('./src', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    checker({
      typescript: true,
    }),
    react(),
    readableClassnames(),
    sassDts({
      enabledMode: ['development'],
      esmExport: true,
    }),
  ],
  base: '',
  resolve: {
    alias: {
      '@': sourceDirectory,
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      src: sourceDirectory,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // @ts-expect-error api is a valid sass option but not in Vite's types yet
        api: 'modern-compiler',
      },
    },
  },
  server: {
    open: true,
  },
});
