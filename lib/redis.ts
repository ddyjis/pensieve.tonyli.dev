import { createClient } from 'redis'

const client = createClient({ url: process.env.REDIS_URL })
;(async () => {
  await client.connect()
})()

export const search = async (q: string) => {
  // Ignore TS error complaining FIELDS values not starting with @ or $.
  // @ts-ignore
  const { documents } = await client.ft.search('Note', q, {
    SUMMARIZE: { FIELDS: ['readableText'], LEN: 50, SEPARATOR: '...' },
    HIGHLIGHT: { FIELDS: ['readableText'], TAGS: { open: '<mark>', close: '</mark>' } },
  })
  return documents
}
