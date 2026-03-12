import type { Metadata } from 'next'

const SITE_NAME = 'Neurosphere'
export const BASE_URL = 'https://neurosphere.co.jp'

const DEFAULT_OG_IMAGE = `${BASE_URL}/images/og-default.jpg`

export function createMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return {
    title: {
      default: `トップページ | AI BPO・AIプロダクト・DX支援 | ${SITE_NAME}`,
      template: `%s | ${SITE_NAME}`,
    },
    description:
      'NeurosphereはAI BPO、AIプロダクト開発、AIによるDXを通じて、業務を再設計し成果を生み出すAI実装パートナーです。',
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: '/',
    },
    robots: { index: true, follow: true },
    icons: { icon: '/favicon.ico', apple: '/apple-icon.png' },
    openGraph: {
      type: 'website',
      locale: 'ja_JP',
      siteName: SITE_NAME,
      title: `AI BPO・AIプロダクト・DX支援 | ${SITE_NAME}`,
      description:
        'NeurosphereはAI BPO、AIプロダクト開発、AIによるDXを通じて、業務を再設計し成果を生み出すAI実装パートナーです。',
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} - AI BPO・AIプロダクト・DX支援`,
        },
      ],
      ...overrides.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title: `AI BPO・AIプロダクト・DX支援 | ${SITE_NAME}`,
      description:
        'NeurosphereはAI BPO、AIプロダクト開発、AIによるDXを通じて、業務を再設計し成果を生み出すAI実装パートナーです。',
      images: [DEFAULT_OG_IMAGE],
      ...overrides.twitter,
    },
    ...overrides,
  }
}
