import type { AppProps } from 'next/app'
import type { AppRouter } from '$backend/router'

import Head from 'next/head'
import { withTRPC } from '@trpc/next'

import { Footer, Header } from '$components'
import '$styles/globals.css'

const pageDescription =
  "We're here to answer the eternal question: What Pokémon is roundest?"
const pageTitle = 'Roundest Pokémon - Public Poll'
const imageMetaURL = '/pokeball.png'

function MyApp({ Component, pageProps }: AppProps) {
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
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

function getBaseUrl() {
  if (typeof window !== 'undefined') return '' // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`

    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  // ssr: true,
})(MyApp)
