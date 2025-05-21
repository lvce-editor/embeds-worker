import * as config from '@lvce-editor/eslint-config'

export default [
  ...config.default,
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      'no-console': 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    },
  },
]
