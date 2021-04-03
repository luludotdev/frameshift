import { createContext, useContext } from 'react'

interface IContext {
  channelID: number
  serverURI: string | undefined
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
