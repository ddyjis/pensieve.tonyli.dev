"use client";

import type { Language } from "prism-react-renderer";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/duotoneLight";

import type { FencedCodeToken } from "../../utils/cache";
import type { ElementTokenProps } from "./Token";

const FencedCode = ({ token }: ElementTokenProps<FencedCodeToken>) => {
  const code =
    token.children && Array.isArray(token.children)
      ? token.children.length > 0 && token.children[0].element === "raw_text"
        ? token.children[0].children
        : ""
      : token.children;
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
  );
};

export default FencedCode;
