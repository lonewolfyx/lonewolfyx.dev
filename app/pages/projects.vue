<template>
    <main class="relative z-10 w-full px-4 pt-16 pb-12 sm:px-6 lg:px-8 lg:pt-20 lg:pb-20">
        <section class="mx-auto flex w-full max-w-[1420px] flex-col gap-12">
            <header class="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 text-center">
                <h1
                    class="text-2xl tracking-tight md:text-7xl leading-none font-black tracking-normal"
                >
                    My Projects
                </h1>

                <p class="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                    Projects that I created or maintaining.
                </p>
            </header>

            <div class="space-y-8">
                <Collapsible
                    v-for="(items, index) in openSource"
                    :key="items.organization"
                    :default-open="index === 0"
                    class="block"
                >
                    <section class="space-y-6">
                        <div class="flex items-center gap-3">
                            <CollapsibleTrigger
                                class="group flex min-w-0 items-center gap-3 py-2 text-left"
                            >
                                <span
                                    class="flex size-5 shrink-0 items-center justify-center text-primary transition-transform duration-200 group-hover:translate-x-0.5"
                                    aria-hidden="true"
                                >
                                    ▸
                                </span>
                                <span class="truncate text-base font-black text-foreground sm:text-lg">
                                    {{ items.organization }}
                                </span>
                            </CollapsibleTrigger>

                            <span class="h-px flex-1 bg-border" aria-hidden="true" />

                            <span class="shrink-0 text-[11px] font-medium tracking-normal text-muted-foreground uppercase">
                                [{{ items.repositories.length }} records]
                            </span>
                        </div>

                        <CollapsibleContent class="projects-collapsible-content overflow-hidden">
                            <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                <NuxtLink
                                    v-for="project in items.repositories"
                                    :key="project.name"
                                    :to="project.url"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    external
                                    :class="cn(
                                        'project-card group/card block overflow-hidden rounded-md',
                                        'border border-border/80 bg-card/40',
                                        'transition-colors duration-200',
                                        'hover:border-primary/40 hover:bg-accent/30 hover:shadow-sm',
                                    )"
                                >
                                    <div class="flex items-center justify-between gap-3 border-b border-border/80 px-3 py-2 text-[11px] font-medium text-muted-foreground uppercase">
                                        <span class="text-primary" aria-hidden="true">☆</span>
                                        <span class="truncate">
                                            Open Source
                                        </span>
                                    </div>

                                    <div class="flex min-h-36 gap-4 p-4">
                                        <Avatar class="size-20 rounded-md border bg-background p-3 shadow-xs">
                                            <AvatarImage
                                                :src="project.icon"
                                                :alt="project.name"
                                                class="object-contain"
                                            />
                                            <AvatarFallback class="rounded-md text-xs font-semibold">
                                                {{ project.name }}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div class="min-w-0 flex-1 self-center">
                                            <h3 class="truncate text-sm font-bold text-foreground transition-colors group-hover/card:text-primary">
                                                {{ project.name }}
                                            </h3>

                                            <p class="project-card-description mt-1 text-xs leading-relaxed text-muted-foreground">
                                                {{ project.description }}
                                            </p>

                                            <div class="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                                                <span class="inline-flex items-center gap-1">
                                                    <Icon name="lucide:github" class="size-3.5" aria-hidden="true" />
                                                    GitHub
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </NuxtLink>
                            </div>
                        </CollapsibleContent>
                    </section>
                </Collapsible>
            </div>
        </section>
    </main>
</template>

<script lang="ts" setup>
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { openSource } from '~/constant/open-source'
import { cn } from '~/lib/utils'
</script>
