import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
// export default defineConfig({
//   server:{
//     proxy:{
//       '/api':{
//         target: 'http://localhost:3000',
//         secure:false,
//       },
//     },
//   },
//   plugins: [react(),tailwindcss()],

// });
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react(),tailwindcss()],
  build: {
    outDir: '../api/client/dist', // output build here!
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
