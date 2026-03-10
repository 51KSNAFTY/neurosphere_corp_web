'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

import { useLocale } from '@/lib/i18n'

export function ServicesSection() {
  const { t } = useLocale()
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cardsContainer = cardsRef.current
    if (!cardsContainer) return

    const cards = cardsContainer.querySelectorAll('.business-card')
    const cleanups: (() => void)[] = []

    cards.forEach((card) => {
      const el = card as HTMLElement

      // SVGボーダートレースアニメーション
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.setAttribute('class', 'card-border-svg')
      svg.style.cssText =
        'position:absolute;inset:0;width:100%;height:100%;z-index:3;pointer-events:none;'
      const rect = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'rect',
      )
      rect.setAttribute('x', '1')
      rect.setAttribute('y', '1')
      rect.setAttribute('rx', '0')
      rect.setAttribute('ry', '0')
      rect.setAttribute('fill', 'none')
      rect.setAttribute('stroke', '#2FBB8C')
      rect.setAttribute('stroke-width', '2')
      svg.appendChild(rect)
      el.style.position = 'relative'
      el.appendChild(svg)

      function updateRect() {
        const w = el.offsetWidth
        const h = el.offsetHeight
        rect.setAttribute('width', String(w - 2))
        rect.setAttribute('height', String(h - 2))
        const perimeter = 2 * (w - 2) + 2 * (h - 2)
        rect.style.strokeDasharray = String(perimeter)
        rect.style.strokeDashoffset = String(perimeter)
        rect.style.transition = 'none'
      }
      updateRect()

      const handleResize = () => updateRect()
      window.addEventListener('resize', handleResize)

      const handleEnter = () => {
        const w = el.offsetWidth
        const h = el.offsetHeight
        const perimeter = 2 * (w - 2) + 2 * (h - 2)
        rect.style.transition =
          'stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        rect.style.strokeDashoffset = '0'
        void perimeter // suppress unused warning
      }

      const handleLeave = () => {
        const w = el.offsetWidth
        const h = el.offsetHeight
        const perimeter = 2 * (w - 2) + 2 * (h - 2)
        rect.style.transition =
          'stroke-dashoffset 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        rect.style.strokeDashoffset = String(perimeter)
      }

      el.addEventListener('mouseenter', handleEnter)
      el.addEventListener('mouseleave', handleLeave)

      cleanups.push(() => {
        window.removeEventListener('resize', handleResize)
        el.removeEventListener('mouseenter', handleEnter)
        el.removeEventListener('mouseleave', handleLeave)
        if (svg.parentNode) svg.parentNode.removeChild(svg)
      })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <section className="section business-overview" id="services">
      <h2
        className="section-title js-reveal-text"
        dangerouslySetInnerHTML={{ __html: t('overview_title') }}
      />

      <p dangerouslySetInnerHTML={{ __html: t('overview_body') }} />

      <div className="business-cards" ref={cardsRef}>
        <div className="business-card business-card-gpu">
          <div className="business-card-overlay">
            <h3>{t('card_bpo_title')}</h3>
            <p dangerouslySetInnerHTML={{ __html: t('card_bpo_body') }} />
            <Link href="/contact" className="detail-link">
              {t('card_bpo_cta')}
            </Link>
          </div>
        </div>

        <div className="business-card business-card-dc">
          <div className="business-card-overlay">
            <h3>{t('card_product_title')}</h3>
            <p dangerouslySetInnerHTML={{ __html: t('card_product_body') }} />
            <Link href="/contact" className="detail-link">
              {t('card_product_cta')}
            </Link>
          </div>
        </div>

        <div className="business-card business-card-dx">
          <div className="business-card-overlay">
            <h3>{t('card_dx_title')}</h3>
            <p dangerouslySetInnerHTML={{ __html: t('card_dx_body') }} />
            <a href="#approach" className="detail-link">
              {t('card_dx_cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
