import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import { redis } from '~redis'

const router = nc<NextApiRequest, NextApiResponse>()

router.get(async (request, resp) => {
  const streamID = Array.isArray(request.query.streamID)
    ? request.query.streamID[0]
    : request.query.streamID

  if (Number.isNaN(Number.parseInt(streamID, 10))) {
    resp.status(400).end()
    return
  }

  const stream = await redis.hgetall(`ftl:${streamID}`)
  if (Object.keys(stream).length === 0) {
    resp.status(404).end()
    return
  }

  resp.json(stream)
})

export default router
