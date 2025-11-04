'use client'

import { DocumentsProvider } from '@/contexts/documents.context'
import { HighlightsProvider } from '@/contexts/highlights.context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DocumentsProvider>
      <HighlightsProvider>{children}</HighlightsProvider>
    </DocumentsProvider>
  )
}
