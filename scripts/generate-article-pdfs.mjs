#!/usr/bin/env node

import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";

const root = process.cwd();
const temporaryDirectory = join(root, ".sites-runtime", "article-pdfs");
const articleSettings = JSON.parse(readFileSync(join(root, "content", "article-settings.json"), "utf8"));
const documents = articleSettings.filter(article => article.visible).map(article => ({
  route: article.href.replace(/^\//, ""),
  filename: article.pdfHref.split("/").at(-1),
  title: article.title,
  subtitle: article.deck,
  date: new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${article.published}T00:00:00Z`)),
}));

mkdirSync(temporaryDirectory, { recursive: true });
rmSync(join(root, "out", "articles", "pdfs"), { recursive: true, force: true });

for (const document of documents) {
  console.log(`Generating ${document.filename} from ${document.route}`);
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
    "--output", publicPdfPath,
  ], { encoding: "utf8" });

  if (result.status !== 0) {
    const details = (result.stderr || result.stdout || "Pandoc exited without diagnostic output").trim();
    const annotation = details.replaceAll("%", "%25").replaceAll("\r", "%0D").replaceAll("\n", "%0A");
    console.error(`::error title=PDF generation failed for ${document.title}::${annotation}`);
    throw new Error(`PDF generation failed for ${document.title}:\n${details}`);
  }
  copyFileSync(publicPdfPath, outputPdfPath);
  console.log(`Generated ${document.filename}`);
}
