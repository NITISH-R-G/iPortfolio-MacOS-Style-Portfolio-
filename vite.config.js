import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import {resolve , dirname} from 'path';
import {fileURLToPath} from 'url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          gsap: ['gsap', '@gsap/react'],
          pdf: ['react-pdf'],
          zustand: ['zustand', 'immer']
        }
      }
    }
  },
    resolvers: {
      alias: {
          '#components' : resolve(dirname(fileURLToPath(import.meta.url)), 'src/components'),
          '#constants' : resolve(dirname(fileURLToPath(import.meta.url)), 'src/constants'),
          '#store' : resolve(dirname(fileURLToPath(import.meta.url)), 'src/store'),
          '#hoc' : resolve(dirname(fileURLToPath(import.meta.url)), 'src/hoc'),
          '#windows' : resolve(dirname(fileURLToPath(import.meta.url)), 'src/windows'),
      }
    }
})
