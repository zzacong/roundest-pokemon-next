import { type AppType } from 'next/app'

import Head from 'next/head'

import { api } from '$lib/api'
import { Footer, Header } from '$components'
import '$styles/globals.css'

const pageDescription =
  "We're here to answer the eternal question: What Pokémon is roundest?"
const pageTitle = 'Roundest Pokémon - Public Poll'
const imageMetaURL = '/pokeball.png'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageMetaURL} />
        <meta name="twitter:image" content={imageMetaURL} />
        <meta name="twitter:card" content="summary_large_image" />
        {/* prettier-ignore */}
        <meta name="application-name" content="Roundest Pokemon" />
        {/* prettier-ignore */}
        <meta name="apple-mobile-web-app-title" content="Roundest Pokemon" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* prettier-ignore */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        {/* prettier-ignore */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        {/* prettier-ignore */}
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#c52b20" />
        <meta name="msapplication-TileColor" content="#c52b20" />
        <meta name="theme-color" content="#1f2937" />
      </Head>

      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default api.withTRPC(MyApp)

export { reportWebVitals } from 'next-axiom'
