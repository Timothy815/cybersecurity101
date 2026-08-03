import articleSettings from "../../content/article-settings.json";

export type ArticleRecord = {
  slug: string;
  title: string;
  subtitle: string;
  published: string;
  publishedLabel: string;
  subject: string;
  kind: "Dispatch" | "Course document";
  readTime: string;
  href: string;
  pdfHref: string;
  deck: string;
  visible: boolean;
  order: number;
  edition?: number;
  permanent?: boolean;
  bodyMarkdown?: string;
};

type StoredArticle = Omit<ArticleRecord, "publishedLabel">;

function publicationLabel(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export const allArticles: ArticleRecord[] = (articleSettings as StoredArticle[])
  .map(article => ({ ...article, publishedLabel: publicationLabel(article.published) }))
  .sort((a, b) => a.order - b.order);

export const articles = allArticles.filter(article => article.visible);

export function getArticle(slug: string) {
  const article = allArticles.find(item => item.slug === slug);
  if (!article) throw new Error(`Unknown article: ${slug}`);
  return article;
}

export const latestArticles = articles.filter(article => !article.permanent).slice(0, 5);
export const permanentArticles = articles.filter(article => article.permanent);
