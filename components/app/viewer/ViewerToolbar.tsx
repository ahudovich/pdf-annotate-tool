'use client'

import { useState } from 'react'
import { MinusIcon, PlusIcon, ZoomInIcon, ZoomOutIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ViewerToolbarProps {
  name: string
  setPdfScaleValue: (value: number) => void
}

export function ViewerToolbar({ name, setPdfScaleValue }: ViewerToolbarProps) {
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

  return (
    <div className="border-border flex items-center justify-between gap-2 border-b bg-white px-4 py-3">
      <h2 className="font-semibold">{name}</h2>

      <div className="flex items-center gap-2">
        <Button size="icon" variant="ghost" onClick={zoomOut}>
          <ZoomOutIcon className="size-4" />
        </Button>

        <span className="text-foreground w-10 text-center text-sm">
          {zoom ? `${(zoom * 100).toFixed(0)}%` : 'Auto'}
        </span>

        <Button size="icon" variant="ghost" onClick={zoomIn}>
          <ZoomInIcon className="size-4" />
        </Button>
      </div>
    </div>
  )
}
