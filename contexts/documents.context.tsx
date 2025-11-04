'use client'

import { createContext, useContext, useState } from 'react'
import type { DocumentItem } from '@/types/db'

interface DocumentsContextType {
  documents: Array<DocumentItem>
  selectedDocumentId: DocumentItem['id'] | null
  setSelectedDocumentId: (id: DocumentItem['id'] | null) => void
  addDocument: (document: DocumentItem) => void
  deleteDocument: (id: DocumentItem['id']) => void
}

const DocumentsContext = createContext<DocumentsContextType>({
  documents: [],
  selectedDocumentId: null,
  setSelectedDocumentId: () => {},
  addDocument: () => {},
  deleteDocument: () => {},
})

export function DocumentsProvider({ children }: { children: React.ReactNode }) {
  const [documents, setDocuments] = useState<Array<DocumentItem>>([])
  const [selectedDocumentId, setSelectedDocumentId] = useState<DocumentItem['id'] | null>(null)

  function addDocument(document: DocumentItem) {
    setDocuments((prev) => [...prev, document])
  }

  function deleteDocument(id: DocumentItem['id']) {
    setDocuments((prev) => prev.filter((document) => document.id !== id))
  }

  return (
    <DocumentsContext
      value={{ documents, selectedDocumentId, setSelectedDocumentId, addDocument, deleteDocument }}
    >
      {children}
    </DocumentsContext>
  )
}

export function useDocuments() {
  const context = useContext(DocumentsContext)

  if (!context) {
    throw new Error('`useDocuments` must be used within a `DocumentsProvider`')
  }

  return context
}
