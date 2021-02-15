/* eslint-disable prettier/prettier */
import { registerString } from './register'

// #region Globals
const NODE_ENV = registerString('NODE_ENV')
const IS_PROD = NODE_ENV?.toLowerCase() === 'production'
export const IS_DEV = !IS_PROD

export const IS_SERVER = typeof window === 'undefined'
// #endregion

// #region Application
export const FTL_CLIENT_INGEST_SERVER = registerString('FTL_CLIENT_INGEST_SERVER')
export const FTL_CLIENT_HMAC_ALGO = registerString('FTL_CLIENT_HMAC_ALGO', false) ?? 'sha1'
export const FTL_CLIENT_HMAC_SECRET = registerString('FTL_CLIENT_HMAC_SECRET', true)
// #endregion
