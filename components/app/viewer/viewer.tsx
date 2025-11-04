'use client'

import { useRef, useState } from 'react'
import { PdfHighlighter, PdfLoader } from 'react-pdf-highlighter-extended'
import { ViewerToolbar } from '@/components/app/viewer/ViewerToolbar'
import { useDatabase } from '@/contexts/db.context'
import { cn } from '@/lib/utils'
import type { Highlight, PdfHighlighterUtils } from 'react-pdf-highlighter-extended'

export function Viewer({ className }: { className?: string }) {
  const highlighterUtilsRef = useRef<PdfHighlighterUtils | null>(null)

  const [highlights, setHighlights] = useState<Array<Highlight>>([])
  const [pdfScaleValue, setPdfScaleValue] = useState<number | undefined>(undefined)

  const { documents, selectedDocumentId } = useDatabase()

  const pdfDocument = documents.find((d) => d.id === selectedDocumentId)

  if (!pdfDocument) {
    return (
      <ViewerWrapper className={cn('grid place-content-center', className)}>
        <p className="text-muted-foreground text-center">No document selected</p>
      </ViewerWrapper>
    )
  }

  const fileUrl = URL.createObjectURL(pdfDocument.file)

  return (
    <ViewerWrapper className={cn('relative', className)}>
      <ViewerToolbar name={pdfDocument.name} setPdfScaleValue={setPdfScaleValue} />
      <PdfLoader document={fileUrl}>
        {(pdfDocument) => (
          <PdfHighlighter
            enableAreaSelection={(event) => event.altKey}
            pdfDocument={pdfDocument}
            pdfScaleValue={pdfScaleValue}
            utilsRef={(_pdfHighlighterUtils) => {
              highlighterUtilsRef.current = _pdfHighlighterUtils
            }}
            selectionTip={<div>Selection tip</div>}
            highlights={highlights}
          >
            {/* User-defined HighlightContainer component goes here */}
          </PdfHighlighter>
        )}
      </PdfLoader>
    </ViewerWrapper>
  )
}

function ViewerWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return <main className={cn('border-border border-x bg-zinc-50', className)}>{children}</main>
}
