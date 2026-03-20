import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@portfolio/lib': path.resolve(__dirname, '../lib/src/index.ts'),
      '@portfolio/web-ui': path.resolve(__dirname, '../web-ui/src/index.ts'),
    },
  },
});
