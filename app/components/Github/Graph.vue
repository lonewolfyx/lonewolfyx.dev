<template>
    <TooltipProvider :delay-duration="0">
        <svg
            :viewBox="viewBox"
            aria-label="Contribution graph"
            role="img"
            width="100%"
            xmlns="http://www.w3.org/2000/svg"
        >
            <!-- Month Labels -->
            <text
                v-for="label in monthLabels"
                :key="label.key"
                :x="label.x"
                :y="MONTH_LABEL_OFFSET - 4"
                class="fill-muted-foreground"
                font-size="10"
            >
                {{ label.text }}
            </text>

            <!-- Day Labels -->
            <text
                v-for="label in dayLabels"
                :key="label.day"
                :x="0"
                :y="label.y"
                class="fill-muted-foreground"
                font-size="10"
            >
                {{ label.text }}
            </text>

            <!-- Contribution Cells -->
            <template v-for="cell in cells" :key="cell.key">
                <rect
                    :fill="cell.color"
                    :height="CELL_SIZE"
                    :rx="cellRadius"
                    :width="CELL_SIZE"
                    :x="cell.x"
                    :y="cell.y"
                    style="pointer-events: none;"
                />
                <foreignObject
                    :height="CELL_SIZE"
                    :width="CELL_SIZE"
                    :x="cell.x"
                    :y="cell.y"
                >
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <div class="size-full cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent :side-offset="6" side="top">
                            {{ cell.count }} contributions on {{ formatDate(cell.date) }}
                        </TooltipContent>
                    </Tooltip>
                </foreignObject>
            </template>
        </svg>
    </TooltipProvider>
</template>

<script lang="ts">
// Tailwind CSS color themes (5 levels: 0=empty, 1-4=low→high)
export const THEMES = {
    green: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    emerald: ['#ebedf0', '#a7f3d0', '#34d399', '#10b981', '#065f46'],
    teal: ['#ebedf0', '#99f6e4', '#2dd4bf', '#14b8a6', '#115e59'],
    cyan: ['#ebedf0', '#a5f3fc', '#22d3ee', '#06b6d4', '#155e75'],
    sky: ['#ebedf0', '#bae6fd', '#38bdf8', '#0ea5e9', '#0c4a6e'],
    blue: ['#ebedf0', '#bfdbfe', '#60a5fa', '#3b82f6', '#1e3a8a'],
    indigo: ['#ebedf0', '#c7d2fe', '#818cf8', '#6366f1', '#312e81'],
    violet: ['#ebedf0', '#ddd6fe', '#a78bfa', '#8b5cf6', '#4c1d95'],
    purple: ['#ebedf0', '#e9d5ff', '#c084fc', '#a855f7', '#581c87'],
    fuchsia: ['#ebedf0', '#f5d0fe', '#e879f9', '#d946ef', '#701a75'],
    pink: ['#ebedf0', '#fbcfe8', '#f472b6', '#ec4899', '#831843'],
    rose: ['#ebedf0', '#fecdd3', '#fb7185', '#f43f5e', '#881337'],
    red: ['#ebedf0', '#fecaca', '#f87171', '#ef4444', '#7f1d1d'],
    orange: ['#ebedf0', '#fed7aa', '#fb923c', '#f97316', '#7c2d12'],
    amber: ['#ebedf0', '#fde68a', '#fbbf24', '#f59e0b', '#78350f'],
    yellow: ['#ebedf0', '#fef08a', '#facc15', '#eab308', '#713f12'],
    lime: ['#ebedf0', '#d9f99d', '#84cc16', '#65a30d', '#365314'],
}
export type ThemeName = keyof typeof THEMES

export interface ContributionDay {
    date: string
    count: number
}
</script>

<script lang="ts" setup>
defineOptions({
    name: 'GithubGraph',
})

const props = withDefaults(defineProps<Props>(), {
    colorLevels: () => ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    cellGap: 3,
    cellRadius: 2,
    showMonthLabels: true,
    showDayLabels: true,
})

interface Props {
    data: ContributionDay[]
    colorLevels?: string[]
    colorTheme?: ThemeName
    cellGap?: number
    cellRadius?: number
    showMonthLabels?: boolean
    showDayLabels?: boolean
    startDate?: string // YYYY-MM-DD, SSR-safe: pass a fixed date instead of relying on new Date()
}

const WEEKS = 52
const DAYS = 7
const CELL_SIZE = 12
const MONTH_LABEL_OFFSET = 16
const DAY_LABEL_OFFSET = 30
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const DISPLAY_DAYS = [1, 3, 5] // Mon, Wed, Fri

// --- Date Helpers ---
function dateKey(d: Date): string {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
}

function formatDate(dateStr: string): string {
    const d = new Date(`${dateStr}T00:00:00`)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// --- Build Full Date Grid ---
const dateGrid = computed(() => {
    const today = props.startDate
        ? new Date(`${props.startDate}T00:00:00`)
        : new Date()
    today.setHours(0, 0, 0, 0)

    const endDow = today.getDay()
    const gridEnd = new Date(today)
    gridEnd.setDate(gridEnd.getDate() + (6 - endDow))

    const gridStart = new Date(gridEnd)
    gridStart.setDate(gridStart.getDate() - WEEKS * DAYS + 1)

    const grid: Array<{ date: string, week: number, day: number }> = []
    const cur = new Date(gridStart)

    // eslint-disable-next-line no-unmodified-loop-condition
    for (let w = 0; w < WEEKS; w++) {
        // eslint-disable-next-line no-unmodified-loop-condition
        for (let d = 0; d < DAYS; d++) {
            grid.push({ date: dateKey(cur), week: w, day: d })
            cur.setDate(cur.getDate() + 1)
        }
    }

    return grid
})

// --- Data Map ---
const dataMap = computed(() => {
    const map = new Map<string, number>()
    for (const item of props.data) {
        map.set(item.date, item.count)
    }
    return map
})

// --- Color Thresholds (quantiles of non-zero counts) ---
const thresholds = computed(() => {
    const counts = props.data
        .map(d => d.count)
        .filter(c => c > 0)
        .sort((a, b) => a - b)

    if (counts.length === 0)
        return [1, 2, 3, 4]

    const q = (p: number) => {
        const idx = Math.ceil(p * counts.length) - 1
        return counts[Math.max(0, idx)]
    }

    return [q(0.25), q(0.5), q(0.75), q(1)]
})

// --- Resolved Colors ---
const resolvedColors = computed(() => {
    if (props.colorTheme)
        return THEMES[props.colorTheme]
    return props.colorLevels
})

function colorForCount(count: number): string {
    const colors = resolvedColors.value
    if (count <= 0)
        return colors[0]!
    const t = thresholds.value
    if (count <= t[0]!)
        return colors[1]!
    if (count <= t[1]!)
        return colors[2]!
    if (count <= t[2]!)
        return colors[3]!
    return colors[4]!
}

// --- Cells ---
const cells = computed(() => {
    return dateGrid.value.map(({ date, week, day }) => {
        const count = dataMap.value.get(date) ?? 0
        return {
            key: `${week}-${day}`,
            date,
            week,
            day,
            count,
            x: DAY_LABEL_OFFSET + week * (CELL_SIZE + props.cellGap),
            y: MONTH_LABEL_OFFSET + day * (CELL_SIZE + props.cellGap),
            color: colorForCount(count),
        }
    })
})

// --- Month Labels ---
const monthLabels = computed(() => {
    if (!props.showMonthLabels)
        return []

    const labels: Array<{ key: string, text: string, x: number }> = []
    const seen = new Set<string>()
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    for (const cell of cells.value) {
        if (cell.day !== 0)
            continue

        const month = Number(cell.date.slice(5, 7)) - 1
        const name = MONTHS[month]!

        if (!seen.has(name)) {
            seen.add(name)
            labels.push({
                key: `${cell.week}-${month}`,
                text: name,
                x: cell.x,
            })
        }
    }

    return labels
})

// --- Day Labels ---
const dayLabels = computed(() => {
    if (!props.showDayLabels)
        return []

    return DISPLAY_DAYS.map(day => ({
        day,
        text: DAY_NAMES[day],
        y: MONTH_LABEL_OFFSET + day * (CELL_SIZE + props.cellGap) + CELL_SIZE / 2 + 3,
    }))
})

// --- ViewBox ---
const viewBox = computed(() => {
    const gridW = DAY_LABEL_OFFSET + WEEKS * (CELL_SIZE + props.cellGap) - props.cellGap
    const gridH = MONTH_LABEL_OFFSET + DAYS * (CELL_SIZE + props.cellGap) - props.cellGap
    return `0 0 ${gridW} ${gridH}`
})
</script>
