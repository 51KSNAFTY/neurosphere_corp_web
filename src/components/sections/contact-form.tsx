'use client'

import { useCallback, useRef, useState } from 'react'

import { trackMetaEvent } from '@/components/meta-pixel'

const SSGFORM_URL = process.env.NEXT_PUBLIC_SSGFORM_URL ?? ''

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
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

      if (!SSGFORM_URL) {
        console.error('[ContactForm] SSGFORM_URL is not configured')
        setError(
          'フォームの設定に問題があります。管理者にお問い合わせください。',
        )
        return
      }

      setIsSubmitting(true)
      setError('')
      console.log('[ContactForm] Submitting to SSGform...')

      try {
        const fd = new FormData(form)
        const res = await fetch(SSGFORM_URL, {
          method: 'POST',
          body: fd,
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          },
        })

        if (res.ok) {
          console.log('[ContactForm] Submission successful')
          trackMetaEvent('Lead')
          setSubmitted(true)
        } else {
          console.error('[ContactForm] Submission failed:', res.status)
          setError('送信に失敗しました。時間をおいて再度お試しください。')
        }
      } catch (err) {
        console.error('[ContactForm] Network error:', err)
        setError('通信エラーが発生しました。ネットワーク接続をご確認ください。')
      } finally {
        setIsSubmitting(false)
      }
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
      {/* ハニーポット: スパムボット対策（非表示フィールド） */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <input type="text" name="wana" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-group">
        <label htmlFor="inquiry-type">
          お問い合わせ種別<span className="required">*</span>
        </label>
        <select
          id="inquiry-type"
          name="お問い合わせ種別"
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
          name="会社名・組織名"
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
            name="姓"
            className="form-input"
            required
            placeholder="姓"
          />
          <input
            type="text"
            id="firstname"
            name="名"
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
          name="メールアドレス"
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
          name="電話番号"
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
          name="お問い合わせ内容"
          rows={5}
          className="form-input"
          required
          placeholder="お問い合わせ内容をご記入ください"
        />
      </div>

      <p className="note">*は入力必須項目</p>

      {error && <p className="form-error">{error}</p>}

      <div className="form-group form-group-submit">
        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? '送信中...' : '送信する　→'}
        </button>
      </div>
    </form>
  )
}
