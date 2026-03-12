'use client'

import { useLocale } from '@/lib/i18n'

export function UpdatesSection() {
  const { t } = useLocale()

  return (
    <section className="section" id="updates">
      <h2>{t('updates_title')}</h2>

      <div className="cards">
        <div className="card">
          <h3>{t('updates_1_title')}</h3>
          <p dangerouslySetInnerHTML={{ __html: t('updates_1_body') }} />
        </div>
        <div className="card">
          <h3>{t('updates_2_title')}</h3>
          <p dangerouslySetInnerHTML={{ __html: t('updates_2_body') }} />
        </div>
        <div className="card">
          <h3>{t('updates_3_title')}</h3>
          <p dangerouslySetInnerHTML={{ __html: t('updates_3_body') }} />
        </div>
      </div>
    </section>
  )
}
