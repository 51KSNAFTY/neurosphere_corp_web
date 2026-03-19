import type { Metadata } from 'next'

import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { ContactForm } from '@/components/sections/contact-form'
import { DynamicNetworkParticles } from '@/components/three/dynamic-network-particles'
import { createBreadcrumbJsonLd } from '@/lib/jsonld'
import { createMetadata } from '@/lib/metadata'

export const metadata: Metadata = createMetadata(
  {
    title: 'お問い合わせ',
    description:
      '株式会社ニューロスフィアへのお問い合わせページです。AI BPO、AIエージェント開発、DX支援のご相談、お見積もり、資料請求を受け付けています。',
    openGraph: {
      title: 'お問い合わせ | Neurosphere',
      description:
        'AI BPO、AIエージェント開発、DX支援のご相談、お見積もり、資料請求はこちらからお問い合わせください。',
    },
    twitter: {
      title: 'お問い合わせ | Neurosphere',
      description:
        'AI BPO、AIエージェント開発、DX支援のご相談、お見積もり、資料請求はこちらからお問い合わせください。',
    },
  },
  '/contact',
)

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: 'ホーム', path: '/' },
  { name: 'お問い合わせ', path: '/contact' },
])

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <DynamicNetworkParticles />
      <Header />

      <main>
        <section className="breadcrumb-section">
          <div className="container">
            <p className="breadcrumb">Home &gt; お問い合わせ</p>
          </div>
        </section>

        <div className="hero-contact">
          <div className="hero-contact-content">
            <h1>お問い合わせ</h1>
            <p>
              AI
              BPO・AIエージェント開発・DX支援に関するご相談は、こちらからお問い合わせください。
            </p>
          </div>
        </div>

        <section className="section contact-section">
          <div className="container">
            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
