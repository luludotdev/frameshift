import type { FC } from 'react'
import { PlayerOverlay } from './PlayerOverlay'
import type { IProps } from './PlayerOverlay'

export const PlayerControls: FC<Omit<IProps, 'transparent'>> = ({
  ...props
}) => (
  <PlayerOverlay transparent {...props}>
    <p>hello</p>
  </PlayerOverlay>
)
