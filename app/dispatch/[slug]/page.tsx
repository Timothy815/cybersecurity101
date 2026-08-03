import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allArticles } from "../../lib/articles";
import { ArticleShell } from "../../ui/article-shell";
import { MarkdownArticle, markdownSections, splitDiscussion } from "../../ui/markdown-article";

export const dynamicParams = false;

export function generateStaticParams() {
  const generated = allArticles
    .filter(article => article.kind === "Dispatch" && article.visible && article.bodyMarkdown)
    .map(article => ({ slug: article.slug }));
  return generated.length ? generated : [{ slug: "_control-template" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = allArticles.find(item => item.slug === slug && item.visible && item.bodyMarkdown);
  return article ? {
    title: `${article.title} | Cybersecurity Classroom Hub`,
    description: article.subtitle,
  } : {};
}

export default async function GeneratedDispatch({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = allArticles.find(item => item.slug === slug && item.visible && item.bodyMarkdown);
  if (!article?.bodyMarkdown) notFound();
  const { body, discussion } = splitDiscussion(article.bodyMarkdown);
  const sections = markdownSections(article.bodyMarkdown);

  return (
    <ArticleShell
      eyebrow={`Dispatch ${String(article.edition).padStart(2, "0")} // ${article.publishedLabel}`}
      title={<>{article.title}</>}
      deck={article.deck}
      meta={[`Dispatch ${String(article.edition).padStart(2, "0")}`, article.readTime, article.subject]}
      sections={sections}
      pdfHref={article.pdfHref}
    >
      <MarkdownArticle markdown={body} />
      {discussion && (
        <section className="discussion" id="questions-for-discussion">
          <p className="label">Class discussion</p>
          <h2>Questions for Discussion</h2>
          <MarkdownArticle markdown={discussion} />
        </section>
      )}
    </ArticleShell>
  );
}
