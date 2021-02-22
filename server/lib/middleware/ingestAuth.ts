import type { NextApiRequest, NextApiResponse } from 'next'
import type { RequestHandler } from 'next-connect'
import { FTL_CLIENT_INGEST_AUTH, FTL_SERVICE_REST_AUTH_TOKEN } from '~env'

const AUTH_KEY = FTL_SERVICE_REST_AUTH_TOKEN ?? FTL_CLIENT_INGEST_AUTH

export const ingestAuth: RequestHandler<NextApiRequest, NextApiResponse> = (
  request,
  resp,
  next
) => {
  if (AUTH_KEY === undefined) {
    next()
    return
  }

  const authHeader = request.headers.authorization
  if (authHeader !== AUTH_KEY) {
    resp.status(401).end()
    return
  }

  next()
}
