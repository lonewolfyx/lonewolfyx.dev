<template>
    <div class="relative w-full">
        <span class="flex items-center gap-2 text-xl mb-4">
            <Icon
                mode="svg"
                name="streamline-pixel:coding-apps-websites-finder"
            />
            Find Me
        </span>
        <div class="flex flex-col gap-4">
            <ul class="list-disc list-inside space-y-4">
                <li>
                    <NuxtLink
                        class="hover:underline hover:decoration-sky-500"
                        target="_blank"
                        to="https://github.com/lonewolfyx"
                    >
                        <span>Github</span>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'FindMe',
})
</script>

<style scoped>

</style>
