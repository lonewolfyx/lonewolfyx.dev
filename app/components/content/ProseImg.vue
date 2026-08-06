<template>
    <div class="flex justify-center items-center">
        <img
            class="rounded-md"
            :src="refinedSrc"
            :alt="props.alt"
            :width="props.width"
            :height="props.height"
        >
    </div>
</template>

<script lang="ts" setup>
import { joinURL, withLeadingSlash, withTrailingSlash } from 'ufo'

const props = defineProps({
    src: {
        type: String,
        default: '',
    },
    alt: {
        type: String,
        default: '',
    },
    width: {
        type: [String, Number],
        default: undefined,
    },
    height: {
        type: [String, Number],
        default: undefined,
    },
})

const refinedSrc = computed(() => {
    if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
        const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL))
        if (_base !== '/' && !props.src.startsWith(_base)) {
            return joinURL(_base, props.src)
        }
    }
    return props.src
})
</script>
