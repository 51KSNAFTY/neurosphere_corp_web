'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import type { DictionaryKey } from './dictionaries/ja'
import { en } from './dictionaries/en'
import { ja } from './dictionaries/ja'

export type Locale = 'jp' | 'en'

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: DictionaryKey) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

const dictionaries: Record<Locale, Record<DictionaryKey, string>> = {
  jp: ja,
  en,
}

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'jp'
  const params = new URLSearchParams(window.location.search)
  const lang = params.get('lang')?.toLowerCase()
  return lang === 'en' ? 'en' : 'jp'
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const lang = params.get('lang')?.toLowerCase()
    if (lang === 'en' || lang === 'jp') {
      setLocaleState(lang)
    }
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    const url = new URL(window.location.href)
    url.searchParams.set('lang', newLocale)
    window.history.replaceState({}, '', url.toString())
  }, [])

  const t = useCallback(
    (key: DictionaryKey): string => {
      return dictionaries[locale][key] ?? dictionaries.jp[key] ?? key
    },
    [locale],
  )

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t],
  )

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}
