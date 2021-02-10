import Error from 'next/error'
import { FC } from 'react'
import { ErrorContainer } from '~components/ErrorContainer'

const Error500: FC = () => (
  <ErrorContainer>
    <Error statusCode={500} />
  </ErrorContainer>
)

export default Error500
