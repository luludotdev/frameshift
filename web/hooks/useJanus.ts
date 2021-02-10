import { FtlPlayer } from 'janus-ftl-player'
import { ReactEventHandler, useCallback, useEffect, useRef } from 'react'

export const useJanus = (channelID: number, serverURI?: string) => {
  const ref = useRef<HTMLVideoElement | null>(null)

  const onLoaded: ReactEventHandler<HTMLVideoElement> = useCallback(ev => {
    if (ev.target instanceof HTMLVideoElement) {
      ev.target.play().catch(console.error)
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

  return { ref, onLoaded }
}
