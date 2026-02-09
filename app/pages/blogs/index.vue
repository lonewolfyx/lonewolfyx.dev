<template>
    <div class="layout relative z-10 w-full px-6 pt-8 pb-8 lg:px-8 lg:pt-12 lg:pb-20">
        <section class="mt-12 space-y-12">
            <div class="container relative mb-10 md:mb-24">
                <div class="flex flex-col items-center justify-center gap-12 text-center">
                    <div class="flex max-w-4xl flex-col gap-5">
                        <h1 class="text-2xl tracking-tight  md:text-7xl">
                            Blogs
                        </h1>
                    </div>
                </div>
            </div>

            <ul class="space-y-6">
                <li
                    v-for="blog in blogs"
                    :key="blog.title"
                >
                    <NuxtLink
                        :title="blog.title"
                        :to="blog.path"
                        class="group flex items-baseline gap-4 py-3 transition-colors duration-200"
                    >
                        <time class="shrink-0 text-xs font-mono font-bold text-stone-500 dark:text-stone-400">
                            {{ formatDate(blog.date) }}
                        </time>
                        <span
                            :class="cn(
                                'list-title font-medium text-xl text-stone-700 dark:text-stone-300',
                                'transition-colors duration-200',
                                'group-hover:text-stone-900 dark:group-hover:text-white',
                            )"
                        >
                            {{ blog.title }}
                        </span>
                    </NuxtLink>
                </li>
            </ul>
        </section>
    </div>
</template>

<script lang="ts" setup>
import { cn } from '~/lib/utils'
import { formatDate } from '~/utils/date'

const { data: blogs } = await useAsyncData('blogs', async () => {
    const blogs = await queryCollection('blogs').all()
    return blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})
</script>
