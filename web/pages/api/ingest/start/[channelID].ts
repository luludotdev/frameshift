import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import { ingestAuth } from '~middleware/ingestAuth'

const router = nc<NextApiRequest, NextApiResponse>()
router.use(ingestAuth)

router.post((request, resp) => {
  const channelID = Array.isArray(request.query.channelID)
    ? request.query.channelID[0]
    : request.query.channelID

  if (Number.isNaN(Number.parseInt(channelID, 10))) {
    resp.status(400).end()
  }

  resp.json({ streamId: channelID })
})

export default router
