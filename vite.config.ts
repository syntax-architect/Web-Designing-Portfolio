import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // Keep the heavy animation engines in their own cacheable chunks.
        manualChunks: {
          motion: ['motion/react'],
          gsap: ['gsap'],
          lenis: ['lenis'],
        },
      },
    },
  },
});
