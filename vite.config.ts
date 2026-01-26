import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/yappieburthadayy/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
