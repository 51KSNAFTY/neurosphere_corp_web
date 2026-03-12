'use client'

import Link from 'next/link'

import { useLocale } from '@/lib/i18n'

export function Footer() {
  const { t } = useLocale()

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/Neurosphere_Logo_Horizontal.png"
              alt="Neurosphere"
              className="footer-logo-img"
            />
          </div>
          <nav className="footer-nav">
            <Link href="/company">{t('footer_company')}</Link>
            <Link href="/contact">{t('footer_contact')}</Link>
            <Link href="/privacy">{t('footer_privacy')}</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">{t('footer_copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
