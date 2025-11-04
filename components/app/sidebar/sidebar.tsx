'use client'

import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { FileTextIcon, SearchIcon, UploadIcon, XIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

const documents = [
  {
    id: '1',
    name: 'Project Proposal',
    path: '/documents/project-proposal.pdf',
    size: '2.4 MB',
    date: '2024-01-15',
    pages: 24,
  },
  {
    id: '2',
    name: 'Technical Specifications',
    path: '/documents/technical-specifications.pdf',
    size: '1.8 MB',
    date: '2024-01-14',
    pages: 18,
  },
  {
    id: '3',
    name: 'User Research Report',
    path: '/documents/user-research-report.pdf',
    size: '3.2 MB',
    date: '2024-01-12',
    pages: 32,
  },
]

export default function Sidebar({ className }: { className?: string }) {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null)

  return (
    <aside
      className={cn(
        'bg-background grid h-full w-72 grid-rows-[auto_auto_minmax(0,1fr)] overflow-hidden',
        className
      )}
    >
      {/* Header */}
      <div className="border-border border-b p-4">
        <h1 className="text-foreground mb-4 text-lg font-bold">Documents</h1>

        <Button className="w-full" size="sm">
          <UploadIcon className="size-4" />
          Upload PDF
        </Button>
      </div>

      {/* Search */}
      <div className="border-border border-b p-4">
        <div className="relative">
          <SearchIcon className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
          <Input placeholder="Search documents..." className="px-8" />
          <button
            type="button"
            className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer"
          >
            <XIcon className="text-muted-foreground size-3.5" />
          </button>
        </div>
      </div>

      {/* Document list */}
      <ScrollArea className="h-full">
        {documents.map((document) => (
          <DocumentCard
            key={document.id}
            data={document}
            selectedDocument={selectedDocument}
            setSelectedDocument={setSelectedDocument}
          />
        ))}
      </ScrollArea>
    </aside>
  )
}

function DocumentCard({
  data,
  selectedDocument,
  setSelectedDocument,
}: {
  data: (typeof documents)[number]
  selectedDocument: string | null
  setSelectedDocument: (id: string) => void
}) {
  return (
    <div
      className={cn(
        'border-border hover:bg-accent/25 grid w-full cursor-pointer grid-cols-[auto_1fr] items-start gap-2.5 border-b p-4 text-left transition-colors',
        selectedDocument === data.id && 'bg-accent hover:bg-accent'
      )}
      onClick={() => setSelectedDocument(data.id)}
    >
      <div className="translate-y-0.5">
        <FileTextIcon className="text-muted-foreground size-4" />
      </div>

      <div className="grow overflow-hidden">
        <h2 className="text-foreground mb-1.5 truncate text-sm font-medium">{data.name}</h2>
        <ul className="text-muted-foreground flex items-center text-xs">
          <li className="after:mx-1 after:content-['•']">
            {format(parseISO(data.date), 'MMM d, yyyy')}
          </li>
          <li className="after:mx-1 after:content-['•']">{data.size}</li>
          <li>{data.pages} pages</li>
        </ul>
      </div>
    </div>
  )
}
