import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import { ingestAuth } from '~middleware/ingestAuth'
import { redis, dataKey } from '~redis'

const router = nc<NextApiRequest, NextApiResponse>()
router.use(ingestAuth)

router.post(async (request, resp) => {
  const streamID = Array.isArray(request.query.streamID)
    ? request.query.streamID[0]
    : request.query.streamID

  if (Number.isNaN(Number.parseInt(streamID, 10))) {
    resp.status(400).end()
    return
  }

  await redis.del(dataKey(streamID))
  resp.status(200).end()
})

export default router
