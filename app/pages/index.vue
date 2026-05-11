<template>
    <div class="layout relative z-10 w-full px-6 pt-8 pb-8 lg:px-8 lg:pt-12 lg:pb-20">
        <header class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6 mb-12">
            <ProfileImage />
            <div class="space-y-2">
                <div class="flex space-x-2">
                    <h1 class="font-semibold text-3xl sm:text-l font-[Borel]">
                        {{ user.nickname }}<span class="opacity-50 text-xl">({{ user.name }})</span>
                    </h1>
                </div>
                <div class="">
                    <FlipSentences :sentences="user.flipSentences" />
                </div>
            </div>
        </header>

        <section class="space-y-12">
            <Stack />
            <div class="fade-in-up">
                <TerminalBio command="cat about.md" />
                <div class="prose lg:prose-xs max-w-full space-y-4 text-neutral-800 dark:text-neutral-300/80">
                    <p>
                        👋 Hey there! I’m a front-end engineer from a water town in Jiangnan, where everything feels
                        gentle and refined — much like the way I pursue detail and perfection in my code.
                    </p>
                    <p>
                        Driven by a pure love for data in the very beginning, I gradually found my way into the
                        world of programming. In life, I enjoy chatting and laughing with friends, and that’s how I
                        earned the nickname “老司机” — a playful title that I’ve grown quite fond of. You can call
                        me that too, as casually as sitting down for a cup of tea on Pingjiang Road.
                    </p>
                </div>
            </div>
            <div class="fade-in-up">
                <TerminalBio command="cat activity.log" />
                <GithubContributionGraph username="lonewolfyx" color-theme="neutral" />
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
import Stack from '~/components/Stack.vue'

const { user } = useAppConfig()
</script>
