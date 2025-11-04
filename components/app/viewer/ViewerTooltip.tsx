import { useLayoutEffect, useRef, useState } from 'react'
import {
  GhostHighlight,
  PdfSelection,
  usePdfHighlighterContext,
} from 'react-pdf-highlighter-extended'
import { ViewerCommentForm } from '@/components/app/viewer/ViewerCommentForm'
import { useDocuments } from '@/contexts/documents.context'

interface ViewerTooltipProps {
  addAnnotation: (documentId: string, annotation: GhostHighlight, comment: string) => void
}

export function ViewerTooltip({ addAnnotation }: ViewerTooltipProps) {
  const [isCompact, setIsCompact] = useState(true)
  const selectionRef = useRef<PdfSelection | null>(null)

  const { selectedDocumentId } = useDocuments()

  const { getCurrentSelection, removeGhostHighlight, setTip, updateTipPosition } =
    usePdfHighlighterContext()

  useLayoutEffect(() => {
    updateTipPosition!()
  }, [isCompact, updateTipPosition])

  function handleAddAnnotation(comment: string) {
    addAnnotation(
      selectedDocumentId!,
      {
        content: selectionRef.current!.content,
        type: selectionRef.current!.type,
        position: selectionRef.current!.position,
      },
      comment
    )

    removeGhostHighlight()
    setTip(null)
  }

  return (
    <div className="border-border overflow-hidden rounded-lg border bg-white shadow-xl">
      {isCompact ? (
        <button
          className="cursor-pointer px-3 py-1 text-sm font-medium transition-colors hover:bg-zinc-100"
          onClick={() => {
            setIsCompact(false)
            selectionRef.current = getCurrentSelection()
            selectionRef.current!.makeGhostHighlight()
          }}
        >
          Add annotation
        </button>
      ) : (
        <div className="w-48 p-2">
          <ViewerCommentForm onSubmit={handleAddAnnotation} />
        </div>
      )}
    </div>
  )
}
