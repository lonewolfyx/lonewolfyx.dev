<template>
    <ClientOnly>
        <div
            :class="cn(
                'fixed top-4 right-4 z-50',
                'text-xs tracking-wider',
                'text-gray-600 dark:text-gray-300',
                'hidden md:flex',
            )"
        >
            <div class="flex items-center">
                <Button
                    v-for="items in navigation"
                    :key="items.key"
                    as-child
                    variant="ghost"
                >
                    <NuxtLink :to="items.href">
                        <span class="text-xs">{{ items.name }}</span>
                    </NuxtLink>
                </Button>
                <GitHubLink />
                <ModeSwitcher />
            </div>
        </div>
    </ClientOnly>
</template>

<script lang="ts" setup>
import { Button } from '~/components/ui/button'
import GitHubLink from '~/components/GitHubLink.vue'
import { cn } from '~/lib/utils'

const navigation: {
    key: string
    name: string
    href: string
}[] = [
    {
        key: 'home',
        name: 'Home',
        href: '/',
    },
    {
        key: 'project',
        name: 'Project',
        href: '/projects',
    },
    {
        key: 'blogs',
        name: 'Blogs',
        href: '/blogs',
    },
]
</script>
