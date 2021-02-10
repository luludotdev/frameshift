import { FC } from 'react'
import { useJanus } from '~hooks/useJanus'

interface IProps {
  channelID: number
  serverURI?: string
}

const Player: FC<IProps> = ({ channelID, serverURI }) => {
  const { ref, onLoaded } = useJanus(channelID, serverURI)
  return <video ref={ref} onLoadedData={onLoaded} />
}

export default Player
