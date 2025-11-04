'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { useDatabase } from '@/contexts/db.context'
import { useHighlights } from '@/contexts/highlights.context'
import { cn } from '@/lib/utils'
import type { HighlightItem } from '@/types/db'

export function Assistant({ className }: { className?: string }) {
  const { highlights, addHighlight, deleteHighlight, editHighlight } = useHighlights()
  const { selectedDocumentId } = useDatabase()

  const filteredHighlights = highlights.filter(
    (highlight) => highlight.documentId === selectedDocumentId
  )

  return (
    <aside
      className={cn(
        'bg-background grid h-full w-80 grid-rows-[auto_minmax(0,1fr)] overflow-hidden',
        className
      )}
    >
      {/* Header */}
      <div className="border-border border-b p-4">
        <h2 className="text-foreground text-lg font-bold">Assistant</h2>
      </div>

      {/* Highlights list */}
      <ScrollArea className="h-full">
        {filteredHighlights.map((highlight) => (
          <HighlightCard key={highlight.id} highlight={highlight} />
        ))}
      </ScrollArea>
    </aside>
  )
}

function HighlightCard({ highlight }: { highlight: HighlightItem }) {
  return (
    <div className="border-border hover:bg-accent/50 w-full cursor-pointer border-b p-4 transition-colors">
      <p className="text-foreground mb-1.5 line-clamp-3 text-sm font-medium">
        {highlight.content.text}
      </p>
      <p className="text-muted-foreground line-clamp-3 text-xs font-medium">{highlight.comment}</p>
    </div>
  )
}
