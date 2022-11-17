import NextLink from "next/link";

import {
  getBacklinkIds,
  getFilename,
  getDocumentToken,
  getFrontmatter,
  getLink,
  type Link,
  type LinkId,
  type NoteId,
} from "../../utils/cache";

type LinkDetails = Link & { noteTitle: string };

const getNoteData = async (noteId: NoteId) => {
  const frontmatter = await getFrontmatter(noteId);
  const filename = await getFilename(noteId);
  const documentToken = await getDocumentToken(noteId);
  const backlinks = await getBacklinkIds(noteId);
  const backlinkDetails: Record<LinkId, LinkDetails> = {};
  for (let linkId of backlinks || []) {
    if (!backlinkDetails[linkId]) {
      const link = await getLink(linkId);
      if (!link) {
        continue;
      }
      const originNoteFrontmatter = await getFrontmatter(link.from);
      if (!originNoteFrontmatter) {
        continue;
      }
      backlinkDetails[linkId] = { ...link, noteTitle: originNoteFrontmatter.title };
    }
  }
  return { frontmatter, filename, documentToken, backlinks, backlinkDetails };
};

interface PageProps {
  params: {
    noteId: string;
  };
}

export default async function Page({ params: { noteId } }: PageProps) {
  const { frontmatter, filename, documentToken, backlinks, backlinkDetails } = await getNoteData(
    noteId
  );
  if (!frontmatter) console.log("frontmatter");
  if (!documentToken) console.log("documentToken");
  if (!frontmatter || !documentToken) return <p>Loading ...</p>;
  return (
    <div className="note__wrapper">
      <div className="note">
        <header className="note__header">
          <h1 className="note__title">{frontmatter.title}</h1>
          <div className="note__aliases">
            {frontmatter.aliases?.map((alias) => (
              <div className="note__alias" key={alias}>
                {alias}
              </div>
            ))}
          </div>
          <div className="note__tags">
            {frontmatter.tags?.map((tag) => (
              <div className="note__tag" key={tag}>
                {tag}
              </div>
            ))}
          </div>
          {/* TODO: add baseurl for edit */}
          {filename && (
            <NextLink className="note__edit_link" href={`/${filename}.md`}>
              Edit
            </NextLink>
          )}
          <div className="note__create_time">{frontmatter.created}</div>
          <div className="note__update_time">{frontmatter.updated}</div>
        </header>
        <div className="note__body">{/* TODO: render documentToken */}</div>
        <footer className="note__footer">
          {backlinks && backlinks.length && (
            <div className="note__backlinks__wrapper">
              {backlinks.map((id) => {
                const backlinkDetail = backlinkDetails[id];
                if (!backlinkDetail) {
                  return null;
                }
                return (
                  <NextLink className="note__backlink" href={`/${backlinkDetail.from}`} key={id}>
                    <h1 className="note__backlink__title">{backlinkDetail.noteTitle}</h1>
                    <div className="note__backlink__content">{backlinkDetail.content}</div>
                  </NextLink>
                );
              })}
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}
