// TODO: Temporarily use own version of
// janus-ftl-player until Stereo PR lands
// import { FtlPlayer } from 'janus-ftl-player'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactEventHandler } from 'react'
import { FtlPlayer } from '../janus'

export class PlayerError extends Error {}
export class AutoplayError extends PlayerError {}

export const useJanus = (channelID: number, serverURI?: string) => {
  const [playing, setPlaying] = useState<boolean>(false)
  const [error, setError] = useState<PlayerError | null>(null)
  const ref = useRef<HTMLVideoElement | null>(null)

  const play = useCallback(async () => {
    if (ref.current) {
      setError(null)

      try {
        await ref.current.play()
        setPlaying(true)
      } catch {
        setError(new AutoplayError())
      }
    }
  }, [ref])

  const onLoaded: ReactEventHandler<HTMLVideoElement> = useCallback(
    async ev => {
      if (ev.target instanceof HTMLVideoElement) {
        try {
          await ev.target.play()
          setPlaying(true)
        } catch {
          setError(new AutoplayError())
        }
      }
    },
    []
  )

  const onUnhandled = useCallback((ev: PromiseRejectionEvent) => {
    ev.preventDefault()
    setError(new PlayerError('Failed to connect to FTL server.'))
  }, [])

  useEffect(() => {
    window.addEventListener('unhandledrejection', onUnhandled)

    let player: FtlPlayer | undefined
    if (ref.current) {
      const getServer = () => {
        if (serverURI === undefined) return null
        return `${serverURI}/janus`
      }

      const server = getServer()
      player = new FtlPlayer(ref.current, server, {})

      void player.init(channelID)
    }

    return () => {
      window.removeEventListener('unhandledrejection', onUnhandled)
      if (player) void player.destroy()
    }
  }, [onUnhandled, channelID, serverURI])

  return { playing, error, ref, play, onLoaded }
}
