import { FC } from 'react'
import { PlayerError as Abc } from '~hooks/useJanus'
import { PlayerOverlay } from './PlayerOverlay'

interface IProps {
  error?: Abc
}

export const PlayerError: FC<IProps> = ({ error }) => (
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
