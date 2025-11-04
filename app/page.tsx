import { Assistant } from '@/components/app/assistant/Assistant'
import { Sidebar } from '@/components/app/sidebar/Sidebar'
import { Viewer } from '@/components/app/viewer/Viewer'

export default async function HomePage() {
  return (
    <div className="bg-background grid h-dvh grid-cols-[auto_1fr_auto] overflow-hidden">
      <Sidebar />
      <Viewer />
      <Assistant />
    </div>
  )
}
