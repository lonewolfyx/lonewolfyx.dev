<template>
    <ClientOnly>
        <main class="relative w-full bg-background">
            <SiteHeader />
            <Times />
            <ScreenSize />

            <div class="relative flex w-full min-h-dvh max-h-dvh overflow-auto flex-col bg-grid no-scrollbar">
                <slot />
            </div>
        </main>
    </ClientOnly>
</template>

<script lang="ts" setup>
import ScreenSize from '~/components/features/ScreenSize.vue'
import Times from '~/components/features/Times.vue'

useHead({
    htmlAttrs: {
        class: 'route-hide-scrollbar',
    },
    bodyAttrs: {
        class: 'route-hide-scrollbar',
    },
})
</script>
