import { GetServerSideProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import Error404 from '~pages/404'

const Player = dynamic(async () => import('~components/Player'), {
  ssr: false,
})

interface IProps {
  channelID: number | null
  serverURI: string | null
}

const Live: NextPage<IProps> = ({ channelID, serverURI }) => {
  if (channelID === null) return <Error404 />

  return (
    <div>
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

export const getServerSideProps: GetServerSideProps<IProps> = async ({
  query,
}) => {
  const queryID = Array.isArray(query.id) ? query.id[0] : query.id!
  const parsed = Number.parseInt(queryID, 10)
  const channelID = Number.isNaN(parsed) ? null : parsed

  const queryServerURI: string | undefined = Array.isArray(query.serverURI)
    ? query.serverURI[0]
    : query.serverURI!

  const serverURI =
    queryServerURI === undefined
      ? null
      : queryServerURI === ''
      ? null
      : queryServerURI

  return { props: { channelID, serverURI } }
}

export default Live
