import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import multer from 'multer'
import { FTL_CLIENT_DISABLE_THUMBNAILS } from '~env'
import { ingestAuth } from '~middleware/ingestAuth'
import { previewKey, PreviewKeyField, redis } from '~redis'

interface ApiRequest extends NextApiRequest {
  file: Express.Multer.File
}

const router = nc<ApiRequest, NextApiResponse>()
router.use(ingestAuth)

if (FTL_CLIENT_DISABLE_THUMBNAILS == false) {
  const middleware = multer({ storage: multer.memoryStorage() })
  router.use(middleware.single('thumbdata'))
}

router.post(async (request, resp) => {
  if (FTL_CLIENT_DISABLE_THUMBNAILS) {
    resp.status(200).end()
    return
  }

  const streamID = Array.isArray(request.query.streamID)
    ? request.query.streamID[0]
    : request.query.streamID

  if (Number.isNaN(Number.parseInt(streamID, 10))) {
    resp.status(400).end()
    return
  }

  const p = redis.pipeline()
  const key = previewKey(streamID)
  p.expire(key, 10)

  p.hset(key, PreviewKeyField.Buffer, request.file.buffer)
  p.hset(key, PreviewKeyField.MIME, request.file.mimetype)

  await p.exec()
  resp.status(200).end()
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default router
