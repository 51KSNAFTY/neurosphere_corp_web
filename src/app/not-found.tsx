'use client'

import Link from 'next/link'

import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { DynamicNetworkParticles } from '@/components/three/dynamic-network-particles'

export default function NotFound() {
  return (
    <>
      <DynamicNetworkParticles />
      <Header />

      <section className="breadcrumb-section">
        <div className="container">
          <p className="breadcrumb">Home &gt; 404 Not Found</p>
        </div>
      </section>

      <section className="not-found-section">
        <div className="container">
          <div className="not-found-content">
            <p className="not-found-code">404</p>
            <h1 className="not-found-title">Page Not Found</h1>
            <p className="not-found-description">
              お探しのページは存在しないか、移動した可能性があります。
              <br />
              URLをご確認いただくか、トップページからお探しください。
            </p>
            <div className="not-found-actions">
              <Link href="/" className="not-found-btn-primary">
                トップページへ戻る
              </Link>
              <Link href="/contact" className="not-found-btn-secondary">
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
