import { useCallback, useEffect, useState } from 'react'
import type { FC } from 'react'
import { useContext } from '~hooks/useContext'
import { ControlIcon } from './ControlIcon'

export const Fullscreen: FC = () => {
  const { videoRef: ref } = useContext()

  const [isFullscreen, setFullscreen] = useState<boolean>(false)
  const onClick = useCallback(() => {
    if (!ref.current) return

    if (isFullscreen) {
      void document.exitFullscreen()
    } else {
      void ref.current.parentElement?.requestFullscreen()
    }
  }, [isFullscreen, ref])

  useEffect(() => {
    const onChanged = (ev: Event) => {
      setFullscreen(document.fullscreenElement === ev.target)
    }

    const parent = ref.current?.parentElement
    if (parent) {
      parent.addEventListener('fullscreenchange', onChanged)
    }

    return () => {
      if (parent) {
        parent.removeEventListener('fullscreenchange', onChanged)
      }
    }
  }, [ref])
  return (
    <ControlIcon
      icon={isFullscreen ? 'compress' : 'expand'}
      title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
      onClick={onClick}
    />
  )
}
