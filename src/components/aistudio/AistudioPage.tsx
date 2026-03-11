'use client'

import Image from 'next/image'

import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'

import { ContactForm } from '@/components/sections/contact-form'

import {
  FaqAccordion,
  NetworkCanvas,
  NumberCounter,
  ScrollReveal,
  StickyCta,
  VideoModal,
} from './AistudioInteractive'

/* ========== Showcase Data ========== */
const showcaseCards = [
  {
    src: '/images/aistudio/image_3.jpg',
    alt: '建設業採用',
    tag: 'Instagram Reels',
    title: '建設業 採用動画',
    orientation: 'vertical' as const,
    video: '/videos/aistudio/construction-recruitment.mp4',
  },
  {
    src: '/images/aistudio/image_4.jpg',
    alt: '製造業採用',
    tag: 'TikTok広告',
    title: '製造業 中途採用動画',
    orientation: 'vertical' as const,
    video: '/videos/aistudio/manufacturing-recruitment.mp4',
  },
  {
    src: '/images/aistudio/image_5.jpg',
    alt: 'IT採用',
    tag: 'Instagram Reels',
    title: 'IT採用動画',
    orientation: 'vertical' as const,
    video: '/videos/aistudio/it-engineer-recruitment.mp4',
  },
  {
    src: '/images/aistudio/image_6.jpg',
    alt: 'サービス紹介',
    tag: 'SNS広告',
    title: 'サービス紹介動画',
    orientation: 'vertical' as const,
    video: '/videos/aistudio/service-ad.mp4',
  },
  {
    src: '/images/aistudio/image_7.jpg',
    alt: 'リフォーム採用',
    tag: 'TikTok広告',
    title: '住宅リフォーム採用動画',
    orientation: 'vertical' as const,
    video: '/videos/aistudio/reform-recruitment.mp4',
  },
]

/* ========== Problem Data ========== */
const problems = [
  { num: '01', text: '動画制作の費用が高く、予算内に収まらない' },
  { num: '02', text: '制作に2〜3ヶ月かかり、採用シーズンに間に合わない' },
  { num: '03', text: '制作会社に頼んだら、イメージと全然違うものが届いた' },
  { num: '04', text: '動画を作っても、どう運用すればいいかわからない' },
  { num: '05', text: '動画の効果が数値で見えず、PDCAが回せない' },
  { num: '06', text: '制作・広告・運用が別会社で、連携コストがかさむ' },
]

/* ========== Features Data ========== */
const features = [
  {
    img: '/images/aistudio/image_13.jpg',
    title: '⚡ 従来の8倍速で大量制作',
    desc: 'AIが企画・構成・編集を支援し、短納期・低価格で大量のクリエイティブを制作。ABテストで勝ちパターンを高速で発見します。',
    link: '#cta',
  },
  {
    img: '/images/aistudio/image_14.jpg',
    title: '💰 制作コスト最大70%削減',
    desc: '従来の制作会社と比べて最大70%OFF。1本あたり¥25,000〜、初期費用0円から始められるため、予算を抑えながら本数を確保できます。',
    link: '#pricing',
  },
  {
    img: '/images/aistudio/image_15.jpg',
    title: '🔄 クリック後もAIが成果を後押し',
    desc: '広告クリック後にAIチャットボットがユーザーと対話。潜在層の意思決定を促し、CVRを高める段階CV設計を実現します。',
    link: '#cta',
  },
]

/* ========== Numbers Data ========== */
const numbers = [
  {
    target: '8',
    suffix: '倍',
    prefix: '',
    label: '制作スピード',
    note: '従来比（最大）',
  },
  {
    target: '3',
    suffix: '',
    prefix: '最短',
    label: '営業日で納品',
    note: '初稿提出まで',
  },
  {
    target: '30',
    suffix: '本+',
    prefix: '',
    label: '動画制作実績',
    note: '※2026年2月時点',
  },
  {
    target: '8',
    suffix: '業界+',
    prefix: '',
    label: '対応業界',
    note: '人材・教育・美容・不動産 他',
  },
]

/* ========== Flow Data ========== */
const flowSteps = [
  { step: 'STEP 1', title: 'お申込', desc: '必要事項を送るだけで準備完了' },
  { step: 'STEP 2', title: '打合わせ', desc: '目的やご希望をお気軽に共有' },
  {
    step: 'STEP 3',
    title: 'コンテンツ制作',
    desc: '内容に合わせてこちらで制作',
  },
  {
    step: 'STEP 4',
    title: '修正対応',
    desc: '仕上がりを整えるために気になる点を調整',
  },
  { step: 'STEP 5', title: '運用開始', desc: '運用しながら高速改善' },
]

/* ========== Video Tags ========== */
const videoTags = [
  '採用動画（新卒）',
  '採用動画（中途）',
  'アルバイト募集動画',
  '社員インタビュー動画',
  'オフィス紹介動画',
  '会社説明会動画',
  '集客・販促動画',
  '企業ブランディング動画',
  'サービス紹介動画',
  'Instagram Reels縦型',
  'TikTok縦型',
  'YouTube広告（スキップ型）',
  'バンパー広告（6秒）',
  'SNS投稿用ショート動画',
]

/* ========== Pricing Data ========== */
const pricingPlans = [
  {
    plan: '動画制作',
    name: 'ライトプラン',
    price: '¥350,000',
    unit: ' / 月',
    note: '¥35,000 / 本',
    features: ['AI動画制作 月10本', '企画・構成提案', '修正2回まで無料'],
    recommended: false,
  },
  {
    plan: '動画制作',
    name: 'スタンダードプラン',
    price: '¥450,000',
    unit: ' / 月',
    note: '¥30,000 / 本',
    features: ['AI動画制作 月15本', '企画・構成提案', '修正2回まで無料'],
    recommended: true,
  },
  {
    plan: '動画制作',
    name: 'プレミアムプラン',
    price: '¥500,000',
    unit: ' / 月',
    note: '',
    noteHtml: true,
    features: ['AI動画制作 月20本', '企画・構成提案', '修正2回まで無料'],
    recommended: false,
  },
]

/* ========== Cases Data ========== */
const cases = [
  {
    img: '/images/aistudio/image_16.jpg',
    alt: '人材派遣',
    title: '人材派遣・人材紹介',
    desc: '求職者向けの採用動画を月次で制作。制作コストを年間60%削減。',
  },
  {
    img: '/images/aistudio/image_17.jpg',
    alt: '教育',
    title: '語学スクール・教育',
    desc: 'SNS広告向け動画を複数パターン制作。CVRが2.3倍に改善。',
  },
  {
    img: '/images/aistudio/image_18.jpg',
    alt: '美容',
    title: '美容クリニック',
    desc: '看護師採用向けの動画広告を展開。応募数が前月比180%に。',
  },
  {
    img: '/images/aistudio/image_19.jpg',
    alt: '製造業',
    title: '製造業・倉庫業',
    desc: '採用ブランディング動画を3営業日で制作・配信開始。',
  },
  {
    img: '/images/aistudio/image_20.jpg',
    alt: '不動産',
    title: '不動産',
    desc: '物件紹介動画のエンゲージメント率が4.5倍に改善。',
  },
  {
    img: '/images/aistudio/image_21.jpg',
    alt: 'IT',
    title: 'IT・SaaS',
    desc: '採用コンテンツを内製化。年間200万円のコスト削減を実現。',
  },
]

/* ========== FAQ Data ========== */
const faqItems = [
  {
    q: 'Q. 費用の目安を教えてください。',
    a: '動画制作は月10本プラン（¥350,000/月）からご用意しています。1本あたり¥25,000〜¥35,000で、本数が多いほどお得です。今なら初期費用¥300,000が無料のキャンペーン中です。広告運用は広告費の20%/月で承ります。',
  },
  {
    q: 'Q. 実写映像がなくてもAI動画を制作できますか？',
    a: 'はい、可能です。テキスト情報・既存の写真素材・商品画像だけでも、AI技術を活用して高品質な動画を制作できます。素材がゼロの状態からでもご相談いただけます。',
  },
  {
    q: 'Q. 修正は何回まで対応していただけますか？',
    a: '基本プランで2回まで無料で対応しています。それ以上の修正は別途ご相談ください。',
  },
  {
    q: 'Q. 動画制作だけでなく広告運用まで依頼できますか？',
    a: '可能です。企画・制作・入稿・運用・レポーティングまで一括でご対応します。制作＋運用プランをご覧ください。',
  },
  {
    q: 'Q. 効果が出なかった場合はどうなりますか？',
    a: '効果測定データをもとに、構成・訴求・配信設定の改善を継続的に実施します。制作して終わりではなく、成果が出るまで伴走するのが当社の基本方針です。',
  },
  {
    q: 'Q. 既存の素材（写真・ロゴ・テキスト等）は使えますか？',
    a: 'はい、ご提供いただいた既存素材を最大限に活用したうえで制作します。',
  },
  {
    q: 'Q. どのような広告媒体に対応していますか？',
    a: 'Instagram・TikTok・YouTube・Facebook・X（旧Twitter）・Google広告など、主要な広告媒体すべてに対応しています。媒体ごとに最適なサイズ・尺で制作します。',
  },
]

/* ========== Company Data ========== */
const companyInfo = [
  { label: '社名', value: '株式会社ニューロスフィア' },
  { label: '英文社名', value: 'Neurosphere' },
  { label: '所在地', value: '東京都港区西新橋1-6-12 アイオス虎ノ門4階' },
  { label: '代表者', value: '根来 実' },
  { label: '設立', value: '2025年12月3日' },
  { label: '事業内容', value: 'AIソリューション/プロダクト開発・提供' },
]

export default function AistudioPage() {
  const faq = FaqAccordion()
  const sticky = StickyCta()
  const videoModal = VideoModal()

  return (
    <div className="aistudio-lp">
      <NetworkCanvas />
      <ScrollReveal />
      <NumberCounter />

      {/* HEADER */}
      <Header lpCta={{ href: '#cta', label: '無料で相談する →' }} />

      {/* 1. HERO */}
      <section className="hero-top" id="hero">
        <div className="hero-content">
          <h1 className="hero-h1">
            動画広告を、
            <br />
            速く、安く、成果まで。
          </h1>
          <p className="hero-sub">
            「当てにいく広告」ではなく「当たるまで回し続ける広告」へ。
            <br />
            AI×プロの制作チームが、広告動画の制作から運用・改善まで一気通貫で伴走します。
          </p>
          <div className="hero-buttons">
            <a href="#cta" className="hero-btn-primary">
              無料で相談する →
            </a>
            <a href="#service" className="hero-btn-secondary">
              サービスを見る ↓
            </a>
          </div>
          <div className="scroll-hint">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </section>

      {/* 1.5 VIDEO SHOWCASE */}
      <section id="showcase">
        <div className="container">
          <h2 className="section-title js-reveal">AIで、ここまでできる。</h2>
          <p
            className="section-sub js-reveal"
            style={{ transitionDelay: '0.05s' }}
          >
            実写からアニメーションまで、目的・ターゲットに最適化した動画を制作しています。
          </p>
        </div>
        <div className="showcase-marquee">
          {[0, 1].map((setIndex) => (
            <div
              key={setIndex}
              className="showcase-track"
              aria-hidden={setIndex === 1 || undefined}
            >
              {/* 2周分のカードでビューポートより常に幅広くする */}
              {[...showcaseCards, ...showcaseCards].map((card, i) => (
                <div
                  key={i}
                  className={`showcase-card ${card.orientation}`}
                  onClick={() => videoModal.open(card.video)}
                  role="button"
                  tabIndex={setIndex === 0 && i < showcaseCards.length ? 0 : -1}
                  aria-label={`${card.title}を再生`}
                >
                  <Image
                    className="showcase-thumb"
                    src={card.src}
                    alt={card.alt}
                    fill
                    sizes="180px"
                  />
                  <div className="showcase-play"></div>
                  <div className="showcase-label">
                    <span className="label-tag">{card.tag}</span>
                    <div className="label-title">{card.title}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* 2. 課題提起 */}
      <section id="problems">
        <div className="container">
          <h2 className="section-title js-reveal">
            こんなお悩み、ありませんか？
          </h2>
          <p
            className="section-sub js-reveal"
            style={{ transitionDelay: '0.05s' }}
          >
            動画広告を検討する企業が増える一方、多くの担当者が同じ壁に直面しています。
          </p>
          <div className="problems-grid">
            {problems.map((p, i) => (
              <div
                key={p.num}
                className="problem-card js-reveal"
                style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
              >
                <span className="problem-num">{p.num}</span>
                <span className="problem-text">{p.text}</span>
              </div>
            ))}
          </div>
          <p
            className="problems-resolve js-reveal"
            style={{ transitionDelay: '0.7s' }}
          >
            Neurosphereが、これらの課題をまとめて解決します。
          </p>
        </div>
      </section>

      {/* 3. サービス概要 */}
      <section id="service">
        <div className="container">
          <h2 className="section-title js-reveal">
            AI活用型 広告動画制作・運用サービス
          </h2>
          <div
            className="service-intro js-reveal"
            style={{ transitionDelay: '0.1s' }}
          >
            <p>
              独自開発の専用AIが、ターゲットに訴求できる広告動画を制作。営業資料や求人情報を入力するだけで、AIがターゲット像・ペルソナ・訴求ポイントを自動分析し、異なる切り口で複数の動画構成案を生成します。クリエイティブの作成から配信・改善までを一気通貫で運用し、「当たるまで回し続ける広告」を実現します。
            </p>
          </div>
        </div>
      </section>

      {/* 4. 選ばれる理由 */}
      <section id="features">
        <div className="container">
          <h2 className="section-title js-reveal">
            Neurosphereが選ばれる3つの理由
          </h2>
          <div className="biz-cards">
            {features.map((f, i) => (
              <div
                key={i}
                className="biz-card js-reveal"
                style={{
                  background: `url('${f.img}') center/cover no-repeat`,
                  transitionDelay: `${0.1 + i * 0.1}s`,
                }}
              >
                <div className="biz-card-content">
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                  <a href={f.link} className="detail-link">
                    詳しく見る →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 導入実績 */}
      <section id="numbers">
        <div className="container">
          <h2 className="section-title js-reveal">導入実績</h2>
          <div className="numbers-grid">
            {numbers.map((n, i) => (
              <div
                key={i}
                className="number-card js-reveal"
                style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
              >
                <div
                  className="number-val"
                  data-target={n.target}
                  data-suffix={n.suffix}
                  data-prefix={n.prefix}
                >
                  0
                </div>
                <div className="number-label">{n.label}</div>
                <div className="number-note">{n.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ご利用の流れ */}
      <section id="flow">
        <div className="container">
          <h2 className="section-title js-reveal">ご利用の流れ</h2>
          <p
            className="section-sub js-reveal"
            style={{ transitionDelay: '0.05s' }}
          >
            シンプルな導入プロセスで簡単に開始できます。
          </p>
          <div className="flow-grid">
            {flowSteps.map((s, i) => (
              <div key={i} className="flow-item">
                {i > 0 && (
                  <div
                    className="flow-arrow js-reveal"
                    style={{ transitionDelay: `${0.1 + i * 0.06 - 0.03}s` }}
                  >
                    <span className="arrow-h">▶</span>
                    <span className="arrow-v">▼</span>
                  </div>
                )}
                <div
                  className="flow-step js-reveal"
                  style={{ transitionDelay: `${0.1 + i * 0.06}s` }}
                >
                  <span className="flow-label">{s.step}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. 対応動画タイプ */}
      <section id="videos">
        <div className="container">
          <h2 className="section-title js-reveal">対応可能な動画タイプ</h2>
          <p
            className="section-sub js-reveal"
            style={{ transitionDelay: '0.05s' }}
          >
            採用から集客まで、幅広い用途の動画を制作しています。
          </p>
          <div
            className="video-tags js-reveal"
            style={{ transitionDelay: '0.1s' }}
          >
            {videoTags.map((tag) => (
              <span key={tag} className="video-tag">
                {tag}
              </span>
            ))}
          </div>
          <div
            className="video-styles js-reveal"
            style={{ transitionDelay: '0.2s' }}
          >
            対応スタイル：実写 ／ アニメーション ／ AI生成画像 ／ テキスト動画
          </div>
        </div>
      </section>

      {/* 8. 料金プラン */}
      <section id="pricing">
        <div className="container">
          <h2 className="section-title js-reveal">料金プラン</h2>
          <p
            className="section-sub js-reveal"
            style={{ transitionDelay: '0.05s' }}
          >
            目的・本数に合わせて3つのプランから選択いただけます。
          </p>
          <div className="pricing-grid">
            {pricingPlans.map((p, i) => (
              <div
                key={i}
                className={`pricing-card js-reveal${p.recommended ? 'recommended' : ''}`}
                style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
              >
                {p.recommended && <div className="pricing-badge">おすすめ</div>}
                <div className="pricing-plan">{p.plan}</div>
                <div className="pricing-name">{p.name}</div>
                <div className="pricing-price">
                  {p.price}
                  <span>{p.unit}</span>
                </div>
                <div className="pricing-note">
                  {p.noteHtml ? (
                    <span style={{ color: '#2FBB8C', fontWeight: 700 }}>
                      ¥25,000 / 本
                    </span>
                  ) : (
                    p.note
                  )}
                </div>
                <ul className="pricing-features">
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <div className="pricing-campaign-inline">
                  <span className="pci-old">初期費用 ¥300,000</span> →{' '}
                  <span className="pci-new">¥0</span>
                  <br />
                  <span className="pci-old">SNS投稿 ¥100,000</span> →{' '}
                  <span className="pci-new">¥0</span>
                  <span className="pci-badge">期間限定</span>
                </div>
                <a
                  href="#cta"
                  className="detail-link"
                  style={{ fontSize: '0.9rem', padding: '0.6em 1.5em' }}
                >
                  お問い合わせ →
                </a>
              </div>
            ))}
          </div>
          <div
            className="pricing-addon js-reveal"
            style={{
              transitionDelay: '0.4s',
              maxWidth: '500px',
              margin: '1.5em auto 0',
            }}
          >
            <div className="addon-label">オプション</div>
            <div className="addon-name">SNS広告運用代行</div>
            <div className="addon-price">
              広告費の20%<span> / 月</span>
            </div>
            <div className="addon-desc">
              TikTok・Instagram・YouTube等の広告運用を一括代行
            </div>
          </div>
        </div>
      </section>

      {/* 9. 中間CTA */}
      <section id="mid-cta">
        <div className="container">
          <h2 className="js-reveal">まずは、お気軽にご相談ください。</h2>
          <p className="mid-sub js-reveal" style={{ transitionDelay: '0.1s' }}>
            お見積もり・ご提案・サービスに関するご質問、すべて無料でお受けしています。
          </p>
          <div className="js-reveal" style={{ transitionDelay: '0.2s' }}>
            <a
              href="#cta"
              className="detail-link"
              style={{ fontSize: '1.1rem', padding: '1em 2.5em' }}
            >
              無料で相談する →
            </a>
          </div>
        </div>
      </section>

      {/* 10. 対応業界・導入事例 */}
      <section id="cases">
        <div className="container">
          <h2 className="section-title js-reveal">対応業界・導入事例</h2>
          <p
            className="section-sub js-reveal"
            style={{ transitionDelay: '0.05s' }}
          >
            人材・教育・美容・不動産など、幅広い業界でご利用いただいています。
          </p>
          <div className="cases-grid">
            {cases.map((c, i) => (
              <div
                key={i}
                className="case-card js-reveal"
                style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
              >
                <Image
                  className="case-img"
                  src={c.img}
                  alt={c.alt}
                  width={360}
                  height={140}
                  style={{ width: '100%', height: '140px', objectFit: 'cover' }}
                  loading="lazy"
                />
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. よくある質問 */}
      <section id="faq">
        <div className="container">
          <h2 className="section-title js-reveal">よくある質問</h2>
          <div
            className="faq-list js-reveal"
            style={{ transitionDelay: '0.1s' }}
          >
            {faqItems.map((item, i) => (
              <div key={i} className="faq-item">
                <button
                  className="faq-question"
                  aria-expanded="false"
                  onClick={faq.handleClick}
                >
                  <span>{item.q}</span>
                  <span className="faq-toggle">+</span>
                </button>
                <div className="faq-answer">
                  <div className="faq-answer-inner">{item.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. 会社概要 */}
      <section id="company">
        <div className="container">
          <h2 className="section-title js-reveal">会社概要</h2>
          <table
            className="company-table js-reveal"
            style={{ transitionDelay: '0.1s' }}
          >
            <tbody>
              {companyInfo.map((row) => (
                <tr key={row.label}>
                  <th>{row.label}</th>
                  <td>{row.value}</td>
                </tr>
              ))}
              <tr>
                <th>Webサイト</th>
                <td>
                  <a
                    href="https://www.neurosphere.co.jp/"
                    style={{ color: '#2FBB8C' }}
                  >
                    https://www.neurosphere.co.jp/
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 13. お問い合わせ */}
      <section id="cta">
        <h2 className="js-reveal">お問い合わせ</h2>
        <p className="cta-sub js-reveal" style={{ transitionDelay: '0.1s' }}>
          サービスに関するご質問・お見積もり・ご提案のご依頼など、お気軽にお問い合わせください。
        </p>
        <div
          className="contact-form-wrap js-reveal"
          style={{ transitionDelay: '0.2s' }}
        >
          <ContactForm />
        </div>
      </section>

      {/* VIDEO MODAL */}
      {videoModal.modal}

      {/* FOOTER */}
      <Footer />

      {/* STICKY CTA */}
      <div className={`sticky-cta${sticky.visible ? 'is-visible' : ''}`}>
        <a href="#cta">まずは無料で相談する →</a>
      </div>
    </div>
  )
}
