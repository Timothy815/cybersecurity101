"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { ArticleRecord } from "../lib/articles";
import { MarkdownArticle, splitDiscussion } from "../ui/markdown-article";

type EditableArticle = Omit<ArticleRecord, "publishedLabel"> & { publishedLabel?: string };
type Draft = { title: string; subtitle: string; subject: string; readTime: string; published: string; markdown: string };
const blankDraft: Draft = { title: "", subtitle: "", subject: "", readTime: "8 min read", published: "", markdown: "" };

function Logo() { return <span className="logo" aria-hidden="true">CS</span>; }
function slugify(value: string) { return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
function nextDate(articles: EditableArticle[]) {
  const dates = articles.filter(article => article.kind === "Dispatch").map(article => article.published).sort();
  const date = new Date(`${dates.at(-1) ?? "2026-08-12"}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString().slice(0, 10);
}

function validateQuestionLines(markdown: string) {
  const match = /(?:^|\n)##\s+Questions (?:for Discussion|Worth Arguing About)\s*\n([\s\S]*)$/i.exec(markdown);
  if (!match) throw new Error("The article needs a Questions for Discussion section at the end.");
  const lines = match[1].split("\n").map(line => line.trim()).filter(Boolean);
  if (lines.length < 2 || lines.some(line => !/^\d+\.\s+.+\?$/.test(line))) {
    throw new Error("Every discussion question must be a complete numbered Markdown line ending in a question mark.");
  }
}

function parseDraft(value: string): Draft {
  const match = value.trim().match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]+)$/);
  if (!match) throw new Error("The draft needs the template’s opening and closing --- lines.");
  const fields = Object.fromEntries(match[1].split("\n").map(line => {
    const index = line.indexOf(":");
    return index < 0 ? [line.trim(), ""] : [line.slice(0, index).trim(), line.slice(index + 1).trim()];
  }));
  if (!fields.title || !fields.subtitle || !fields.subject) throw new Error("The draft is missing title, subtitle, or subject metadata.");
  const markdown = match[2].trim();
  validateQuestionLines(markdown);
  return { title: fields.title, subtitle: fields.subtitle, subject: fields.subject, readTime: fields.readTime || "8 min read", published: fields.published || "", markdown };
}

function aiPrompt() {
  return `Create an original classroom article for high-school cybersecurity students. Return only Markdown in the exact structure below—no introduction, commentary, or code fence.

---
title: [concise article title]
subtitle: [one-sentence description]
subject: [short subject category]
readTime: [estimated minutes, formatted like "8 min read"]
published: [YYYY-MM-DD, or leave blank]
---

[Begin with an engaging real-world question, scenario, or observation.]

## [Descriptive section heading]

[Clear paragraphs written for students. Define technical terms in context and connect ideas to responsible cybersecurity practice.]

[Add additional ## sections as needed. Use **bold** sparingly, *italics* for titles or emphasis, and Markdown links for genuine sources. Never invent a quotation, source, study, or URL.]

## Sources

- [Source title](https://example.com)

## Questions for Discussion

1. [One open-ended question on its own numbered line?]
2. [One open-ended question on its own numbered line?]
3. [Continue as needed, keeping every question on a separate line?]

Style requirements:
- Aim for 1,200–2,200 words unless the topic needs less.
- Favor clear explanations, concrete examples, intellectual honesty, safety, and human judgment.
- Do not provide actionable instructions for unauthorized access or harm.
- Make the article useful for classroom discussion rather than merely summarizing facts.
- Put Sources immediately before Questions for Discussion when sources are used.
- Always end with Questions for Discussion, with every question on its own numbered line and ending in a question mark.`;
}

export function ControlPanel({ initialArticles, apiUrl }: { initialArticles: ArticleRecord[]; apiUrl: string }) {
  const [articles, setArticles] = useState<EditableArticle[]>(initialArticles);
  const [sha, setSha] = useState("");
  const [session, setSession] = useState("");
  const [user, setUser] = useState("");
  const [status, setStatus] = useState(apiUrl ? "Sign in to manage publication settings." : "Publishing backend setup is required.");
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState<Draft>({ ...blankDraft, published: nextDate(initialArticles) });
  const [importText, setImportText] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [showCreator, setShowCreator] = useState(false);
  const prompt = aiPrompt();

  const loadCatalog = useCallback(async (token: string) => {
    setBusy(true);
    try {
      const response = await fetch(`${apiUrl}/api/articles`, { headers: { Authorization: `Bearer ${token}` } });
      if (!response.ok) throw new Error(response.status === 401 ? "Your session expired. Please sign in again." : "The article catalog could not be loaded.");
      const data = await response.json() as { articles: EditableArticle[]; sha: string; user: string };
      setArticles(data.articles.sort((a, b) => a.order - b.order));
      setSha(data.sha);
      setUser(data.user);
      setStatus("Authenticated. Changes remain drafts until you select Publish changes.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to load the catalog.");
      sessionStorage.removeItem("control_session");
      setSession("");
    } finally { setBusy(false); }
  }, [apiUrl]);

  useEffect(() => {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const incoming = fragment.get("session");
    const stored = incoming ?? sessionStorage.getItem("control_session") ?? "";
    if (incoming) {
      sessionStorage.setItem("control_session", incoming);
      history.replaceState(null, "", window.location.pathname);
    }
    const timer = window.setTimeout(() => {
      if (stored && apiUrl) { setSession(stored); void loadCatalog(stored); }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [apiUrl, loadCatalog]);

  function update(slug: string, patch: Partial<EditableArticle>) {
    setArticles(current => current.map(article => article.slug === slug ? { ...article, ...patch } : article));
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= articles.length) return;
    setArticles(current => {
      const copy = [...current];
      [copy[index], copy[target]] = [copy[target], copy[index]];
      return copy.map((article, order) => ({ ...article, order }));
    });
  }

  async function save() {
    if (!session) return;
    if (!articles.some(article => article.visible && article.kind === "Dispatch")) {
      setStatus("At least one dispatch must remain visible."); return;
    }
    setBusy(true); setStatus("Publishing catalog changes…");
    try {
      const response = await fetch(`${apiUrl}/api/articles`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${session}`, "Content-Type": "application/json" },
        body: JSON.stringify({ sha, articles: articles.map((article, order) => ({ ...article, order, publishedLabel: undefined })) }),
      });
      const data = await response.json() as { sha?: string; message?: string; commitUrl?: string };
      if (!response.ok) throw new Error(data.message || "GitHub rejected the update.");
      setSha(data.sha ?? sha);
      setStatus("Published to GitHub. Pages is rebuilding the student site and PDFs.");
    } catch (error) { setStatus(error instanceof Error ? error.message : "Publication failed."); }
    finally { setBusy(false); }
  }

  async function signOut() {
    if (session && apiUrl) await fetch(`${apiUrl}/api/logout`, { method: "POST", headers: { Authorization: `Bearer ${session}` } }).catch(() => undefined);
    sessionStorage.removeItem("control_session"); setSession(""); setUser(""); setStatus("Signed out.");
  }

  function importDraft(value = importText) {
    try { const parsed = parseDraft(value); setDraft({ ...parsed, published: parsed.published || nextDate(articles) }); setShowCreator(true); setStatus("Draft imported. Review every field before adding it to the catalog."); }
    catch (error) { setStatus(error instanceof Error ? error.message : "Draft import failed."); }
  }

  function addDraft() {
    const slug = slugify(draft.title);
    if (!slug || !draft.markdown.trim() || !draft.published) { setStatus("A title, publication date, and article body are required."); return; }
    try { validateQuestionLines(draft.markdown); } catch (error) { setStatus(error instanceof Error ? error.message : "The discussion questions are invalid."); return; }
    if (articles.some(article => article.slug === slug)) { setStatus("An article with this title already exists."); return; }
    const edition = Math.max(0, ...articles.map(article => article.edition ?? 0)) + 1;
    const created: EditableArticle = {
      slug, title: draft.title.trim(), subtitle: draft.subtitle.trim(), deck: draft.subtitle.trim(), published: draft.published,
      subject: draft.subject.trim(), kind: "Dispatch", readTime: draft.readTime.trim() || "8 min read",
      href: `/dispatch/${slug}`, pdfHref: `/articles/pdfs/${slug}.pdf`, edition, visible: true, order: 0,
      bodyMarkdown: draft.markdown.trim(),
    };
    setArticles(current => [created, ...current].map((article, order) => ({ ...article, order })));
    setDraft({ ...blankDraft, published: nextDate([...articles, created]) }); setImportText(""); setShowCreator(false);
    setStatus("Article added as an unpublished catalog change. Preview the list, then select Publish changes.");
  }

  const preview = splitDiscussion(draft.markdown);

  return (
    <main className="control-page">
      <header><Link className="brand" href="/"><Logo/><span><strong>CYBER / CONTROL</strong><small>Authorized publishing</small></span></Link><nav><Link href="/">Student site</Link><Link href="/articles">Article archive</Link></nav><span className="control-security">Server authorization required</span></header>
      <section className="control-hero"><div><p className="label">Publication control // Private actions</p><h1>Control what<br/><em>students see.</em></h1><p>The page is public code. Every read and write action is protected by GitHub identity, repository permissions, and server-side authorization.</p></div><div className="control-session"><span className={session ? "ready" : ""}>{session ? "● Authenticated" : "○ Signed out"}</span>{user && <strong>@{user}</strong>}{!session && apiUrl && <button className="dark-button" onClick={() => location.assign(`${apiUrl}/auth/start?return_to=${encodeURIComponent(location.href.split("#")[0])}`)}>Sign in with GitHub →</button>}{session && <button onClick={signOut}>Sign out</button>}{!apiUrl && <code>NEXT_PUBLIC_CONTROL_API_URL is not configured</code>}</div></section>

      <section className="control-status" aria-live="polite"><strong>{busy ? "Working" : "Status"}</strong><p>{status}</p></section>

      <section className="control-workspace">
        <div className="control-heading"><div><p className="label">01 // Publication queue</p><h2>Visibility, dates,<br/><em>and issue order.</em></h2></div><button className="dark-button" onClick={save} disabled={!session || busy}>Publish changes →</button></div>
        <div className="control-list">{articles.map((article, index) => <article key={article.slug} className={article.visible ? "" : "is-hidden"}><div className="control-order"><button onClick={() => move(index,-1)} disabled={!session || index===0} aria-label={`Move ${article.title} up`}>↑</button><b>{String(index+1).padStart(2,"0")}</b><button onClick={() => move(index,1)} disabled={!session || index===articles.length-1} aria-label={`Move ${article.title} down`}>↓</button></div><div className="control-record"><span>{article.kind}{article.edition ? ` // Dispatch ${String(article.edition).padStart(2,"0")}` : ""}</span><h3>{article.title}</h3><p>{article.subject}</p></div><label className="control-date">Publication date<input type="date" value={article.published} disabled={!session} onChange={event => update(article.slug,{published:event.target.value})}/></label><label className="control-toggle"><input type="checkbox" checked={article.visible} disabled={!session || article.permanent} onChange={event => update(article.slug,{visible:event.target.checked})}/><span>{article.visible ? "Shown" : "Hidden"}</span></label></article>)}</div>

        <div className="control-tools">
          <section><p className="label">02 // AI prompt builder</p><h2>Draft with AI.<br/><em>Keep human approval.</em></h2><p>Copy a provider-neutral prompt into ChatGPT or Gemini. It produces a structured draft that this control panel can validate and preview.</p><button onClick={() => setShowPrompt(value => !value)}>{showPrompt ? "Hide prompt" : "Create article prompt"}</button>{showPrompt && <><textarea className="prompt-output" readOnly value={prompt}/><button onClick={() => navigator.clipboard.writeText(prompt).then(()=>setStatus("AI article prompt copied to the clipboard."))}>Copy prompt</button></>}</section>
          <section><p className="label">03 // Import draft</p><h2>Paste or upload<br/><em>the result.</em></h2><p>AI output remains a draft until you inspect it and deliberately publish the catalog.</p><textarea value={importText} onChange={event=>setImportText(event.target.value)} placeholder="Paste the complete Markdown response here…"/><div className="control-inline"><label className="file-button">Upload .md<input type="file" accept=".md,text/markdown,text/plain" onChange={event=>{const file=event.target.files?.[0]; if(file) file.text().then(value=>{setImportText(value); importDraft(value);});}}/></label><button onClick={()=>importDraft()} disabled={!importText.trim()}>Import and review</button><button onClick={()=>{setDraft({...blankDraft,published:nextDate(articles)});setShowCreator(true);}}>Write manually</button></div></section>
        </div>

        {showCreator && <section className="control-editor"><div className="control-heading"><div><p className="label">Draft editor</p><h2>Review before<br/><em>adding.</em></h2></div><button onClick={()=>setShowCreator(false)}>Close editor</button></div><div className="editor-fields"><label>Title<input value={draft.title} onChange={e=>setDraft({...draft,title:e.target.value})}/></label><label>Subtitle<input value={draft.subtitle} onChange={e=>setDraft({...draft,subtitle:e.target.value})}/></label><label>Subject<input value={draft.subject} onChange={e=>setDraft({...draft,subject:e.target.value})}/></label><label>Read time<input value={draft.readTime} onChange={e=>setDraft({...draft,readTime:e.target.value})}/></label><label>Publication date<input type="date" value={draft.published} onChange={e=>setDraft({...draft,published:e.target.value})}/></label></div><label className="editor-body">Article Markdown<textarea value={draft.markdown} onChange={e=>setDraft({...draft,markdown:e.target.value})}/></label><button className="dark-button" onClick={addDraft} disabled={!session}>Add article to publication queue →</button>{draft.markdown && <div className="control-preview"><p className="label">Article preview</p><h1>{draft.title || "Untitled draft"}</h1><p className="article-deck">{draft.subtitle}</p><article className="article-body"><MarkdownArticle markdown={preview.body}/>{preview.discussion && <section className="discussion"><p className="label">Class discussion</p><h2>Questions for Discussion</h2><MarkdownArticle markdown={preview.discussion}/></section>}</article></div>}</section>}
      </section>
    </main>
  );
}
