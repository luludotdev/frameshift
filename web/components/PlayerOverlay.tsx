import { FC } from 'react'

export interface IProps {
  hidden?: boolean
}

export const PlayerOverlay: FC<IProps> = ({ children, hidden }) => (
  <div>
    <style jsx>
      {`
        div
          position absolute
          top 0
          left 0

          width 100%
          height 100%

          background-color rgba(0, 0, 0, 0.65)
          color white

          display flex
          align-items center
          justify-content center

          transition 0.5s opacity ease
      `}
    </style>

    <style jsx>
      {`
        div
          opacity ${hidden ? 0 : 1}
      `}
    </style>

    {children}
  </div>
)
