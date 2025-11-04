import { useEffect, useEffectEvent } from 'react'
import type { RefObject } from 'react'
import type { PdfHighlighterUtils } from 'react-pdf-highlighter-extended'
import type { HighlightItem } from '@/types/db'

const HASH_PREFIX = '#highlight-'

export function useHashChange({
  highlights,
  highlighterUtilsRef,
}: {
  highlights: Array<HighlightItem>
  highlighterUtilsRef: RefObject<PdfHighlighterUtils | null>
}) {
  const onHashChange = useEffectEvent(() => {
    const id = document.location.hash.slice(HASH_PREFIX.length)
    const highlight = highlights.find((highlight) => highlight.id === id)

    if (highlight && highlighterUtilsRef.current) {
      highlighterUtilsRef.current.scrollToHighlight(highlight)
    }
  })

  useEffect(() => {
    window.addEventListener('hashchange', onHashChange)

    return () => {
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [])
}
