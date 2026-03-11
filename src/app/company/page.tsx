import type { Metadata } from 'next'

import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { DynamicNetworkParticles } from '@/components/three/dynamic-network-particles'

export const metadata: Metadata = {
  title: '会社概要',
  description:
    '株式会社ニューロスフィアの会社概要。東京都港区西新橋に拠点を置き、AIソリューション・プロダクト開発を展開しています。',
  alternates: {
    canonical: '/company',
  },
}

export default function CompanyPage() {
  return (
    <>
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
                  <td>AIソリューション/プロダクト開発・提供</td>
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
