import type { NextApiHandler } from 'next'

import { type NoteId } from '../../lib/firebase'
import { search } from '../../lib/redis'

export type SearchResult = {
  notes: { id: NoteId; value: { readableText: string; title: string; aliases: string } }[]
}

const handler: NextApiHandler = async (req, res) => {
  const q = req.query.q
  const query = Array.isArray(q) ? q[0] : q || ''
  const notes = await search(query)
  res.status(200).json({ notes })
}

export default handler
