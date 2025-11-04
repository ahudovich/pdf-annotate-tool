'use client'

import { useRef } from 'react'
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputProvider,
  PromptInputSubmit,
  PromptInputTextarea,
} from '@/components/ai-elements/prompt-input'
import type { PromptInputMessage } from '@/components/ai-elements/prompt-input'

export function AssistantChatPrompt({
  isStreaming,
  handleStartStreaming,
}: {
  isStreaming: boolean
  handleStartStreaming: () => void
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function handleSubmit(message: PromptInputMessage) {
    const hasText = Boolean(message.text)

    if (!hasText) {
      return
    }

    handleStartStreaming()
  }

  return (
    <div className="p-2">
      <PromptInputProvider>
        <PromptInput globalDrop multiple onSubmit={handleSubmit}>
          <PromptInputBody>
            <PromptInputTextarea
              className="max-h-24"
              placeholder="Type something to see the response..."
              ref={textareaRef}
            />
          </PromptInputBody>

          <PromptInputFooter className="flex justify-end">
            <PromptInputSubmit className="h-8!" status={isStreaming ? 'streaming' : 'ready'} />
          </PromptInputFooter>
        </PromptInput>
      </PromptInputProvider>
    </div>
  )
}
