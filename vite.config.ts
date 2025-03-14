import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      '/api': {
        target: 'https://rawg2steam.phalco.de',
        changeOrigin: true,
        secure: false,
        timeout: 70000
      },
    },
  },
})
