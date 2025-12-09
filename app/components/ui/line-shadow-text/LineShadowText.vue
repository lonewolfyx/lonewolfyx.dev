<template>
    <component
        :is="as"
        :class="cn(
            'relative z-0 inline-flex',
            'after:absolute after:left-[0.04em] after:top-[0.04em] after:-z-10',
            'bg-[linear-gradient(45deg,transparent_45%,var(--shadow-color)_45%,var(--shadow-color)_55%,transparent_0)]',
            'bg-[length:0.06em_0.06em] bg-clip-text text-transparent',
            'animate-line-shadow',
            props.class,
        )"
        class="shadow-color"
    >
        <slot />
    </component>
</template>

<script lang="ts" setup>
import { cn } from '@/lib/utils'
import { useSlots, type VNode } from 'vue'

interface LineShadowTextProps {
    shadowColor?: string
    as?: keyof HTMLElement
    class?: string
}

const props = withDefaults(defineProps<LineShadowTextProps>(), {
    shadowColor: 'black',
    as: 'span' as keyof HTMLElement,
})

const slots = useSlots() as Record<string, () => VNode[]>
const children = slots?.default ? slots.default()[0]?.children : null

const content = typeof children === 'string' ? children : null

if (!content) {
    throw new Error('LineShadowText only accepts string content')
}
</script>

<style scoped>
.shadow-color {
    --shadow-color: v-bind(props.shadowColor);
}

.animate-line-shadow {
    animation: line-shadow 15s linear infinite;
}

@keyframes line-shadow {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: 100% -100%;
    }
}
</style>
