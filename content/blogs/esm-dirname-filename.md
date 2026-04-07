---
title: esm dirname filename
date: 2026-04-07
---

总是记不住的模块路径

```ts
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// 等价于 __filename
const __filename = fileURLToPath(import.meta.url)

// 等价于 __dirname
const __dirname = dirname(__filename)
```
