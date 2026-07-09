import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

export default [
  { name: 'app/files-to-lint', files: ['**/*.{js,ts,mts,tsx,vue}'] },
  { name: 'app/files-to-ignore', ignores: ['**/dist/**', '**/coverage/**'] },
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    languageOptions: {
      globals: {
        console: 'readonly',
        process: 'readonly',
        URL: 'readonly',
      },
    },
  },
]
