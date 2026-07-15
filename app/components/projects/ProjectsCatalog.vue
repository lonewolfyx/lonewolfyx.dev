<template>
    <div class="min-w-0 space-y-8">
        <Collapsible
            v-for="group in groups"
            :key="group.id"
            default-open
            class="block"
        >
            <section
                :id="group.id"
                class="scroll-m-28 space-y-6"
            >
                <div class="flex items-center gap-3">
                    <CollapsibleTrigger class="group flex min-w-0 items-center gap-3 py-2 text-left">
                        <span
                            class="flex size-5 shrink-0 items-center justify-center text-primary transition-transform duration-200 group-hover:translate-x-0.5 group-data-[state=open]:rotate-90 motion-reduce:transition-none"
                            aria-hidden="true"
                        >
                            ▸
                        </span>
                        <span class="truncate text-base font-black text-foreground capitalize sm:text-lg">
                            {{ group.organization }}
                        </span>
                    </CollapsibleTrigger>

                    <span class="h-px flex-1 bg-border" aria-hidden="true" />

                    <span class="shrink-0 text-xs font-medium tracking-normal text-muted-foreground uppercase">
                        [{{ group.repositories.length }} records]
                    </span>
                </div>

                <CollapsibleContent class="projects-collapsible-content overflow-hidden">
                    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <NuxtLink
                            v-for="project in group.repositories"
                            :key="project.name"
                            :to="project.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            external
                            :class="cn(
                                'project-card group/card block overflow-hidden rounded-md',
                                'border border-border/80 bg-card/40',
                                'transition-colors duration-200 motion-reduce:transition-none',
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
                                <Avatar class="size-20 bg-background p-3">
                                    <AvatarImage
                                        :src="project.icon"
                                        :alt="project.name"
                                        class="object-contain"
                                    />
                                    <AvatarFallback class="text-xs font-semibold">
                                        {{ project.name }}
                                    </AvatarFallback>
                                </Avatar>

                                <div class="min-w-0 flex-1 self-center">
                                    <h3 class="truncate text-sm font-bold text-foreground transition-colors group-hover/card:text-primary motion-reduce:transition-none">
                                        {{ project.name }}
                                    </h3>

                                    <p class="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                                        {{ project.description }}
                                    </p>

                                    <div class="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                                        <span class="inline-flex items-center gap-1">
                                            <Icon
                                                name="lucide:github"
                                                class="size-3.5"
                                                aria-hidden="true"
                                            />
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
</template>

<script setup lang="ts">
import type { IOpenSource } from '~/types/open.source'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { cn } from '~/lib/utils'

defineProps<{
    groups: IOpenSource[]
}>()
</script>
