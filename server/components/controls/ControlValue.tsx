import type { FC } from 'react'
import { ControlIcon } from './ControlIcon'
import type { Icon } from './ControlIcon'

interface Props {
  title: string
  icon: Icon
}

export const ControlValue: FC<Props> = ({ children, title, icon }) => (
  <div title={title}>
    <style jsx>
      {`
      span
        margin-right .5rem
    `}
    </style>

    <span>{children}</span>
    <ControlIcon icon={icon} />
  </div>
)
