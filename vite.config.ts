import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      // Add this line to match tsconfig.json
      '@/*': '/src/*',
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
