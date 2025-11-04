'use client'

import { useEffect } from 'react'
import { ViewerContent } from '@/components/app/viewer/ViewerContent'
import { useDatabase } from '@/contexts/db.context'
import { cn } from '@/lib/utils'

export function Viewer({ className }: { className?: string }) {
  const { documents, selectedDocumentId } = useDatabase()

  const pdfDocument = documents.find((document) => document.id === selectedDocumentId)

  const fileUrl = pdfDocument ? URL.createObjectURL(pdfDocument.file) : null

  useEffect(() => {
    if (!fileUrl) return

    return () => {
      URL.revokeObjectURL(fileUrl)
    }
  }, [fileUrl])

  if (!pdfDocument || !fileUrl) {
    return (
      <ViewerWrapper className={cn('grid place-content-center', className)}>
        <p className="text-muted-foreground text-center">No document selected</p>
      </ViewerWrapper>
    )
  }

  return (
    <ViewerWrapper className={cn('relative', className)}>
      <ViewerContent fileUrl={fileUrl} pdfDocument={pdfDocument} />
    </ViewerWrapper>
  )
}

function ViewerWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return <main className={cn('border-border border-x bg-zinc-100', className)}>{children}</main>
}
