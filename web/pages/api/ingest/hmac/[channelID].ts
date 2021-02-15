import { createHmac } from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import { FTL_CLIENT_HMAC_ALGO, FTL_CLIENT_HMAC_SECRET } from '~env'

const router = nc<NextApiRequest, NextApiResponse>()

router.get((request, resp) => {
  const channelID = Array.isArray(request.query.channelID)
    ? request.query.channelID[0]
    : request.query.channelID

  if (Number.isNaN(Number.parseInt(channelID, 10))) {
    resp.status(400).end()
  }

  const hash = createHmac(FTL_CLIENT_HMAC_ALGO, FTL_CLIENT_HMAC_SECRET)
  hash.update(channelID)

  const hmacKey = hash.digest('hex')
  resp.json({ hmacKey })
})

export default router
