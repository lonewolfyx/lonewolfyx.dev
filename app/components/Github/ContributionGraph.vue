<template>
    <div v-if="status === 'pending'" class="flex items-center justify-center py-8">
        <span class="text-sm text-muted-foreground">Loading...</span>
    </div>
    <div v-else-if="error" class="flex items-center justify-center py-8">
        <span class="text-sm text-destructive">Failed to load contributions</span>
    </div>
    <GithubGraph
        v-else-if="contributions"
        :data="contributions"
        :color-theme="colorTheme"
    />
</template>

<script lang="ts" setup>
import type { ContributionDay, ThemeName } from '~/components/Github/Graph.vue'
import GithubGraph from '~/components/Github/Graph.vue'

defineOptions({
    name: 'GithubContributionGraph',
})

const props = defineProps<Props>()

interface Props {
    username: string
    colorTheme?: ThemeName
}

interface ApiResponse {
    total: { lastYear: number }
    contributions: ContributionDay[]
}

const { data, error, status } = useLazyFetch<ApiResponse>(
    () => `https://github-contributions-api.jogruber.de/v4/${props.username}`,
    { query: { y: 'last' } },
)

const contributions = computed(() => data.value?.contributions)
</script>
