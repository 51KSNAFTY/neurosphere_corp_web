import type { Metadata } from 'next'

import AistudioPage from '@/components/aistudio/AistudioPage'
import {
  aistudioFaqJsonLd,
  aistudioServiceJsonLd,
  createBreadcrumbJsonLd,
} from '@/lib/jsonld'
import { createMetadata } from '@/lib/metadata'
import '@/styles/aistudio.css'

export const metadata: Metadata = createMetadata(
  {
    title: 'AI活用型広告動画制作・運用サービス',
    description:
      'AI活用型の広告動画制作・運用サービス。AIとプロの制作チームが広告動画の企画、制作、運用、改善まで一気通貫で伴走します。',
    openGraph: {
      title: 'AI活用型広告動画制作・運用サービス | Neurosphere',
      description:
        'AIとプロの制作チームが広告動画の企画、制作、運用、改善まで一気通貫で伴走します。',
      type: 'website',
    },
    twitter: {
      title: 'AI活用型広告動画制作・運用サービス | Neurosphere',
      description:
        'AIとプロの制作チームが広告動画の企画、制作、運用、改善まで一気通貫で伴走します。',
    },
  },
  '/aistudio',
)

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: 'ホーム', path: '/' },
  { name: 'AI活用型広告動画制作・運用サービス', path: '/aistudio' },
])

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aistudioFaqJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aistudioServiceJsonLd),
        }}
      />
      <AistudioPage />
    </>
  )
}
