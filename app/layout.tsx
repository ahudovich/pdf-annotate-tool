import '@/app/globals.css'
import { DocumentsProvider } from '@/contexts/documents.context'
import { HighlightsProvider } from '@/contexts/highlights.context'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PDF Annotate Tool',
}

export default function RootLayout(props: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <DocumentsProvider>
          <HighlightsProvider>{props.children}</HighlightsProvider>
        </DocumentsProvider>
      </body>
    </html>
  )
}
