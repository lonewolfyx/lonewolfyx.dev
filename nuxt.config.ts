import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxt/content',
        '@nuxt/eslint',
        '@nuxt/icon',
        '@vueuse/nuxt',
        'shadcn-nuxt',
        'motion-v/nuxt',
        'nuxt-shiki',
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

    content: {
        build: {
            markdown: {
                highlight: false,
            },
        },
        // required to prevent error related to better-sqlite3 during build and deploy
        experimental: {
            sqliteConnector: 'native',
        },
    },

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
