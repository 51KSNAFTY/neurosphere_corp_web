'use client'

import Link from 'next/link'

import { useLocale } from '@/lib/i18n'

export function Footer() {
  const { t } = useLocale()

  return (
    <footer className="footer">
      <div className="container">
        <p>
          <Link href="/company">{t('footer_company')}</Link> |{' '}
          <Link href="/contact">{t('footer_privacy')}</Link> |{' '}
          <Link href="/#services">{t('footer_sitemap')}</Link>
        </p>
        <p>{t('footer_copyright')}</p>
      </div>
    </footer>
  )
}
