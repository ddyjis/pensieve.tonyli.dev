import type { LinkId, Link } from "../../utils/cache";
import {
  getBacklinks,
  getDocumentToken,
  getFrontmatter,
  getLink,
  getWikilinks,
} from "../../utils/cache";

const getNoteData = async () => {
  const noteId = "7ddf0977ed1fef528ef8a2d31a5364fa2d12bf49f3a31f8be1cebfeb673dea40";
  const frontmatter = await getFrontmatter(noteId);
  const documentToken = await getDocumentToken(noteId);
  const wikilinks = await getWikilinks(noteId);
  const backlinks = await getBacklinks(noteId);
  const linkIds = Array.from(new Set([...(wikilinks || []), ...(backlinks || [])]));
  const relevantLinks: Record<LinkId, Link> = {};
  for (let linkId of linkIds) {
    relevantLinks[linkId] = relevantLinks[linkId] || (await getLink(linkId));
  }
  return { frontmatter, documentToken, wikilinks, backlinks, relevantLinks };
};

const TestPage = async () => {
  const data = await getNoteData();
  console.log(data);
  return <div>{`Done`}</div>;
};

export default TestPage;
