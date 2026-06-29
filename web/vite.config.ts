import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Build output goes to ../dist so we can publish a static bundle to akko-ai.com.
// base '/' because the site is served at the apex domain.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: '../site-dist',
    emptyOutDir: true,
  },
})
