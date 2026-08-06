---
title: 前端工具链的内卷现场：`import.meta.glob`
date: 2026-08-05
---

事情是这样子的，平时写代码能抄的绝不手写，能偷懒的绝不加班。

直到今天，我在一个非 `vite` 是`tsdown` 项目中，突然想偷个懒：把某个目录下的所有模块一口气导入进来。手指一抖，习惯性地敲出了：

```typescript
const modules = import.meta.glob('./modules/**/*.ts')
```

![TS2339](/ts2339.png)

写完后 `ts` 就提示了 `TS2339: Property 'glob' does not exist on type 'ImportMeta'` 错误。就是因为 `TypeScript` 默认的
`ImportMeta` 接口里根本没有 `glob`。因为[它是 `vite` 专属的](https://vite.dev/guide/features.html#glob-import) ，但是却在我这个
`tsdown` 中可以使用！

没错，就是那个被 `vite` 宠坏的 `import.meta.glob`。我原本以为它是 `vite` 的私生子，只能在 `vite` 家吃饭。结果它跑到 `tsdown`
的地盘上，依然活蹦乱跳，还一脸无辜地看着我：“咋了？我一直都在啊。”

对于强迫症的我，而且现在还是 `ai` 时代，我将错误告诉了 `ai`，它说：`tsdown` 也单独实现了 `tsdown/client`
，具体可以查阅: [https://tsdown.dev/reference/api/Interface.UserConfig#globimport](https://tsdown.dev/reference/api/Interface.UserConfig#globimport)

解决 `ts` 红色错误只需要在 `tsconfig.json` 中配置：

```json
{
    "compilerOptions": {
        "types": [
            "tsdown/client"
        ]
    }
}
```

当然他们背后的原理其实都是基于强大的 `rolldown`:

- https://github.com/vitejs/vite/blob/main/packages/vite/src/node/plugins/importMetaGlob.ts
- https://github.com/rolldown/tsdown/blob/main/src/features/rolldown.ts#L174
- https://github.com/rolldown/rolldown/blob/main/crates/rolldown_plugin_vite_import_glob/src/lib.rs

其实仔细想一想也没什么任何毛病，驱动 `vite` 与 `tsdown` 都是 `rolldown`，既然底层实现都一样，那么 `tsdown` 也可以支持
`import.meta.glob`

最后说一句，这个语法不再是 `vite` 的专利了。

以前在非 `vite` 项目里想做动态批量导入，基本就两条路：

- 手写一堆 `import`，然后手动组装对象（代码又臭又长，还容易漏）
- 用第三方库的 glob 去扫描文件夹

现在直接：

```ts
const modules = import.meta.glob('./modules/**/*.ts', { eager: true })
```

一行解决，干净利落。

再也不用在“优雅”和“能跑”之间做选择题了。

![yyx-bu-kan-wen-dang](/yyx-bu-kan-wen-dang.jpg){:height="327px" width="450px"}
