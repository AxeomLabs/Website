import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => ({
  plugins: [react()],
  build: {
    // No source maps in production
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // rolldown (Vite 8) requires manualChunks as a function
        manualChunks(id) {
          if (id.includes('node_modules/gsap') || id.includes('node_modules/@gsap')) {
            return 'vendor-gsap';
          }
          if (id.includes('node_modules/lenis')) {
            return 'vendor-lenis';
          }
          if (
            id.includes('node_modules/react') ||
            id.includes('node_modules/react-dom') ||
            id.includes('node_modules/react-router-dom') ||
            id.includes('node_modules/scheduler')
          ) {
            return 'vendor-react';
          }
        },
      },
    },
  },
}))
