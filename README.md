# partymaker.discord

boilerplate by [ardelan869/discord-js-boilerplate](https://github.com/ardelan869/discord-js-boilerplate)

## HOW2DEV - 開発方法

### 0. install dependencies - インストール

> 以下に依存しているので、インストールが必要です
> 
> this BOT dev-env has depended below, you must install them
>
> - bun
> - sqlite(sqlite3)

#### bun

[bun official(bun.sh)](https://bun.sh)

```windows.pwsh
winget install Oven-sh.Bun -h
```

#### sqlite3

[SQLite](https://sqlite.org)

```windows.pwsh
winget install SQLite.SQLite -h
```

### 1. preparation - 事前準備

1. install depended libraries - 依存しているライブラリをインストール
    ```windows.pwsh
    bun install
    ```
2. migration to DB - DBのマイグレーション実施
    - first time only 初回
        ```windows.pwsh
        bunx prisma migrate dev --name init
        ```
    - second time and after - 2回目以降
        ```windows.pwsh
        bunx prisma migrate dev --preview-feature
        ```

### 2. run in your local - ローカルでの実行

1. exec `bun dev` - `bun dev` コマンドを実行する
    ```windows.pwsh
    bun dev
    ```

### 3. deploy - サーバへのアップロード

> FIXME!!

## APPENDIX - 付録

### 1. install a WindowsTerminal - のインストール

`Windows Terminal` is modern terminal software what can use in Windows and released by Microsoft officially

`Windows Terminal` という `コマンドライン` を Windows で簡単に利用できるアプリケーションがあります
`Microsoft` 公式です

https://apps.microsoft.com/detail/9n0dx20hk701?hl=ja-JP&gl=JP
