import type { Metadata } from 'next'

const SITE_NAME = 'Neurosphere'
const COMPANY_NAME = '株式会社ニューロスフィア'
export const BASE_URL = 'https://www.neurosphere.co.jp'

const DEFAULT_TITLE = `${COMPANY_NAME} | AI BPO・AIエージェント開発・DX支援`
const DEFAULT_DESCRIPTION =
  '株式会社ニューロスフィアは、AI BPO、AIエージェント開発、DX支援を通じて業務を再設計し、成果につながるAI実装を行うパートナーです。'
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/og-default.jpg`
const DEFAULT_KEYWORDS = [
  'ニューロスフィア',
  'Neurosphere',
  'AI BPO',
  'AIエージェント開発',
  'DX支援',
  '業務自動化',
  '生成AI導入',
  'AI導入コンサルティング',
]

function toAbsoluteUrl(path: string) {
  return new URL(path, BASE_URL).toString()
}

export function createMetadata(
  overrides: Partial<Metadata> = {},
  pathname = '/',
): Metadata {
  const canonical = overrides.alternates?.canonical ?? pathname
  const canonicalUrl =
    typeof canonical === 'string' ? toAbsoluteUrl(canonical) : BASE_URL

  return {
    metadataBase: new URL(BASE_URL),
    applicationName: SITE_NAME,
    title: {
      default: DEFAULT_TITLE,
      template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    keywords: DEFAULT_KEYWORDS,
    alternates: {
      canonical,
    },
    category: 'technology',
    classification: 'AI BPO, AI agent development, DX consulting',
    referrer: 'origin-when-cross-origin',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    icons: { icon: '/favicon.ico', apple: '/apple-icon.png' },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
    openGraph: {
      type: 'website',
      locale: 'ja_JP',
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${COMPANY_NAME} - AI BPO・AIエージェント開発・DX支援`,
        },
      ],
      ...overrides.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      images: [DEFAULT_OG_IMAGE],
      ...overrides.twitter,
    },
    ...overrides,
  }
}
