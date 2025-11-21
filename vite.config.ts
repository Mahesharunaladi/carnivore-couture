// ...

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  root: './',
  plugins: [react()],

  resolve: {
    alias: {
      '@': '/src',
      // Add this line to match tsconfig.json
      '@/*': '/src/*',
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',  // Updated to match backend port
        changeOrigin: true,
      },
    },
  }
});
