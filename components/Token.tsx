import { ExternalLink } from 'lucide-react'
import NextLink from 'next/link'
import type { Language } from 'prism-react-renderer'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/duotoneLight'

import type {
  AutoLinkToken,
  BlankLineToken,
  CodeSpanToken,
  DocumentToken as DocumentTokenType,
  ElementToken,
  EmphasisToken,
  FencedCodeToken,
  HeadingToken,
  HtmlBlockToken,
  ImageToken,
  LinkToken,
  ListItemToken,
  ListToken,
  ParagraphToken,
  QuoteToken,
  StrongEmphasisToken,
  WikilinkToken,
} from '../utils/cache'

export interface ElementTokenProps<T extends ElementToken> {
  token: T
}

interface ChildTokensProps {
  tokens: ElementToken[]
}

const Children = ({ tokens }: ChildTokensProps) => (
  <>
    {tokens.map((token, i) => (
      <ElementToken token={token} key={i} />
    ))}
  </>
)

const AutoLink = ({ token }: ElementTokenProps<AutoLinkToken>) => {
  const isExternal = token.dest.startsWith('http')
  return (
    <NextLink href={token.dest} target={isExternal ? '_blank' : '_self'}>
      {token.title || <Children tokens={token.children} />}
      {isExternal && <ExternalLink size={16} />}
    </NextLink>
  )
}
const BlankLine = (_: ElementTokenProps<BlankLineToken>) => null
const CodeSpan = ({ token }: ElementTokenProps<CodeSpanToken>) => <code>{token.children}</code>
const Emphasis = ({ token }: ElementTokenProps<EmphasisToken>) => (
  <em>
    <Children tokens={token.children} />
  </em>
)
const FencedCode = ({ token }: ElementTokenProps<FencedCodeToken>) => {
  const code =
    token.children && Array.isArray(token.children)
      ? token.children.length > 0 && token.children[0].element === 'raw_text'
        ? token.children[0].children
        : ''
      : token.children
  return (
    <Highlight {...defaultProps} theme={theme} code={code} language={token.lang as Language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              <span className="line-number">{i + 1}</span>
              <span className="link-content">
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
const Heading = ({ token }: ElementTokenProps<HeadingToken>) => {
  const children = token.children.map((childToken, i) => (
    <ElementToken token={childToken} key={i} />
  ))
  return token.level === 1 ? (
    <h1>{children}</h1>
  ) : token.level === 2 ? (
    <h2>{children}</h2>
  ) : (
    <h3>{children}</h3>
  )
}
const HtmlBlock = ({ token }: ElementTokenProps<HtmlBlockToken>) => (
  <div className="html_block" dangerouslySetInnerHTML={{ __html: token.children }}></div>
)
const Image = ({ token }: ElementTokenProps<ImageToken>) => {
  const altText =
    token.children && token.children.length === 1 && token.children[0].element === 'raw_text'
      ? token.children[0].children
      : ''
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={token.dest} alt={altText} />
}
const Link = ({ token }: ElementTokenProps<LinkToken>) => {
  const isExternal = token.dest.startsWith('http')
  return (
    <NextLink href={token.dest} target={isExternal ? '_blank' : '_self'}>
      {Array.isArray(token.children) ? <Children tokens={token.children} /> : token.children}
      {isExternal && <ExternalLink size={16} />}
    </NextLink>
  )
}
const List = ({ token }: ElementTokenProps<ListToken>) => {
  if (token.ordered) {
    ;<OrderedList token={token} />
  }
  return <UnorderedList token={token} />
}
const ListItem = ({ token }: ElementTokenProps<ListItemToken>) => (
  <li>
    <Children tokens={token.children} />
  </li>
)
const OrderedList = ({ token }: ElementTokenProps<ListToken>) => (
  <ol>
    <Children tokens={token.children} />
  </ol>
)
const Paragraph = ({ token }: ElementTokenProps<ParagraphToken>) => (
  <p>
    <Children tokens={token.children} />
  </p>
)
const Quote = ({ token }: ElementTokenProps<QuoteToken>) => (
  <blockquote>
    <Children tokens={token.children} />
  </blockquote>
)
const Strong = ({ token }: ElementTokenProps<StrongEmphasisToken>) => (
  <strong>{<Children tokens={token.children} />}</strong>
)
const UnorderedList = ({ token }: ElementTokenProps<ListToken>) => (
  <ul>
    <Children tokens={token.children} />
  </ul>
)
const Wikilink = ({ token }: ElementTokenProps<WikilinkToken>) => (
  <NextLink className="wikilink" href={`/${token.dest}`}>
    {token.children || token.dest}
  </NextLink>
)

const UnrecognizedToken = ({ token }: ElementTokenProps<ElementToken>) => {
  console.error('Unrecognized token')
  console.error(token)
  return <div className="unrecognized_token">Unrecognized Token</div>
}

function ElementToken({ token }: ElementTokenProps<ElementToken>) {
  if (token.element === 'auto_link') {
    return <AutoLink token={token} />
  } else if (token.element === 'blank_line') {
    return <BlankLine token={token} />
  } else if (token.element === 'code_span') {
    return <CodeSpan token={token} />
  } else if (token.element === 'emphasis') {
    return <Emphasis token={token} />
  } else if (token.element === 'fenced_code') {
    return <FencedCode token={token} />
  } else if (token.element === 'heading') {
    return <Heading token={token} />
  } else if (token.element === 'html_block') {
    return <HtmlBlock token={token} />
  } else if (token.element === 'image') {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <Image token={token} />
  } else if (token.element === 'link') {
    return <Link token={token} />
  } else if (token.element === 'list') {
    return <List token={token} />
  } else if (token.element === 'list_item') {
    return <ListItem token={token} />
  } else if (token.element === 'paragraph') {
    return <Paragraph token={token} />
  } else if (token.element === 'quote') {
    return <Quote token={token} />
  } else if (token.element === 'raw_text') {
    return <>{token.children}</>
  } else if (token.element === 'strong_emphasis') {
    return <Strong token={token} />
  } else if (token.element === 'wikilink_element') {
    return <Wikilink token={token} />
  }
  return <UnrecognizedToken token={token} />
}

interface DocumentTokenProps {
  token: DocumentTokenType
}

export default function DocumentToken({ token: { children } }: DocumentTokenProps) {
  return (
    <div className="markdown">
      {children.map((token, i) => (
        <ElementToken token={token} key={i} />
      ))}
    </div>
  )
}
