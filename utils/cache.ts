import { get, ref } from "firebase/database";

import { db } from "./firebase";

type Filename = string;
export type NoteId = string;
export type LinkId = string;
type Tag = string;
type Hashtag = string;
export type Frontmatter = {
  id: string;
  title: string;
  aliases?: string[];
  tags?: Tag[];
  hashtags?: Hashtag[];
  created: string;
  updated: string;
};
export type Link = { content: string; from: NoteId; to: NoteId };
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

export const getFilename = async (noteId: NoteId): Promise<Filename | undefined> => {
  const snapshot = await get(ref(db, "filenameToNoteId"));
  if (snapshot.exists()) {
    const filenameToNoteId = snapshot.val() as FilenameToNoteId;
    const match = Object.entries(filenameToNoteId).find(
      ([_, currentNoteId]) => currentNoteId === noteId
    );
    if (match) {
      return match[0];
    }
  }
};

export const getDocumentToken = async (noteId: NoteId): Promise<DocumentToken | undefined> => {
  const snapshot = await get(ref(db, `noteIdToDocumentToken/${noteId}`));
  if (snapshot.exists()) {
    return snapshot.val();
  }
};
export const getFrontmatter = async (noteId: NoteId): Promise<Frontmatter | undefined> => {
  const snapshot = await get(ref(db, `noteIdToFrontmatter/${noteId}`));
  if (snapshot.exists()) {
    return snapshot.val();
  }
};
export const getReadableText = async (noteId: NoteId): Promise<string | undefined> => {
  const snapshot = await get(ref(db, `noteIdToReadableText/${noteId}`));
  if (snapshot.exists()) {
    return snapshot.val();
  }
};
export const getWikilinkIds = async (noteId: NoteId): Promise<LinkId[] | undefined> => {
  const snapshot = await get(ref(db, `noteIdToWikilinks/${noteId}`));
  if (snapshot.exists()) {
    return snapshot.val();
  }
};
export const getBacklinkIds = async (noteId: NoteId): Promise<LinkId[] | undefined> => {
  const snapshot = await get(ref(db, `noteIdToBacklinks/${noteId}`));
  if (snapshot.exists()) {
    return snapshot.val();
  }
};
export const getLink = async (linkId: LinkId): Promise<Link | undefined> => {
  const snapshot = await get(ref(db, "linkIndex")); // TODO: Confirm if this result is cached
  if (snapshot.exists()) {
    const linkIndex: LinkIndex = snapshot.val();
    return linkIndex[linkId];
  }
};
