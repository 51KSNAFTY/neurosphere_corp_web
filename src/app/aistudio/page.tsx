import type { Metadata } from 'next'

import AistudioPage from '@/components/aistudio/AistudioPage'
import '@/styles/aistudio.css'

export const metadata: Metadata = {
  title: 'AI活用型広告動画制作・運用サービス | Neurosphere',
  description:
    '「当てにいく広告」ではなく「当たるまで回し続ける広告」へ。AI×プロの制作チームが広告動画の制作から運用・改善まで一気通貫で伴走。月10本¥350,000〜。',
  openGraph: {
    title: 'AI活用型広告動画制作・運用サービス | Neurosphere',
    description:
      '「当てにいく広告」ではなく「当たるまで回し続ける広告」へ。AI×プロの制作チームが広告動画の制作から運用・改善まで一気通貫で伴走。月10本¥350,000〜。',
    siteName: 'Neurosphere',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI活用型広告動画制作・運用サービス | Neurosphere',
    description:
      '「当てにいく広告」ではなく「当たるまで回し続ける広告」へ。AI×プロの制作チームが広告動画の制作から運用・改善まで一気通貫で伴走。',
  },
}

export default function Page() {
  return <AistudioPage />
}
