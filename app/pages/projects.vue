<template>
    <main class="relative z-10 w-full px-4 pt-16 pb-12 sm:px-6 lg:px-8 lg:pt-20 lg:pb-20">
        <section class="mx-auto flex w-full max-w-[1420px] flex-col gap-12">
            <header class="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 text-center">
                <h1 class="text-2xl leading-none font-black tracking-normal md:text-7xl">
                    My Projects
                </h1>

                <p class="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                    Projects that I created or maintaining.
                </p>
            </header>

            <ProjectsCatalog :groups="openSource" />
        </section>

        <ProjectsAnchorNavigation :items="openSource" />
    </main>
</template>

<script setup lang="ts">
import ProjectsAnchorNavigation from '~/components/projects/ProjectsAnchorNavigation.vue'
import ProjectsCatalog from '~/components/projects/ProjectsCatalog.vue'
import { openSource } from '~/constant/open-source'
</script>
