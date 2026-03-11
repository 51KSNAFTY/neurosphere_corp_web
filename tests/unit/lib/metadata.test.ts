import { describe, expect, it } from 'vitest'

import { createMetadata } from '@/lib/metadata'

describe('createMetadata', () => {
  it('デフォルトのメタデータを返す', () => {
    const metadata = createMetadata()
    expect(metadata.description).toContain('Neurosphere')
    expect(metadata.icons).toBeDefined()
  })

  it('OGPが設定されている', () => {
    const metadata = createMetadata()
    expect(metadata.openGraph).toBeDefined()
    expect(metadata.openGraph?.siteName).toBe('Neurosphere')
    expect(metadata.openGraph?.locale).toBe('ja_JP')
  })

  it('Twitterカードが設定されている', () => {
    const metadata = createMetadata()
    expect(metadata.twitter).toBeDefined()
    const twitter = metadata.twitter as Record<string, unknown>
    expect(twitter.card).toBe('summary_large_image')
  })

  it('オーバーライドが適用される', () => {
    const metadata = createMetadata({
      description: 'カスタム説明文',
    })
    expect(metadata.description).toBe('カスタム説明文')
  })

  it('faviconパスが正しい', () => {
    const metadata = createMetadata()
    const icons = metadata.icons as { icon: string; apple: string }
    expect(icons.icon).toBe('/favicon.ico')
    expect(icons.apple).toBe('/apple-icon.png')
  })
})
