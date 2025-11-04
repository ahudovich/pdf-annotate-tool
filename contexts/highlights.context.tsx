'use client'

import { createContext, useContext, useState } from 'react'
import { nanoid } from 'nanoid'
import type { GhostHighlight } from 'react-pdf-highlighter-extended'
import type { HighlightItem } from '@/types/db'

interface HighlightsContextType {
  highlights: Array<HighlightItem>
  addHighlight: (highlight: GhostHighlight, comment: string) => void
  deleteHighlight: (id: HighlightItem['id']) => void
  editHighlight: (idToUpdate: string, edit: Partial<HighlightItem>) => void
}

const HighlightsContext = createContext<HighlightsContextType>({
  highlights: [],
  addHighlight: () => {},
  deleteHighlight: () => {},
  editHighlight: () => {},
})

export function HighlightsProvider({ children }: { children: React.ReactNode }) {
  const [highlights, setHighlights] = useState<Array<HighlightItem>>([])

  function addHighlight(highlight: GhostHighlight, comment: string | null) {
    setHighlights((prev) => [
      ...prev,
      {
        id: nanoid(),
        type: highlight.type,
        createdAt: new Date().toISOString(),
        content: highlight.content,
        comment,
        position: highlight.position,
      },
    ])
  }

  function deleteHighlight(id: HighlightItem['id']) {
    setHighlights(highlights.filter((h) => h.id != id))
  }

  function editHighlight(idToUpdate: string, edit: Partial<HighlightItem>) {
    setHighlights(
      highlights.map((highlight) =>
        highlight.id === idToUpdate ? { ...highlight, ...edit } : highlight
      )
    )
  }

  return (
    <HighlightsContext value={{ highlights, addHighlight, deleteHighlight, editHighlight }}>
      {children}
    </HighlightsContext>
  )
}

export function useHighlights() {
  const context = useContext(HighlightsContext)

  if (!context) {
    throw new Error('`useHighlights` must be used within a `HighlightsProvider`')
  }

  return context
}
