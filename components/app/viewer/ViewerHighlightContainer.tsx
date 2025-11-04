import {
  MonitoredHighlightContainer,
  TextHighlight,
  Tip,
  useHighlightContainerContext,
  ViewportHighlight,
} from 'react-pdf-highlighter-extended'
import { HighlightItem } from '@/types/db'

export function ViewerHighlightContainer() {
  const { highlight, isScrolledTo } = useHighlightContainerContext<HighlightItem>()

  const component = <TextHighlight isScrolledTo={isScrolledTo} highlight={highlight} />

  const highlightTip: Tip = {
    position: highlight.position,
    content: <ViewerHighlightPopup highlight={highlight} />,
  }

  return (
    <MonitoredHighlightContainer highlightTip={highlightTip} key={highlight.id}>
      {component}
    </MonitoredHighlightContainer>
  )
}

function ViewerHighlightPopup({ highlight }: { highlight: ViewportHighlight<HighlightItem> }) {
  return (
    <div className="border-border overflow-hidden rounded-lg border bg-white px-4 py-2 text-sm shadow-xl">
      {highlight.comment || 'No comment for this highlight'}
    </div>
  )
}
