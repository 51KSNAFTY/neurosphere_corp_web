import { Noto_Sans_JP } from 'next/font/google'
import type { ReactNode } from 'react'

import '@/styles/globals.css'
import { createMetadata } from '@/lib/metadata'
import { Providers } from './providers'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
})

export const metadata = createMetadata()

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
