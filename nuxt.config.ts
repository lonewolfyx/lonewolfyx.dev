import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        // '@nuxt/content',
        '@nuxt/eslint',
        '@nuxt/icon',
        '@vueuse/nuxt',
        'shadcn-nuxt',
    ],

    devtools: {
        enabled: true,
    },

    app: {
        head: {
            title: 'lonewolfyx\'s notion',
            meta: [
                { name: 'description', content: 'lonewolfyx\'s notion' },
            ],
        },
    },

    css: [
        '~/assets/css/tailwind.css',
    ],
    compatibilityDate: '2025-07-15',

    vite: {
        plugins: [
            tailwindcss(),
        ],
    },

    eslint: {
        config: {
            stylistic: {
                indent: 4, // 4, or 'tab'
                quotes: 'single', // or 'double'
            },
        },
    },

    shadcn: {
        prefix: '',
        componentDir: './app/components/ui',
    },
})
