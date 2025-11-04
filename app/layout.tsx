import '@/app/globals.css'
import { Providers } from '@/app/providers'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PDF Annotate Tool',
}

export default function RootLayout(props: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Providers>{props.children}</Providers>
      </body>
    </html>
  )
}
