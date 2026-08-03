"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import articleSearchIndex from "../../content/article-search-index.json";
import { articles } from "../lib/articles";

function Logo() {
  return <span className="logo" aria-hidden="true">CS</span>;
}

export function ArticleArchive() {
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("All");
  const [sort, setSort] = useState<"curated" | "date" | "subject">("curated");
  const subjects = ["All", ...new Set(articles.map(article => article.subject))];
  const visibleArticles = useMemo(() => {
    const searchTerms: string[] = query.toLocaleLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [];
    const filtered = articles.filter(article => {
      if (subject !== "All" && article.subject !== subject) return false;
      if (!searchTerms.length) return true;
      const searchText = articleSearchIndex[article.slug as keyof typeof articleSearchIndex]?.toLocaleLowerCase() ?? "";
      const words: string[] = searchText.match(/[\p{L}\p{N}]+/gu) ?? [];
      return searchTerms.every(term => term.length <= 2 ? words.includes(term) : searchText.includes(term));
    });
    return [...filtered].sort((a, b) => sort === "curated"
      ? a.order - b.order
      : sort === "date" ? b.published.localeCompare(a.published)
      : a.subject.localeCompare(b.subject) || b.published.localeCompare(a.published));
  }, [query, subject, sort]);

  return (
    <main className="archive-page" id="top">
      <header>
        <Link className="brand" href="/"><Logo/><span><strong>CYBER / CLASSROOM</strong><small>Student operations hub</small></span></Link>
        <nav aria-label="Archive navigation"><Link href="/">Home</Link><Link href="/#resources">Resources</Link><Link href="/#word-wall">Word wall</Link></nav>
        <a className="portal" href="https://classroom.google.com/h/tv" target="_blank" rel="noreferrer">Class portal ↗</a>
      </header>

      <section className="archive-hero">
        <p className="label">Classroom publication library</p>
        <h1>Past issues,<br/><em>ready when needed.</em></h1>
        <p>Browse dispatches and permanent course documents without turning the site into another announcement stream.</p>
      </section>

      <section className="archive-shell">
        <div className="archive-toolbar">
          <div><span>Filter by subject</span><div className="filters">{subjects.map(item => <button key={item} className={subject === item ? "active" : ""} aria-pressed={subject === item} onClick={() => setSubject(item)}>{item}</button>)}</div></div>
          <label className="archive-search">Search articles<input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Try “AI,” “learning,” or “phishing”" /></label>
          <label>Sort articles<select value={sort} onChange={event => setSort(event.target.value as "curated" | "date" | "subject")}><option value="curated">Publication order</option><option value="date">Publication date</option><option value="subject">Subject</option></select></label>
        </div>

        <div className="archive-count"><span>{String(visibleArticles.length).padStart(2, "0")} articles</span><span>{sort === "curated" ? "Curated order" : sort === "date" ? "Newest first" : "Grouped by subject"}</span></div>
        <div className="archive-grid">
          {visibleArticles.map((article, index) => (
            <article key={article.slug} className={article.permanent ? "permanent" : ""}>
              <div className="archive-card-meta"><span>{article.kind}</span><time dateTime={article.published}>{article.publishedLabel}</time></div>
              <small>{article.subject}{article.permanent ? " // Permanent" : ""}</small>
              <h2><Link href={article.href}>{article.title}</Link></h2>
              <p>{article.subtitle}</p>
              <div className="archive-card-actions"><Link href={article.href}>Read article →</Link><Link href={article.pdfHref} download aria-label={`Download ${article.title} PDF`}>PDF ↓</Link>{article.slidesHref && <Link href={article.slidesHref} target="_blank" rel="noreferrer" aria-label={`View ${article.title} slide deck`}>Slides ↗</Link>}</div>
              <b aria-hidden="true">{String(index + 1).padStart(2, "0")}</b>
            </article>
          ))}
          {!visibleArticles.length && <div className="archive-empty"><strong>No matching articles.</strong><p>Try another keyword or clear the subject filter.</p></div>}
        </div>
      </section>

      <footer>
        <Link className="brand" href="/"><Logo/><span><strong>CYBER / CLASSROOM</strong><small>Learn · Defend · Grow</small></span></Link>
        <p>Durable references. No announcement treadmill.</p>
        <nav><Link href="/">Home</Link><Link href="/#resources">Resources</Link><Link href="/#word-wall">Word wall</Link></nav>
      </footer>
    </main>
  );
}
