import Assistant from '@/components/app/assistant/assistant'
import Sidebar from '@/components/app/sidebar/sidebar'
import Viewer from '@/components/app/viewer/viewer'

export default async function HomePage() {
  return (
    <div className="bg-background grid h-dvh grid-cols-[auto_1fr_auto] overflow-hidden">
      <Sidebar />
      <Viewer />
      <Assistant />
    </div>
  )
}
