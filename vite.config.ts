import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, 'demo'),
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      'vue-stick-to-bottom': path.resolve(__dirname, 'src/index.ts'),
    },
  },
})
