import { FC } from 'react'

export interface IProps {
  hidden?: boolean
  transparent?: boolean

  fadeTime?: number
  fadeDelay?: number
}

export const PlayerOverlay: FC<IProps> = ({
  children,
  hidden,
  transparent,

  fadeTime,
  fadeDelay,
}) => (
  <div>
    <style jsx>
      {`
        div
          position absolute
          top 0
          left 0

          width 100%
          height 100%

          color white

          display flex
          align-items center
          justify-content center
      `}
    </style>

    <style jsx>
      {`
        div
          transition ${fadeTime ?? 0.5}s opacity ease
          transition-delay ${fadeDelay ?? 0.25}s
      `}
    </style>

    <style jsx>
      {`
        div
          background-color ${transparent ? 'transparent' : 'rgb(19, 19, 19)'}
          opacity ${hidden ? 0 : 1}
          pointer-events ${transparent ? 'none' : hidden ? 'none' : 'initial'}
      `}
    </style>

    {children}
  </div>
)
