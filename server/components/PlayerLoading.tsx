import clsx from 'clsx'
import { useEffect, useState } from 'react'
import type { FC } from 'react'
import Spinner from '~assets/svg/spinner.svg'
import { PlayerOverlay } from './PlayerOverlay'
import type { Props } from './PlayerOverlay'

export const PlayerLoading: FC<Props> = ({ ...props }) => {
  const [tooLong, setTooLong] = useState<boolean>(false)
  useEffect(() => {
    setTimeout(() => {
      setTooLong(true)
    }, 1000 * 5)
  })

  return (
    <PlayerOverlay {...props}>
      <style jsx>
        {`
          div
            display flex
            flex-direction column
            align-items center
            justify-content center

          img
            width 6vw
            height auto

          p
            $font-size = 1.25rem
            font-size $font-size
            height 0
            opacity 0
            margin 0
            transition all 1s ease

            &.visible
              height $font-size + 0.5rem
              opacity 1
              margin-top 2.5rem
        `}
      </style>

      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={Spinner.src} alt='Loading Spinner' />

        <p className={clsx(tooLong && 'visible')}>
          Loading taking too long? Check your Channel ID.
        </p>
      </div>
    </PlayerOverlay>
  )
}
