import {
  MonitoredHighlightContainer,
  TextHighlight,
  Tip,
  useHighlightContainerContext,
  ViewportHighlight,
} from 'react-pdf-highlighter-extended'
import { AnnotationItem } from '@/types/db'

export function ViewerHighlightContainer() {
  const { highlight, isScrolledTo } = useHighlightContainerContext<AnnotationItem>()

  const component = <TextHighlight isScrolledTo={isScrolledTo} highlight={highlight} />

  const annotationTip: Tip = {
    position: highlight.position,
    content: <ViewerHighlightPopup highlight={highlight} />,
  }

  return (
    <MonitoredHighlightContainer highlightTip={annotationTip} key={highlight.id}>
      {component}
    </MonitoredHighlightContainer>
  )
}

function ViewerHighlightPopup({ highlight }: { highlight: ViewportHighlight<AnnotationItem> }) {
  return (
    <div className="border-border overflow-hidden rounded-lg border bg-white px-4 py-2 text-sm shadow-xl">
      {highlight.comment || 'No comment for this highlight'}
    </div>
  )
}
