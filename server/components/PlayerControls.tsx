import type { FC } from 'react'
import type { Except } from 'type-fest'
import { PlayerOverlay } from './PlayerOverlay'
import type { IProps } from './PlayerOverlay'

type Props = Except<IProps, 'transparent' | 'fadeDelay' | 'fadeTime'>
export const PlayerControls: FC<Props> = ({ ...props }) => (
  <PlayerOverlay transparent fadeTime={0.25} fadeDelay={0} {...props}>
    <style jsx>
      {`
        div.container
          width 100%
          height 100%

          display flex
          align-items flex-end

        div.bar
          $height = 20px
          $color = rgba(7, 7, 7, 0.8)
          $padding = 0.2rem

          width 100%
          height $height
          background-color $color

          position relative
          padding 1rem
          display flex
          align-items center

          pointer-events initial
          backdrop-filter blur(2px)

          &::before
            content ' '
            position absolute
            top 0
            left -100%
            transform translateY(-100%)

            width 200%
            height $height
            background linear-gradient(0deg, $color 0%, transparent 100%);
      `}
    </style>

    <div className='container'>
      <div className='bar'>bar along the bottom</div>
    </div>
  </PlayerOverlay>
)
