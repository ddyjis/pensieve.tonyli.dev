import { createClient } from 'redis'

const client = createClient({ url: process.env.REDIS_URL })
;(async () => {
  await client.connect()
})()

export const search = async (q: string) => {
  const { documents } = await client.ft.search('Note', q, {
    SUMMARIZE: { LEN: 50, SEPARATOR: '...' },
    HIGHLIGHT: { TAGS: { open: '<mark>', close: '</mark>' } },
  })
  return documents
}
