import { useEffect, useEffectEvent } from 'react'
import { HASH_PREFIX } from '@/enums/constants'
import type { RefObject } from 'react'
import type { PdfHighlighterUtils } from 'react-pdf-highlighter-extended'
import type { AnnotationItem } from '@/types/db'

export function useHashChange({
  annotations,
  highlighterUtilsRef,
}: {
  annotations: Array<AnnotationItem>
  highlighterUtilsRef: RefObject<PdfHighlighterUtils | null>
}) {
  const onHashChange = useEffectEvent(() => {
    const id = document.location.hash.slice(`#${HASH_PREFIX}`.length)
    const annotation = annotations.find((annotation) => annotation.id === id)

    if (annotation && highlighterUtilsRef.current) {
      highlighterUtilsRef.current.scrollToHighlight(annotation)
    }
  })

  useEffect(() => {
    window.addEventListener('hashchange', onHashChange)

    return () => {
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [])
}
