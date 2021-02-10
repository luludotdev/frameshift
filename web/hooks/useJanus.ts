import { FtlPlayer } from 'janus-ftl-player'
import {
  ReactEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

export class PlayerError extends Error {}

export const useJanus = (channelID: number, serverURI?: string) => {
  const [playing, setPlaying] = useState<boolean>(false)
  const [error, setError] = useState<PlayerError | null>(null)
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

  const onUnhandled = useCallback((ev: PromiseRejectionEvent) => {
    ev.preventDefault()
    setError(new PlayerError('Failed to connect to FTL server.'))
  }, [])

  useEffect(() => {
    window.addEventListener('unhandledrejection', onUnhandled)

    let player: FtlPlayer | undefined
    if (ref.current) {
      player = new FtlPlayer(ref.current, serverURI ?? null, {})
      void player.init(channelID)
    }

    return () => {
      window.removeEventListener('unhandledrejection', onUnhandled)
      if (player) void player.destroy()
    }
  }, [onUnhandled, channelID, serverURI])

  return { playing, error, ref, onLoaded }
}
