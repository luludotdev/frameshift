import { useCallback, useEffect, useState } from 'react'
import type { ChangeEvent, FC } from 'react'
import { ControlIcon } from './ControlIcon'
import type { Icon } from './ControlIcon'

enum StorageKey {
  Volume = '@@frameshift/volume',
  OldVolume = '@@frameshift/old-volume',
}

interface IProps {
  onChanged: (volume: number) => void
}

const volumeIcon: (volume: number) => Icon = volume => {
  if (volume === 0) return 'volume-mute'
  if (volume < 0.25) return 'volume-off'
  if (volume < 0.75) return 'volume-down'

  return 'volume-up'
}

export const Volume: FC<IProps> = ({ onChanged: cb }) => {
  const [volume, setVolume] = useState<number>(1)
  const [oldVolume, setOldVolume] = useState<number>(1)

  const handleChanged = useCallback(
    (vol: number, muting: boolean) => {
      setVolume(vol)
      localStorage.setItem(StorageKey.Volume, vol.toFixed(2))

      if (muting === false) {
        setOldVolume(vol)
        localStorage.setItem(StorageKey.OldVolume, vol.toFixed(2))
      }

      if (typeof cb === 'function') cb(vol)
    },
    [setVolume, cb]
  )

  const onChanged = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      const vol = ev.target.valueAsNumber
      handleChanged(vol, false)
    },
    [handleChanged]
  )

  const handleMute = useCallback(() => {
    if (volume === 0) handleChanged(oldVolume, true)
    else handleChanged(0, true)
  }, [volume, oldVolume, handleChanged])

  useEffect(() => {
    const storedVolume = Number.parseFloat(
      localStorage.getItem(StorageKey.Volume) ?? '1'
    )

    const vol = Number.isNaN(storedVolume) ? 1 : storedVolume
    setVolume(vol)
    if (typeof cb === 'function') cb(vol)

    const storedOldVolume = Number.parseFloat(
      localStorage.getItem(StorageKey.OldVolume) ?? vol.toString()
    )

    const oldVol = Number.isNaN(storedOldVolume) ? vol : storedOldVolume
    setOldVolume(oldVol)
  }, [setVolume, setOldVolume, cb])

  const colorA = 'white'
  const colorB = 'rgba(255, 255, 255, 0.2)'

  const grad = `linear-gradient(90deg, ${colorA} 0%, ${colorA} ${
    volume * 100
  }%, ${colorB} ${volume * 100}%, ${colorB} 100%)`

  return (
    <div>
      <style jsx>
        {`
          $track-height = 1rem
          $track-width = 7.5rem
          $thumb-size = 1rem

          .slider
            height $track-height
            width $track-width
            display inline-flex
            position relative
            align-items center
            justify-content center
            transform translateY(2px)
            margin-left .5rem

          .track
            position absolute
            height 2px
            width $track-width
            background white
            border-radius 1px

          input[type=range]
            position absolute
            top 0
            bottom 0

            z-index 10
            width $track-width
            margin 0

            appearance none
            background transparent

            cursor pointer

            &:active, &:focus, &:hover
              border none
              outline none
              box-shadow none

            $thumb
              appearance none
              background white
              width $thumb-size
              height $thumb-size
              border-radius 50%

            &::-webkit-slider-thumb
              @extends $thumb
        `}
      </style>

      <ControlIcon
        icon={volumeIcon(volume)}
        title={volume === 0 ? 'Unmute' : 'Mute'}
        style={{ width: '1.125em' }}
        onClick={handleMute}
      />

      <div className='slider'>
        <input
          type='range'
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={onChanged}
        />

        <div className='track' style={{ background: grad }} />
      </div>
    </div>
  )
}
