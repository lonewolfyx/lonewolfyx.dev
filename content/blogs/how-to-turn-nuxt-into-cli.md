---
title: 如何把一个 Nuxt 项目做成 CLI 启动工具
date: 2026-04-21
---

2026 年，**vibe coding 全面爆发**。
大家一边「AI 帮我写代码」，一边「我这个月 token 到底烧了多少」。

然后我就发现了一个很火的项目：[ccusage](https://github.com/ryoppippi/ccusage)

本来以为它能让我优雅地围观 token 消耗。结果上手一看：

> * 能看，但主要是 **CLI 表格**
> * 想看别的平台消耗？**再开一个 CLI**
> * 想看趋势图、项目维度、单次会话消耗？
    > **不好意思，自己想办法**

我当时的内心活动大概是：

> 都 2026 年了, 我还在终端里数 token, 像在算盘上做数据分析。🙂

于是我摸鱼了几天，基于这个项目整了一个数据看板：[usage-board](https://github.com/lonewolfyx/usage-board) 欢迎各位佬来点
*star* ✨, 要是能上 `awesome-hot` 就更好了 🔥

## 一开始的想法很简单

我的需求其实非常朴素：

* 我想看 **Token 消耗趋势图**
* 我想看 **某个项目的使用情况**
* 我想看 **每次会话到底花了多少**
* 我想看 **多个平台的统一数据入口**

翻译成人话就是：

> 我不想为了看个消耗，
>
> 终端开得像在执行什么国家级任务。

所以，直接开干。

## 技术栈？那必然是 Nuxt 啊

作为 **Nuxt 热爱粉**，选型这件事我几乎没有犹豫。但快乐只持续到了开始思考 CLI 启动方式之前。因为我的理想状态是：

```shell
npx usage-board@latest
```

一条命令，项目直接跑起来。 优雅、自然、丝滑，像什么都没发生过。

但是问题来了 —— 这玩意儿是个 **Nuxt 项目**, 而 Nuxt 的底层 server，又是 **Nitro + H3**
这一套。也就是说，它不是那种你拍拍脑袋塞个静态资源就能彻底糊过去的项目。

当时我无脑参考了 `antfu` 写的 `eslint/config-inspector` 因为它也实现了 **CLI 一条命令启动项目** 这个目标。

我心想：

> 抄作业这件事，站在巨人的肩膀上，不丢人。

结果抄着抄着发现问题不对劲了。它的 `Nitro` 部署预设是 `preset: "static"` 也就是说，**它只打包静态资源**。于是问题就出现了:
**会被迫写两套接口**

一套写在 **Nuxt server** 里。另一套写在 **CLI 启动的客户端服务** 里。

虽然这两份逻辑可以共用公共函数，但本质上你还是写了两套。这个感觉就像：

> 本来只是想点一杯奶茶，
> 最后店员让我自己种茶、养牛、炼糖。🙂

### 为什么会这样？

因为 `static` 预设下，**server 层没了**。所以如果 `CLI` 模式还想让客户端拿到数据，你只能自己再额外起一份 **H3 server**
给它用。

昨天我本来只是想继续完善新的数据模块。 然后脑子里突然冒出一个问题：

> 以项目的维护去查阅数据看板，未来数据量肯定会越来越大。
>
> 难道我要把所有数据都塞进一条 API 里硬顶吗？

显然不现实。于是开始考虑 `WebSocket` 毕竟看板这种场景，天然适合流式更新、分批推送。

但紧接着我又愣住了：**_如果继续沿用之前那种架构_** 那不就还是要维护两份服务逻辑？写到这里我突然意识到：

> 坑不是功能复杂，
>
> 坑是我一开始架构选歪了。

### 于是我开始疯狂翻文档

重点来了：

**一定要多看文档！！！**
**一定要多看文档！！！**
**一定要多看文档！！！**

<img width="450" height="327" alt="yyx-bu-kan-wen-dang" src="/yyx-bu-kan-wen-dang.jpg" />

真的。很多时候不是框架不行，是我们自己先入为主，把自己写进了死胡同。我在翻 Nitro 文档的时候，突然看到一件事：

> **Nitro 的 preset 是可以改的。**

灵感“啪”一下就来了。

### 然后我开始研究 build 产物

我先去看 **不设置 preset** 时 `Nuxt build` 的结果。结果发现它默认就是会帮你起一个 `server` 的。熟悉 `Nuxt`
的老登应该都知道，最终执行信息可以在 `.output/nitro.json` 里看到。

这个时候它实际执行的是 `node server/index.mjs` 再往里翻代码，细看一下:

```js
import process from 'node:process'
import 'node:http'
import 'node:https'
import 'node:events'
import 'node:buffer'
import 'node:fs'
import 'node:path'
import 'node:crypto'
import 'node:url'
import '@iconify/utils'
import 'consola'

globalThis._importMeta_ = { url: import.meta.url, env: process.env }

export { F as default } from './chunks/nitro/nitro.mjs'
```

```js {name="./chunks/nitro/nitro.mjs"}
const cert = process.env.NITRO_SSL_CERT
const key = process.env.NITRO_SSL_KEY
const nitroApp = useNitroApp()
const server = cert && key
    ? new Server({
            key,
            cert
        }, toNodeListener(nitroApp.h3App))
    : new Server$1(toNodeListener(nitroApp.h3App))
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3
const host = process.env.NITRO_HOST || process.env.HOST
const path = process.env.NITRO_UNIX_SOCKET
const listener = server.listen(path ? { path } : { port, host }, (err) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    const protocol = cert && key ? 'https' : 'http'
    const addressInfo = listener.address()
    if (typeof addressInfo === 'string') {
        console.log(`Listening on unix socket ${addressInfo}`)
        return
    }
    const baseURL = (useRuntimeConfig().app.baseURL || '').replace(/\/$/, '')
    const url = `${protocol}://${addressInfo.family === 'IPv6' ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`
    console.log(`Listening on ${url}`)
})
trapUnhandledNodeErrors()
setupGracefulShutdown(listener, nitroApp)
const nodeServer = {}
```

很快就会发现一个关键事实 `Nitro` 默认产物里，其实已经帮你把 `server` 启动逻辑写好了，它内部会去创建 `Node` 的
`HTTP/HTTPS Server`然后把 `nitroApp.h3App` 通过 `toNodeListener` 挂进去。

换句话说：

> 你以为它只是打包。
>
> 实际上它连怎么跑都替你安排明白了。

接着我又去看 `preset: "node"` 的 build 结果。这次发现了一个关键区别。默认情况下导出大概是这种：

```js
export { F as default } from './chunks/nitro/nitro.mjs'
```

而在 `preset: node` 下，变成了：

```js
export { F as handler, G as listener, H as websocket } from './chunks/nitro/nitro.mjs'
```

看到这里我整个人一下就精神了。这不就是我想要的吗？它直接把 `server` 层相关能力给你喷射出来了：

* `handler`
* `listener`
* `websocket`

尤其是这个 `listener`，本质上就是：

```js
const listener = toNodeListener(nitroApp.h3App)
```

这意味着完全可以把 `Nuxt` 自己封装好的 `server` 能力直接拿来用，然后在 `CLI` 启动的时候，直接喂给：

```js
createServer(listener)
```

到这里，整个架构就彻底顺了。也就是说，我根本不需要再像之前那样：

* 在 `src` 下面再维护一份 CLI 服务逻辑
* 再额外造一套 H3 接口
* 再手动同步 `Nuxt server` 和 `CLI server` 的行为

这样做就会得到一个:

* 公共计算逻辑全部收拢到 **Nuxt server**
* `CLI` 启动时，直接复用 `Nitro build` 后导出的 `listener`
* 统一走 `Nuxt` 约束目录和服务体系
* 后续无论是 `API` 还是 `WebSocket`，都只维护一套

> 一份服务逻辑，多种运行方式，而不是复制粘贴式架构修仙。

从一开始 `copy` 的 `eslint/config-inspector` 那套 `src` 方案，现在基本都可以删掉了。原本放在 `src`
下那些和数据看板计算相关的内容，都可以老老实实搬回 **Nuxt server**。

最终 `CLI` 做的事情也变得非常单纯把 `Nitro` 喷射出来的事件监听，交给 `Node` 的 `createServer` 就完事了

从此之后：

* 不需要双份接口
* 不需要双份服务实现
* 不需要一边写 `Nuxt server`，一边写 `CLI server`
* `WebSocket` 扩展也更自然

至此，我们就可以优雅的享受 `Nuxt` 的 `server` 层能力了。`cli.ts` 如下:

```ts
import type { IncomingMessage, ServerResponse } from 'node:http'
import type { IOptions } from '~~/src/types'
import { createServer } from 'node:http'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import cac from 'cac'
import { getPort } from 'get-port-please'
import open from 'open'
import { name, version } from '../package.json' with { type: 'json' }

type NodeListener = (
    req: IncomingMessage,
    res: ServerResponse,
) => void | Promise<void>

const cli = cac(name)

async function loadNitroListener(outputDir: string): Promise<NodeListener> {
    const entryPath = resolve(outputDir, 'server/index.mjs')

    const mod = await import(entryPath)
    return mod.listener
        ?? mod.middleware
        ?? mod.handler
        ?? mod.default
        ?? mod
}

cli.command('', 'Start tokens usage analysis')
    .option('--host <host>', 'Host', { default: '127.0.0.1' })
    .option('--port <port>', 'Port', { default: 7777 })
    .option('--open', 'Open browser', { default: true })
    .action(async (option: IOptions) => {
        const port = await getPort({
            port: option.port,
            portRange: [7777, 9000],
        })

        const root = dirname(fileURLToPath(import.meta.url))
        const outputDir = resolve(root, './')
        const lister = await loadNitroListener(outputDir)

        const app = createServer(async (req, res) => {
            await lister(req, res)
        })

        app.listen(port, option.host, async () => {
            if (option.open) {
                const url = `http://${option.host}:${port}`
                console.log(`Usage board is running at ${url}`)
                await open(url)
            }
        })
    })

cli.help()
cli.version(version)
cli.parse()
```

> 不要问为什么不用 process.argv.slice(2) 去做解析，因为我喜欢用 `cac` `citty` 且它很优雅便捷

## 结尾的结尾，来点 star gie~ gie~

* [usage-board](https://github.com/lonewolfyx/usage-board) ✨✨✨
