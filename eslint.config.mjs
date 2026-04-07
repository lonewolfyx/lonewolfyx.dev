import { antfu } from '@antfu/eslint-config'
// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default antfu({
    stylistic: {
        indent: 4,
        quotes: 'single',
    },
    vue: {
        overrides: {
            'vue/block-order': ['error', {
                order: [
                    'template',
                    'script',
                    'style',
                ],
            }],
        },
    },
    yaml: {
        overrides: {
            'yaml/indent': ['error', 2],
        },
    },
    rules: {
        'e18e/prefer-static-regex': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'vue/no-v-html': 'off',
        'regexp/no-unused-capturing-group': 'off',
        'node/prefer-global/process': 'off',
    },
}).append(withNuxt)
