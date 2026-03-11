import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { ContactForm } from '@/components/sections/contact-form'

afterEach(() => cleanup())

describe('ContactForm', () => {
  it('すべての必須フィールドが表示される', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/お問い合わせ種別/)).toBeInTheDocument()
    expect(screen.getByLabelText(/会社名・組織名/)).toBeInTheDocument()
    expect(screen.getByLabelText(/メールアドレス/)).toBeInTheDocument()
    expect(screen.getByLabelText(/お問い合わせ内容/)).toBeInTheDocument()
  })

  it('必須フィールドにrequired属性が設定されている', () => {
    render(<ContactForm />)
    expect(screen.getByRole('combobox')).toBeRequired()
    expect(screen.getByPlaceholderText('例）info@example.com')).toBeRequired()
    expect(
      screen.getByPlaceholderText('お問い合わせ内容をご記入ください'),
    ).toBeRequired()
  })

  it('送信ボタンが表示される', () => {
    render(<ContactForm />)
    expect(screen.getByRole('button', { name: /送信する/ })).toBeInTheDocument()
  })

  it('メールアドレスフィールドがtype=emailである', () => {
    render(<ContactForm />)
    const emailField = screen.getByPlaceholderText('例）info@example.com')
    expect(emailField).toHaveAttribute('type', 'email')
  })

  it('名前入力が姓名に分かれている', () => {
    render(<ContactForm />)
    expect(screen.getByPlaceholderText('姓')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('名')).toBeInTheDocument()
  })

  it('任意フィールドにrequired属性がない', () => {
    render(<ContactForm />)
    const phoneField = screen.getByPlaceholderText('例）03-1234-5678')
    expect(phoneField).not.toBeRequired()
  })
})
