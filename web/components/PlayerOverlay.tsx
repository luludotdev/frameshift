import { FC } from 'react'

export const PlayerOverlay: FC = ({ children }) => (
  <div>
    <style jsx>
      {`
        div
          width 100%
          height 100%
          background-color rgba(0, 0, 0, 0.65)
          color white

          display flex
          align-items center
          justify-content center
      `}
    </style>

    {children}
  </div>
)
