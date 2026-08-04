import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function headingId(value: ReactNode) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function markdownSections(markdown: string): [string, string][] {
  return [...markdown.matchAll(/^##\s+(.+)$/gm)].map(match => [headingId(match[1]), match[1]]);
}

export function splitDiscussion(markdown: string) {
  const marker = /^##\s+Questions (?:for Discussion|Worth Arguing About)\s*$/im;
  const match = marker.exec(markdown);
  if (!match || match.index === undefined) return { body: markdown, discussion: "" };
  return {
    body: markdown.slice(0, match.index).trim(),
    discussion: markdown.slice(match.index + match[0].length).trim(),
  };
}

export function MarkdownArticle({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => <h2 id={headingId(children)}>{children}</h2>,
        h3: ({ children }) => <h3>{children}</h3>,
        a: ({ href, children }) => {
          const safeHref = href?.startsWith("https://") || href?.startsWith("http://") ? href : undefined;
          return safeHref ? <a href={safeHref} target="_blank" rel="noreferrer">{children}</a> : <span>{children}</span>;
        },
        img: ({ src, alt }) => {
          const safeSrc = typeof src === "string" && (src.startsWith("https://") || src.startsWith("http://")) ? src : undefined;
          return safeSrc ? (
            <figure className="article-image">
              {/* Article authors supply arbitrary remote images, so Next/Image cannot know their dimensions. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={safeSrc} alt={alt ?? ""} loading="lazy" />
            </figure>
          ) : null;
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
