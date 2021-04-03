import type { FC } from 'react'
import { useStats } from '~hooks/useStats'

export const Viewers: FC = () => {
  const { data, error } = useStats()
  const viewers = error ? '???' : data?.ingestViewers ?? 0

  return <div>viewers: {viewers}</div>
}
