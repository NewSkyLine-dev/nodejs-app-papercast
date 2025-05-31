import { fileURLToPath } from 'url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    workspace: [
      'tests/*/vitest.config.{e2e,unit}.ts',
      { test: { name: '', root: '', environment: '', setupFiles: '' } },
    ],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
