import type { ReactNode } from "react";
import Link from "next/link";
import { ArticleReaderLayout } from "./article-reader-layout";

type ArticleShellProps = {
  eyebrow: string;
  title: ReactNode;
  deck: string;
  meta: string[];
  sections: [string, string][];
  pdfHref: string;
  slidesHref?: string;
  children: ReactNode;
};

function Logo() {
  return <span className="logo" aria-hidden="true">CS</span>;
}

export function ArticleShell({ eyebrow, title, deck, meta, sections, pdfHref, slidesHref, children }: ArticleShellProps) {
  return (
    <main className="dispatch-article-page" id="top">
      <header className="screen-only">
        <Link className="brand" href="/"><Logo/><span><strong>CYBER / CLASSROOM</strong><small>Student operations hub</small></span></Link>
        <nav aria-label="Article navigation"><Link href="/articles">Articles</Link><Link href="/#resources">Resources</Link><Link href="/#word-wall">Word wall</Link></nav>
        <a className="portal" href="https://classroom.google.com/h/tv" target="_blank" rel="noreferrer">Class portal ↗</a>
      </header>

      <section className="article-hero">
        <div className="article-hero-inner">
          <Link className="article-back screen-only" href="/articles">← Browse all articles</Link>
          <p className="label">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="article-deck">{deck}</p>
          <div className="article-meta">{meta.map(item => <span key={item}>{item}</span>)}</div>
          <div className="article-downloads screen-only">
            <Link className="article-download" href={pdfHref} download>Download clean PDF ↓</Link>
            {slidesHref && <Link className="article-download" href={slidesHref} target="_blank" rel="noreferrer">View slide deck ↗</Link>}
          </div>
        </div>
      </section>

      <ArticleReaderLayout sections={sections} pdfHref={pdfHref} slidesHref={slidesHref}>
        {children}
      </ArticleReaderLayout>

      <footer className="screen-only">
        <Link className="brand" href="/"><Logo/><span><strong>CYBER / CLASSROOM</strong><small>Learn · Defend · Grow</small></span></Link>
        <p>Built for the students who will defend what comes next.</p>
        <nav><Link href="/articles">Articles</Link><Link href="/#resources">Resources</Link><Link href="/#word-wall">Word wall</Link></nav>
      </footer>
    </main>
  );
}
