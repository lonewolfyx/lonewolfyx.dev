<template>
    <ClientOnly>
        <div
            :class="cn(
                'fixed bottom-4 left-4 z-50 text-gray-600 text-xs tracking-wider dark:text-gray-300',
            )"
        >
            {{ width }} x {{ height }}
        </div>
    </ClientOnly>
</template>

<script lang="ts" setup>
import { cn } from '~/lib/utils'

defineOptions({
    name: 'ScreenSize',
})
const { width, height } = useWindowSize()
</script>
