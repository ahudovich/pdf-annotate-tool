'use client'

import { useEffect, useEffectEvent, useRef, useState } from 'react'
import { PdfHighlighter, PdfLoader } from 'react-pdf-highlighter-extended'
import { ViewerHighlightContainer } from '@/components/app/viewer/ViewerHighlightContainer'
import { ViewerToolbar } from '@/components/app/viewer/ViewerToolbar'
import { ViewerTooltip } from '@/components/app/viewer/ViewerTooltip'
import { useDatabase } from '@/contexts/db.context'
import { useHighlights } from '@/contexts/highlights.context'
import type { PdfHighlighterUtils } from 'react-pdf-highlighter-extended'
import type { DocumentItem } from '@/types/db'

export function ViewerContent({
  fileUrl,
  pdfDocument,
}: {
  fileUrl: string
  pdfDocument: DocumentItem
}) {
  const highlighterUtilsRef = useRef<PdfHighlighterUtils | null>(null)

  const [zoomValue, setZoomValue] = useState<number | undefined>(undefined)

  const { selectedDocumentId } = useDatabase()
  const { highlights, addHighlight } = useHighlights()

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

  const filteredHighlights = highlights.filter(
    (highlight) => highlight.documentId === selectedDocumentId
  )

  return (
    <>
      <ViewerToolbar name={pdfDocument.name} setPdfScaleValue={setZoomValue} />
      <PdfLoader document={fileUrl} beforeLoad={() => null}>
        {(pdfDocument) => (
          <PdfHighlighter
            pdfDocument={pdfDocument}
            pdfScaleValue={zoomValue}
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
    </>
  )
}
