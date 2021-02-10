import { FtlPlayer } from 'janus-ftl-player'
import {
  ReactEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

export const useJanus = (channelID: number, serverURI?: string) => {
  const [playing, setPlaying] = useState<boolean>(false)
  const ref = useRef<HTMLVideoElement | null>(null)

  const onLoaded: ReactEventHandler<HTMLVideoElement> = useCallback(ev => {
    if (ev.target instanceof HTMLVideoElement) {
      ev.target
        .play()
        .then(() => {
          setPlaying(true)
        })
        .catch(console.error)
    }
  }, [])

  useEffect(() => {
    let player: FtlPlayer | undefined

    if (ref.current) {
      player = new FtlPlayer(ref.current, serverURI ?? null, {})
      void player.init(channelID)
    }

    return () => {
      if (player) void player.destroy()
    }
  }, [channelID, serverURI])

  return { playing, ref, onLoaded }
}
