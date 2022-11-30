import { initializeApp } from 'firebase/app'
import { get, getDatabase, ref } from 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'tonyli-pensieve.firebaseapp.com',
  databaseURL: 'https://tonyli-pensieve.firebaseio.com',
  projectId: 'tonyli-pensieve',
  storageBucket: 'tonyli-pensieve.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
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
// TODO: Define Token type in details
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
  | LinkToken
  | ListItemToken
  | ListToken
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
  const snapshot = await get(ref(db, 'filenameToNoteId'))
  if (snapshot.exists()) {
    const filenameToNoteId = snapshot.val() as Record<Filename, NoteId>
    return Object.values(filenameToNoteId)
  }
}
export const getFilename = async (noteId: NoteId): Promise<Filename | undefined> => {
  const snapshot = await get(ref(db, 'filenameToNoteId'))
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
  const snapshot = await get(ref(db, `filenameToNoteId/${filename}`))
  if (snapshot.exists()) {
    return snapshot.val()
  }
}

export const getDocumentToken = async (noteId: NoteId): Promise<DocumentToken | undefined> => {
  const snapshot = await get(ref(db, `noteIdToDocumentToken/${noteId}`))
  if (snapshot.exists()) {
    return snapshot.val()
  }
}
export const getFrontmatter = async (noteId: NoteId): Promise<Frontmatter | undefined> => {
  const snapshot = await get(ref(db, `noteIdToFrontmatter/${noteId}`))
  if (snapshot.exists()) {
    return snapshot.val()
  }
}
export const getReadableText = async (noteId: NoteId): Promise<string | undefined> => {
  const snapshot = await get(ref(db, `noteIdToReadableText/${noteId}`))
  if (snapshot.exists()) {
    return snapshot.val()
  }
}
export const getWikilinkIds = async (noteId: NoteId): Promise<LinkId[] | undefined> => {
  const snapshot = await get(ref(db, `noteIdToWikilinks/${noteId}`))
  if (snapshot.exists()) {
    return snapshot.val()
  }
}
export const getBacklinkIds = async (noteId: NoteId): Promise<LinkId[] | undefined> => {
  const snapshot = await get(ref(db, `noteIdToBacklinks/${noteId}`))
  if (snapshot.exists()) {
    return snapshot.val()
  }
}
export const getLink = async (linkId: LinkId): Promise<Link | undefined> => {
  const snapshot = await get(ref(db, 'linkIndex')) // TODO: Confirm if this result is cached
  if (snapshot.exists()) {
    const linkIndex: LinkIndex = snapshot.val()
    return linkIndex[linkId]
  }
}
export const getHashtagToNoteIds = async (): Promise<HashtagToNoteIds | undefined> => {
  const snapshot = await get(ref(db, 'hashtagToNoteIds'))
  if (snapshot.exists()) {
    return snapshot.val()
  }
}
export const getNoteIdsFromHashtag = async (hashtag: Hashtag): Promise<NoteId[] | undefined> => {
  const snapshot = await get(ref(db, `hashtagToNoteIds/${hashtag}`))
  if (snapshot.exists()) {
    return snapshot.val()
  }
}
export const getTagToNoteIds = async (): Promise<TagToNoteIds | undefined> => {
  const snapshot = await get(ref(db, 'tagToNoteIds'))
  if (snapshot.exists()) {
    return snapshot.val()
  }
}
export const getNoteIdsFromTag = async (tag: Tag): Promise<NoteId[] | undefined> => {
  const snapshot = await get(ref(db, `tagToNoteIds/${tag}`))
  if (snapshot.exists()) {
    return snapshot.val()
  }
}
