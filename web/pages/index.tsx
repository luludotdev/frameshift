import { NextPage } from 'next'
import Head from 'next/head'

const App: NextPage = () => (
  <div className='container'>
    <Head>
      <title>FTL Player</title>
    </Head>

    <style jsx>
      {`
        div.container
          width 100vw
          height 100vh
          overflow hidden

          color white
          background rgb(19, 19, 19)

          display flex
          flex-direction column
          align-items center

        div.inner
          margin 1.5rem
          color inherit
          max-width 650px
          width 100%

          h1, h2, p
            margin 1rem 0
            margin-top 0

          hr
            border-color rgba(255, 255, 255, 0.25)

          a
            transition color 0.2s ease
            color rgb(175, 165, 253)
            text-decoration none

            &:hover
              color rgb(222, 218, 255)
      `}
    </style>

    <div className='inner'>
      <h1>FTL Player</h1>
      <hr />

      <h2>About</h2>
      <p>
        FTL Player is a browser-based livestream player designed to be used with
        Mixer&apos;s FTL Protocol. See the{' '}
        <a
          href='https://github.com/nerdcubed/ftl'
          target='_blank'
          rel='noopener noreferrer'
        >
          GitHub Repo
        </a>{' '}
        for more information.
      </p>

      <h2>Watching Streams</h2>
      <p>
        Visit <a href='/live/[channelID]'>/live/[channelID]</a> to watch a
        stream. Replace <code>[channelID]</code> with the stream&apos;s Channel
        ID.
      </p>
    </div>
  </div>
)

export default App
