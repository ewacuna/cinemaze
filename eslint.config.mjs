import eslint from '@eslint/js';
import {defineConfig} from 'eslint/config';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import prettier from 'eslint-plugin-prettier/recommended';

export default defineConfig(
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '.angular/**',
      'coverage/**',
      'projects/**',
      '**/*.spec.ts',
    ],
  },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...angular.configs.tsRecommended,
      prettier,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      // Keep the eager change detection preserved by Angular's v22 migration.
      '@angular-eslint/prefer-on-push-component-change-detection': 'off',
      '@angular-eslint/directive-selector': [
        'error',
        {type: 'attribute', prefix: 'app', style: 'camelCase'},
      ],
      '@angular-eslint/component-selector': [
        'error',
        {type: 'element', prefix: 'app', style: 'kebab-case'},
      ],
      'prettier/prettier': ['error', {endOfLine: 'auto'}],
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
      prettier,
    ],
    rules: {
      'prettier/prettier': ['error', {parser: 'angular', endOfLine: 'auto'}],
    },
  }
);
