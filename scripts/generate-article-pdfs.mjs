#!/usr/bin/env node

import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";

const root = process.cwd();
const temporaryDirectory = join(root, ".sites-runtime", "article-pdfs");

const documents = [
  {
    route: "dispatch/the-human-side-of-cybersecurity",
    filename: "the-human-side-of-cybersecurity.pdf",
    title: "The Human Side of Cybersecurity",
    subtitle: "An Introduction to Social Engineering",
    date: "August 3, 2026",
  },
  {
    route: "dispatch/the-question-is-the-work",
    filename: "the-question-is-the-work.pdf",
    title: "The Question Is the Work",
    subtitle: "Curiosity, Academic Honesty, and Learning Beside Artificial Intelligence",
    date: "August 2, 2026",
  },
  {
    route: "dispatch/the-machine-that-can-answer-anything",
    filename: "the-machine-that-can-answer-anything.pdf",
    title: "The Machine That Can Answer Anything",
    subtitle: "Responsibility, Artificial Intelligence, and the Future Cyber Defender",
    date: "August 3, 2026",
  },
  {
    route: "articles/course-syllabus",
    filename: "cybersecurity-course-syllabus.pdf",
    title: "Cybersecurity Course Syllabus",
    subtitle: "Course purpose, expectations, procedures, content, and pathways to success",
    date: "August 3, 2026",
  },
  {
    route: "articles/acceptable-use-policy",
    filename: "acceptable-use-policy.pdf",
    title: "Acceptable Use Policy",
    subtitle: "Kankakee Area Career Center Cyber Security and Penetration Testing Program",
    date: "August 3, 2026",
  },
];

mkdirSync(temporaryDirectory, { recursive: true });

for (const document of documents) {
  const renderedPath = join(root, "out", document.route, "index.html");
  const rendered = readFileSync(renderedPath, "utf8");
  const match = rendered.match(/<article class="article-body">([\s\S]*?)<div class="article-end screen-only">/);
  if (!match) throw new Error(`Could not locate printable article body in ${renderedPath}`);

  const cleanBody = match[1].replaceAll("<!-- -->", "");
  const htmlPath = join(temporaryDirectory, `${document.filename}.html`);
  const publicPdfPath = join(root, "public", "articles", "pdfs", document.filename);
  const outputPdfPath = join(root, "out", "articles", "pdfs", document.filename);
  mkdirSync(dirname(publicPdfPath), { recursive: true });
  mkdirSync(dirname(outputPdfPath), { recursive: true });
  writeFileSync(htmlPath, `<!doctype html><html><head><meta charset="utf-8"></head><body><article>${cleanBody}</article></body></html>`);

  const result = spawnSync("pandoc", [
    htmlPath,
    "--from=html",
    "--pdf-engine=xelatex",
    "--metadata", `title=${document.title}`,
    "--metadata", `subtitle=${document.subtitle}`,
    "--metadata", `date=${document.date}`,
    "--variable", "papersize=letter",
    "--variable", "geometry:margin=0.82in",
    "--variable", "fontsize=11pt",
    "--variable", "mainfont=Helvetica Neue",
    "--variable", "monofont=Menlo",
    "--output", publicPdfPath,
  ], { encoding: "utf8" });

  if (result.status !== 0) {
    throw new Error(`PDF generation failed for ${document.title}:\n${result.stderr || result.stdout}`);
  }
  copyFileSync(publicPdfPath, outputPdfPath);
  console.log(`Generated ${document.filename}`);
}
