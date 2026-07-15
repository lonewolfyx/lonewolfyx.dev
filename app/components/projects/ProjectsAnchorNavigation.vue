<template>
    <aside class="fixed top-1/2 left-0 z-40 hidden h-fit w-16 -translate-y-1/2 justify-center xl:flex">
        <TooltipProvider :delay-duration="100">
            <nav
                aria-label="Project groups"
                class="w-12"
                @pointerleave="hoveredIndex = null"
            >
                <ul class="flex flex-col items-start">
                    <li
                        v-for="(item, index) in items"
                        :key="item.id"
                        class="h-3 w-full"
                    >
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <a
                                    :href="`#${item.id}`"
                                    :aria-current="activeId === item.id ? 'location' : undefined"
                                    :aria-label="item.organization"
                                    class="group flex h-3 w-full items-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                    @blur="focusedIndex = null"
                                    @click="navigateToSection($event, item.id)"
                                    @focus="focusedIndex = index"
                                    @pointerenter="hoveredIndex = index"
                                >
                                    <span
                                        :class="cn(
                                            'block h-0.5 bg-muted-foreground/40',
                                            'transition-[width,background-color] duration-200 ease-out motion-reduce:transition-none',
                                            interactionIndex === index && 'bg-foreground',
                                            interactionIndex === null && activeId === item.id && 'bg-foreground',
                                        )"
                                        :style="{ width: `${getLineWidth(index)}px` }"
                                        aria-hidden="true"
                                    />
                                </a>
                            </TooltipTrigger>

                            <TooltipContent
                                side="right"
                                :side-offset="8"
                            >
                                {{ item.organization }}
                            </TooltipContent>
                        </Tooltip>
                    </li>
                </ul>
            </nav>
        </TooltipProvider>
    </aside>
</template>

<script setup lang="ts">
import type { IOpenSource } from '~/types/open.source'
import { useIntersectionObserver, usePreferredReducedMotion } from '@vueuse/core'
import { computed, nextTick, onMounted, shallowRef, watch } from 'vue'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '~/components/ui/tooltip'
import { cn } from '~/lib/utils'

const props = defineProps<{
    items: Pick<IOpenSource, 'id' | 'organization'>[]
}>()

const route = useRoute()
const router = useRouter()
const preferredMotion = usePreferredReducedMotion()
const activeId = shallowRef(props.items[0]?.id ?? '')
const sectionElements = shallowRef<HTMLElement[]>([])
const hoveredIndex = shallowRef<number | null>(null)
const focusedIndex = shallowRef<number | null>(null)
const interactionIndex = computed(() => hoveredIndex.value ?? focusedIndex.value)

const MIN_LINE_WIDTH = 8
const MAX_LINE_WIDTH = 52
const LINE_WIDTH_STEP = 12

function getLineWidth(index: number) {
    if (interactionIndex.value === null)
        return MIN_LINE_WIDTH

    const distance = Math.abs(interactionIndex.value - index)
    return Math.max(MIN_LINE_WIDTH, MAX_LINE_WIDTH - distance * LINE_WIDTH_STEP)
}

function findSection(id: string) {
    return document.getElementById(id)
}

function getIdFromHash(hash: string) {
    try {
        return decodeURIComponent(hash.replace(/^#/, ''))
    }
    catch {
        return ''
    }
}

function syncActiveIdFromHash(hash: string) {
    const id = getIdFromHash(hash)

    if (props.items.some(item => item.id === id))
        activeId.value = id
}

async function navigateToSection(event: MouseEvent, id: string) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return

    const target = findSection(id)

    if (!target)
        return

    event.preventDefault()
    activeId.value = id

    if (event.detail > 0) {
        focusedIndex.value = null;

        (event.currentTarget as HTMLElement).blur()
    }

    if (route.hash !== `#${id}`)
        await router.push({ hash: `#${id}` })

    await nextTick()
    target.scrollIntoView({
        behavior: preferredMotion.value === 'reduce' ? 'auto' : 'smooth',
        block: 'start',
    })
}

useIntersectionObserver(
    sectionElements,
    (entries) => {
        const activeEntry = entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
            .at(0)

        if (activeEntry?.target.id)
            activeId.value = activeEntry.target.id
    },
    {
        rootMargin: '-20% 0px -65% 0px',
        threshold: 0,
    },
)

watch(
    () => route.hash,
    hash => syncActiveIdFromHash(hash),
)

onMounted(() => {
    sectionElements.value = props.items
        .map(item => findSection(item.id))
        .filter((section): section is HTMLElement => section !== null)

    const initialId = getIdFromHash(route.hash)

    if (!props.items.some(item => item.id === initialId))
        return

    activeId.value = initialId

    requestAnimationFrame(() => {
        findSection(initialId)?.scrollIntoView({ block: 'start' })
    })
})
</script>
