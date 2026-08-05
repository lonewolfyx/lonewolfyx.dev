<template>
    <div class="border rounded my-4 border-red-500">
        <div class="border-b p-3 bg-red-500">
            <span class="font-medium text-white">Deprecated</span>
        </div>
        <div class="p-4">
            <slot />
        </div>
    </div>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'Deprecated',
})
</script>
