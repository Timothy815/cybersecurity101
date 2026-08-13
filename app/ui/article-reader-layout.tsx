"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";

type ArticleReaderLayoutProps = {
  sections: [string, string][];
  pdfHref: string;
  slidesHref?: string;
  children: ReactNode;
};

export function ArticleReaderLayout({ sections, pdfHref, slidesHref, children }: ArticleReaderLayoutProps) {
  const [contentsVisible, setContentsVisible] = useState(true);

  return (
    <div className={`article-layout${contentsVisible ? "" : " article-layout-wide"}`}>
      <div className="article-rail screen-only">
        <button
          className="article-contents-toggle"
          type="button"
          aria-expanded={contentsVisible}
          aria-controls="article-contents"
          onClick={() => setContentsVisible(visible => !visible)}
        >
          {contentsVisible ? "Hide contents menu ←" : "Show contents menu →"}
        </button>
        {contentsVisible && (
          <aside id="article-contents" className="article-contents" aria-label="Article contents">
            <p>In this article</p>
            <nav>{sections.map(([id, sectionTitle], index) => <a href={`#${id}`} key={id}><span>{String(index + 1).padStart(2, "0")}</span>{sectionTitle}</a>)}</nav>
            <Link className="contents-download" href={pdfHref} download>PDF edition ↓</Link>
            {slidesHref && <Link className="contents-download" href={slidesHref} target="_blank" rel="noreferrer">Slide deck ↗</Link>}
          </aside>
        )}
      </div>
      <article className="article-body">
        {children}
        <div className="article-end screen-only"><span>End // Article archive</span><Link href="/articles">Browse past issues →</Link></div>
      </article>
    </div>
  );
}
