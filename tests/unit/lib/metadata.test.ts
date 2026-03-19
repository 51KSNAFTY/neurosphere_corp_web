import { describe, expect, it } from 'vitest'

import { createMetadata } from '@/lib/metadata'

describe('createMetadata', () => {
  it('デフォルトのメタデータを返す', () => {
    const metadata = createMetadata()
    expect(metadata.description).toContain('株式会社ニューロスフィア')
    expect(metadata.icons).toBeDefined()
  })

  it('metadataBaseが設定されている', () => {
    const metadata = createMetadata()
    expect(metadata.metadataBase).toBeDefined()
    expect(metadata.metadataBase?.toString()).toBe(
      'https://www.neurosphere.co.jp/',
    )
  })

  it('canonical URLが設定されている', () => {
    const metadata = createMetadata()
    expect(metadata.alternates?.canonical).toBe('/')
  })

  it('Google verificationを設定できる', () => {
    const metadata = createMetadata()
    expect(metadata.verification).toBeDefined()
  })

  it('OGPが設定されている', () => {
    const metadata = createMetadata()
    expect(metadata.openGraph).toBeDefined()
    expect(metadata.openGraph?.siteName).toBe('Neurosphere')
    expect(metadata.openGraph?.locale).toBe('ja_JP')
  })

  it('OG画像が設定されている', () => {
    const metadata = createMetadata()
    const og = metadata.openGraph as Record<string, unknown>
    expect(og.images).toBeDefined()
  })

  it('Twitterカードが設定されている', () => {
    const metadata = createMetadata()
    expect(metadata.twitter).toBeDefined()
    const twitter = metadata.twitter as Record<string, unknown>
    expect(twitter.card).toBe('summary_large_image')
    expect(twitter.images).toBeDefined()
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
