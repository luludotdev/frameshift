import type { FC } from 'react'
import { useStats } from '~hooks/useStats'
import { ControlValue } from './ControlValue'

export const Viewers: FC = () => {
  const { data, error } = useStats()
  const viewers = error ? '???' : (data?.ingestViewers ?? 0).toLocaleString()

  return (
    <ControlValue title='Viewers' icon='user'>
      {viewers}
    </ControlValue>
  )
}
