import { useLayoutEffect, useRef, useState } from 'react'
import {
  GhostHighlight,
  PdfSelection,
  usePdfHighlighterContext,
} from 'react-pdf-highlighter-extended'
import { ViewerCommentForm } from '@/components/app/viewer/ViewerCommentForm'
import { useDatabase } from '@/contexts/db.context'

interface ViewerTooltipProps {
  addHighlight: (documentId: string, highlight: GhostHighlight, comment: string) => void
}

export function ViewerTooltip({ addHighlight }: ViewerTooltipProps) {
  const [compact, setCompact] = useState(true)
  const selectionRef = useRef<PdfSelection | null>(null)

  const { selectedDocumentId } = useDatabase()

  const { getCurrentSelection, removeGhostHighlight, setTip, updateTipPosition } =
    usePdfHighlighterContext()

  useLayoutEffect(() => {
    updateTipPosition!()
  }, [compact, updateTipPosition])

  return (
    <div>
      {compact ? (
        <button
          onClick={() => {
            setCompact(false)
            selectionRef.current = getCurrentSelection()
            selectionRef.current!.makeGhostHighlight()
          }}
        >
          Add highlight
        </button>
      ) : (
        <ViewerCommentForm
          placeHolder="Your comment..."
          onSubmit={(input) => {
            addHighlight(
              selectedDocumentId!,
              {
                content: selectionRef.current!.content,
                type: selectionRef.current!.type,
                position: selectionRef.current!.position,
              },
              input
            )

            removeGhostHighlight()
            setTip(null)
          }}
        />
      )}
    </div>
  )
}
