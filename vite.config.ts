import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base './' funciona em username.github.io/repo/ e em preview local
const base = process.env.VITE_BASE_PATH || './'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 4321,
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4321,
    strictPort: true,
    allowedHosts: true,
  },
})
