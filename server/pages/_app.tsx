import { config, library } from '@fortawesome/fontawesome-svg-core'
import {
  faClock,
  faCompress,
  faExpand,
  faUser,
  faVolumeDown,
  faVolumeMute,
  faVolumeOff,
  faVolumeUp,
} from '@fortawesome/free-solid-svg-icons'
import { AppProps } from 'next/app'
import Head from 'next/head'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false
library.add(
  faClock,
  faCompress,
  faExpand,
  faUser,
  faVolumeDown,
  faVolumeMute,
  faVolumeOff,
  faVolumeUp
)

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

    <Head>
      <link rel='preconnect' href='https://fonts.gstatic.com' />
      <link
        href='https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600&display=swap'
        rel='stylesheet'
      />
    </Head>

    <Component {...pageProps} />
  </>
)

export default NextApp
