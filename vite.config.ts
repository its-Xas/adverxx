
// https://vitejs.dev/config/
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/adverxx/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})