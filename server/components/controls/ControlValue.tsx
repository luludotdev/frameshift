import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import type { FC } from 'react'

interface IProps {
  title: string
  icon: FontAwesomeIconProps['icon']
}

export const ControlValue: FC<IProps> = ({ children, title, icon }) => (
  <div title={title}>
    <style jsx>
      {`
      span
        margin-right .5rem
    `}
    </style>

    <span>{children}</span>
    <FontAwesomeIcon icon={icon} />
  </div>
)
