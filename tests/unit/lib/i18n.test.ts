import { describe, expect, it } from 'vitest'

import { en } from '@/lib/i18n/dictionaries/en'
import { ja } from '@/lib/i18n/dictionaries/ja'
import type { DictionaryKey } from '@/lib/i18n/dictionaries/ja'

describe('i18n辞書', () => {
  const jaKeys = Object.keys(ja) as DictionaryKey[]
  const enKeys = Object.keys(en) as DictionaryKey[]

  it('JP辞書とEN辞書のキー数が一致する', () => {
    expect(jaKeys.length).toBe(enKeys.length)
  })

  it('JP辞書のすべてのキーがEN辞書に存在する', () => {
    const missingInEn = jaKeys.filter((key) => !(key in en))
    expect(missingInEn).toEqual([])
  })

  it('EN辞書のすべてのキーがJP辞書に存在する', () => {
    const missingInJa = enKeys.filter((key) => !(key in ja))
    expect(missingInJa).toEqual([])
  })

  it('すべての翻訳値が空文字でない', () => {
    const emptyJa = jaKeys.filter((key) => ja[key].trim() === '')
    const emptyEn = enKeys.filter((key) => en[key].trim() === '')
    expect(emptyJa).toEqual([])
    expect(emptyEn).toEqual([])
  })

  it('ナビゲーションキーがすべて存在する', () => {
    const navKeys: DictionaryKey[] = [
      'nav_products',
      'nav_ai_bpo',
      'nav_ai_product',
      'nav_ai_dx',
      'nav_updates',
      'nav_blog',
      'nav_careers',
      'nav_contact',
    ]
    navKeys.forEach((key) => {
      expect(ja[key]).toBeDefined()
      expect(en[key]).toBeDefined()
    })
  })

  it('フッターキーがすべて存在する', () => {
    const footerKeys: DictionaryKey[] = [
      'footer_company',
      'footer_contact',
      'footer_privacy',
      'footer_copyright',
    ]
    footerKeys.forEach((key) => {
      expect(ja[key]).toBeDefined()
      expect(en[key]).toBeDefined()
    })
  })

  it('コピーライトに年号が含まれている', () => {
    expect(ja.footer_copyright).toContain('2026')
    expect(en.footer_copyright).toContain('2026')
  })
})
