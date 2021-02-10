import { GetServerSideProps, NextPage } from 'next'
import dynamic from 'next/dynamic'

const Player = dynamic(async () => import('~components/Player'), {
  ssr: false,
})

interface IProps {
  channelID: number | null
  serverURI: string | null
}

const Live: NextPage<IProps> = ({ channelID, serverURI }) => {
  if (channelID === null) return <div>invalid</div>

  return <Player channelID={channelID} serverURI={serverURI ?? undefined} />
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
