<template>
    <div class="layout relative z-10 w-full px-6 pt-8 pb-8 lg:px-8 lg:pt-12 lg:pb-20">
        <section class="mt-12 space-y-12">
            <div class="container relative mb-10 md:mb-24 space-y-6">
                <div class="flex flex-col justify-start items-start gap-12">
                    <div class="flex w-full flex-col gap-5">
                        <h1 class="text-2xl tracking-tight md:text-4xl">
                            {{ blog?.title }}
                        </h1>
                        <div class="text-lg font-medium tracking-tight text-zinc-400">
                            <div class="flex items-center">
                                <Icon
                                    mode="svg"
                                    name="mingcute:time-line"
                                />
                                <span class="ml-2">{{ formatDate(blog?.date as string) }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <ContentRenderer
                    v-if="blog"
                    :value="blog"
                    class="w-full flex-1 *:data-[slot=alert]:first:mt-0"
                />

                <FindMe />
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const title = computed(() => route.path)

const { data: blog } = await useAsyncData(title.value as string, () => {
    return queryCollection('blogs')
        .path(title.value)
        .first()
})

if (!blog.value) {
    throw createError({ statusCode: 404, statusMessage: 'Blogs not found' })
}
</script>
