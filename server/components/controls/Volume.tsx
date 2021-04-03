import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useEffect, useState } from 'react'
import type { ChangeEvent, FC } from 'react'
import type { Icon } from './ControlValue'

const STORAGE_KEY = '@@frameshift/volume'

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
  const handleChanged = useCallback(
    (vol: number) => {
      setVolume(vol)
      localStorage.setItem(STORAGE_KEY, vol.toFixed(2))

      if (typeof cb === 'function') cb(vol)
    },
    [setVolume, cb]
  )

  const onChanged = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      const vol = ev.target.valueAsNumber
      handleChanged(vol)
    },
    [handleChanged]
  )

  useEffect(() => {
    const storedVolume = Number.parseFloat(
      localStorage.getItem(STORAGE_KEY) ?? '1'
    )

    const vol = Number.isNaN(storedVolume) ? 1 : storedVolume
    handleChanged(vol)
  }, [handleChanged])

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

      <div className='icon'>
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
