import Error from 'next/error'
import { FC } from 'react'
import { ErrorContainer } from '~components/ErrorContainer'

export const Error404: FC = () => (
  <ErrorContainer>
    <Error statusCode={404} />
  </ErrorContainer>
)

export default Error404
