import { Content, HighlightType, ScaledPosition } from 'react-pdf-highlighter-extended'

export interface DocumentItem {
  id: string
  createdAt: string // ISO string
  name: string
  filename: string
  file: File
  size: number // bytes
}

export interface HighlightItem {
  id: string
  documentId: string
  type: HighlightType
  createdAt: string // ISO string
  content: Content
  comment: string | null
  position: ScaledPosition
}
