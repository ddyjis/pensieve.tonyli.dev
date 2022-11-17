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
import Backlinks from "./Backlinks";
import Frontmatter from "./Frontmatter";

type LinkDetails = Link & { noteTitle: string };
export type BacklinkDetails = Record<LinkId, LinkDetails>;

const getNoteData = async (noteId: NoteId) => {
  const frontmatter = await getFrontmatter(noteId);
  const filename = await getFilename(noteId);
  const documentToken = await getDocumentToken(noteId);
  const backlinkIds = await getBacklinkIds(noteId);
  const backlinkDetails: BacklinkDetails = {};
  for (let linkId of backlinkIds || []) {
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
  return { frontmatter, filename, documentToken, backlinkIds, backlinkDetails };
};

interface PageProps {
  params: {
    noteId: string;
  };
}

export default async function Page({ params: { noteId } }: PageProps) {
  const { frontmatter, filename, documentToken, backlinkDetails } = await getNoteData(noteId);
  if (!frontmatter) console.log("frontmatter");
  if (!documentToken) console.log("documentToken");
  if (!frontmatter || !documentToken) return <p>Loading ...</p>;
  return (
    <div className="note__wrapper">
      <div className="note">
        <Frontmatter frontmatter={frontmatter} filename={filename} />
        <div className="note__body">{/* TODO: render documentToken */}</div>
        <Backlinks backlinkDetails={backlinkDetails} />
      </div>
    </div>
  );
}
