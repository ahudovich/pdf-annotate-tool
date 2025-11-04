'use client'

import { useId, useState } from 'react'
import { format, parseISO } from 'date-fns'
import { FileTextIcon, SearchIcon, UploadIcon, XIcon } from 'lucide-react'
import { nanoid } from 'nanoid'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useDocuments } from '@/contexts/documents.context'
import { convertBytesToMB } from '@/lib/file'
import { cn } from '@/lib/utils'
import type { DocumentItem } from '@/types/db'

export function Sidebar({ className }: { className?: string }) {
  const id = useId()

  const [searchQuery, setSearchQuery] = useState('')
  const { documents, setSelectedDocumentId, addDocument } = useDocuments()

  const filteredDocuments = documents.filter((document) =>
    document.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files

    if (files) {
      let firstDocumentId: string | null = null
      const fileEntries = Array.from(files).entries()

      for (const [index, file] of fileEntries) {
        const newDocumentId = nanoid()

        if (index === 0) {
          firstDocumentId = newDocumentId
        }

        addDocument({
          id: newDocumentId,
          createdAt: new Date().toISOString(),
          name: file.name,
          filename: file.name,
          file: file,
          size: file.size,
        })
      }

      // Automatically select the first uploaded file
      setSelectedDocumentId(firstDocumentId)
    }
  }

  return (
    <aside
      className={cn(
        'bg-background grid h-full w-80 grid-rows-[auto_auto_minmax(0,1fr)] overflow-hidden',
        className
      )}
    >
      {/* Header */}
      <div className="border-border border-b p-4">
        <h1 className="text-foreground mb-4 text-lg font-bold">Documents</h1>

        <div>
          <input
            id={`upload-pdf-${id}`}
            className="hidden"
            type="file"
            accept="application/pdf"
            multiple
            onChange={handleUpload}
          />

          <Button size="sm" asChild>
            <label className="w-full" htmlFor={`upload-pdf-${id}`}>
              <UploadIcon className="size-4" />
              Upload PDF
            </label>
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="border-border border-b p-4">
        <div className="relative">
          <SearchIcon className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
          <Input
            className="px-8"
            placeholder="Search documents..."
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

      {/* Document list */}
      <ScrollArea className="h-full">
        {filteredDocuments.map((document) => (
          <DocumentCard key={document.id} document={document} />
        ))}
      </ScrollArea>
    </aside>
  )
}

function DocumentCard({ document }: { document: DocumentItem }) {
  const { selectedDocumentId, setSelectedDocumentId } = useDocuments()

  return (
    <div
      className={cn(
        'border-border hover:bg-accent/25 grid w-full cursor-pointer grid-cols-[auto_1fr] gap-2.5 border-b p-4 transition-colors',
        selectedDocumentId === document.id && 'bg-accent hover:bg-accent'
      )}
      onClick={() => setSelectedDocumentId(document.id)}
    >
      <div className="translate-y-0.5">
        <FileTextIcon className="text-muted-foreground size-4" />
      </div>

      <div className="grow overflow-hidden">
        <h2 className="text-foreground mb-1.5 truncate text-sm font-medium">{document.name}</h2>
        <ul className="text-muted-foreground flex items-center text-xs">
          <li className="after:mx-1 after:content-['•']">
            {format(parseISO(document.createdAt), 'MMM d, yyyy')}
          </li>
          <li>{convertBytesToMB(document.size)}</li>
        </ul>
      </div>
    </div>
  )
}
