import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/QuoteHeavy-SF',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});