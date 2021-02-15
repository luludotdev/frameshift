import { registerString } from './register'

// #region Globals
const NODE_ENV = registerString('NODE_ENV')
const IS_PROD = NODE_ENV?.toLowerCase() === 'production'
export const IS_DEV = !IS_PROD

export const IS_SERVER = typeof window === 'undefined'
// #endregion
