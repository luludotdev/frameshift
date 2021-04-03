import { createContext, useContext } from 'react'
import type { MutableRefObject } from 'react'

interface IContext {
  channelID: number
  serverURI: string | undefined

  videoRef: MutableRefObject<HTMLVideoElement | null>
}

// @ts-expect-error
const defaultCtx: IContext = {}

const context = createContext<IContext>(defaultCtx)
const { Provider } = context
export { Provider }

const useCtx = () => {
  const ctx = useContext(context)
  return ctx
}

export { useCtx as useContext }
