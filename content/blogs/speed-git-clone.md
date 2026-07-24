---
title: Git 代理加速 clone
date: 2026-07-24
---

在不设置代理的情况下 `clone` 速度很慢，可以设置代理加速 `clone`，直接给 `Git` 配上代理是最快的。先确认一下本地代理端口是多少（`Clash` 默认一般是 `7890`），然后在终端跑这两行：

```shell
git config --global http.proxy http://127.0.0.1:7897
git config --global https.proxy http://127.0.0.1:7897
```

还原默认配置

```shell
git config --global --unset http.proxy
git config --global --unset https.proxy
```
