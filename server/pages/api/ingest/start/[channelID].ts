import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import { ingestAuth } from '~middleware/ingestAuth'
import { redis } from '~redis'

const router = nc<NextApiRequest, NextApiResponse>()
router.use(ingestAuth)

router.post(async (request, resp) => {
  const channelID = Array.isArray(request.query.channelID)
    ? request.query.channelID[0]
    : request.query.channelID

  if (Number.isNaN(Number.parseInt(channelID, 10))) {
    resp.status(400).end()
    return
  }

  const p = redis.pipeline()
  p.hset(`ftl:${channelID}`, 'channelID', channelID)
  p.expire(`ftl:${channelID}`, 10)
  await p.exec()

  resp.json({ streamId: channelID })
})

export default router
