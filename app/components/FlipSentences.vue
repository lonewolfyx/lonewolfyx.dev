<template>
    <AnimatePresence
        :initial="false"
        mode="wait"
    >
        <Motion
            :key="`current-sentence-${currentSentence}`"
            as="p"
            :animate="{
                y: 0,
                opacity: 1,
            }"
            :class="cn(
                'text-sm text-balance text-muted-foreground select-none',
            )"
            :exit="{
                y: -8,
                opacity: 0,
            }"
            :initial="{
                y: 8,
                opacity: 0,
            }"
            :transition="{
                duration: 0.3,
                ease: 'linear',
            }"
        >
            {{ sentences[currentSentence] }}
        </Motion>
    </AnimatePresence>
</template>

<script lang="ts" setup>
import { AnimatePresence, Motion } from 'motion-v'
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

defineOptions({
    name: 'FlipSentences',
})

interface IProps {
    class?: HTMLAttributes['class']
    sentences: string[]
}

const props = defineProps<IProps>()

const currentSentence = ref(0)
let intervalRef: ReturnType<typeof setInterval> | null = null

const startAnimation = () => {
    intervalRef = setInterval(() => {
        currentSentence.value
            = (currentSentence.value + 1) % props.sentences.length
    }, 2500)
}

onMounted(() => {
    startAnimation()

    const handleVisibility = () => {
        if (document.visibilityState !== 'visible' && intervalRef) {
            clearInterval(intervalRef)
            intervalRef = null
        }
        else if (document.visibilityState === 'visible') {
            currentSentence.value
                = (currentSentence.value + 1) % props.sentences.length
            startAnimation()
        }
    }

    document.addEventListener('visibilitychange', handleVisibility)

    onBeforeUnmount(() => {
        if (intervalRef) clearInterval(intervalRef)
        document.removeEventListener('visibilitychange', handleVisibility)
    })
})
</script>

<style scoped>

</style>
