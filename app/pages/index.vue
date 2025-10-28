<template>
    <div class="layout relative z-10 w-full px-6 pt-8 pb-8 lg:px-8 lg:pt-12 lg:pb-20">
        <header class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <ProfileImage />
            <div class="space-y-2">
                <div class="flex space-x-2">
                    <h1 class="font-semibold text-3xl sm:text-l">
                        {{ user.nickname }}<span class="opacity-50 text-xl">({{ user.name }})</span>
                    </h1>
                </div>
                <div class="">
                    <FlipSentences :sentences="user.flipSentences" />
                </div>
            </div>
        </header>

        <section class="mt-12">
            <h2 class="mb-3 font-medium text-lg">
                About
            </h2>
            <div class="prose lg:prose-xl space-y-4 text-neutral-800 dark:text-neutral-300/80">
                <p>
                    Hi, l'm front-end developer and l dream of joining and contributing to the open source community.
                </p>
                <p>
                    As a passionate engineer and a geek who loves open source, l love building software at the
                    sweet spot of design, problem solving, and engineering - creating something that not only
                    looks good but is also easy to use and has a good underlying architecture
                </p>
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
import ProfileImage from '~/components/ProfileImage.vue'

const { user } = useAppConfig()
</script>
