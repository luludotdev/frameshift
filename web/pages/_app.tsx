import { AppProps } from 'next/app'

const NextApp = ({ Component, pageProps }: AppProps) => (
  <>
    <style jsx global>
      {`
      html, body
        box-sizing border-box
        margin 0
        padding 0
    `}
    </style>

    <Component {...pageProps} />
  </>
)

export default NextApp
