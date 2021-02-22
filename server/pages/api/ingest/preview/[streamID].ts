import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import { ingestAuth } from '~middleware/ingestAuth'

const router = nc<NextApiRequest, NextApiResponse>()
router.use(ingestAuth)

router.post((_, resp) => {
  resp.status(200).end()
})

export default router
