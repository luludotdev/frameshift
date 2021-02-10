import Error from 'next/error'
import Head from 'next/head'
import { FC } from 'react'
import { ErrorContainer } from '~components/ErrorContainer'

export const Error404: FC = () => (
  <ErrorContainer>
    <Head>
      <meta name='robots' content='noindex' />
    </Head>

    <Error statusCode={404} />
  </ErrorContainer>
)

export default Error404
