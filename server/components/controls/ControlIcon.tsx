import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import type { CSSProperties, FC, MouseEvent } from 'react'
import type { Except } from 'type-fest'

export type Icon = FontAwesomeIconProps['icon']

interface Props {
  iconStyle?: CSSProperties
  onClick?: (ev: MouseEvent<HTMLDivElement>) => void
}

type IconProps = Except<FontAwesomeIconProps, 'onClick'>
export const ControlIcon: FC<IconProps & Props> = ({
  style,
  iconStyle,

  onClick,
  ...props
}) => {
  const hasClickHandler = typeof onClick === 'function'

  return (
    <div className='icon-container' style={style} onClick={onClick}>
      <style jsx>
        {`
          div.icon-container
            position relative
            display inline-block

            &::after
              $size = 1em
              $padding = 0.65em

              content ' '
              z-index -1

              position absolute
              top 50%
              left 50%
              transform translate(-50%, -50%)

              width $size + $padding
              height $size + $padding
              border-radius 0.2rem

              transition background-color 0.1s ease
              background-color transparent
        `}
      </style>

      <style jsx>
        {`
          div.icon-container
            cursor ${hasClickHandler ? 'pointer' : 'initial'}

            &:hover::after
              background-color ${
                hasClickHandler ? 'rgba(255, 255, 255, 0.25)' : 'transparent'
              }
        `}
      </style>

      <FontAwesomeIcon {...{ style: iconStyle, ...props }} />
    </div>
  )
}
