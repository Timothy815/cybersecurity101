#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import ts from "typescript";

const root = process.cwd();
const catalog = JSON.parse(readFileSync(join(root, "content", "article-settings.json"), "utf8"));

function searchableSource(article) {
  if (article.bodyMarkdown) return article.bodyMarkdown;

  const sourcePath = join(root, "app", article.href.replace(/^\//, ""), "page.tsx");
  if (!existsSync(sourcePath)) return "";

  const sourceText = readFileSync(sourcePath, "utf8");
  const source = ts.createSourceFile(sourcePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const text = [];

  function visit(node) {
    if (ts.isJsxText(node)) text.push(node.getText(source));
    if (ts.isJsxExpression(node) && node.expression && ts.isStringLiteralLike(node.expression)) text.push(node.expression.text);
    if (ts.isArrayLiteralExpression(node)) {
      for (const element of node.elements) if (ts.isStringLiteralLike(element)) text.push(element.text);
    }
    ts.forEachChild(node, visit);
  }

  visit(source);
  return text.join(" ");
}

const index = Object.fromEntries(catalog.map(article => [
  article.slug,
  [
    article.title,
    article.subtitle,
    article.deck,
    article.subject,
    article.kind,
    article.published,
    searchableSource(article),
  ].filter(Boolean).join(" ").replaceAll(/\s+/g, " ").trim(),
]));

writeFileSync(join(root, "content", "article-search-index.json"), `${JSON.stringify(index, null, 2)}\n`);
console.log(`Indexed ${Object.keys(index).length} articles.`);
