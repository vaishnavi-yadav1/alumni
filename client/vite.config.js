import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // This is only used during development
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist', // default is 'dist'
  },
});
