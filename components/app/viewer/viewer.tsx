'use client'

import { useEffect, useEffectEvent, useRef, useState } from 'react'
import { PdfHighlighter, PdfLoader } from 'react-pdf-highlighter-extended'
import { ViewerHighlightContainer } from '@/components/app/viewer/ViewerHighlightContainer'
import { ViewerToolbar } from '@/components/app/viewer/ViewerToolbar'
import { ViewerTooltip } from '@/components/app/viewer/ViewerTooltip'
import { useDatabase } from '@/contexts/db.context'
import { useHighlights } from '@/contexts/highlights.context'
import { cn } from '@/lib/utils'
import type { PdfHighlighterUtils } from 'react-pdf-highlighter-extended'

export function Viewer({ className }: { className?: string }) {
  const highlighterUtilsRef = useRef<PdfHighlighterUtils | null>(null)

  const [pdfScaleValue, setPdfScaleValue] = useState<number | undefined>(undefined)

  const { documents, selectedDocumentId } = useDatabase()
  const { highlights, addHighlight } = useHighlights()

  const filteredHighlights = highlights.filter(
    (highlight) => highlight.documentId === selectedDocumentId
  )

  const onHashChange = useEffectEvent(() => {
    const id = document.location.hash.slice('#highlight-'.length)
    const highlight = highlights.find((highlight) => highlight.id === id)

    if (highlight && highlighterUtilsRef.current) {
      highlighterUtilsRef.current.scrollToHighlight(highlight)
    }
  })

  // Hash listeners for autoscrolling to highlights
  useEffect(() => {
    window.addEventListener('hashchange', onHashChange)

    return () => {
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [])

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
      <PdfLoader document={fileUrl} beforeLoad={() => null}>
        {(pdfDocument) => (
          <PdfHighlighter
            pdfDocument={pdfDocument}
            pdfScaleValue={pdfScaleValue}
            highlights={filteredHighlights}
            onScrollAway={() => (document.location.hash = '')}
            selectionTip={<ViewerTooltip addHighlight={addHighlight} />}
            textSelectionColor="rgba(255, 226, 143, 1)"
            utilsRef={(pdfHighlighterUtils) => {
              highlighterUtilsRef.current = pdfHighlighterUtils
            }}
          >
            <ViewerHighlightContainer />
          </PdfHighlighter>
        )}
      </PdfLoader>
    </ViewerWrapper>
  )
}

function ViewerWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return <main className={cn('border-border border-x bg-zinc-100', className)}>{children}</main>
}
