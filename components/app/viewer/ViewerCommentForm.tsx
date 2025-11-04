import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface ViewerCommentFormProps {
  onSubmit: (comment: string) => void
}

export function ViewerCommentForm({ onSubmit }: ViewerCommentFormProps) {
  const [input, setInput] = useState<string>('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit(input)
  }

  return (
    <form className="grid gap-2" onSubmit={handleSubmit}>
      <Textarea
        className="resize-none"
        autoFocus
        placeholder="Your comment..."
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <Button size="sm" variant="outline" type="submit">
        Save
      </Button>
    </form>
  )
}
