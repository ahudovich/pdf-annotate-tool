'use client'

import { AnnotationsProvider } from '@/contexts/annotations.context'
import { DocumentsProvider } from '@/contexts/documents.context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DocumentsProvider>
      <AnnotationsProvider>{children}</AnnotationsProvider>
    </DocumentsProvider>
  )
}
