import { FC } from 'react'
import { useJanus } from '~hooks/useJanus'
import { PlayerLoading } from './PlayerLoading'

interface IProps {
  channelID: number
  serverURI?: string
}

const Player: FC<IProps> = ({ channelID, serverURI }) => {
  const { playing, ref, onLoaded } = useJanus(channelID, serverURI)

  return (
    <div className='container'>
      <style jsx>
        {`
          div.container
            width 100%
            height 100%
            position relative
            overflow hidden

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
        <PlayerLoading hidden={playing} />
      </div>

      <video ref={ref} onLoadedData={onLoaded} />
    </div>
  )
}

export default Player
