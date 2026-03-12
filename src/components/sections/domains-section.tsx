'use client'

import { useLocale } from '@/lib/i18n'

export function DomainsSection() {
  const { t } = useLocale()

  return (
    <section className="section" id="domains">
      <h2>{t('domains_title')}</h2>

      <div className="cards">
        <div className="card">
          <h3>{t('domains_1_title')}</h3>
          <p>{t('domains_1_body')}</p>
        </div>
        <div className="card">
          <h3>{t('domains_2_title')}</h3>
          <p>{t('domains_2_body')}</p>
        </div>
        <div className="card">
          <h3>{t('domains_3_title')}</h3>
          <p>{t('domains_3_body')}</p>
        </div>
        <div className="card">
          <h3>{t('domains_4_title')}</h3>
          <p dangerouslySetInnerHTML={{ __html: t('domains_4_body') }} />
        </div>
        <div className="card">
          <h3>{t('domains_5_title')}</h3>
          <p dangerouslySetInnerHTML={{ __html: t('domains_5_body') }} />
        </div>
        <div className="card">
          <h3>{t('domains_6_title')}</h3>
          <p dangerouslySetInnerHTML={{ __html: t('domains_6_body') }} />
        </div>
      </div>
    </section>
  )
}
