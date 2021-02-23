import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import {
  FTL_CLIENT_CHANNELID_BLACKLIST as blacklist,
  FTL_CLIENT_CHANNELID_WHITELIST as whitelist,
} from '~env'
import { ingestAuth } from '~middleware/ingestAuth'
import { dataKey, redis } from '~redis'

const router = nc<NextApiRequest, NextApiResponse>()
router.use(ingestAuth)

const isAllowed: (channelID: string) => boolean = channelID => {
  if (blacklist.length > 0 && blacklist.includes(channelID)) return false
  if (whitelist.length > 0 && !whitelist.includes(channelID)) return false

  return true
}

router.post(async (request, resp) => {
  const channelID = Array.isArray(request.query.channelID)
    ? request.query.channelID[0]
    : request.query.channelID

  if (Number.isNaN(Number.parseInt(channelID, 10))) {
    resp.status(400).end()
    return
  }

  if (isAllowed(channelID) === false) {
    resp.status(401).end()
    return
  }

  const p = redis.pipeline()
  const key = dataKey(channelID)

  p.hset(key, 'channelID', channelID)
  p.expire(key, 10)
  await p.exec()

  resp.json({ streamId: channelID })
})

export default router
