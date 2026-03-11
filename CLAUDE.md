# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Neurosphere Corp の企業コーポレートサイト。Next.js 15 (App Router) + TypeScript + Tailwind CSS 3で構築。

## 開発コマンド

```bash
pnpm dev          # 開発サーバー起動（ポート3000）
pnpm build        # プロダクションビルド
pnpm lint         # ESLint実行
pnpm type-check   # TypeScript型チェック
pnpm test         # Vitestユニットテスト
pnpm test:watch   # テスト（watchモード）
pnpm test:e2e     # Playwright E2Eテスト
pnpm format       # Prettier実行
```

単一テストファイルの実行: `pnpm vitest run src/path/to/test.test.ts`

## アーキテクチャ

### ディレクトリ構造

```
src/
  app/                    # Next.js App Router（ページ）
    layout.tsx            # ルートレイアウト（フォント・メタデータ・Provider）
    page.tsx              # トップページ（セクション合成）
    providers.tsx         # Client Component: LocaleProvider ラッパー
    contact/page.tsx      # お問い合わせ
    company/page.tsx      # 会社概要
    aistudio/page.tsx     # AI Studioページ
  components/
    layout/               # Header, Footer
    sections/             # ページセクション（Hero, Services, Value, Approach, Domains, Updates）
    three/                # Three.js NetworkParticles（dynamic import, SSR無効）
    aistudio/             # AI Studio関連コンポーネント
    scroll-reveal.tsx     # IntersectionObserverによるスクロールアニメーション
  lib/
    i18n/                 # 多言語対応（?lang=jp|en、React Context）
      dictionaries/       # 翻訳辞書（ja.ts, en.ts）
      locale-context.tsx  # LocaleProvider + useLocale hook
    utils.ts              # cn()ユーティリティ（clsx + tailwind-merge）
    metadata.ts           # SEOメタデータ生成
  styles/
    globals.css           # グローバルCSS（既存デザイン完全移植 + Tailwind）
```

### コンポーネント設計

- **Server Components**: layout.tsx（メタデータ・フォント）、page.tsx（各ページ）
- **Client Components**: Header, Footer, 全セクション（i18n/インタラクション使用のため）、providers.tsx
- **Dynamic Import**: `DynamicNetworkParticles`がThree.jsの`NetworkParticles`をSSR無効で遅延読み込み
- パスエイリアス: `@/*` → `./src/*`

### i18n

URLパラメータ `?lang=jp|en` でReact Contextを通じて言語切り替え。翻訳辞書は `src/lib/i18n/dictionaries/` に型安全に定義。

### デザインルール

- プライマリカラー: `#05A8B3`（Tailwind: `brand-primary`）
- アクセントカラー: `#2FBB8C`（Tailwind: `brand-accent`）
- テキストカラー: `#1e1e1e`（Tailwind: `foreground`）
- フォント: Noto Sans JP（next/fontで最適化読み込み、CSS変数 `--font-noto-sans-jp`）
- レスポンシブ: 768pxブレークポイント
- 既存CSSクラスをそのまま使用（Tailwind Preflightは無効）

### コード品質

- **ESLint**: `next/core-web-vitals` + `next/typescript`ベース、`@typescript-eslint/no-explicit-any: error`
- **Pre-commit hook**: Husky + lint-staged（ts/tsx: Prettier + ESLint、css: Prettier）
- **lint-staged実行**: `ESLINT_USE_FLAT_CONFIG=false`フラグ付きでESLintを実行（レガシー設定ファイル `.eslintrc.cjs` を使用）
