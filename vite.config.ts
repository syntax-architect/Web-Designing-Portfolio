import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
    cssMinify: true,
    rollupOptions: {
      output: isSsrBuild
        ? undefined
        : {
            // Keep React and heavy animation engines in their own cacheable client chunks.
            manualChunks: {
              'react-vendor': ['react', 'react-dom'],
              motion: ['motion/react'],
              gsap: ['gsap', '@gsap/react'],
              lenis: ['lenis'],
            },
          },
    },
  },
}));
