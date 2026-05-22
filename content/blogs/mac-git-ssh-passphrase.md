---
title: Mac 每次 Git 操作都要输入 SSH Passphrase
date: 2026-05-22
---

在 Mac 上配置了 SSH Key 之后，每次执行 `git push`、`git pull` 等操作时，终端都会弹出提示要求输入 SSH Passphrase。这是因为 SSH
私钥设置了密码保护，但系统没有自动将密码缓存起来，导致每次都得手动输入。

## 解决方案

核心思路是利用 macOS 自带的 Keychain（钥匙串）来存储和管理 SSH Passphrase，一共三步。

### 1. 启动 ssh-agent

在后台启动 SSH 代理：

```shell
eval "$(ssh-agent -s)"
```

### 2. 配置 SSH Config

编辑 `~/.ssh/config` 文件（不存在则新建），添加以下内容：

```shell
Host github.com
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_rsa
```

- **AddKeysToAgent** — 自动将密钥添加到 ssh-agent
- **UseKeychain** — 将 Passphrase 存储到 macOS Keychain 中
- **IdentityFile** — 指定你的私钥路径，替换成你自己的私钥文件名（如 `id_ed25519`）

### 3. 将私钥添加到 Keychain

```shell
ssh-add --apple-use-keychain ~/.ssh/id_rsa
```

执行后会提示输入一次 Passphrase，之后系统会将密码存入 Keychain，后续所有 Git SSH 操作都不再需要重复输入。

## 参考

- [GitHub Docs - Adding your SSH key to the ssh-agent](https://docs.github.com/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#adding-your-ssh-key-to-the-ssh-agent)
