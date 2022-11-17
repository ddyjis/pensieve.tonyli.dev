import NextLink from "next/link";

import type { BacklinkDetails } from "./page";

interface BacklinksProps {
  backlinkDetails: BacklinkDetails;
}

export default function Backlinks({ backlinkDetails }: BacklinksProps) {
  return (
    <footer className="note__footer">
      <div className="note__backlinks__wrapper">
        {Object.entries(backlinkDetails).map(([id, { from, content, noteTitle }]) => {
          return (
            <NextLink className="note__backlink" href={`/${from}`} key={id}>
              <h1 className="note__backlink__title">{noteTitle}</h1>
              <div className="note__backlink__content">{content}</div>
            </NextLink>
          );
        })}
      </div>
    </footer>
  );
}