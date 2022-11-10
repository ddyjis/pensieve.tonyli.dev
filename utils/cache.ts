import { ref } from "firebase/database";
import { useListVals, useObjectVal } from "react-firebase-hooks/database";
import { database } from "./firebase";

type Filename = string;
type NoteId = string;
type LinkId = string;
type Tag = string;
type Hashtag = string;
type Frontmatter = {
  id: string;
  title: string;
  aliases?: string[];
  tags?: Tag[];
  hashtags?: Hashtag[];
  created: string;
  updated: string;
};
type Link = { content: string; from: NoteId[]; to: NoteId[] };
// TODO: Define Token type in details
type BlankLineToken = { element: "blank_line" };
type CodeSpanToken = { element: "code_span"; children: string };
type FencedCodeToken = {
  element: "fenced_code";
  children: ElementToken | string;
  extra: string;
  lang: string;
};
type HeadingToken = { element: "heading"; children: ElementToken[]; level: 1 | 2 | 3 | 4 | 5 | 6 };
type LinkToken = { element: "link"; dest: string; children: ElementToken[] | string };
type ListItemToken = { element: "list_item"; children: ElementToken[] };
type ListToken = {
  element: "list";
  children: ElementToken[];
  bullet: string;
  ordered: boolean;
  start: number;
  tight: boolean;
};
type ParagraphToken = { element: "element"; children: ElementToken[] };
type QuoteToken = { element: "quote"; children: ElementToken[] };
type RawTextToken = { element: "raw_text"; children: string; escape: boolean };
type ElementToken =
  | BlankLineToken
  | CodeSpanToken
  | FencedCodeToken
  | HeadingToken
  | LinkToken
  | ListItemToken
  | ListToken
  | ParagraphToken
  | QuoteToken
  | RawTextToken;
type DocumentToken = {
  element: "document";
  children: ElementToken[];
};
type FilenameToNoteId = Record<Filename, NoteId | undefined>;
type NoteIdToFrontmatter = Record<NoteId, Frontmatter>;
type NoteIdToReadableText = Record<NoteId, string>;
type NoteIdToDocumentToken = Record<NoteId, DocumentToken>;
type LinkIndex = Record<LinkId, Link>;
type NoteIdToWikilinks = Record<NoteId, LinkId[]>;
type NoteIdToBacklinks = Record<NoteId, LinkId[]>;
type TagToNoteIds = Record<Tag, NoteId[]>;
type HashtagToNoteIds = Record<Hashtag, NoteId[]>;
export type Cache = {
  filenameToNoteId: FilenameToNoteId;
  hashtagToNoteIds: HashtagToNoteIds;
  linkIndex: LinkIndex;
  noteIdToBacklinks: NoteIdToBacklinks;
  noteIdToDocumentToken: NoteIdToDocumentToken;
  noteIdToFrontmatter: NoteIdToFrontmatter;
  noteIdToReadableText: NoteIdToReadableText;
  noteIdToWikilinks: NoteIdToWikilinks;
  tagToNoteIds: TagToNoteIds;
};

export const getDocumentTokenRef = (noteId: NoteId) =>
  ref(database, `noteIdToDocumentToken/${noteId}`);
export const getFrontmatterRef = (noteId: NoteId) => ref(database, `noteIdToFrontmatter/${noteId}`);
export const getReadableTextRef = (noteId: NoteId) =>
  ref(database, `noteIdToReadableText/${noteId}`);
export const getWikilinskRef = (noteId: NoteId) => ref(database, `noteIdToWikilinks/${noteId}`);
export const getBacklinksRef = (noteId: NoteId) => ref(database, `noteIdToBacklinks/${noteId}`);
export const getLinkQuery = () => ref(database, "linkIndex");

export const useNote = (noteId: NoteId) => {
  const [documentToken, isDocumentTokenLoading, isDocumentTokenError] = useObjectVal<DocumentToken>(
    getDocumentTokenRef(noteId)
  );
  const [frontmatter, isFrontmatterLoading, isFrontmatterError] = useObjectVal<Frontmatter>(
    getFrontmatterRef(noteId)
  );
  const [readableText, isReadableTextLoading, isReadableTextError] = useObjectVal<string>(
    getReadableTextRef(noteId)
  );
  const [wikilinks, isWikilinksLoading, isWikilinksError] = useObjectVal<LinkId[]>(
    getWikilinskRef(noteId)
  );
  const [backlinks, isBacklinksLoading, isBacklinksError] = useObjectVal<LinkId[]>(
    getBacklinksRef(noteId)
  );
  const [links, isLinkLoading, isLinkError] = useListVals<Link[]>(getLinkQuery());

  return {
    data: {
      documentToken,
      frontmatter,
      readableText,
      links,
      wikilinks,
      backlinks,
    },
    isLoading:
      isDocumentTokenLoading ||
      isFrontmatterLoading ||
      isReadableTextLoading ||
      isWikilinksLoading ||
      isBacklinksLoading ||
      isLinkLoading,
    error:
      isDocumentTokenError ||
      isFrontmatterError ||
      isReadableTextError ||
      isWikilinksError ||
      isBacklinksError ||
      isLinkError,
  };
};
