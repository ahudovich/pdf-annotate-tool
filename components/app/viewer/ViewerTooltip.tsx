import { useLayoutEffect, useRef, useState } from 'react'
import {
  GhostHighlight,
  PdfSelection,
  usePdfHighlighterContext,
} from 'react-pdf-highlighter-extended'
import { ViewerCommentForm } from '@/components/app/viewer/ViewerCommentForm'

interface ViewerTooltipProps {
  addHighlight: (highlight: GhostHighlight, comment: string) => void
}

export function ViewerTooltip({ addHighlight }: ViewerTooltipProps) {
  const [compact, setCompact] = useState(true)
  const selectionRef = useRef<PdfSelection | null>(null)

  const { getCurrentSelection, removeGhostHighlight, setTip, updateTipPosition } =
    usePdfHighlighterContext()

  useLayoutEffect(() => {
    updateTipPosition!()
  }, [compact, updateTipPosition])

  return (
    <div className="Tip">
      {compact ? (
        <button
          className="Tip__compact"
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
