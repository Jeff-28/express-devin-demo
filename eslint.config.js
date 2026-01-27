'use strict'

const globals = require('globals')

module.exports = [
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.es2022
      }
    },
    rules: {
      'eol-last': 'error',
      'eqeqeq': ['error', 'allow-null'],
      'indent': ['error', 2, { MemberExpression: 'off', SwitchCase: 1 }],
      'no-trailing-spaces': 'error',
      'no-unused-vars': ['error', { vars: 'all', args: 'none', ignoreRestSiblings: true, caughtErrors: 'none' }],
      'no-restricted-globals': [
        'error',
        {
          name: 'Buffer',
          message: 'Use `import { Buffer } from "node:buffer"` instead of the global Buffer.'
        }
      ]
    }
  },
  {
    files: ['test/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.mocha
      }
    }
  },
  {
    files: ['examples/**/public/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  },
  {
    ignores: ['coverage/**', 'node_modules/**']
  }
]
