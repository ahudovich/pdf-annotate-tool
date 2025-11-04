'use client'

import { useState } from 'react'
import { AssistantAnnotations } from '@/components/app/assistant/AssistantAnnotations'
import { AssistantChat } from '@/components/app/assistant/AssistantChat'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

enum AssistantTab {
  Annotations = 'annotations',
  Chat = 'chat',
}

export function Assistant({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState(AssistantTab.Annotations)

  function handleTabChange(tab: string) {
    setActiveTab(tab as AssistantTab)
  }

  return (
    <Tabs className="overflow-hidden" value={activeTab} onValueChange={handleTabChange}>
      <aside
        className={cn(
          'bg-background grid h-full w-80 overflow-hidden',
          activeTab === AssistantTab.Annotations && 'grid-rows-[auto_auto_minmax(0,1fr)]',
          activeTab === AssistantTab.Chat && 'grid-rows-[auto_minmax(0,1fr)]',
          className
        )}
      >
        <div className="border-border flex h-(--toolbar-height) items-center justify-between border-b px-4">
          <h2 className="text-foreground text-lg font-bold">Assistant</h2>

          <TabsList>
            <TabsTrigger value={AssistantTab.Annotations}>Annotations</TabsTrigger>
            <TabsTrigger value={AssistantTab.Chat}>Chat</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={AssistantTab.Annotations} asChild>
          <AssistantAnnotations />
        </TabsContent>

        <TabsContent value={AssistantTab.Chat} asChild>
          <AssistantChat />
        </TabsContent>
      </aside>
    </Tabs>
  )
}
