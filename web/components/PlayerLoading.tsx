import { FC } from 'react'
import Spinner from '~assets/svg/spinner.svg'
import { PlayerOverlay } from './PlayerOverlay'

export const PlayerLoading: FC = () => (
  <PlayerOverlay>
    <style jsx>
      {`
        img
          width 6vw
          height auto
      `}
    </style>

    <img src={Spinner} alt='Loading Spinner' />
  </PlayerOverlay>
)
