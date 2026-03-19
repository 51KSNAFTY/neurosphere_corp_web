'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

interface HeaderProps {
  /** LP用CTAボタン。指定時はナビを非表示にしCTAのみ表示 */
  lpCta?: {
    href: string
    label: string
  }
}

export function Header({ lpCta }: HeaderProps = {}) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isContact = pathname === '/contact'
  const { locale, setLocale, t } = useLocale()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSubMenus, setActiveSubMenus] = useState<Set<number>>(new Set())

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false)
        setActiveSubMenus(new Set())
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSubMenu = useCallback((index: number, e: React.MouseEvent) => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      e.preventDefault()
      e.stopPropagation()
      setActiveSubMenus((prev) => {
        const next = new Set(prev)
        if (next.has(index)) next.delete(index)
        else next.add(index)
        return next
      })
    }
  }, [])

  return (
    <header className="global-header">
      <div className="container">
        <Link href="/" className="header-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/Neurosphere_Logo_Horizontal.png"
            alt="株式会社ニューロスフィア"
            className="logo-full"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icon-light.png"
            alt="株式会社ニューロスフィア"
            className="logo-icon"
          />
        </Link>

        {lpCta ? (
          <a href={lpCta.href} className="header-lp-cta">
            {lpCta.label}
          </a>
        ) : (
          <>
            {isHome && (
              <ul className="lang-switch-toggle">
                <li>
                  <a
                    href="?lang=jp"
                    className={locale === 'jp' ? 'active' : ''}
                    onClick={(e) => {
                      e.preventDefault()
                      setLocale('jp')
                    }}
                  >
                    JP
                  </a>
                </li>
                <li>
                  <a
                    href="?lang=en"
                    className={locale === 'en' ? 'active' : ''}
                    onClick={(e) => {
                      e.preventDefault()
                      setLocale('en')
                    }}
                  >
                    EN
                  </a>
                </li>
              </ul>
            )}

            <div
              className={cn('header-hamburger', mobileMenuOpen && 'active')}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              role="button"
              tabIndex={0}
              aria-label="メニューを開く"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setMobileMenuOpen((prev) => !prev)
                }
              }}
            >
              <span />
              <span />
              <span />
            </div>

            <nav className={cn('header-nav', mobileMenuOpen && 'active')}>
              <ul className="nav-list">
                <li className="has-sub">
                  <span onClick={(e) => toggleSubMenu(0, e)}>
                    {t('nav_products')}
                  </span>
                  <ul
                    className={cn(
                      'sub-nav-list',
                      activeSubMenus.has(0) && 'active',
                    )}
                  >
                    <li>
                      <NavLink href="/#services" isHome={isHome}>
                        {t('nav_ai_bpo')}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href="/#services" isHome={isHome}>
                        {t('nav_ai_product')}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href="/#services" isHome={isHome}>
                        {t('nav_ai_dx')}
                      </NavLink>
                    </li>
                  </ul>
                </li>

                <li>
                  <NavLink href="/#updates" isHome={isHome}>
                    {t('nav_updates')}
                  </NavLink>
                </li>
                <li className="nav-disabled">
                  <span className="disabled-text">{t('nav_blog')}</span>
                  <span className="coming-soon">COMING SOON</span>
                </li>
                <li>
                  <Link href="/contact">{t('nav_careers')}</Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className={isContact ? 'active' : undefined}
                  >
                    {t('nav_contact')}
                  </Link>
                </li>
              </ul>
            </nav>
          </>
        )}
      </div>
    </header>
  )
}

function NavLink({
  href,
  isHome,
  children,
}: {
  href: string
  isHome: boolean
  children: React.ReactNode
}) {
  if (isHome && href.startsWith('/#')) {
    return <a href={href.replace('/', '')}>{children}</a>
  }
  return <Link href={href}>{children}</Link>
}
