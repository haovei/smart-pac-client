import js from '@eslint/js';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

const sharedGlobals = {
    ...globals.browser,
    ...globals.node,
};

export default [
    {
        ignores: ['dist/**', '.eslintrc.cjs', 'src-tauri/target/**'],
    },
    {
        files: ['**/*.{js,mjs,cjs,ts,tsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: sharedGlobals,
        },
        plugins: {
            'react-refresh': reactRefresh,
        },
        rules: {
            ...js.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
        },
    },
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: sharedGlobals,
        },
        plugins: {
            '@typescript-eslint': tseslintPlugin,
            'react-hooks': reactHooks,
        },
        rules: {
            ...tseslintPlugin.configs.recommended.rules,
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
        },
    },
];