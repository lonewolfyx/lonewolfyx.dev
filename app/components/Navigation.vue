<template>
    <div class="-translate-x-1/2 fixed bottom-0 left-1/2 z-40 w-full hidden lg:block">
        <Dock
            :direction="'bottom'"
            :magnification="30"
            class="mb-6"
        >
            <DockIcon class="bg-gray-200">
                <NuxtLink
                    class="flex items-center justify-center"
                    href="/"
                >
                    <Icon
                        :mode="'svg'"
                        class="w-20"
                        name="lucide:house"
                    />
                </NuxtLink>
            </DockIcon>
            <DockSeparator />
            <DockIcon class="bg-gray-200">
                <NuxtLink
                    class="flex items-center justify-center"
                    href="/blog"
                >
                    <Icon
                        class="size-full"
                        name="lucide:newspaper"
                    />
                </NuxtLink>
            </DockIcon>
            <DockIcon class="bg-gray-200">
                <NuxtLink
                    class="flex items-center justify-center"
                    href="/projects"
                >
                    <Icon
                        class="size-full"
                        name="lucide:chart-no-axes-gantt"
                    />
                </NuxtLink>
            </DockIcon>
            <DockSeparator />
            <DockIcon class="bg-gray-200">
                <NuxtLink
                    :href="user.social.github"
                    class="flex items-center justify-center"
                    target="_blank"
                >
                    <Icon
                        :mode="'svg'"
                        class="size-full"
                        name="lucide:github"
                    />
                </NuxtLink>
            </DockIcon>
            <!--            <DockIcon class="bg-gray-200"> -->
            <!--                <NuxtLink -->
            <!--                    :href="user.social.bluesky" -->
            <!--                    class="flex items-center justify-center" -->
            <!--                    target="_blank" -->
            <!--                > -->
            <!--                    <Icon -->
            <!--                        class="size-full" -->
            <!--                        name="ri:bluesky-fill" -->
            <!--                    /> -->
            <!--                </NuxtLink> -->
            <!--            </DockIcon> -->
            <!--            <DockIcon class="bg-gray-200"> -->
            <!--                <Icon -->
            <!--                    class="size-full" -->
            <!--                    name="lucide:rss" -->
            <!--                /> -->
            <!--            </DockIcon> -->
            <DockSeparator />
            <DockIcon class="bg-gray-200">
                <Icon
                    class="size-full"
                    name="lucide:sun"
                />
            </DockIcon>
        </Dock>
    </div>
</template>

<script lang="ts" setup>
import { Dock, DockIcon, DockSeparator } from '~/components/ui/dock'

const { user } = useAppConfig()
</script>
