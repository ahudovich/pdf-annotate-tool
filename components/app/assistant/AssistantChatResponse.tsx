'use client'

import { MessageSquare } from 'lucide-react'
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation'
import { Response } from '@/components/ai-elements/response'

export function AssistantChatResponse({ content }: { content: string }) {
  return (
    <Conversation className="relative h-full text-sm">
      <ConversationContent>
        {content.length === 0 ? (
          <ConversationEmptyState
            icon={<MessageSquare className="size-8 text-zinc-400" />}
            title="No messages yet"
            description="Start a conversation to see messages here"
          />
        ) : (
          <Response>{content}</Response>
        )}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  )
}
