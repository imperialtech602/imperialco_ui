import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Local frontend → local API by default (avoids production CORS).
// Override with VITE_API_PROXY_TARGET=https://imperialco-backend.onrender.com if needed.
const apiProxyTarget =
  process.env.VITE_API_PROXY_TARGET || 'http://localhost:5000'

function apiProxy() {
  return {
    target: apiProxyTarget,
    changeOrigin: true,
    secure: true,
    configure(proxy) {
      // Browser Origin (e.g. localhost:5174) must not be forwarded to the API,
      // or production CORS will reject the proxied request.
      proxy.on('proxyReq', (proxyReq) => {
        proxyReq.removeHeader('origin')
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': apiProxy(),
      '/uploads': apiProxy(),
    },
  },
})
