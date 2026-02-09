---
title: 2026 过年前的总结
date: 2026-02-09
---

2026年1月1号到过年前夕（大概2.16左右），别人已经在卷春运抢票、卷红包封面、卷年夜饭菜单，我却在 **9000**
自习室「这是一个远方的小梗」窝着卷代码、release……

卷到最后发现：**怎么写了这么多有趣的小工具呢**。「大多数的情况下是写一个公司工具顺便奖励了自己一个小工具（PS: **别学**）」

结果短短一个半月，甩出了 `emmm` 个纯刀片级小玩具，全是自己被坑惨后边骂边写的东西～

现在打包成这份“过年前爆肝自救清单”，`npx` 即用、`0` 依赖、用完即扔但离了它真难受！

前端的宝子们，过年前冲一波 `star`，回家吃饺子也能安心点 😂

## 过年前已开源的小玩具

1. **pkgrab** —— npm 包名抢注神器

灵感来了想了个绝妙包名，结果一查已经被占？过年前抢名额的焦虑谁懂！

`npx pkgrab <name>` 一键检查可用性 + 自动初始化 + 占位发布，直接把心仪名字锁死。

再也不用除夕夜蹲 npm 页面刷新了，特别适合起新库、个人品牌包、灵感爆发期的你！

🔗 https://github.com/lonewolfyx/pkgrab

2. **git-ping** —— GitHub 用户/组织名存活检测

想建组织、起项目名，结果账号压根不存在？社死预警！

`pnpm dlx git-ping <name>` 超快 ping 一下是否存在，秒出结果，避免尴尬瞬间。

🔗 https://github.com/lonewolfyx/git-ping

3. **rmcache** —— 项目开发环境下缓存清除器

通常在业务项目开发中，会生成 **.lock.yaml** 文件，`node_modules`目录以及一些比如 `Nuxt` 项目生成的 `.nuxt` 目录，或者是

`monorepo` 项目下会有多个 `node_modules` 目录，在想删的时候就可能需要写一份专属项目的 `clear.ts` 文件去 `remove` 这些。

现在只需要执行 `npx rmcache` 一键扫荡常见缓存（lock、临时文件、各种包管理器缓存），项目目录瞬间轻盈。

monorepo 重度患者、频繁切分支、测试别人包的肝帝最懂这种解脱感！

🔗 https://github.com/lonewolfyx/rmcache

4. **rmlink** —— `npm link` 后遗症终结者

`npm link` 测试组件/库后，软链接 `symlink` 鬼文件满天飞，手动 `rm -rf` 容易手滑炸项目……

`npx rmlink` 一键把所有 `npm link` 留下的 `symlink` 全歼，项目恢复纯净如新。

本地开发私有包、组件库联调、团队共享 link 场景的救命稻草，强迫症直接爱上！

🔗 https://github.com/lonewolfyx/rmlink

5. **tsdown-preset** —— `tsdown` 配置懒人预设

在每次开发一些小工具或者公司基建项目的时候都要手动写一些配置，虽然 `tsdown` 内核中将一些配置项都做到了极致的默认

但是由于我经常是写 `cli`、`Vue` 组件、`lib` 类库工具，由于懒得去在去重复搞那些配置化的东西，就搞了一份这个预设的小工具

而且这东东在使用上也很方便。

```ts
import {lib} from 'tsdown-preset';

export default lib();
```

将上面的复制粘贴就跑通，还支持覆盖参数。

团队懒人福音，过年前省下无数配置时间！

🔗 https://github.com/lonewolfyx/tsdown-preset

6. **clear-skills** —— skills-club 项目大扫除

`skills-club` 玩嗨了，装一堆 `AI skills` 后项目乱成麻将桌？

`npx clear-skills` 一键清空当前项目 `skills` 文件，`-g` 还能全局扫荡「不清楚 *vercel* 出的 *skills* 命令后续会不会支持，反之现在不支持」。

过年前项目大扫除必备，再也不怕 `skills` 冲突导致回家后项目崩盘。

🔗 https://github.com/skills-club/clear-skills

7. **vuers** —— Vue & VueUse 贡献榜单统计

好奇 Vue + VueUse 仓库里谁才是真·卷王？过年前来点社区八卦放松一下～

运行后输出贡献者排名、提交数小报告，有些大佬的贡献量直接让人笑哭。

纯娱乐 + 学习向，膜拜偶像、找灵感、社区观察小工具。

🔗 https://github.com/lonewolfyx/vuers

8. **oxfmt-config** & **renovate-config** —— 代码风格 & 依赖管理预设

团队 oxfmt 格式化不统一？renovate 每次都要重写规则？

- oxfmt-config：extends 预设，直接继承，格式化丝滑统一
- renovate-config：常用自动升级规则预设，依赖管理躺平

过年前统一团队风格，回家后代码看着都顺眼～

🔗 oxfmt: https://github.com/oxconfig/oxfmt-config  
🔗 renovate: https://github.com/config-preset/renovate-config

> 这应该只适合我自己，所以只列出我常用的，如果需要更多，请自行 fork 自行定制

9. **citty-cli-template** & **nuxt shadcn-vue monorepo template** —— 新项目起手式模板

新年新项目从零搭框架最烦？直接 clone 改名开干！

- citty-cli-template：现代 CLI 模板，结构清晰、开箱即用
- nuxt-monorepo-template：Nuxt + shadcn-vue monorepo 全家桶，组件/UI/状态管理丝滑集成

过年前省半天初始化时间，多陪家人刷剧、带娃！

🔗 citty: https://github.com/lonewolfyx-template/citty-cli-template  
🔗 nuxt monorepo: https://github.com/lonewolfyx-template/nuxt-monorepo-template

## 过年后继续肝的待放出清单（欢迎 star）

- oxlint-config → oxlint extends 预设，lint + 格式一体化
- vite-stack → vite 一体化增强 CLI `类似 vite-plus` 但是这套只属于 *me*
- rmdlx → npx/pnpm dlx/bun/yarn 临时缓存全歼灭
- front-skills → AI 前端技能包合集，一键 install 直接变强
- bumpkg → 交互式依赖升级到最新，手动改 package.json？不存在的。「<<<One might say “why don't use antfu's  `taze`,`npm-check` ...”，i just want say "适合自己的才是真的好">>>」

这波过年前在 *9000* 产出的 `repo`，全是小而美、`npx` 即用、真正“救急一时，爽到永久”的刀片工具～  

肝到头发都快掉光，但想到能安心吃年夜饭和远方那帮老登们吹牛“今年代码量又爆表”，瞬间值了！

#前端工具 #过年前爆肝 #程序员小玩具 #npm神器 #开源日常 #vite #nuxt #效率翻倍
