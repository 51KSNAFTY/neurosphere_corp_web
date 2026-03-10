import type { Metadata } from 'next'

const SITE_NAME = 'Neurosphere'

export function createMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return {
    title: {
      default: `トップページ | AI BPO・AIプロダクト・DX支援 | ${SITE_NAME}`,
      template: `%s | ${SITE_NAME}`,
    },
    description:
      'NeurosphereはAI BPO、AIプロダクト開発、AIによるDXを通じて、業務を再設計し成果を生み出すAI実装パートナーです。',
    robots: { index: true, follow: true },
    icons: { icon: '/images/Neurosphere_Logo_Rectangle.webp' },
    openGraph: {
      type: 'website',
      locale: 'ja_JP',
      siteName: SITE_NAME,
      title: `AI BPO・AIプロダクト・DX支援 | ${SITE_NAME}`,
      description:
        'NeurosphereはAI BPO、AIプロダクト開発、AIによるDXを通じて、業務を再設計し成果を生み出すAI実装パートナーです。',
      ...overrides.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title: `AI BPO・AIプロダクト・DX支援 | ${SITE_NAME}`,
      description:
        'NeurosphereはAI BPO、AIプロダクト開発、AIによるDXを通じて、業務を再設計し成果を生み出すAI実装パートナーです。',
      ...overrides.twitter,
    },
    ...overrides,
  }
}
