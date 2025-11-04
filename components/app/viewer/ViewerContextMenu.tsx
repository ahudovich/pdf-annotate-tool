export interface ViewerContextMenuProps {
  xPos: number
  yPos: number
  editComment: () => void
  deleteHighlight: () => void
}

export function ViewerContextMenu({
  xPos,
  yPos,
  editComment,
  deleteHighlight,
}: ViewerContextMenuProps) {
  return (
    <ul
      className="absolute z-100 rounded-md bg-white p-2 shadow-md"
      style={{ top: yPos + 2, left: xPos + 2 }}
    >
      <li>
        <button
          className="cursor-pointer px-4 py-2 transition-colors hover:bg-zinc-100"
          onClick={editComment}
        >
          Edit Comment
        </button>
      </li>

      <li>
        <button
          className="cursor-pointer px-4 py-2 transition-colors hover:bg-zinc-100"
          onClick={deleteHighlight}
        >
          Delete
        </button>
      </li>
    </ul>
  )
}
