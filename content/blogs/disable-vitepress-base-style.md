---
title: Disable vitepress base.css style
date: 2026-05-11
---

最近在用 `VitePress` 搭一套自定义主题，样式方案选了 `Tailwind CSS`，组件库用的是 `shadcn/ui/vue`。写到一半发现样式对不上，排查后发现是
`VitePress` 默认主题会引入 `base.css`，把 `Tailwind` 和 `shadcn` 的基础样式都给覆盖掉了。

## 问题原因

`VitePress` 默认主题的入口文件（`vitepress/dist/client/theme-default/without-fonts.js`）里有一行：

```ts
import './styles/base.css'
```

这个 `base.css` 包含了浏览器重置和一些全局样式，会跟 `Tailwind Preflight` 和 `shadcn` 基于 `CSS Variables` 的主题系统产生冲突。比如
`shadcn` 组件依赖 `--background`、`--foreground` 等变量来控制主题，而 `base.css` 会重置 `body` 等元素的颜色、字体、边距，导致组件样式表现不符合预期。

自定义主题时如果不需要这套默认样式，就需要想办法把它禁掉。

## 解决方案 「来自于 ChatGPT」

写一个 `Vite` 插件，拦截 `base.css` 的加载，返回空内容：

```ts
function disableVitePressBaseCss() {
    const virtualId = 'virtual:vitepress-empty-base-css'
    const resolvedVirtualId = `\0${virtualId}`

    return {
        name: 'disable-vitepress-base-css',
        enforce: 'pre' as const,

        resolveId(id: string, importer?: string) {
            // VitePress default theme:
            // vitepress/dist/client/theme-default/without-fonts.js
            // import './styles/base.css'
            if (
                id === './styles/base.css'
                && importer?.includes('vitepress')
                && importer?.includes('theme-default')
            ) {
                return resolvedVirtualId
            }

            if (
                id.includes('vitepress')
                && id.includes('theme-default/styles/base.css')
            ) {
                return resolvedVirtualId
            }

            return null
        },

        load(id: string) {
            if (id === resolvedVirtualId) {
                return ''
            }

            return null
        },
    }
}
```

插件做了两件事：

1. **`resolveId`** — 拦截来自 `VitePress` 默认主题对 `base.css` 的导入，将其重定向到一个虚拟模块 `ID`
2. **`load`** — 对这个虚拟模块返回空字符串，相当于引入了一个空文件

同时处理了相对路径（`./styles/base.css`）和绝对路径两种情况，避免在不同构建环境下漏拦截。

## 使用方式

在 `VitePress` 配置中注册这个插件即可：

```ts
import tailwindcss from '@tailwindcss/vite'
// .vitepress/config.ts
import { defineConfig } from 'vitepress'

export default defineConfig({
    vite: {
        plugins: [
            disableVitePressBaseCss(),
            tailwindcss()
        ],
    },
})
```

这样 `VitePress` 的 `base.css` 就不会被加载，可以完全由 `Tailwind CSS` 接管基础样式。
