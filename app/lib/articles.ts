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
  permanent?: boolean;
};

export const articles: ArticleRecord[] = [
  {
    slug: "to-learn-it-teach-it",
    title: "To Learn It, Teach It",
    subtitle: "Using explanation, retrieval, and the Feynman Technique to build real understanding.",
    published: "2026-08-16",
    publishedLabel: "August 16, 2026",
    subject: "Learning Strategies",
    kind: "Dispatch",
    readTime: "8 min read",
    href: "/dispatch/to-learn-it-teach-it",
    pdfHref: "/articles/pdfs/to-learn-it-teach-it.pdf",
  },
  {
    slug: "the-human-side-of-cybersecurity",
    title: "The Human Side of Cybersecurity",
    subtitle: "An introduction to social engineering, pretexting, trust, and verification.",
    published: "2026-08-15",
    publishedLabel: "August 15, 2026",
    subject: "Social Engineering",
    kind: "Dispatch",
    readTime: "9 min read",
    href: "/dispatch/the-human-side-of-cybersecurity",
    pdfHref: "/articles/pdfs/the-human-side-of-cybersecurity.pdf",
  },
  {
    slug: "the-machine-that-can-answer-anything",
    title: "The Machine That Can Answer Anything",
    subtitle: "Responsibility, artificial intelligence, and the future cyber defender.",
    published: "2026-08-14",
    publishedLabel: "August 14, 2026",
    subject: "AI & Ethics",
    kind: "Dispatch",
    readTime: "14 min read",
    href: "/dispatch/the-machine-that-can-answer-anything",
    pdfHref: "/articles/pdfs/the-machine-that-can-answer-anything.pdf",
  },
  {
    slug: "the-question-is-the-work",
    title: "The Question Is the Work",
    subtitle: "Curiosity, academic honesty, and learning beside artificial intelligence.",
    published: "2026-08-13",
    publishedLabel: "August 13, 2026",
    subject: "AI & Learning",
    kind: "Dispatch",
    readTime: "18 min read",
    href: "/dispatch/the-question-is-the-work",
    pdfHref: "/articles/pdfs/the-question-is-the-work.pdf",
  },
  {
    slug: "course-syllabus",
    title: "Cybersecurity Course Syllabus",
    subtitle: "Course purpose, expectations, procedures, content, and pathways to success.",
    published: "2026-08-03",
    publishedLabel: "August 3, 2026",
    subject: "Course Information",
    kind: "Course document",
    readTime: "8 min read",
    href: "/articles/course-syllabus",
    pdfHref: "/articles/pdfs/cybersecurity-course-syllabus.pdf",
    permanent: true,
  },
  {
    slug: "acceptable-use-policy",
    title: "Acceptable Use Policy",
    subtitle: "The authorization, legal, ethical, and safety boundaries for cybersecurity work.",
    published: "2026-08-03",
    publishedLabel: "August 3, 2026",
    subject: "Policy & Ethics",
    kind: "Course document",
    readTime: "4 min read",
    href: "/articles/acceptable-use-policy",
    pdfHref: "/articles/pdfs/acceptable-use-policy.pdf",
    permanent: true,
  },
];

export const latestArticles = articles.filter(article => !article.permanent).slice(0, 5);
export const permanentArticles = articles.filter(article => article.permanent);
