import { useCallback, useState } from 'react'
import type { FC } from 'react'
import type { Except } from 'type-fest'
import { Fullscreen } from './controls/Fullscreen'
import { Uptime } from './controls/Uptime'
import { Viewers } from './controls/Viewers'
import { Volume } from './controls/Volume'
import { PlayerOverlay } from './PlayerOverlay'
import type { IProps } from './PlayerOverlay'

type Props = Except<IProps, 'transparent' | 'fadeDelay' | 'fadeTime'>
export const PlayerControls: FC<Props> = ({ hidden }) => {
  const [hover, setHover] = useState<boolean>(false)
  const onHoverOver = useCallback(() => setHover(true), [])
  const onHoverOut = useCallback(() => setHover(false), [])

  const actualHidden = !hover && hidden
  return (
    <PlayerOverlay
      transparent
      fadeTime={0.25}
      fadeDelay={0}
      hidden={actualHidden}
    >
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

            width 100%
            height $height
            background-color $color

            position relative
            padding 1rem 1.35rem
            backdrop-filter blur(2px)

            display flex
            align-items center
            gap 2rem

            &::before
              content ' '
              position absolute
              top 0
              left -100%
              transform translateY(-100%)

              width 200%
              height $height
              background linear-gradient(0deg, $color 0%, transparent 100%);

            & > div.spacer
              flex-grow 1
        `}
      </style>

      <style jsx>
        {`
          div.bar
            pointer-events ${actualHidden ? 'none' : 'initial'}
        `}
      </style>

      <div
        className='container'
        onMouseOver={onHoverOver}
        onMouseOut={onHoverOut}
      >
        <div className='bar'>
          <Volume />
          <div className='spacer' />

          <Viewers />
          <Uptime />
          <Fullscreen />
        </div>
      </div>
    </PlayerOverlay>
  )
}
