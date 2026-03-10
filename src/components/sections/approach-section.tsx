'use client'

import Link from 'next/link'

import { useLocale } from '@/lib/i18n'

export function ApproachSection() {
  const { t } = useLocale()

  return (
    <section className="section" id="approach">
      <h2>{t('approach_title')}</h2>

      <div className="cards">
        <div className="card">
          <h3>{t('approach_1_title')}</h3>
          <p>{t('approach_1_body')}</p>
        </div>
        <div className="card">
          <h3>{t('approach_2_title')}</h3>
          <p>{t('approach_2_body')}</p>
        </div>
        <div className="card">
          <h3>{t('approach_3_title')}</h3>
          <p dangerouslySetInnerHTML={{ __html: t('approach_3_body') }} />
        </div>
        <div className="card">
          <h3>{t('approach_4_title')}</h3>
          <p dangerouslySetInnerHTML={{ __html: t('approach_4_body') }} />
        </div>
      </div>

      <div className="approach-cta-wrapper">
        <Link href="/contact" className="detail-link">
          {t('approach_cta')}
        </Link>
      </div>
    </section>
  )
}
