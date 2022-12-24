import * as firebase from 'firebase-admin/app'
import { getDatabase } from 'firebase-admin/database'

const app = firebase.getApps().length
  ? firebase.getApp()
  : firebase.initializeApp({
      credential: firebase.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY,
      }),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    })
export const db = getDatabase(app)

type Filename = string
export type NoteId = string
export type LinkId = string
export type Tag = string
export type Hashtag = string
export type Frontmatter = {
  id: string
  title: string
  aliases?: string[]
  tags?: Tag[]
  hashtags?: Hashtag[]
  created: string
  updated: string
}
export type Link = { content: string; from: NoteId; to: NoteId }
export type AutoLinkToken = {
  element: 'auto_link'
  children: ElementToken[]
  dest: string
  title: string
}
export type BlankLineToken = { element: 'blank_line' }
export type CodeSpanToken = { element: 'code_span'; children: string }
export type EmphasisToken = { element: 'emphasis'; children: ElementToken[] }
export type FencedCodeToken = {
  element: 'fenced_code'
  children: ElementToken | string
  extra: string
  lang: string
}
export type HeadingToken = {
  element: 'heading'
  children: ElementToken[]
  level: 1 | 2 | 3 | 4 | 5 | 6
}
export type HtmlBlockToken = { element: 'html_block'; children: string }
export type ImageToken = { element: 'image'; children: ElementToken[]; dest: string }
export type LineBreakToken = { element: 'line_break'; soft: boolean }
export type LinkToken = { element: 'link'; dest: string; children: ElementToken[] | string }
export type ListItemToken = { element: 'list_item'; children: ElementToken[] }
export type ListToken = {
  element: 'list'
  children: ElementToken[]
  bullet: string
  ordered: boolean
  start: number
  tight: boolean
}
export type LiteralToken = { element: 'literal'; children: string }
export type ParagraphToken = { element: 'paragraph'; children: ElementToken[] }
export type QuoteToken = { element: 'quote'; children: ElementToken[] }
export type RawTextToken = { element: 'raw_text'; children: string; escape: boolean }
export type StrongEmphasisToken = { element: 'strong_emphasis'; children: ElementToken[] }
export type WikilinkToken = { element: 'wikilink_element'; dest: string; children: string }
export type ElementToken =
  | AutoLinkToken
  | BlankLineToken
  | CodeSpanToken
  | EmphasisToken
  | FencedCodeToken
  | HeadingToken
  | HtmlBlockToken
  | ImageToken
  | LineBreakToken
  | LinkToken
  | ListItemToken
  | ListToken
  | LiteralToken
  | ParagraphToken
  | QuoteToken
  | RawTextToken
  | StrongEmphasisToken
  | WikilinkToken
export type DocumentToken = {
  element: 'document'
  children: ElementToken[]
}
type FilenameToNoteId = Record<Filename, NoteId | undefined>
type LinkIndex = Record<LinkId, Link>
export type TagToNoteIds = Record<Tag, NoteId[]>
export type HashtagToNoteIds = Record<Hashtag, NoteId[]>

export type BacklinkDetails = Record<LinkId, Link & { noteTitle: string }>

export type NoteIdToTitle = Record<NoteId, string>

export const getNoteIds = async (): Promise<NoteId[] | undefined> => {
  const snapshot = await db.ref('filenameToNoteId').get()
  if (snapshot.exists()) {
    const filenameToNoteId = snapshot.val() as Record<Filename, NoteId>
    return Object.values(filenameToNoteId)
  }
}
export const getFilename = async (noteId: NoteId): Promise<Filename | undefined> => {
  const snapshot = await db.ref('filenameToNoteId').get()
  if (snapshot.exists()) {
    const filenameToNoteId = snapshot.val() as FilenameToNoteId
    const match = Object.entries(filenameToNoteId).find(
      ([_, currentNoteId]) => currentNoteId === noteId
    )
    if (match) {
      return match[0]
    }
  }
}

export const getNoteIdFromFilename = async (filename: Filename): Promise<NoteId | undefined> => {
  const snapshot = await db.ref(`filenameToNoteId/${filename}`).get()
  if (snapshot.exists()) {
    return snapshot.val()
  }
}

export const getDocumentToken = async (noteId: NoteId): Promise<DocumentToken | undefined> => {
  const snapshot = await db.ref(`noteIdToDocumentToken/${noteId}`).get()
  if (snapshot.exists()) {
    return snapshot.val()
  }
}
export const getFrontmatter = async (noteId: NoteId): Promise<Frontmatter | undefined> => {
  const snapshot = await db.ref(`noteIdToFrontmatter/${noteId}`).get()
  if (snapshot.exists()) {
    return snapshot.val()
  }
}
export const getReadableText = async (noteId: NoteId): Promise<string | undefined> => {
  const snapshot = await db.ref(`noteIdToReadableText/${noteId}`).get()
  if (snapshot.exists()) {
    return snapshot.val()
  }
}
export const getWikilinkIds = async (noteId: NoteId): Promise<LinkId[] | undefined> => {
  const snapshot = await db.ref(`noteIdToWikilinks/${noteId}`).get()
  if (snapshot.exists()) {
    return snapshot.val()
  }
}
export const getBacklinkIds = async (noteId: NoteId): Promise<LinkId[] | undefined> => {
  const snapshot = await db.ref(`noteIdToBacklinks/${noteId}`).get()
  if (snapshot.exists()) {
    return snapshot.val()
  }
}
export const getLink = async (linkId: LinkId): Promise<Link | undefined> => {
  const snapshot = await db.ref('linkIndex').get()
  if (snapshot.exists()) {
    const linkIndex: LinkIndex = snapshot.val()
    return linkIndex[linkId]
  }
}
export const getHashtagToNoteIds = async (): Promise<HashtagToNoteIds | undefined> => {
  const snapshot = await db.ref('hashtagToNoteIds').get()
  if (snapshot.exists()) {
    return snapshot.val()
  }
}
export const getNoteIdsFromHashtag = async (hashtag: Hashtag): Promise<NoteId[] | undefined> => {
  const snapshot = await db.ref(`hashtagToNoteIds/${hashtag}`).get()
  if (snapshot.exists()) {
    return snapshot.val()
  }
}
export const getTagToNoteIds = async (): Promise<TagToNoteIds | undefined> => {
  const snapshot = await db.ref('tagToNoteIds').get()
  if (snapshot.exists()) {
    return snapshot.val()
  }
}
export const getNoteIdsFromTag = async (tag: Tag): Promise<NoteId[] | undefined> => {
  const snapshot = await db.ref(`tagToNoteIds/${tag}`).get()
  if (snapshot.exists()) {
    return snapshot.val()
  }
}
