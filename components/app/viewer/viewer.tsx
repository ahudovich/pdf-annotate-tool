'use client'

import { useRef, useState } from 'react'
import { PdfHighlighter, PdfLoader } from 'react-pdf-highlighter-extended'
import { ViewerCommentForm } from '@/components/app/viewer/ViewerCommentForm'
import { ViewerHighlightContainer } from '@/components/app/viewer/ViewerHighlightContainer'
import { ViewerToolbar } from '@/components/app/viewer/ViewerToolbar'
import { ViewerTooltip } from '@/components/app/viewer/ViewerTooltip'
import { useDatabase } from '@/contexts/db.context'
import { useHighlights } from '@/contexts/highlights.context'
import { cn } from '@/lib/utils'
import type { PdfHighlighterUtils, Tip, ViewportHighlight } from 'react-pdf-highlighter-extended'
import type { ViewerContextMenuProps } from '@/components/app/viewer/ViewerContextMenu'
import type { HighlightItem } from '@/types/db'

export function Viewer({ className }: { className?: string }) {
  const highlighterUtilsRef = useRef<PdfHighlighterUtils | null>(null)

  const [contextMenu, setContextMenu] = useState<ViewerContextMenuProps | null>(null)
  const [pdfScaleValue, setPdfScaleValue] = useState<number | undefined>(undefined)

  const { documents, selectedDocumentId } = useDatabase()
  const { highlights, addHighlight, deleteHighlight, editHighlight } = useHighlights()

  const pdfDocument = documents.find((d) => d.id === selectedDocumentId)

  if (!pdfDocument) {
    return (
      <ViewerWrapper className={cn('grid place-content-center', className)}>
        <p className="text-muted-foreground text-center">No document selected</p>
      </ViewerWrapper>
    )
  }

  const fileUrl = URL.createObjectURL(pdfDocument.file)

  function handleContextMenu(
    event: React.MouseEvent<HTMLDivElement>,
    highlight: ViewportHighlight<HighlightItem>
  ) {
    event.preventDefault()

    setContextMenu({
      xPos: event.clientX,
      yPos: event.clientY,
      deleteHighlight: () => deleteHighlight(highlight.id),
      editComment: () => editComment(highlight),
    })
  }

  function editComment(highlight: ViewportHighlight<HighlightItem>) {
    if (!highlighterUtilsRef.current) return

    const editCommentTip: Tip = {
      position: highlight.position,
      content: (
        <ViewerCommentForm
          placeHolder={highlight.comment ?? ''}
          onSubmit={(input: string) => {
            editHighlight(highlight.id, { comment: input })
            highlighterUtilsRef.current!.setTip(null)
            highlighterUtilsRef.current!.toggleEditInProgress(false)
          }}
        />
      ),
    }

    highlighterUtilsRef.current.setTip(editCommentTip)
    highlighterUtilsRef.current.toggleEditInProgress(true)
  }

  return (
    <ViewerWrapper className={cn('relative', className)}>
      <ViewerToolbar name={pdfDocument.name} setPdfScaleValue={setPdfScaleValue} />
      <PdfLoader document={fileUrl}>
        {(pdfDocument) => (
          <PdfHighlighter
            pdfDocument={pdfDocument}
            pdfScaleValue={pdfScaleValue}
            highlights={highlights}
            enableAreaSelection={(event) => event.altKey}
            utilsRef={(_pdfHighlighterUtils) => {
              highlighterUtilsRef.current = _pdfHighlighterUtils
            }}
            selectionTip={<ViewerTooltip addHighlight={addHighlight} />}
            textSelectionColor="rgba(255, 226, 143, 1)"
          >
            <ViewerHighlightContainer
              editHighlight={editHighlight}
              onContextMenu={handleContextMenu}
            />
          </PdfHighlighter>
        )}
      </PdfLoader>
    </ViewerWrapper>
  )
}

function ViewerWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return <main className={cn('border-border border-x bg-zinc-50', className)}>{children}</main>
}
