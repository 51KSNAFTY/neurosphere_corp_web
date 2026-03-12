import { BASE_URL } from './metadata'

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '株式会社ニューロスフィア',
  alternateName: 'Neurosphere',
  url: BASE_URL,
  logo: `${BASE_URL}/images/Neurosphere_Logo_Horizontal.png`,
  description:
    'NeurosphereはAI BPO、AIプロダクト開発、AIによるDXを通じて、業務を再設計し成果を生み出すAI実装パートナーです。',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '西新橋1-6-12 アイオス虎ノ門4階',
    addressLocality: '港区',
    addressRegion: '東京都',
    addressCountry: 'JP',
  },
  founder: {
    '@type': 'Person',
    name: '根来 実',
  },
  foundingDate: '2025-12-03',
}

export const aistudioFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '最短何日で納品できますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '最短5営業日で納品可能です。企画内容や本数によって変動しますので、まずはお気軽にご相談ください。',
      },
    },
    {
      '@type': 'Question',
      name: '動画の修正は何回までできますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'プランにより異なりますが、基本的に2回まで修正対応が含まれています。追加修正もオプションで対応可能です。',
      },
    },
    {
      '@type': 'Question',
      name: '広告運用もお願いできますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい、動画制作から広告運用・改善まで一気通貫で対応いたします。制作と運用を同じチームが担当することで、PDCAを高速に回せます。',
      },
    },
    {
      '@type': 'Question',
      name: 'どのSNSに対応していますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Instagram、TikTok、YouTube、X（旧Twitter）、Facebook、LINEなど主要SNS全てに対応しています。',
      },
    },
    {
      '@type': 'Question',
      name: '契約期間の縛りはありますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '最低契約期間は1ヶ月からです。長期契約による割引もご用意しています。',
      },
    },
  ],
}

export const aistudioServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI活用型広告動画制作・運用サービス',
  provider: {
    '@type': 'Organization',
    name: '株式会社ニューロスフィア',
  },
  description:
    'AI×プロの制作チームが、広告動画の制作から運用・改善まで一気通貫で伴走します。',
  url: `${BASE_URL}/aistudio`,
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'JPY',
    lowPrice: '150000',
    highPrice: '500000',
    offerCount: '3',
  },
}
