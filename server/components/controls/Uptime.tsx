import { FC, useState } from 'react'
import useAnimationFrame from 'use-animation-frame'
import { useStats } from '~hooks/useStats'

const DEFAULT_TIME = '00:00'

const formatMillis: (ms: number) => string = ms => {
  const floored_s = Math.floor(ms / 1000)
  const floored_m = Math.floor(floored_s / 60)
  const floored_h = Math.floor(floored_m / 60)

  const seconds = (floored_s % 60).toFixed(0).padStart(2, '0')
  const minutes = (floored_m % 60).toFixed(0).padStart(2, '0')
  if (floored_h === 0) return `${minutes}:${seconds}`

  const hours = (floored_h % 60).toFixed(0).padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}

export const Uptime: FC = () => {
  const { data, error } = useStats()
  const [time, setTime] = useState<string>(DEFAULT_TIME)

  useAnimationFrame(e => {
    if (error) {
      setTime('Unknown')
      return
    }

    if (data === undefined) {
      setTime(DEFAULT_TIME)
      return
    }

    const started = data.startTime.getTime()
    const now = Date.now()

    const delta = now - started
    const newTime = formatMillis(delta)

    setTime(newTime)
  }, [])

  return <div>uptime: {time}</div>
}
