'use client'

import { createContext, useContext, useState } from 'react'
import type { DocumentItem } from '@/types/db'

interface DatabaseContextType {
  documents: Array<DocumentItem>
  selectedDocumentId: DocumentItem['id'] | null
  setSelectedDocumentId: (id: DocumentItem['id'] | null) => void
  addDocument: (document: DocumentItem) => void
  deleteDocument: (id: DocumentItem['id']) => void
}

const DatabaseContext = createContext<DatabaseContextType>({
  documents: [],
  selectedDocumentId: null,
  setSelectedDocumentId: () => {},
  addDocument: () => {},
  deleteDocument: () => {},
})

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const [documents, setDocuments] = useState<Array<DocumentItem>>([])
  const [selectedDocumentId, setSelectedDocumentId] = useState<DocumentItem['id'] | null>(null)

  function addDocument(document: DocumentItem) {
    setDocuments((prev) => [...prev, document])
  }

  function deleteDocument(id: DocumentItem['id']) {
    setDocuments((prev) => prev.filter((document) => document.id !== id))
  }

  return (
    <DatabaseContext
      value={{ documents, selectedDocumentId, setSelectedDocumentId, addDocument, deleteDocument }}
    >
      {children}
    </DatabaseContext>
  )
}

export function useDatabase() {
  const context = useContext(DatabaseContext)

  if (!context) {
    throw new Error('`useDatabase` must be used within a `DatabaseProvider`')
  }

  return context
}
