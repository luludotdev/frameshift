import clsx from 'clsx'
import { FC } from 'react'
import { useDetectOBS } from '~hooks/useDetectOBS'
import { useJanus } from '~hooks/useJanus'
import { PlayerError } from './PlayerError'
import { PlayerLoading } from './PlayerLoading'

interface IProps {
  channelID: number
  serverURI?: string
}

const Player: FC<IProps> = ({ channelID, serverURI }) => {
  const { playing, error, ref, onLoaded } = useJanus(channelID, serverURI)
  const isOBS = useDetectOBS()

  return (
    <div className={clsx('container', isOBS && 'transparent')}>
      <style jsx>
        {`
          div.container
            width 100%
            height 100%
            position relative
            overflow hidden
            background rgb(19, 19, 19)

            &.transparent
              background transparent

          video, div.overlay
            position absolute
            top 0
            left 0
            width 100%
            height 100%

          div.overlay
            z-index 10
        `}
      </style>

      <div className='overlay'>
        <PlayerLoading hidden={playing || error !== null} />
        <PlayerError error={error ?? undefined} />
      </div>

      <video ref={ref} onLoadedData={onLoaded} />
    </div>
  )
}

export default Player
