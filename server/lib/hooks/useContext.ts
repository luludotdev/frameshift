import { createContext, useContext } from 'react'
import type { MutableRefObject } from 'react'

interface Context {
  channelID: number
  serverURI: string | undefined

  videoRef: MutableRefObject<HTMLVideoElement | null>
}

// @ts-expect-error Dispatch not included
const defaultCtx: Context = {}

const context = createContext<Context>(defaultCtx)
const { Provider } = context
export { Provider }

const useCtx = () => {
  const ctx = useContext(context)
  return ctx
}

export { useCtx as useContext }
