import type { Metadata } from 'next'

import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { DynamicNetworkParticles } from '@/components/three/dynamic-network-particles'
import { createBreadcrumbJsonLd } from '@/lib/jsonld'
import { createMetadata } from '@/lib/metadata'

export const metadata: Metadata = createMetadata(
  {
    title: '会社概要',
    description:
      '株式会社ニューロスフィアの会社概要ページです。所在地、代表者、設立日、事業内容などの企業情報を掲載しています。',
    openGraph: {
      title: '会社概要 | Neurosphere',
      description:
        '株式会社ニューロスフィアの所在地、代表者、設立日、事業内容などの企業情報を掲載しています。',
    },
    twitter: {
      title: '会社概要 | Neurosphere',
      description:
        '株式会社ニューロスフィアの所在地、代表者、設立日、事業内容などの企業情報を掲載しています。',
    },
  },
  '/company',
)

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: 'ホーム', path: '/' },
  { name: '会社概要', path: '/company' },
])

export default function CompanyPage() {
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
            <p className="breadcrumb">Home &gt; 会社情報</p>
          </div>
        </section>

        <section className="hero hero-company">
          <div className="container">
            <h1 className="hero-title">会社概要</h1>
          </div>
        </section>

        <section className="company-overview-section">
          <div className="company-overview-box">
            <table className="company-table">
              <tbody>
                <tr>
                  <th>社名</th>
                  <td>株式会社ニューロスフィア</td>
                </tr>
                <tr>
                  <th>英文社名</th>
                  <td>Neurosphere</td>
                </tr>
                <tr>
                  <th>所在地</th>
                  <td>東京都港区西新橋1-6-12　アイオス虎ノ門4階</td>
                </tr>
                <tr>
                  <th>代表者</th>
                  <td>根来 実</td>
                </tr>
                <tr>
                  <th>設立</th>
                  <td>2025年12月3日</td>
                </tr>
                <tr>
                  <th>事業内容</th>
                  <td>AI BPO・AIエージェント開発・DX支援</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
