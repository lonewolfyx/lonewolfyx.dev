import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
    collections: {
        blogs: defineCollection({
            type: 'page',
            source: 'blogs/*.md',
            schema: z.object({
                title: z.string(),
                date: z.date(),
                lang: z.string().default('zh-CN'),
                duration: z.string().optional(),
            }),
        }),
    },
})
