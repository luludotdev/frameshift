declare module 'use-animation-frame' {
  import type { DependencyList } from 'react'

  interface CallbackParams {
    time: number
    delta: number
  }

  type Callback = (arg0: CallbackParams) => any

  function useAnimationFrame(cb: Callback, deps: DependencyList): void
  export default useAnimationFrame
}
