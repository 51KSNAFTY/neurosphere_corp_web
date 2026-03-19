import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { ScrollReveal } from '@/components/scroll-reveal'
import { ApproachSection } from '@/components/sections/approach-section'
import { DomainsSection } from '@/components/sections/domains-section'
import { HeroSection } from '@/components/sections/hero-section'
import { ServicesSection } from '@/components/sections/services-section'
import { UpdatesSection } from '@/components/sections/updates-section'
import { ValueSection } from '@/components/sections/value-section'
import { DynamicNetworkParticles } from '@/components/three/dynamic-network-particles'
import { homeWebPageJsonLd } from '@/lib/jsonld'

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeWebPageJsonLd),
        }}
      />
      <DynamicNetworkParticles />
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <ValueSection />
        <ApproachSection />
        <DomainsSection />
        <UpdatesSection />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  )
}
