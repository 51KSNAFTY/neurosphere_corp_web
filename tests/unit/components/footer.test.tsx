import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode
    href: string
  }) => <a href={href}>{children}</a>,
}))

vi.mock('@/lib/i18n', () => ({
  useLocale: () => ({
    locale: 'jp' as const,
    setLocale: vi.fn(),
    t: (key: string) => {
      const dict: Record<string, string> = {
        footer_company: '会社情報',
        footer_privacy: 'プライバシーポリシー',
        footer_sitemap: 'サイトマップ',
        footer_copyright: '© 2026 Neurosphere Inc. All Rights Reserved.',
      }
      return dict[key] ?? key
    },
  }),
}))

import { Footer } from '@/components/layout/footer'

afterEach(() => cleanup())

describe('Footer', () => {
  it('フッターリンクが表示される', () => {
    render(<Footer />)
    expect(screen.getByText('会社情報')).toBeInTheDocument()
    expect(screen.getByText('プライバシーポリシー')).toBeInTheDocument()
    expect(screen.getByText('サイトマップ')).toBeInTheDocument()
  })

  it('コピーライトが表示される', () => {
    render(<Footer />)
    expect(
      screen.getByText('© 2026 Neurosphere Inc. All Rights Reserved.'),
    ).toBeInTheDocument()
  })

  it('会社情報リンクが正しいhrefを持つ', () => {
    render(<Footer />)
    const link = screen.getByText('会社情報')
    expect(link.closest('a')).toHaveAttribute('href', '/company')
  })

  it('お問い合わせリンクが正しいhrefを持つ', () => {
    render(<Footer />)
    const link = screen.getByText('プライバシーポリシー')
    expect(link.closest('a')).toHaveAttribute('href', '/contact')
  })
})
