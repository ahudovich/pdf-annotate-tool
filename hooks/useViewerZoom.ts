import { useState } from 'react'

export function useViewerZoom({ setPdfScaleValue }: { setPdfScaleValue: (value: number) => void }) {
  const [zoom, setZoom] = useState<number | null>(null)

  function zoomIn() {
    if (zoom) {
      if (zoom < 4) {
        setPdfScaleValue(zoom + 0.1)
        setZoom(zoom + 0.1)
      }
    } else {
      setPdfScaleValue(1)
      setZoom(1)
    }
  }

  function zoomOut() {
    if (zoom) {
      if (zoom > 0.2) {
        setPdfScaleValue(zoom - 0.1)
        setZoom(zoom - 0.1)
      }
    } else {
      setPdfScaleValue(1)
      setZoom(1)
    }
  }

  return { zoom, zoomIn, zoomOut }
}
