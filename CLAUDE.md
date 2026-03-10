# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Neurosphere Corp の企業コーポレートサイト。Next.js (App Router) + TypeScript + Tailwind CSSで構築。

## 開発コマンド

```bash
pnpm dev          # 開発サーバー起動
pnpm build        # プロダクションビルド
pnpm lint         # ESLint実行
pnpm type-check   # TypeScript型チェック
pnpm test         # Vitestユニットテスト
pnpm test:watch   # テスト（watchモード）
pnpm test:e2e     # Playwright E2Eテスト
pnpm format       # Prettier実行
```

## アーキテクチャ

### ディレクトリ構造

```
src/
  app/                    # Next.js App Router（ページ）
    layout.tsx            # ルートレイアウト（フォント・メタデータ・Provider）
    page.tsx              # トップページ（セクション合成）
    contact/page.tsx      # お問い合わせ
    company/page.tsx      # 会社概要
  components/
    layout/               # Header, Footer
    sections/             # ページセクション（Hero, Services, Value, etc.）
    three/                # Three.js NetworkParticles（dynamic import, SSR無効）
    scroll-reveal.tsx     # IntersectionObserverによるスクロールアニメーション
  lib/
    i18n/                 # 多言語対応（?lang=jp|en、React Context）
      dictionaries/       # 翻訳辞書（ja.ts, en.ts）
      locale-context.tsx  # LocaleProvider + useLocale hook
    utils.ts              # cn()ユーティリティ
    metadata.ts           # SEOメタデータ生成
  styles/
    globals.css           # グローバルCSS（既存デザイン完全移植 + Tailwind）
```

### コンポーネント設計

- **Server Components**: layout.tsx（メタデータ・フォント）
- **Client Components**: Header, Footer, 全セクション（i18n/インタラクション使用のため）
- **Dynamic Import**: NetworkParticles（Three.js、SSR無効でクライアントのみ読み込み）

### i18n

URLパラメータ `?lang=jp|en` でReact Contextを通じて言語切り替え。翻訳辞書は `src/lib/i18n/dictionaries/` に型安全に定義。

### デザインルール

- プライマリカラー: `#05A8B3`
- アクセントカラー: `#2FBB8C`
- テキストカラー: `#1e1e1e`
- フォント: Noto Sans JP（next/fontで最適化読み込み）
- レスポンシブ: 768pxブレークポイント
- 既存CSSクラスをそのまま使用（Tailwind Preflightは無効）
