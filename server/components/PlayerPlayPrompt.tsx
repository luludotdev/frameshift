import { useCallback, useEffect } from 'react'
import type { FC } from 'react'
import { useDeviceDetect } from '~hooks/useDeviceDetect'
import { AutoplayError } from '~hooks/useJanus'
import { PlayerOverlay } from './PlayerOverlay'

interface Props {
  error?: AutoplayError
  play: () => void
}

export const PlayerPlayPrompt: FC<Props> = ({ error, play }) => {
  const { isMobile } = useDeviceDetect()

  const handleKeypress = useCallback(
    (ev: KeyboardEvent) => {
      if (ev.key !== ' ') return

      ev.preventDefault()
      play()
    },
    [play]
  )

  const handleClick = useCallback(
    (ev: MouseEvent) => {
      ev.preventDefault()
      play()
    },
    [play]
  )

  useEffect(() => {
    window.addEventListener('keypress', handleKeypress)
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('keypress', handleKeypress)
      window.removeEventListener('click', handleClick)
    }
  })

  return (
    <PlayerOverlay hidden={error === undefined}>
      <style jsx>
        {`
          div
            text-align center

          h1
            font-size 4rem
            margin 0
            margin-bottom 1rem

          p
            margin 0
            font-size 1.5rem

          kbd
            background rgba(255, 255, 255, 0.12)
            padding 0.1rem 0.3rem
            border-radius 0.2rem
        `}
      </style>

      <div>
        <h1>Autoplay Disabled</h1>
        <p>
          {isMobile ? (
            <>Tap the screen to play.</>
          ) : (
            <>
              Press <kbd>SPACE</kbd> to play...
            </>
          )}
        </p>
      </div>
    </PlayerOverlay>
  )
}
