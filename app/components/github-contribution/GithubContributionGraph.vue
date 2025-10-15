<template>
    <div
        :class="cn(
            'flex w-max max-w-full flex-col gap-2 mx-auto font-mono',
            props.class,
        )"
    >
        <ContributionGraphCalendar
            :base-color="baseColor"
            :cell-padding="cellPadding"
            :cell-size="cellSize"
            :color-scale="colorScale"
            :contributions="contributions"
            :end-date="endDate"
            :levels="levels"
            :show-weeks="showWeeks"
            v-bind="$attrs"
        />

        <ContributionGraphFooter>
            <ContributionGraphTotalCount :contributions="contributions" />
            <ContributionGraphLegend
                :base-color="baseColor"
                :levels="levels"
            />
        </ContributionGraphFooter>
    </div>
</template>

<script lang="ts" setup>
import { cn } from '~/lib/utils.js'
import ContributionGraphCalendar from './ContributionGraphCalendar.vue'
import ContributionGraphFooter from './ContributionGraphFooter.vue'
import ContributionGraphTotalCount from './ContributionGraphTotalCount.vue'
import ContributionGraphLegend from './ContributionGraphLegend.vue'

interface IGithubContributionProps {
    class?: string
    levels?: number
    contributions: Array
    colorScale?: 'linear' | 'log'
    cellSize?: number
    cellPadding?: number
    startDate?: string
    endDate?: string
    showWeeks?: boolean
    baseColor?: string
}

const props = withDefaults(defineProps<IGithubContributionProps>(), {
    levels: 5,
    cellSize: 12,
    cellPadding: 3,
    showWeeks: false,
    baseColor: '#239a3b',
    colorScale: 'log',
})
</script>
