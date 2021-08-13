import Redis from 'ioredis'
import { schedule } from 'node-cron'
import process from 'process'
import {
  FTL_CLIENT_REDIS_DB_BASE as REDIS_DB_BASE,
  FTL_CLIENT_REDIS_HOST as REDIS_HOST,
  FTL_CLIENT_REDIS_PASS as REDIS_PASS,
  FTL_CLIENT_REDIS_PORT as REDIS_PORT,
} from '~env'

export const redis = new Redis({
  db: REDIS_DB_BASE + 0,
  host: REDIS_HOST,
  password: REDIS_PASS,
  port: REDIS_PORT,
})

redis.on('error', () => {
  console.log('Failed to connect to Redis')
  process.exit(1)
})

redis.on('ready', () => {
  schedule('0 */12 * * *', async () => redis.bgrewriteaof())
})
