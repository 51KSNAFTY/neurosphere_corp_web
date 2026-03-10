'use client'

import { useCallback, useState } from 'react'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (isSubmitting) return

      setIsSubmitting(true)
      console.log('[ContactForm] Form submitted')

      // TODO: フォーム送信処理を実装
      setTimeout(() => {
        setIsSubmitting(false)
      }, 1000)
    },
    [isSubmitting],
  )

  return (
    <section className="section contact-section">
      <div className="container">
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="subject">
              件名<span className="required">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="form-input"
              required
              placeholder="お問い合わせの件名をご記入ください"
            />
          </div>

          <div className="form-group">
            <label>
              お名前 (漢字)<span className="required">*</span>
            </label>
            <div className="name-split">
              <input
                type="text"
                id="lastname-kanji"
                name="lastname-kanji"
                className="form-input"
                required
                placeholder="姓(漢字)"
              />
              <input
                type="text"
                id="firstname-kanji"
                name="firstname-kanji"
                className="form-input"
                required
                placeholder="名(漢字)"
              />
            </div>
          </div>

          <div className="form-group">
            <label>
              お名前 (カナ)<span className="required">*</span>
            </label>
            <div className="name-split">
              <input
                type="text"
                id="lastname-kana"
                name="lastname-kana"
                className="form-input"
                required
                placeholder="セイ(カナ)"
              />
              <input
                type="text"
                id="firstname-kana"
                name="firstname-kana"
                className="form-input"
                required
                placeholder="メイ(カナ)"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="company">会社名</label>
            <input
              type="text"
              id="company"
              name="company"
              className="form-input"
              placeholder="例）デジタルダイナミック株式会社"
            />
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
            <label htmlFor="email-confirm">
              メールアドレス（確認）<span className="required">*</span>
            </label>
            <input
              type="email"
              id="email-confirm"
              name="email-confirm"
              className="form-input"
              required
              placeholder="確認のためもう一度ご入力ください"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">お電話番号</label>
            <input
              type="text"
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
            <input
              type="submit"
              value={isSubmitting ? '送信中...' : '送信'}
              className="submit-button"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </section>
  )
}
