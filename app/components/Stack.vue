<template>
    <DefineTemplate v-slot="{ command, data }">
        <div class="fade-in-up">
            <TerminalBio :command="command" />
            <div class="flex flex-wrap items-center justify-start gap-2 ">
                <div
                    v-for="item in data"
                    :key="item.name"
                    :class="cn(
                        'flex items-center gap-2',
                        'text-xs font-medium',
                        'rounded-md px-2 py-1.5',
                        item.theme.background || 'bg-secondary',
                    )"
                >
                    <Icon
                        :name="item.icon"
                        mode="svg"
                        :class="cn(
                            'size-3',
                            item.theme.icon || 'text-white',
                        )"
                    />
                    <span
                        :class="cn(
                            'capitalize',
                            item.theme.text || 'text-white',
                        )"
                    >{{ item.name }}</span>
                </div>
            </div>
        </div>
    </DefineTemplate>
    <UseStack :data="stack.frontend" command="cat front.end.stack.md" />
    <UseStack :data="stack.ai" command="cat ai.stack.md" />
</template>

<script lang="ts" setup>
import { cn } from '~/lib/utils'

const [DefineTemplate, UseStack] = createReusableTemplate()

const stack = {
    frontend: [
        {
            name: 'Javascript',
            icon: 'simple-icons:javascript',
            theme: {
                icon: 'text-dark',
                text: 'text-dark',
                background: 'bg-[#f7df1e]',
            },
        },
        {
            name: 'Tavascript',
            icon: 'file-icons:typescript-alt',
            theme: {
                icon: 'text-white',
                text: 'text-white',
                background: 'bg-[#3178C6]',
            },
        },
        {
            name: 'Vue',
            icon: 'flowbite:vue-solid',
            theme: {
                icon: 'text-white',
                text: 'text-white',
                background: 'bg-[#4FC08D]',
            },
        },
        {
            name: 'Nuxt',
            icon: 'lineicons:nuxt',
            theme: {
                icon: 'text-white',
                text: 'text-white',
                background: 'bg-[#00DC82]',
            },
        },
        {
            name: 'React',
            icon: 'simple-icons:react',
            theme: {
                icon: 'text-dark',
                text: 'text-dark',
                background: 'bg-[#61DAFB]',
            },
        },
        {
            name: 'Tailwind Css',
            icon: 'mdi:tailwind',
            theme: {
                icon: 'text-white',
                text: 'text-white',
                background: 'bg-[#06B6D4]',
            },
        },
        {
            name: 'shadcn/ui/vue',
            icon: 'simple-icons:shadcnui',
            theme: {
                icon: 'text-white',
                text: 'text-white',
                background: 'bg-[#41B883]',
            },
        },
        {
            name: 'TanStack',
            icon: 'simple-icons:tanstack',
            theme: {
                icon: 'text-dark',
                text: 'text-dark',
            },
        },
        {
            name: 'pnpm',
            icon: 'file-icons:pnpm',
            theme: {
                icon: 'text-dark',
                text: 'text-dark',
                background: 'bg-[#f8ab00]',
            },
        },
        {
            name: 'Node.js',
            icon: 'simple-icons:npm',
            theme: {
                icon: 'text-white',
                text: 'text-white',
                background: 'bg-[#cb3837]',
            },
        },
        {
            name: 'Bun',
            icon: 'devicon-plain:bun',
            theme: {
                icon: 'text-white',
                text: 'text-white',
                background: 'bg-black dark:bg-secondary',
            },
        },
        {
            name: 'Nitro',
            icon: 'unjs:nitro',
            theme: {
                icon: 'text-white',
                text: 'text-white',
                background: 'bg-gradient-to-r from-[#31b2f3] via-[#f27cec] to-[#fd6641]',
            },
        },
        {
            name: 'h3',
            icon: 'unjs:h3',
            theme: {
                icon: 'text-dark',
                text: 'text-dark',
            },
        },
        {
            name: 'vite',
            icon: 'simple-icons:vite',
            theme: {
                icon: 'text-white',
                text: 'text-white',
                background: 'bg-[#8900ff]',
            },
        },
        {
            name: 'cac',
            icon: 'tabler:hexagon',
            theme: {
                icon: 'text-white',
                text: 'text-white',
                background: 'bg-[#8b7ee7]',
            },
        },
        {
            name: 'citty',
            icon: 'unjs:citty',
            theme: {
                icon: 'text-dark',
                text: 'text-dark',
            },
        },
    ],
    ai: [
        // ClaudeCode Codex Gemini QianWen
        {
            name: 'Claude Code',
            icon: 'simple-icons:claude',
            theme: {
                icon: 'text-white',
                text: 'text-white',
                background: 'bg-[#ff7043]',
            },
        },
        {
            name: 'codex',
            icon: 'icon:codex',
            theme: {
                icon: 'fill-white',
                text: 'text-white',
                background: 'bg-black dark:bg-secondary',
            },
        },
        {
            name: 'gemini',
            icon: 'lineicons:gemini',
            theme: {
                icon: 'text-white',
                text: 'text-white',
                background: 'bg-[#00b95c]',
            },
        },
    ],
}
</script>
