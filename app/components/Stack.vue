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
                        'bg-secondary',
                    )"
                    :to="item.href"
                    rel="noopener"
                    target="_blank"
                >
                    <Icon
                        :class="cn(
                            'size-3',
                            item.theme?.icon || '',
                        )"
                        :name="item.icon"
                        mode="svg"
                    />
                    <span class="capitalize text-neutral-800 dark:text-neutral-300/80">{{ item.name }}</span>
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
            icon: 'logos:javascript',
            href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        },
        {
            name: 'Tavascript',
            icon: 'devicon:typescript',
            href: 'https://www.typescriptlang.org/',
        },
        {
            name: 'Vue',
            icon: 'logos:vue',
            href: 'https://vuejs.org/',
        },
        {
            name: 'Nuxt',
            icon: 'devicon:nuxt',
            href: 'https://nuxt.com/',
        },
        {
            name: 'React',
            icon: 'logos:react',
            href: 'https://react.dev/',
        },
        {
            name: 'Tailwind Css',
            icon: 'material-icon-theme:tailwindcss',
            href: 'https://tailwindcss.com/',
        },
        {
            name: 'shadcn/ui/vue',
            icon: 'simple-icons:shadcnui',
            href: 'https://shadcn-vue.com/',
        },
        {
            name: 'TanStack',
            icon: 'simple-icons:tanstack',
            href: 'https://tanstack.com/',
        },
        {
            name: 'pnpm',
            icon: 'devicon:pnpm',
            href: 'https://pnpm.io/',
        },
        {
            name: 'Node.js',
            icon: 'devicon:nodejs',
            href: 'https://nodejs.org/',
        },
        {
            name: 'npm',
            icon: 'material-icon-theme:npm',
            href: 'https://npmjs.org/',
        },
        {
            name: 'Bun',
            icon: 'logos:bun',
            href: 'https://bun.sh/',
        },
        {
            name: 'Nitro',
            icon: 'unjs:nitro',
            href: 'https://nitro.build/',
        },
        {
            name: 'h3',
            icon: 'unjs:h3',
            href: 'https://h3.dev/',
        },
        {
            name: 'vite',
            icon: 'vscode-icons:file-type-vite',
            href: 'https://vite.dev/',
        },
        {
            name: 'cac',
            icon: 'tabler:hexagon',
            theme: {
                icon: 'text-[#8b7ee7]',
            },
            href: 'https://github.com/cacjs/cac',
        },
        {
            name: 'citty',
            icon: 'unjs:citty',
            href: 'https://unjs.io/packages/citty',
        },
    ],
    ai: [
        // ClaudeCode Codex Gemini QianWen
        {
            name: 'Claude Code',
            icon: 'material-icon-theme:claude',
            href: 'https://claude.ai/',
        },
        {
            name: 'codex',
            icon: 'icon:codex',
            theme: {
                icon: 'bg-clip-text bg-gradient-to-b from-[#B1A7FF] via-[#7A9DFF] to-[#3941FF] text-transparent',
            },
            href: 'https://chatgpt.com/codex/cloud',
        },
        {
            name: 'gemini',
            icon: 'vscode-icons:file-type-gemini',
            href: 'https://gemini.google.com/',
        },
    ],
}
</script>
