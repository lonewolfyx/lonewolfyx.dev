<template>
    <div class="layout relative z-10 w-full px-6 pt-8 pb-8 lg:px-8 lg:pt-12 lg:pb-20">
        <section class="mt-12 space-y-12">
            <div class="container relative mb-10 md:mb-24">
                <div class="flex flex-col items-center justify-center gap-12 text-center">
                    <div class="flex max-w-4xl flex-col gap-5">
                        <h1 class="text-2xl tracking-tight  md:text-7xl">
                            Projects
                        </h1>
                        <div class="text-lg font-medium tracking-tight ">
                            Projects that I created or maintaining.
                        </div>
                    </div>
                </div>
            </div>

            <div
                v-for="items in openSource"
                :key="items.organization"
                class="flex flex-col gap-8 items-center md:items-start"
            >
                <LineShadowText
                    :shadow-color="colorMode==='dark'?'white':'black'"
                    class="text-4xl md:text-5xl italic"
                >
                    {{ items.organization }}
                </LineShadowText>

                <div class="w-full grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <NuxtLink
                        v-for="project in items.repositories"
                        :key="project.name"
                        :class="cn(
                            'relative flex gap-3 rounded-lg',
                            'hover:bg-muted/50',
                            'border-dashed md:border-l',
                            'transition duration-300',
                            'p-3 md:p-5',
                            'items-center md:items-start',
                            'md:flex-col',
                        )"
                        :to="project.url"
                        target="_blank"
                    >
                        <span
                            class="bg-accent flex size-10 shrink-0 items-center justify-center rounded-full"
                        >
                            <Avatar class="justify-center items-center">
                                <AvatarImage
                                    :src="project.icon"
                                    class="!size-6"
                                />
                                <AvatarFallback>{{ project.name }}</AvatarFallback>
                            </Avatar>
                        </span>
                        <div>
                            <h3 class="font-medium md:mb-2 md:text-xl">
                                {{ project.name }}
                                <span class="bg-primary absolute -left-px hidden h-6 w-px md:inline-block" />
                            </h3>
                            <p class="text-muted-foreground text-xs">{{ project.description }}</p>
                        </div>
                    </nuxtlink>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { cn } from '~/lib/utils'
import { LineShadowText } from '~/components/ui/line-shadow-text'
import { openSource } from '~/constant/open-source'

const colorMode = useColorMode()
</script>

<style scoped>

</style>
