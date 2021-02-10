import { FC } from 'react'
import { AutoplayError, PlayerError as WrappedError } from '~hooks/useJanus'
import { PlayerOverlay } from './PlayerOverlay'
import { PlayerPlayPrompt } from './PlayerPlayPrompt'

interface IProps {
  error?: WrappedError
  play: () => void
}

export const PlayerError: FC<IProps> = ({ error, play }) =>
  error instanceof AutoplayError ? (
    <PlayerPlayPrompt error={error} play={play} />
  ) : (
    <PlayerOverlay hidden={error === undefined}>
      <style jsx>
        {`
        div
          text-align center

        h1
          font-size 4rem
          margin 0

        p
          margin 0
          font-size 1.5rem
      `}
      </style>

      <div>
        <h1>Error</h1>
        <p>{error?.message}</p>
      </div>
    </PlayerOverlay>
  )
