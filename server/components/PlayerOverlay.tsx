import { FC } from 'react'

export interface IProps {
  hidden?: boolean
  transparent?: boolean
}

export const PlayerOverlay: FC<IProps> = ({
  children,
  hidden,
  transparent,
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

          transition 0.5s opacity ease
          transition-delay 0.25s
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
