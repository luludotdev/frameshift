import { FC } from 'react'
import { useJanus } from '~hooks/useJanus'

interface IProps {
  channelID: number
  serverURI?: string
}

const Player: FC<IProps> = ({ channelID, serverURI }) => {
  const { ref, onLoaded } = useJanus(channelID, serverURI)
  return (
    <>
      <style jsx>
        {`
          video
            width 100%
            height 100%
            overflow hidden
        `}
      </style>

      <video ref={ref} onLoadedData={onLoaded} />
    </>
  )
}

export default Player
