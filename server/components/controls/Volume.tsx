import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useEffect, useState } from 'react'
import type { ChangeEvent, FC } from 'react'
import type { Icon } from './ControlValue'

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

  return (
    <div>
      <style jsx>
        {`
          div.icon
            cursor pointer
            display inline-block
            width 1.125em

          input[type=range]
            margin-left .5rem
        `}
      </style>

      <div
        className='icon'
        title={volume === 0 ? 'Unmute' : 'Mute'}
        onClick={handleMute}
      >
        <FontAwesomeIcon icon={volumeIcon(volume)} />
      </div>

      <input
        type='range'
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={onChanged}
      />
    </div>
  )
}
