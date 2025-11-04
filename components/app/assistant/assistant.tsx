'use client'

import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { SearchIcon, TrashIcon, XIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useDatabase } from '@/contexts/db.context'
import { useHighlights } from '@/contexts/highlights.context'
import { cn } from '@/lib/utils'
import type { HighlightItem } from '@/types/db'

export function Assistant({ className }: { className?: string }) {
  const [searchQuery, setSearchQuery] = useState('')

  const { highlights } = useHighlights()
  const { selectedDocumentId } = useDatabase()

  const currentDocumentHighlights = highlights.filter(
    (highlight) => highlight.documentId === selectedDocumentId
  )

  const filteredHighlights = currentDocumentHighlights.filter(
    (highlight) =>
      highlight.content.text?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      highlight.comment?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <aside
      className={cn(
        'bg-background grid h-full w-80 grid-rows-[auto_auto_minmax(0,1fr)] overflow-hidden',
        className
      )}
    >
      {/* Header */}
      <div className="border-border flex h-(--toolbar-height) items-center border-b px-4">
        <h2 className="text-foreground text-lg font-bold">Assistant</h2>
      </div>

      {/* Search */}
      <div className="border-border border-b p-4">
        <div className="relative">
          <SearchIcon className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
          <Input
            className="px-8"
            placeholder="Search highlights..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />

          {searchQuery && (
            <button
              type="button"
              className="group absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer"
              onClick={() => setSearchQuery('')}
            >
              <XIcon className="text-muted-foreground group-hover:text-primary size-3.5 transition-colors" />
            </button>
          )}
        </div>
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
  const { deleteHighlight } = useHighlights()

  function scrollToHighlight() {
    document.location.hash = `highlight-${highlight.id}`
  }

  function handleDeleteHighlight(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    deleteHighlight(highlight.id)
  }

  return (
    <div
      className="border-border hover:bg-accent/50 w-full cursor-pointer border-b p-4 transition-colors"
      onClick={scrollToHighlight}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <ul className="text-muted-foreground flex items-center text-xs">
          <li className="after:mx-1 after:content-['•']">
            {format(parseISO(highlight.createdAt), 'MMM d, yyyy')}
          </li>
          <li>Page {highlight.position.boundingRect.pageNumber}</li>
        </ul>

        <div className="flex items-center gap-0.5">
          <Button size="sm" variant="ghost" onClick={handleDeleteHighlight}>
            <TrashIcon className="size-3.5" />
          </Button>
        </div>
      </div>

      <p className="text-foreground mb-2 line-clamp-2 text-sm">{highlight.content.text}</p>

      {highlight.comment && (
        <p className="text-muted-foreground line-clamp-2 text-xs">{highlight.comment}</p>
      )}
    </div>
  )
}
