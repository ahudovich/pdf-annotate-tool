import { useState } from 'react'

interface ViewerCommentFormProps {
  onSubmit: (input: string) => void
  placeHolder?: string
}

export function ViewerCommentForm({ onSubmit }: ViewerCommentFormProps) {
  const [input, setInput] = useState<string>('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit(input)
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={input} onChange={(event) => setInput(event.target.value)} />
      <button type="submit">Save</button>
    </form>
  )
}
