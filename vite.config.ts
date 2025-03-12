import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/salesforce-queue-viewer/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});