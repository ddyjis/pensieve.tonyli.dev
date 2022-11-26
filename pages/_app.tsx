import 'styles/main.scss'

import type { AppProps } from 'next/app'
import Head from 'next/head'

import Layout from '../components/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pensieve</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
