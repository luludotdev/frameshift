import type { FC } from 'react'
import { ControlIcon } from './ControlIcon'

interface IProps {
  isFullscreen: boolean
  onClick: () => void
}

export const Fullscreen: FC<IProps> = ({ isFullscreen, onClick }) => (
  <ControlIcon
    icon={isFullscreen ? 'compress' : 'expand'}
    title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
    onClick={onClick}
  />
)
