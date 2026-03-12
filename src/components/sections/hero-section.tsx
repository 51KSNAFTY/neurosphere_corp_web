'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

import { useLocale } from '@/lib/i18n'

export function HeroSection() {
  const { t } = useLocale()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const fadeInVideo = () => {
      setTimeout(() => {
        video.classList.add('is-loaded')
      }, 300)
    }

    if (video.readyState >= 3) {
      fadeInVideo()
    } else {
      video.addEventListener('canplay', fadeInVideo)
      return () => video.removeEventListener('canplay', fadeInVideo)
    }
  }, [])

  return (
    <section className="hero hero-top">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="hero-video"
        poster="/images/datacenter_hero.webp"
      >
        <source src="/videos/top-hero.mp4" type="video/mp4" />
      </video>

      <div className="hero-top-content">
        <h1>THE AI MERGE</h1>

        <p>{t('hero_sub')}</p>

        <div className="hero-cta-wrapper">
          <Link href="/contact">{t('hero_cta_primary')}</Link>
          <a href="#approach" className="hero-cta-secondary">
            {t('hero_cta_secondary')}
          </a>
        </div>
      </div>
    </section>
  )
}
