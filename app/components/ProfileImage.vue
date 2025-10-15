<template>
    <div class="relative mx-[2px] my-[3px] size-20">
        <img
            :alt="`Profile of ${user.name}`"
            :src="user.avatar"
            class="h-full w-full select-none rounded-full bg-secondary ring-1 ring-border ring-offset-2 ring-offset-primary"
            fetchPriority="high"
        >
    </div>
</template>

<script lang="ts" setup>
const { user } = useAppConfig()
</script>
