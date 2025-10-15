<template>
    <main class="relative w-full bg-background">
        <Times />
        <ScreenSize />

        <div class="relative flex w-full min-h-dvh max-h-dvh overflow-auto flex-col bg-grid">
            <slot />
        </div>
    </main>
</template>

<script lang="ts" setup>
import ScreenSize from '~/components/features/ScreenSize.vue'
import Times from '~/components/features/Times.vue'
</script>
