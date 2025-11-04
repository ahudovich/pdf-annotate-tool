'use client'

import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { SearchIcon, TrashIcon, XIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useAnnotations } from '@/contexts/annotations.context'
import { useDocuments } from '@/contexts/documents.context'
import { HASH_PREFIX } from '@/enums/constants'
import { cn } from '@/lib/utils'
import type { AnnotationItem } from '@/types/db'

export function Assistant({ className }: { className?: string }) {
  const [searchQuery, setSearchQuery] = useState('')

  const { annotations } = useAnnotations()
  const { selectedDocumentId } = useDocuments()

  const currentDocumentAnnotations = annotations.filter(
    (annotation) => annotation.documentId === selectedDocumentId
  )

  const filteredAnnotations = currentDocumentAnnotations.filter(
    (annotation) =>
      annotation.content.text?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      annotation.comment?.toLowerCase().includes(searchQuery.toLowerCase())
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
            placeholder="Search annotations..."
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

      {/* Annotations list */}
      <ScrollArea className="h-full">
        {filteredAnnotations.map((annotation) => (
          <AnnotationCard key={annotation.id} annotation={annotation} />
        ))}
      </ScrollArea>
    </aside>
  )
}

function AnnotationCard({ annotation }: { annotation: AnnotationItem }) {
  const { deleteAnnotation } = useAnnotations()

  function scrollToAnnotation() {
    document.location.hash = `${HASH_PREFIX}${annotation.id}`
  }

  function handleDeleteAnnotation(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    deleteAnnotation(annotation.id)
  }

  return (
    <div
      className="border-border hover:bg-accent/50 w-full cursor-pointer border-b p-4 transition-colors"
      onClick={scrollToAnnotation}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <ul className="text-muted-foreground flex items-center text-xs">
          <li className="after:mx-1 after:content-['•']">
            {format(parseISO(annotation.createdAt), 'MMM d, yyyy')}
          </li>
          <li>Page {annotation.position.boundingRect.pageNumber}</li>
        </ul>

        <div className="flex items-center gap-0.5">
          <Button size="sm" variant="ghost" onClick={handleDeleteAnnotation}>
            <TrashIcon className="size-3.5" />
          </Button>
        </div>
      </div>

      <p className="text-foreground mb-2 line-clamp-2 text-sm">{annotation.content.text}</p>

      {annotation.comment && (
        <p className="text-muted-foreground line-clamp-2 text-xs">{annotation.comment}</p>
      )}
    </div>
  )
}
