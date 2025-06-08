import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    {
        ignores: [
            'node_modules/**',
            '.next/**',
            'out/**',
            'build/**',
            'dist/**',
            'public/**',
            '*.config.js',
            '*.config.ts',
            '*.config.mjs',
            '.env*',
            'pnpm-lock.yaml',
            'yarn.lock',
            'package-lock.json',
            '.eslintcache',
            '.cache/**',
            'coverage/**',
            'tmp/**',
            'temp/**',
            '*.d.ts',
            '!src/**/*.d.ts'
        ],
    },
    {
        rules: {
            // TypeScript规则
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                    destructuredArrayIgnorePattern: '^_'
                }
            ],
            '@typescript-eslint/no-explicit-any': 'warn',

            // React规则
            'react/react-in-jsx-scope': 'off', // Next.js不需要import React
            'react/prop-types': 'off', // TypeScript已处理prop验证
            'react/display-name': 'warn',
            'react/no-unescaped-entities': [
                'error',
                {
                    forbid: [
                        {
                            char: '>',
                            alternatives: ['&gt;']
                        },
                        {
                            char: '<',
                            alternatives: ['&lt;']
                        },
                        {
                            char: '}',
                            alternatives: ['&#125;']
                        }
                    ]
                }
            ],

            // React Hooks规则
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // Next.js规则
            '@next/next/no-img-element': 'warn',
            '@next/next/no-html-link-for-pages': 'off',

            // 通用规则
            'no-console': 'warn',
            'no-debugger': 'error',
            'prefer-const': 'warn',
            'no-var': 'error',
            'object-shorthand': 'warn',
            'prefer-arrow-callback': 'warn'
        },
    },
    {
        files: ['*.js', '*.jsx'],
        rules: {
            '@typescript-eslint/no-var-requires': 'off'
        }
    }
];

export default eslintConfig; 