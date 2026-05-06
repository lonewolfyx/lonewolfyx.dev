<template>
    <DefineTemplate v-slot="{ command, data }">
        <div class="fade-in-up">
            <TerminalBio :command="command" />
            <div class="flex flex-wrap items-center justify-start gap-2 ">
                <NuxtLink
                    v-for="item in data"
                    :key="item.name"
                    :class="cn(
                        'flex items-center gap-2',
                        'text-xs font-medium',
                        'rounded-md px-2 py-1.5',
                        item.theme.background || 'bg-secondary',
                    )"
                    :to="item.href"
                    target="_blank"
                    rel="noopener"
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
                </NuxtLink>
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
            href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        },
        {
            name: 'Tavascript',
            icon: 'file-icons:typescript-alt',
            theme: {
                icon: 'text-white',
                text: 'text-white',
                background: 'bg-[#3178C6]',
            },
            href: 'https://www.typescriptlang.org/',
        },
        {
            name: 'Vue',
            icon: 'flowbite:vue-solid',
            theme: {
                icon: 'text-white',
                text: 'text-white',
                background: 'bg-[#4FC08D]',
            },
            href: 'https://vuejs.org/',
        },
        {
            name: 'Nuxt',
            icon: 'lineicons:nuxt',
            theme: {
                icon: 'text-white',
                text: 'text-white',
                background: 'bg-[#00DC82]',
            },
            href: 'https://nuxt.com/',
        },
        {
            name: 'React',
            icon: 'simple-icons:react',
            theme: {
                icon: 'text-dark',
                text: 'text-dark',
                background: 'bg-[#61DAFB]',
            },
            href: 'https://react.dev/',
        },
        {
            name: 'Tailwind Css',
            icon: 'mdi:tailwind',
            theme: {
                icon: 'text-white',
                text: 'text-white',
                background: 'bg-[#06B6D4]',
            },
            href: 'https://tailwindcss.com/',
        },
        {
            name: 'shadcn/ui/vue',
            icon: 'simple-icons:shadcnui',
            theme: {
                icon: 'text-white',
                text: 'text-white',
                background: 'bg-[#41B883]',
            },
            href: 'https://shadcn-vue.com/',
        },
        {
            name: 'TanStack',
            icon: 'simple-icons:tanstack',
            theme: {
                icon: 'text-dark',
                text: 'text-dark',
            },
            href: 'https://tanstack.com/',
        },
        {
            name: 'pnpm',
            icon: 'file-icons:pnpm',
            theme: {
                icon: 'text-dark',
                text: 'text-dark',
                background: 'bg-[#f8ab00]',
            },
            href: 'https://pnpm.io/',
        },
        {
            name: 'Node.js',
            icon: 'simple-icons:npm',
            theme: {
                icon: 'text-white',
                text: 'text-white',
                background: 'bg-[#cb3837]',
            },
            href: 'https://nodejs.org/',
        },
        {
            name: 'Bun',
            icon: 'devicon-plain:bun',
            theme: {
                icon: 'text-white',
                text: 'text-white',
                background: 'bg-black dark:bg-secondary',
            },
            href: 'https://bun.sh/',
        },
        {
            name: 'Nitro',
            icon: 'unjs:nitro',
            theme: {
                icon: 'text-white',
                text: 'text-white',
                background: 'bg-gradient-to-r from-[#31b2f3] via-[#f27cec] to-[#fd6641]',
            },
            href: 'https://nitro.build/',
        },
        {
            name: 'h3',
            icon: 'unjs:h3',
            theme: {
                icon: 'text-dark',
                text: 'text-dark',
            },
            href: 'https://h3.dev/',
        },
        {
            name: 'vite',
            icon: 'simple-icons:vite',
            theme: {
                icon: 'text-white',
                text: 'text-white',
                background: 'bg-[#8900ff]',
            },
            href: 'https://vite.dev/',
        },
        {
            name: 'cac',
            icon: 'tabler:hexagon',
            theme: {
                icon: 'text-white',
                text: 'text-white',
                background: 'bg-[#8b7ee7]',
            },
            href: 'https://github.com/cacjs/cac',
        },
        {
            name: 'citty',
            icon: 'unjs:citty',
            theme: {
                icon: 'text-dark',
                text: 'text-dark',
            },
            href: 'https://unjs.io/packages/citty',
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
            href: 'https://claude.ai/',
        },
        {
            name: 'codex',
            icon: 'icon:codex',
            theme: {
                icon: 'fill-white',
                text: 'text-white',
                background: 'bg-black dark:bg-secondary',
            },
            href: 'https://chatgpt.com/codex/cloud',
        },
        {
            name: 'gemini',
            icon: 'lineicons:gemini',
            theme: {
                icon: 'text-white',
                text: 'text-white',
                background: 'bg-[#00b95c]',
            },
            href: 'https://gemini.google.com/',
        },
    ],
}
</script>
