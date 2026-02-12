import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import tsParser from '@typescript-eslint/parser'
import globals from 'globals'
import prettierConfig from 'eslint-config-prettier'
import autoImportGlobals from './.eslintrc-auto-import.json' with { type: 'json' }

export default [
  { ignores: ['dist', 'node_modules', '*.min.js'] },
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  prettierConfig,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...(autoImportGlobals as { globals?: Record<string, boolean> }).globals
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  },
  // 为 Vue 文件的 script 配置 TypeScript 解析器
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.vue']
      }
    }
  },
  // 为 .ts 文件配置 TypeScript 解析器
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser
    }
  }
]

