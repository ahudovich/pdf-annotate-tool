'use client'

import { createContext, useContext, useState } from 'react'
import { nanoid } from 'nanoid'
import type { GhostHighlight } from 'react-pdf-highlighter-extended'
import type { AnnotationItem } from '@/types/db'

interface AnnotationsContextType {
  annotations: Array<AnnotationItem>
  addAnnotation: (documentId: string, annotation: GhostHighlight, comment: string) => void
  deleteAnnotation: (id: AnnotationItem['id']) => void
  editAnnotation: (idToUpdate: string, edit: Partial<AnnotationItem>) => void
}

const AnnotationsContext = createContext<AnnotationsContextType>({
  annotations: [],
  addAnnotation: () => {},
  deleteAnnotation: () => {},
  editAnnotation: () => {},
})

export function AnnotationsProvider({ children }: { children: React.ReactNode }) {
  const [annotations, setAnnotations] = useState<Array<AnnotationItem>>([])

  function addAnnotation(documentId: string, annotation: GhostHighlight, comment: string | null) {
    setAnnotations((prev) => [
      ...prev,
      {
        id: nanoid(),
        documentId,
        type: annotation.type,
        createdAt: new Date().toISOString(),
        content: annotation.content,
        comment,
        position: annotation.position,
      },
    ])
  }

  function deleteAnnotation(id: AnnotationItem['id']) {
    setAnnotations(annotations.filter((annotation) => annotation.id != id))
  }

  function editAnnotation(idToUpdate: string, edit: Partial<AnnotationItem>) {
    setAnnotations(
      annotations.map((annotation) =>
        annotation.id === idToUpdate ? { ...annotation, ...edit } : annotation
      )
    )
  }

  return (
    <AnnotationsContext value={{ annotations, addAnnotation, deleteAnnotation, editAnnotation }}>
      {children}
    </AnnotationsContext>
  )
}

export function useAnnotations() {
  const context = useContext(AnnotationsContext)

  if (!context) {
    throw new Error('`useAnnotations` must be used within a `AnnotationsProvider`')
  }

  return context
}
