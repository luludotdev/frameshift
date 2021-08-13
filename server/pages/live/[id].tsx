import { GetServerSideProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { FTL_CLIENT_INGEST_SERVER } from '~env'
import Error404 from '~pages/404'

// eslint-disable-next-line node/no-unsupported-features/es-syntax
const Player = dynamic(async () => import('~components/Player'), {
  ssr: false,
})

interface Props {
  channelID: number | null
  serverURI: string | null
}

const Live: NextPage<Props> = ({ channelID, serverURI }) => {
  if (channelID === null) return <Error404 />

  return (
    <div>
      <Head>
        <title>Frameshift • {channelID}</title>
      </Head>

      <style jsx>
        {`
          div
            width 100vw
            height 100vh
            overflow hidden
        `}
      </style>

      <Player channelID={channelID} serverURI={serverURI ?? undefined} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const queryID = Array.isArray(query.id) ? query.id[0] : query.id
  const parsed = Number.parseInt(queryID ?? 'NaN', 10)
  const channelID = Number.isNaN(parsed) ? null : parsed

  const queryServerURI: string | undefined = Array.isArray(query.serverURI)
    ? query.serverURI[0]
    : query.serverURI

  const browserServerURI =
    queryServerURI === undefined
      ? null
      : queryServerURI === ''
      ? null
      : queryServerURI

  const serverURI =
    (FTL_CLIENT_INGEST_SERVER ?? browserServerURI)?.replace(/\/$/, '') ?? null

  return { props: { channelID, serverURI } }
}

export default Live
