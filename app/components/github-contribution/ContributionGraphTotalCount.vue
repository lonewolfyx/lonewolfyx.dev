<template>
    <div class="font-mono text-foreground text-[11px]">
        {{ totalCount }} contributions
    </div>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'ContributionGraphTotalCount',
})

const { contributions } = useAttrs()
const totalCount = computed(() => {
    return contributions.reduce((acc, cur) => acc + cur.count, 0)
})
</script>
