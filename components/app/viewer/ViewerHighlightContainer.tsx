import {
  AreaHighlight,
  MonitoredHighlightContainer,
  TextHighlight,
  Tip,
  useHighlightContainerContext,
  usePdfHighlighterContext,
  ViewportHighlight,
} from 'react-pdf-highlighter-extended'
import { HighlightItem } from '@/types/db'

interface ViewerHighlightContainerProps {
  editHighlight: (idToUpdate: string, edit: Partial<HighlightItem>) => void
  onContextMenu?: (
    event: React.MouseEvent<HTMLDivElement>,
    highlight: ViewportHighlight<HighlightItem>
  ) => void
}

export function ViewerHighlightContainer({
  editHighlight,
  onContextMenu,
}: ViewerHighlightContainerProps) {
  const { highlight, viewportToScaled, screenshot, isScrolledTo, highlightBindings } =
    useHighlightContainerContext<HighlightItem>()

  const { toggleEditInProgress } = usePdfHighlighterContext()

  const component =
    highlight.type === 'text' ? (
      <TextHighlight
        isScrolledTo={isScrolledTo}
        highlight={highlight}
        onContextMenu={(event) => onContextMenu && onContextMenu(event, highlight)}
      />
    ) : (
      <AreaHighlight
        isScrolledTo={isScrolledTo}
        highlight={highlight}
        onChange={(boundingRect) => {
          const edit = {
            position: {
              boundingRect: viewportToScaled(boundingRect),
              rects: [],
            },
            content: {
              image: screenshot(boundingRect),
            },
          }

          editHighlight(highlight.id, edit)
          toggleEditInProgress(false)
        }}
        bounds={highlightBindings.textLayer}
        onContextMenu={(event) => onContextMenu && onContextMenu(event, highlight)}
        onEditStart={() => toggleEditInProgress(true)}
      />
    )

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
  return highlight.comment ? (
    <div className="">{highlight.comment}</div>
  ) : (
    <div className="">Comment has no Text</div>
  )
}
