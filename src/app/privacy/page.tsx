import type { Metadata } from 'next'

import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { DynamicNetworkParticles } from '@/components/three/dynamic-network-particles'

export const metadata: Metadata = {
  title: 'プライバシーポリシー | 株式会社ニューロスフィア',
  robots: { index: false, follow: false },
}

export default function PrivacyPage() {
  return (
    <>
      <DynamicNetworkParticles />
      <Header />

      <section className="breadcrumb-section">
        <div className="container">
          <p className="breadcrumb">Home &gt; プライバシーポリシー</p>
        </div>
      </section>

      <section className="hero hero-company">
        <div className="container">
          <h1 className="hero-title">プライバシーポリシー</h1>
        </div>
      </section>

      <section className="privacy-section">
        <div className="privacy-box">
          <p className="privacy-intro">
            株式会社ニューロスフィア（以下「当社」といいます。）は、お客様の個人情報の保護を重要な責務と認識し、以下のとおりプライバシーポリシーを定め、個人情報の適切な取り扱いに努めます。
          </p>

          <div className="privacy-article">
            <h2>1. 個人情報の定義</h2>
            <p>
              本ポリシーにおける「個人情報」とは、個人情報の保護に関する法律（以下「個人情報保護法」といいます。）に定める個人情報を指し、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、メールアドレスその他の記述等により特定の個人を識別できるものをいいます。
            </p>
          </div>

          <div className="privacy-article">
            <h2>2. 個人情報の収集方法</h2>
            <p>
              当社は、お問い合わせフォーム等を通じて、お名前、メールアドレス、電話番号、会社名等の個人情報をご提供いただく場合があります。
            </p>
          </div>

          <div className="privacy-article">
            <h2>3. 個人情報の利用目的</h2>
            <p>当社が個人情報を収集・利用する目的は、以下のとおりです。</p>
            <ul>
              <li>お問い合わせへの対応およびご連絡のため</li>
              <li>当社サービスに関する情報提供のため</li>
              <li>サービスの改善・新サービスの開発のため</li>
              <li>その他上記利用目的に付随する目的のため</li>
            </ul>
          </div>

          <div className="privacy-article">
            <h2>4. 個人情報の第三者提供</h2>
            <p>
              当社は、以下の場合を除き、あらかじめお客様の同意を得ることなく第三者に個人情報を提供することはありません。
            </p>
            <ul>
              <li>法令に基づく場合</li>
              <li>
                人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき
              </li>
              <li>
                公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき
              </li>
              <li>
                国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合
              </li>
            </ul>
          </div>

          <div className="privacy-article">
            <h2>5. 個人情報の安全管理</h2>
            <p>
              当社は、個人情報の正確性および安全性を確保するために、セキュリティ対策をはじめとする安全対策を実施し、個人情報への不正アクセス、個人情報の紛失、破壊、改ざんおよび漏洩等の予防に努めます。
            </p>
          </div>

          <div className="privacy-article">
            <h2>6. 個人情報の開示・訂正・削除</h2>
            <p>
              お客様ご本人から個人情報の開示、訂正、削除等のご請求があった場合は、ご本人であることを確認のうえ、合理的な期間内に対応いたします。
            </p>
          </div>

          <div className="privacy-article">
            <h2>7. Cookie（クッキー）の使用について</h2>
            <p>
              当社ウェブサイトでは、ユーザー体験の向上およびアクセス解析のためにCookieを使用する場合があります。ブラウザの設定によりCookieを無効にすることが可能ですが、一部のサービスが正常に機能しなくなる場合があります。
            </p>
          </div>

          <div className="privacy-article">
            <h2>8. プライバシーポリシーの変更</h2>
            <p>
              本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、お客様に通知することなく変更できるものとします。変更後のプライバシーポリシーは、当社ウェブサイトに掲載したときから効力を生じるものとします。
            </p>
          </div>

          <div className="privacy-article">
            <h2>9. お問い合わせ窓口</h2>
            <p>本ポリシーに関するお問い合わせは、下記までお願いいたします。</p>
            <p className="privacy-contact-info">
              株式会社ニューロスフィア
              <br />
              所在地：東京都港区西新橋1-6-12 アイオス虎ノ門4階
              <br />
              お問い合わせ：
              <a href="/contact">お問い合わせフォーム</a>
            </p>
          </div>

          <p className="privacy-date">制定日：2025年12月3日</p>
        </div>
      </section>

      <Footer />
    </>
  )
}
