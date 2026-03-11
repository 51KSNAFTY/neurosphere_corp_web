import type { Metadata } from 'next'

import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { ContactForm } from '@/components/sections/contact-form'
import { DynamicNetworkParticles } from '@/components/three/dynamic-network-particles'

export const metadata: Metadata = {
  title: 'お問い合わせ',
  robots: { index: false, follow: false },
}

export default function ContactPage() {
  return (
    <>
      <DynamicNetworkParticles />
      <Header />

      <section className="breadcrumb-section">
        <div className="container">
          <p className="breadcrumb">Home &gt; お問い合わせ</p>
        </div>
      </section>

      <div className="hero-contact">
        <div className="hero-contact-content">
          <h1>お問い合わせ</h1>
          <p>ご不明点やご相談がありましたらお気軽にご連絡ください。</p>
        </div>
      </div>

      <section className="section contact-section">
        <div className="container">
          <ContactForm />
        </div>
      </section>

      <Footer />
    </>
  )
}
