import { FC } from 'react'
import { useJanus } from '~hooks/useJanus'
import { PlayerError } from './PlayerError'
import { PlayerLoading } from './PlayerLoading'

interface IProps {
  channelID: number
  serverURI?: string
}

const Player: FC<IProps> = ({ channelID, serverURI }) => {
  const { playing, error, ref, onLoaded } = useJanus(channelID, serverURI)

  return (
    <div className='container'>
      <style jsx>
        {`
          div.container
            width 100%
            height 100%
            position relative
            overflow hidden
            background rgb(19, 19, 19)

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
