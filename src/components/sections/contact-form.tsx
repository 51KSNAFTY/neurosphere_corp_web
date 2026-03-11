'use client'

import { useCallback, useRef, useState } from 'react'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (isSubmitting) return

      const form = e.currentTarget
      const required = form.querySelectorAll<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >('[required]')
      let valid = true

      required.forEach((el) => el.classList.remove('error'))
      required.forEach((el) => {
        if (!el.value.trim()) {
          valid = false
          el.classList.add('error')
        }
      })

      if (!valid) {
        console.log('[ContactForm] Validation failed')
        return
      }

      setIsSubmitting(true)
      console.log('[ContactForm] Form submitted')

      // TODO: フォーム送信処理を実装
      setTimeout(() => {
        setSubmitted(true)
        setIsSubmitting(false)
      }, 1200)
    },
    [isSubmitting],
  )

  if (submitted) {
    return (
      <div className="form-complete">
        <div className="complete-icon">✓</div>
        <p className="complete-title">お問い合わせありがとうございます</p>
        <p className="complete-text">
          内容を確認のうえ、担当者より2営業日以内にご連絡いたします。
        </p>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="contact-form"
      noValidate
    >
      <div className="form-group">
        <label htmlFor="inquiry-type">
          お問い合わせ種別<span className="required">*</span>
        </label>
        <select
          id="inquiry-type"
          name="inquiry-type"
          className="form-input"
          required
          defaultValue=""
        >
          <option value="" disabled>
            選択してください
          </option>
          <option value="サービスについて">サービスについて</option>
          <option value="資料請求">資料請求</option>
          <option value="お見積もり">お見積もり</option>
          <option value="協業・パートナーシップ">協業・パートナーシップ</option>
          <option value="その他">その他</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="company">
          会社名・組織名<span className="required">*</span>
        </label>
        <input
          type="text"
          id="company"
          name="company"
          className="form-input"
          required
          placeholder="例）株式会社ニューロスフィア"
        />
      </div>

      <div className="form-group">
        <label>
          お名前<span className="required">*</span>
        </label>
        <div className="name-split">
          <input
            type="text"
            id="lastname"
            name="lastname"
            className="form-input"
            required
            placeholder="姓"
          />
          <input
            type="text"
            id="firstname"
            name="firstname"
            className="form-input"
            required
            placeholder="名"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email">
          メールアドレス<span className="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-input"
          required
          placeholder="例）info@example.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">電話番号</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="form-input"
          placeholder="例）03-1234-5678"
        />
      </div>

      <div className="form-group form-group-textarea">
        <label htmlFor="message">
          お問い合わせ内容<span className="required">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="form-input"
          required
          placeholder="お問い合わせ内容をご記入ください"
        />
      </div>

      <p className="note">*は入力必須項目</p>

      <div className="form-group form-group-submit">
        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? '送信中...' : '送信する　→'}
        </button>
      </div>
    </form>
  )
}
