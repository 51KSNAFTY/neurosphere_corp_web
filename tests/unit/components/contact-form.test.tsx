import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { ContactForm } from '@/components/sections/contact-form'

afterEach(() => cleanup())

describe('ContactForm', () => {
  it('すべての必須フィールドが表示される', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/件名/)).toBeInTheDocument()
    expect(
      screen.getByLabelText(/メールアドレス(?!（確認）)/),
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/お問い合わせ内容/)).toBeInTheDocument()
  })

  it('必須フィールドにrequired属性が設定されている', () => {
    render(<ContactForm />)
    expect(
      screen.getByPlaceholderText('お問い合わせの件名をご記入ください'),
    ).toBeRequired()
    expect(screen.getByPlaceholderText('例）info@example.com')).toBeRequired()
    expect(
      screen.getByPlaceholderText('お問い合わせ内容をご記入ください'),
    ).toBeRequired()
  })

  it('送信ボタンが表示される', () => {
    render(<ContactForm />)
    expect(screen.getByDisplayValue('送信')).toBeInTheDocument()
  })

  it('メールアドレスフィールドがtype=emailである', () => {
    render(<ContactForm />)
    const emailField = screen.getByPlaceholderText('例）info@example.com')
    expect(emailField).toHaveAttribute('type', 'email')
  })

  it('名前入力が姓名に分かれている', () => {
    render(<ContactForm />)
    expect(screen.getByPlaceholderText('姓(漢字)')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('名(漢字)')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('セイ(カナ)')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('メイ(カナ)')).toBeInTheDocument()
  })

  it('任意フィールドにrequired属性がない', () => {
    render(<ContactForm />)
    const companyField =
      screen.getByPlaceholderText('例）デジタルダイナミック株式会社')
    expect(companyField).not.toBeRequired()

    const phoneField = screen.getByPlaceholderText('例）03-1234-5678')
    expect(phoneField).not.toBeRequired()
  })
})
