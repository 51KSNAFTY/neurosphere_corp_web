import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

// Mock next/link
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode
    href: string
  }) => <a href={href}>{children}</a>,
}))

// Mock i18n
vi.mock('@/lib/i18n', () => ({
  useLocale: () => ({
    locale: 'jp' as const,
    setLocale: vi.fn(),
    t: (key: string) => {
      const dict: Record<string, string> = {
        nav_products: 'PRODUCTS',
        nav_ai_bpo: 'AI BPO / 業務自動化',
        nav_ai_product: 'AIエージェント開発',
        nav_ai_dx: 'AI従業員の最適化と導入',
        nav_updates: 'UPDATES',
        nav_blog: 'BLOG',
        nav_careers: 'CARRERS',
        nav_contact: 'CONTACT',
      }
      return dict[key] ?? key
    },
  }),
}))

import { Header } from '@/components/layout/header'

afterEach(() => {
  cleanup()
})

describe('Header', () => {
  it('ロゴが表示される', () => {
    render(<Header />)
    const logos = screen.getAllByAltText('株式会社ニューロスフィア')
    expect(logos.length).toBeGreaterThanOrEqual(1)
  })

  it('ナビゲーションリンクが表示される', () => {
    render(<Header />)
    expect(screen.getByText('UPDATES')).toBeInTheDocument()
    expect(screen.getByText('CONTACT')).toBeInTheDocument()
    expect(screen.getByText('CARRERS')).toBeInTheDocument()
  })

  it('ホームページで言語切り替えが表示される', () => {
    render(<Header />)
    expect(screen.getByText('JP')).toBeInTheDocument()
    expect(screen.getByText('EN')).toBeInTheDocument()
  })

  it('COMING SOONバッジが表示される', () => {
    render(<Header />)
    expect(screen.getByText('COMING SOON')).toBeInTheDocument()
  })

  it('ハンバーガーメニューにaria-labelが設定されている', () => {
    render(<Header />)
    expect(
      screen.getByRole('button', { name: 'メニューを開く' }),
    ).toBeInTheDocument()
  })
})
