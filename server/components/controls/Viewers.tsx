import type { FC } from 'react'
import { useStats } from '~hooks/useStats'
import { ControlValue } from './ControlValue'

export const Viewers: FC = () => {
  const { data, error } = useStats()
  const viewers = error
    ? '???'
    : data === undefined
    ? '0'
    : Number.isNaN(data.ingestViewers)
    ? '0'
    : data.ingestViewers.toLocaleString()

  return (
    <ControlValue title='Viewers' icon='user'>
      {viewers}
    </ControlValue>
  )
}
