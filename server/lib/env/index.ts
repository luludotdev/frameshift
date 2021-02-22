/* eslint-disable prettier/prettier */
import { registerInt, registerString } from './register'

// #region Globals
const NODE_ENV = registerString('NODE_ENV')
const IS_PROD = NODE_ENV?.toLowerCase() === 'production'
export const IS_DEV = !IS_PROD

export const IS_SERVER = typeof window === 'undefined'
// #endregion

// #region Application
export const FTL_CLIENT_INGEST_SERVER = registerString('FTL_CLIENT_INGEST_SERVER')

export const FTL_CLIENT_HMAC_ALGO = registerString('FTL_CLIENT_HMAC_ALGO') ?? 'sha1'
export const FTL_CLIENT_HMAC_SECRET = registerString('FTL_CLIENT_HMAC_SECRET')

export const FTL_CLIENT_INGEST_AUTH = registerString('FTL_CLIENT_INGEST_AUTH')
export const FTL_SERVICE_REST_AUTH_TOKEN = registerString('FTL_SERVICE_REST_AUTH_TOKEN')

const channelIdRX = /[, ]/
const channelIdWhitelist = registerString('FTL_CLIENT_CHANNELID_WHITELIST')
const channelIdBlacklist = registerString('FTL_CLIENT_CHANNELID_BLACKLIST')

export const FTL_CLIENT_CHANNELID_WHITELIST = channelIdWhitelist?.split(channelIdRX) ?? []
export const FTL_CLIENT_CHANNELID_BLACKLIST = channelIdBlacklist?.split(channelIdRX) ?? []
// #endregion

// #region Redis
export const FTL_CLIENT_REDIS_HOST = registerString('FTL_CLIENT_REDIS_HOST') ?? (IS_DEV ? 'localhost' : 'redis')
export const FTL_CLIENT_REDIS_PORT = registerInt('FTL_CLIENT_REDIS_PORT') ?? 6379
export const FTL_CLIENT_REDIS_PASS = registerString('FTL_CLIENT_REDIS_PASS')
export const FTL_CLIENT_REDIS_DB_BASE = registerInt('FTL_CLIENT_REDIS_DB_BASE') ?? 0
// #endregion
