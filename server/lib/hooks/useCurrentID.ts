import { useRouter } from 'next/router'

export const useCurrentID = () => {
  const { query } = useRouter()

  const id = Array.isArray(query.id) ? query.id[0] : query.id
  if (typeof id === 'undefined') {
    throw new TypeError('Channel ID cannot be undefined')
  }

  return Number.parseInt(id, 10)
}
