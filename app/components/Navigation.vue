<template>
    <div class="-translate-x-1/2 fixed bottom-0 left-1/2 z-40 w-full hidden lg:block">
        <Dock
            :direction="'bottom'"
            :magnification="30"
            class="mb-6"
        >
            <NuxtLink
                class="flex items-center justify-center"
                href="/"
            >
                <DockIcon class="bg-gray-200">
                    <Icon
                        :mode="'svg'"
                        class="w-20"
                        name="lucide:house"
                    />
                </DockIcon>
            </NuxtLink>
            <DockSeparator />
            <NuxtLink
                class="flex items-center justify-center"
                href="/blog"
            >
                <DockIcon class="bg-gray-200">
                    <Icon
                        class="size-full"
                        name="lucide:newspaper"
                    />
                </DockIcon>
            </NuxtLink>
            <NuxtLink
                class="flex items-center justify-center"
                href="/projects"
            >
                <DockIcon class="bg-gray-200">
                    <Icon
                        class="size-full"
                        name="lucide:chart-no-axes-gantt"
                    />
                </DockIcon>
            </NuxtLink>
            <DockSeparator />
            <NuxtLink
                class="flex items-center justify-center"
                :href="user.social.github"
                target="_blank"
            >
                <DockIcon class="bg-gray-200">
                    <Icon
                        class="size-full"
                        name="lucide:github"
                    />
                </DockIcon>
            </NuxtLink>
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
