import clsx from 'clsx'
import { useCallback, useState } from 'react'
import type { FC } from 'react'
import { useDetectOBS } from '~hooks/useDetectOBS'
import { useJanus } from '~hooks/useJanus'
import { PlayerControls } from './PlayerControls'
import { PlayerError } from './PlayerError'
import { PlayerLoading } from './PlayerLoading'

interface IProps {
  channelID: number
  serverURI?: string
}

const Player: FC<IProps> = ({ channelID, serverURI }) => {
  const { playing, error, ref, play, onLoaded } = useJanus(channelID, serverURI)
  const isOBS = useDetectOBS()

  const [hover, setHover] = useState<boolean>(false)
  const onHoverOver = useCallback(() => setHover(true), [])
  const onHoverOut = useCallback(() => setHover(false), [])

  const onVolumeChanged = useCallback(
    (volume: number) => {
      if (ref.current) {
        ref.current.volume = volume
      }
    },
    [ref]
  )

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
            pointer-events none
        `}
      </style>

      <div className='overlay'>
        <PlayerLoading hidden={playing || error !== null} />
        <PlayerError error={error ?? undefined} play={play} />
        {!isOBS && (
          <PlayerControls hidden={!hover} onVolumeChanged={onVolumeChanged} />
        )}
      </div>

      <video
        ref={ref}
        onLoadedData={onLoaded}
        onMouseOver={onHoverOver}
        onMouseOut={onHoverOut}
      />
    </div>
  )
}

export default Player
