<template>
    <ClientOnly>
        <div
            class="fixed top-4 left-4 z-50 text-gray-600 text-xs tracking-wider dark:text-gray-300"
        >
            {{ time }}
        </div>
    </ClientOnly>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'Times',
})
const time = useDateFormat(useNow(), 'HH:mm:ss A')
</script>
