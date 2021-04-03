import { config, library } from '@fortawesome/fontawesome-svg-core'
import { AppProps } from 'next/app'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false
library.add()

const NextApp = ({ Component, pageProps }: AppProps) => (
  <>
    <style jsx global>
      {`
      html, body
        box-sizing border-box

      body
        margin 0
        height 100vh
        font 16px/1.5 'Source Sans Pro', system-ui, sans-serif

      #__next
        height 100%
    `}
    </style>

    <Component {...pageProps} />
  </>
)

export default NextApp
