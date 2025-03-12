import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@scripts': '/resources/scripts',
      '@auth': '/resources/scripts/auth',
      '@authCss': '/resources/css/auth',
      '@contexts': '/resources/scripts/contexts',
      '@components': '/resources/scripts/components',
      '@landing': '/resources/scripts/landing',
      '@landingCss': '/resources/css/landing',
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
