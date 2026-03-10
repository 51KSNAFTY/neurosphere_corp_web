import { describe, expect, it } from 'vitest'

import { cn } from '@/lib/utils'

describe('cn', () => {
  it('単一クラスをそのまま返す', () => {
    expect(cn('foo')).toBe('foo')
  })

  it('複数クラスを結合する', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('falsy値を除外する', () => {
    expect(cn('foo', false, null, undefined, 'bar')).toBe('foo bar')
  })

  it('条件付きクラスを処理する', () => {
    const isActive = true
    const isDisabled = false
    expect(cn('base', isActive && 'active', isDisabled && 'disabled')).toBe(
      'base active',
    )
  })

  it('Tailwindの競合クラスをマージする', () => {
    expect(cn('px-4', 'px-6')).toBe('px-6')
  })

  it('空引数で空文字を返す', () => {
    expect(cn()).toBe('')
  })
})
