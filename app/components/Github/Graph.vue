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
                    :class="cell.color"
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
// Tailwind CSS fill color themes (5 levels: 0=empty, 1-4=low→high)
export const THEMES = {
    red: ['fill-red-100', 'fill-red-300', 'fill-red-500', 'fill-red-600', 'fill-red-800'],
    orange: ['fill-orange-100', 'fill-orange-300', 'fill-orange-500', 'fill-orange-600', 'fill-orange-800'],
    amber: ['fill-amber-100', 'fill-amber-300', 'fill-amber-500', 'fill-amber-600', 'fill-amber-800'],
    yellow: ['fill-yellow-100', 'fill-yellow-300', 'fill-yellow-500', 'fill-yellow-600', 'fill-yellow-800'],
    lime: ['fill-lime-100', 'fill-lime-300', 'fill-lime-500', 'fill-lime-600', 'fill-lime-800'],
    green: ['fill-green-100', 'fill-green-300', 'fill-green-500', 'fill-green-600', 'fill-green-800'],
    emerald: ['fill-emerald-100', 'fill-emerald-300', 'fill-emerald-500', 'fill-emerald-600', 'fill-emerald-800'],
    teal: ['fill-teal-100', 'fill-teal-300', 'fill-teal-500', 'fill-teal-600', 'fill-teal-800'],
    cyan: ['fill-cyan-100', 'fill-cyan-300', 'fill-cyan-500', 'fill-cyan-600', 'fill-cyan-800'],
    sky: ['fill-sky-100', 'fill-sky-300', 'fill-sky-500', 'fill-sky-600', 'fill-sky-800'],
    blue: ['fill-blue-100', 'fill-blue-300', 'fill-blue-500', 'fill-blue-600', 'fill-blue-800'],
    indigo: ['fill-indigo-100', 'fill-indigo-300', 'fill-indigo-500', 'fill-indigo-600', 'fill-indigo-800'],
    violet: ['fill-violet-100', 'fill-violet-300', 'fill-violet-500', 'fill-violet-600', 'fill-violet-800'],
    purple: ['fill-purple-100', 'fill-purple-300', 'fill-purple-500', 'fill-purple-600', 'fill-purple-800'],
    fuchsia: ['fill-fuchsia-100', 'fill-fuchsia-300', 'fill-fuchsia-500', 'fill-fuchsia-600', 'fill-fuchsia-800'],
    pink: ['fill-pink-100', 'fill-pink-300', 'fill-pink-500', 'fill-pink-600', 'fill-pink-800'],
    rose: ['fill-rose-100', 'fill-rose-300', 'fill-rose-500', 'fill-rose-600', 'fill-rose-800'],
    slate: ['fill-slate-100', 'fill-slate-300', 'fill-slate-500', 'fill-slate-600', 'fill-slate-800'],
    gray: ['fill-gray-100', 'fill-gray-300', 'fill-gray-500', 'fill-gray-600', 'fill-gray-800'],
    zinc: ['fill-zinc-100', 'fill-zinc-300', 'fill-zinc-500', 'fill-zinc-600', 'fill-zinc-800'],
    neutral: ['fill-neutral-100', 'fill-neutral-300', 'fill-neutral-500', 'fill-neutral-600', 'fill-neutral-800'],
    stone: ['fill-stone-100', 'fill-stone-300', 'fill-stone-500', 'fill-stone-600', 'fill-stone-800'],
    taupe: ['fill-taupe-100', 'fill-taupe-300', 'fill-taupe-500', 'fill-taupe-600', 'fill-taupe-800'],
    mauve: ['fill-mauve-100', 'fill-mauve-300', 'fill-mauve-500', 'fill-mauve-600', 'fill-mauve-800'],
    mist: ['fill-mist-100', 'fill-mist-300', 'fill-mist-500', 'fill-mist-600', 'fill-mist-800'],
    olive: ['fill-olive-100', 'fill-olive-300', 'fill-olive-500', 'fill-olive-600', 'fill-olive-800'],
}
export type ThemeName = keyof typeof THEMES

export interface ContributionDay {
    date: string
    count: number
}
</script>

<script lang="ts" setup>
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

const props = withDefaults(defineProps<Props>(), {
    colorLevels: () => ['fill-green-100', 'fill-green-300', 'fill-green-500', 'fill-green-600', 'fill-green-800'],
    cellGap: 3,
    cellRadius: 2,
    showMonthLabels: true,
    showDayLabels: true,
})

const WEEKS = 52
const DAYS = 7
const CELL_SIZE = 8
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
