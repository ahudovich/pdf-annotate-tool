import '@/app/globals.css'
import { DatabaseProvider } from '@/contexts/db.context'
import { HighlightsProvider } from '@/contexts/highlights.context'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PDF Annotate Tool',
}

export default function RootLayout(props: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <DatabaseProvider>
          <HighlightsProvider>{props.children}</HighlightsProvider>
        </DatabaseProvider>
      </body>
    </html>
  )
}
