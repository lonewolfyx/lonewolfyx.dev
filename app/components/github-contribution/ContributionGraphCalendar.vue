<template>
    <div class="max-w-full overflow-x-auto overflow-y-hidden no-scrollbar">
        <svg
            :height="100"
            :viewBox="`0 0 ${width} ${height}`"
            role="img"
            width="100%"
        >
            <!-- month -->
            <g
                :transform="`translate(${leftPadding}, ${monthLabelHeight})`"
                class="months"
            >
                <text
                    v-for="m in monthLabels"
                    :key="m.weekIndex"
                    :x="m.x"
                    class="font-mono text-xs text-gray-500"
                    y="0"
                >
                    {{ m.label }}
                </text>
            </g>

            <g :transform="`translate(${leftPadding}, ${topOffset})`">
                <rect
                    v-for="cell in cells"
                    :key="cell.date"
                    :fill="getColor(cell.count)"
                    :height="cellSize"
                    :rx="2"
                    :ry="2"
                    :width="cellSize"
                    :x="cell.x"
                    :y="cell.y"
                    class="cursor-pointer"
                >
                    <title>{{ cell.date }} — {{ cell.count }}</title>
                </rect>
            </g>
        </svg>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { addDays, diffDays, generateGradient, hexToRgb, parseDate, rgbToHex } from './index'

defineOptions({
    name: 'ContributionGraphCalendar',
})

const props = defineProps<{
    contributions: Array
    cellSize: number
    cellPadding: number
    colorScale: 'linear' | 'log'
    levels: number
    startDate?: string
    endDate?: string
    showWeeks: boolean
    baseColor: string
}>()

const {
    contributions,
    colorScale,
    levels,
    cellSize,
    cellPadding,
    startDate,
    endDate,
    showWeeks,
    baseColor,
} = toRefs(props)

const contribMap = computed(() => {
    const map = new Map()
    for (const item of contributions.value) map.set(item.date, item.count)
    return map
})

const start = computed(() => {
    if (startDate.value) return parseDate(startDate.value)
    const d = addDays(end.value, -7 * 52 + 1)
    return addDays(d, -d.getDay())
})

const end = computed(() => endDate.value ? parseDate(endDate.value) : new Date())

const adjustedEnd = computed(() => {
    const e = new Date(end.value)
    const day = e.getDay()
    if (day < 6) return addDays(e, 6 - day)
    return e
})

const weeks = computed(() => {
    const days = diffDays(adjustedEnd.value, start.value) + 1
    const weeksCount = Math.ceil(days / 7)
    return Array.from({
        length: weeksCount,
    }, (_, i) => addDays(start.value, i * 7))
})

const cells = computed(() => {
    const arr = []
    for (let wi = 0; wi < weeks.value.length; wi++) {
        for (let weekday = 0; weekday < 7; weekday++) {
            const d = addDays(weeks.value[wi], weekday)
            if (d < start.value) continue
            const dateStr = useDateFormat(d, 'YYYY-MM-DD')
            const count = contribMap.value.get(dateStr.value) || 0
            const x = wi * (cellSize.value + cellPadding.value)
            const y = weekday * (cellSize.value + cellPadding.value)
            arr.push({ date: dateStr.value, count, x, y })
        }
    }
    return arr
})

const monthLabels = computed(() => {
    const labels = []
    const seen = new Set()

    for (const cell of cells.value) {
        const d = parseDate(cell.date)
        if (d.getDate() !== 1) continue
        const key = `${d.getFullYear()}-${d.getMonth()}`
        if (seen.has(key)) continue
        seen.add(key)
        const weekIndex = Math.round(cell.x / (cellSize.value + cellPadding.value))
        const x = weekIndex * (cellSize.value + cellPadding.value)
        labels.push({ label: d.toLocaleString('en-US', { month: 'short' }), weekIndex, x })
    }

    return labels
})

const leftPadding = showWeeks.value ? 40 : 0
const monthLabelHeight = 18
const topOffset = monthLabelHeight + 6

const width = computed(() => {
    const lastX = cells.value.length ? Math.max(...cells.value.map(c => c.x)) : 0
    return leftPadding + lastX + cellSize.value + 10
})

const height = computed(() => topOffset + 7 * (cellSize.value + cellPadding.value))

const maxCount = computed(() => Math.max(0, ...cells.value.map(c => c.count)))
const colorStops = computed(() => generateGradient(baseColor.value, levels.value))

const getColor = (count: number) => {
    if (maxCount.value === 0) return colorStops.value[0]

    const t = colorScale.value === 'log'
        ? Math.log1p(count) / Math.log1p(maxCount.value)
        : count / maxCount.value

    const stops = colorStops.value.map(hexToRgb)
    const seg = (stops.length - 1) * t
    const idx = Math.floor(seg)
    const frac = seg - idx
    const c1 = stops[Math.min(idx, stops.length - 1)]
    const c2 = stops[Math.min(idx + 1, stops.length - 1)]
    const rgb = [0, 1, 2].map(i => Math.round(c1[i] + (c2[i] - c1[i]) * frac))

    return rgbToHex(...rgb)
}
</script>
