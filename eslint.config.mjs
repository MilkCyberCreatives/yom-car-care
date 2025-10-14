// Flat ESLint config for Next 14
import next from 'eslint-config-next';
import js from '@eslint/js';

export default [
  js.configs.recommended,
  ...next(),
  {
    rules: {
      // we sometimes use <a> for locale switching to avoid typedRoutes quirks
      '@next/next/no-html-link-for-pages': 'off',
    },
    ignores: [
      'node_modules/**',
      '.next/**',
      'dist/**',
    ],
  },
];
