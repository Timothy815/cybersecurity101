import type { Metadata } from "next";
import { ArticleArchive } from "./article-archive";

export const metadata: Metadata = {
  title: "Article Archive | Cybersecurity Classroom Hub",
  description: "Browse classroom dispatches and permanent course documents by publication date or subject.",
};

export default function ArticlesPage() {
  return <ArticleArchive />;
}
