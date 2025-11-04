'use client'

import { useRef, useState } from 'react'
import { PdfHighlighter, PdfLoader } from 'react-pdf-highlighter-extended'
import { ViewerHighlightContainer } from '@/components/app/viewer/ViewerHighlightContainer'
import { ViewerToolbar } from '@/components/app/viewer/ViewerToolbar'
import { ViewerTooltip } from '@/components/app/viewer/ViewerTooltip'
import { useAnnotations } from '@/contexts/annotations.context'
import { useDocuments } from '@/contexts/documents.context'
import { useHashChange } from '@/hooks/useHashChange'
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

  const { selectedDocumentId } = useDocuments()
  const { annotations, addAnnotation } = useAnnotations()

  // Auto scroll to highlights when hash changes
  useHashChange({ annotations, highlighterUtilsRef })

  const filteredAnnotations = annotations.filter(
    (annotation) => annotation.documentId === selectedDocumentId
  )

  return (
    <>
      <ViewerToolbar name={pdfDocument.name} setPdfScaleValue={setZoomValue} />
      <PdfLoader document={fileUrl} beforeLoad={() => null}>
        {(pdfDocument) => (
          <PdfHighlighter
            pdfDocument={pdfDocument}
            pdfScaleValue={zoomValue}
            highlights={filteredAnnotations}
            onScrollAway={() => (document.location.hash = '')}
            selectionTip={<ViewerTooltip addAnnotation={addAnnotation} />}
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
