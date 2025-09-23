import * as config from '@lvce-editor/eslint-config'

export default [
  ...config.default,
  {
    rules: {
      'no-console': 'off',
      'no-restricted-syntax': 'off',
    },
  },
]
