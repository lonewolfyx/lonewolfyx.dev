<template>
    <div class="ml-auto flex items-center gap-[3px]">
        <span class="mr-1 font-mono text-[11px] text-muted-foreground">
            Less
        </span>
        <svg
            v-for="color in colors"
            :key="color"
            :height="blockSize"
            :width="blockSize"
        >
            <rect
                :fill="color"
                :height="blockSize"
                :rx="blockRadius"
                :ry="blockRadius"
                :width="blockSize"
            />
        </svg>

        <span class="ml-1 font-mono text-[11px] text-muted-foreground">
            More
        </span>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { generateGradient } from '~/components/github-contribution/index'

defineOptions({
    name: 'ContributionGraphLegend',
})

const props = defineProps<{
    baseColor: string
    levels: number
}>()

const { baseColor, levels } = toRefs(props)

const blockSize = 9
const blockRadius = 2

const colors = computed(() => generateGradient(baseColor.value, levels.value))
</script>
