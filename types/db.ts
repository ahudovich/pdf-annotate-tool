export interface DocumentItem {
  id: string
  createdAt: string // ISO string
  name: string
  filename: string
  file: File
  size: number // bytes
}
