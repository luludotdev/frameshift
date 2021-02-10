import { FC, useCallback, useEffect } from 'react'
import { AutoplayError } from '~hooks/useJanus'
import { PlayerOverlay } from './PlayerOverlay'

interface IProps {
  error?: AutoplayError
  play: () => void
}

export const PlayerPlayPrompt: FC<IProps> = ({ error, play }) => {
  const handleKeypress = useCallback(
    (ev: KeyboardEvent) => {
      if (ev.key !== ' ') return

      ev.preventDefault()
      play()
    },
    [play]
  )

  useEffect(() => {
    window.addEventListener('keypress', handleKeypress)

    return () => {
      window.removeEventListener('keypress', handleKeypress)
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
          Press <kbd>SPACE</kbd> to play...
        </p>
      </div>
    </PlayerOverlay>
  )
}
