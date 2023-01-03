import 'styles/main.scss'

import { Fira_Code, Noto_Serif, Noto_Serif_HK } from '@next/font/google'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'

import Layout from '../components/Layout'
import { PensieveProvider } from '../components/PensieveContext'

const monospace = Fira_Code({ weight: ['400', '700'], subsets: ['latin'] })
const serif = Noto_Serif({ weight: ['400', '700'], subsets: ['latin'] })
const serif_zh = Noto_Serif_HK({ weight: ['400', '700'], subsets: ['chinese-hongkong'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pensieve</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <style jsx global>{`
        :root {
          --font-serif: ${serif.style.fontFamily}, ${serif_zh.style.fontFamily};
          --font-monospace: ${monospace.style.fontFamily};
        }
      `}</style>
      <PensieveProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PensieveProvider>
    </>
  )
}
