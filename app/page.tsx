import AIAssistant from '@/components/AIAssistant/AIAssistant'
import DocumentList from '@/components/DocumentList/DocumentList'
import PDFViewer from '@/components/PDFViewer/PDFViewer'

export default async function HomePage() {
  return (
    <div className="bg-background grid h-dvh grid-cols-[auto_1fr_auto] overflow-hidden">
      <DocumentList />
      <PDFViewer />
      <AIAssistant />
    </div>
  )
}
