import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useEffect, useState } from 'react'
import type { ChangeEvent, FC } from 'react'

const STORAGE_KEY = '@@frameshift/volume'

interface IProps {
  onChanged: (volume: number) => void
}

export const Volume: FC<IProps> = ({ onChanged: cb }) => {
  const [volume, setVolume] = useState<number>(1)
  const handleChanged = useCallback(
    (vol: number) => {
      if (typeof cb === 'function') cb(vol)
    },
    [cb]
  )

  const onChanged = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      const vol = ev.target.valueAsNumber
      setVolume(ev.target.valueAsNumber)

      localStorage.setItem(STORAGE_KEY, vol.toFixed(2))
      handleChanged(vol)
    },
    [setVolume, handleChanged]
  )

  useEffect(() => {
    const storedVolume = Number.parseFloat(
      localStorage.getItem(STORAGE_KEY) ?? '1'
    )

    const vol = Number.isNaN(storedVolume) ? 1 : storedVolume
    setVolume(vol)
    handleChanged(vol)
  }, [handleChanged])

  return (
    <div>
      <style jsx>
        {`
          input[type=range]
            margin-left .5rem
        `}
      </style>

      <FontAwesomeIcon icon='volume-down' />

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
