import cors from 'cors'
import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import { dataKey, redis } from '~redis'

const router = nc<NextApiRequest, NextApiResponse>()
router.use(cors())

router.get(async (request, resp) => {
  const streamID = Array.isArray(request.query.streamID)
    ? request.query.streamID[0]
    : request.query.streamID

  if (Number.isNaN(Number.parseInt(streamID, 10))) {
    resp.status(400).end()
    return
  }

  const stream = await redis.hgetall(dataKey(streamID))
  if (Object.keys(stream).length === 0) {
    resp.status(404).end()
    return
  }

  resp.json(sortObject(stream))
})

function sortObject<T>(obj: Record<string, T>): Record<string, T> {
  const entries: Array<[string, T]> = Object.entries(obj)
  entries.sort((a, b) => a[0].localeCompare(b[0]))

  return Object.fromEntries(entries)
}

export default router
