import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="application-name" content="Pensieve" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-title" content="Pensieve" />
          <meta name="description" content="The second brain that help me do the thinking" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#ffffff" />

          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.ico" />

          <meta name="twitter:card" content="Notes" />
          <meta name="twitter:url" content="https://notes.tonyli.dev" />
          <meta name="twitter:title" content="Pensieve" />
          <meta
            name="twitter:description"
            content="The second brain that help me do the thinking"
          />
          <meta
            name="twitter:image"
            content="https://notes.tonyli.dev/android-chrome-192x192.png"
          />
          <meta name="twitter:creator" content="@__tony_li_dev__" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Pensieve" />
          <meta property="og:description" content="The second brain that help me do the thinking" />
          <meta property="og:site_name" content="Pensieve" />
          <meta property="og:url" content="https://notes.tonyli.dev" />
          <meta property="og:image" content="https://notes.tonyli.dev/apple-touch-icon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
