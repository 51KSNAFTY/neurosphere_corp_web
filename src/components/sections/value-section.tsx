'use client'

import { useLocale } from '@/lib/i18n'

export function ValueSection() {
  const { t } = useLocale()

  return (
    <section className="section" id="value">
      <h2 dangerouslySetInnerHTML={{ __html: t('value_title') }} />
      <div
        className="js-reveal-text value-body-wrapper"
        dangerouslySetInnerHTML={{ __html: t('value_body') }}
      />

      <div className="cards">
        <div className="card">
          <h3>{t('value_card1_title')}</h3>
          <p dangerouslySetInnerHTML={{ __html: t('value_card1_body') }} />
        </div>
        <div className="card">
          <h3>{t('value_card2_title')}</h3>
          <p dangerouslySetInnerHTML={{ __html: t('value_card2_body') }} />
        </div>
        <div className="card">
          <h3>{t('value_card3_title')}</h3>
          <p dangerouslySetInnerHTML={{ __html: t('value_card3_body') }} />
        </div>
      </div>
    </section>
  )
}
