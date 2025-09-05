import type { PluginOption } from 'vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dtsPlugin = dts({
  insertTypesEntry: true,
  copyDtsFiles: true,
  rollupTypes: true,
  tsconfigPath: path.resolve(__dirname, 'tsconfig.app.json'),
  entryRoot: path.resolve(__dirname, 'src'),
  include: ['src'],
  exclude: [
    'node_modules',
    'dist',
    '**/*.test.*',
    'vite.config.ts',
    'vite.lib.config.ts',
  ],
}) as PluginOption

export default defineConfig({
  plugins: [
    vue(),
    dtsPlugin,
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'StickToBottom',
      fileName: format => `index.${format}.js`,
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue'],
    },
    sourcemap: true,
    minify: false,
  },
})
