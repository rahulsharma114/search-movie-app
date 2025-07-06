import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(), 
    visualizer({ open: true }),
  ],
  optimizeDeps: {
    exclude: ['react-dom/cjs/react-dom.production.min.js'], // if mistakenly included
  },
})
