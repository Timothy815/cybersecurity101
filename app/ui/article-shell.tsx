import type { ReactNode } from "react";
import Link from "next/link";

type ArticleShellProps = {
  eyebrow: string;
  title: ReactNode;
  deck: string;
  meta: string[];
  sections: [string, string][];
  pdfHref: string;
  children: ReactNode;
};

function Logo() {
  return <span className="logo" aria-hidden="true">CS</span>;
}

export function ArticleShell({ eyebrow, title, deck, meta, sections, pdfHref, children }: ArticleShellProps) {
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
          <Link className="article-download screen-only" href={pdfHref} download>Download clean PDF ↓</Link>
        </div>
      </section>

      <div className="article-layout">
        <aside className="article-contents screen-only" aria-label="Article contents">
          <p>In this article</p>
          <nav>{sections.map(([id, sectionTitle], index) => <a href={`#${id}`} key={id}><span>{String(index + 1).padStart(2, "0")}</span>{sectionTitle}</a>)}</nav>
          <Link className="contents-download" href={pdfHref} download>PDF edition ↓</Link>
        </aside>
        <article className="article-body">
          {children}
          <div className="article-end screen-only"><span>End // Article archive</span><Link href="/articles">Browse past issues →</Link></div>
        </article>
      </div>

      <footer className="screen-only">
        <Link className="brand" href="/"><Logo/><span><strong>CYBER / CLASSROOM</strong><small>Learn · Defend · Grow</small></span></Link>
        <p>Built for the students who will defend what comes next.</p>
        <nav><Link href="/articles">Articles</Link><Link href="/#resources">Resources</Link><Link href="/#word-wall">Word wall</Link></nav>
      </footer>
    </main>
  );
}
