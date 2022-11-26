import NextLink from 'next/link'

import { type Link, type LinkId } from '../utils/cache'

type LinkDetails = Link & { noteTitle: string }
type BacklinkDetails = Record<LinkId, LinkDetails>
interface BacklinksProps {
  backlinkDetails: BacklinkDetails
}

export default function Backlinks({ backlinkDetails }: BacklinksProps) {
  return (
    <footer className="note__footer">
      <div className="note__backlinks">
        {Object.entries(backlinkDetails).map(([id, { from, content, noteTitle }]) => {
          return (
            <NextLink className="note__backlink" href={`/${from}`} key={id}>
              <div className="note__backlink__container">
                <h1 className="note__backlink__title">{noteTitle}</h1>
                <div className="note__backlink__content">{content}</div>
              </div>
            </NextLink>
          )
        })}
      </div>
    </footer>
  )
}
