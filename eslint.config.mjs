import globals from 'globals'
import standard from '@sequencemedia/eslint-config-standard/merge'

export default [
  ...standard({
    files: [
      '**/*.{js,cjs,mjs}'
    ],
    ignores: [
      'lib/**/*',
      'husky.mjs'
    ],
    languageOptions: {
      globals: {
        event: 'readonly',
        ...globals.browser
      }
    },
    rules: {
      'no-cond-assign': 'off'
    }
  }),
  ...standard({
    files: [
      'husky.mjs'
    ],
    ignores: [
      '**/*.{js,cjs,mjs}',
      'lib/**/*'
    ],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  })
]
