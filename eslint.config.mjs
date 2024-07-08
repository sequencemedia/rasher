import globals from 'globals'
import merge from '@sequencemedia/eslint-config-standard/merge'

export default (
  merge({
    files: [
      '**/*.{js,cjs,mjs}'
    ],
    ignores: [
      'lib/**/*'
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
  })
)
