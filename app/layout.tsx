import { DatabaseProvider } from '@/contexts/db.context'
import '@/app/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PDF Annotate Tool',
}

export default function RootLayout(props: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <DatabaseProvider>{props.children}</DatabaseProvider>
      </body>
    </html>
  )
}
