import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Markdown Help | Cybersecurity Classroom Hub",
  description: "Formatting reference for classroom articles.",
  robots: { index: false, follow: false },
};

function Logo() { return <span className="logo" aria-hidden="true">CS</span>; }

const publishedRoot = "https://timothy815.github.io/cybersecurity101";

export default function MarkdownHelpPage() {
  return (
    <main className="markdown-guide">
      <header>
        <Link className="brand" href="/control"><Logo/><span><strong>CYBER / GUIDE</strong><small>Article formatting reference</small></span></Link>
        <nav><Link href="/control">Back to control</Link><Link href="/articles">Article archive</Link></nav>
        <Link className="portal" href="/control">Open editor →</Link>
      </header>

      <section className="guide-hero">
        <p className="label">Control reference // Markdown</p>
        <h1>Write clearly.<br/><em>Format predictably.</em></h1>
        <p>Markdown adds structure, links, and images using ordinary text. The editor preview shows how the published article will look before you stage or publish it.</p>
      </section>

      <div className="guide-shell">
        <section className="guide-section">
          <p className="label">01 // Article metadata</p>
          <h2>Metadata belongs in the editor fields.</h2>
          <p>When revising an existing article, use the separate Title, Subtitle, Subject, Read time, and Publication date fields above the Markdown box. Do not repeat that information inside the article body.</p>
          <p>When importing a new <code>.md</code> file or AI response, place this front matter at the very beginning. The importer removes it from the body and transfers it into the appropriate fields.</p>
          <pre className="guide-example">{`---
title: Confidentiality, Integrity and Availability
subtitle: An Introduction to Security Frameworks
subject: CIA Triad and Security Frameworks
readTime: 8 min read
published: 2026-08-17
---`}</pre>
        </section>

        <section className="guide-section">
          <p className="label">02 // Basic formatting</p>
          <h2>Structure the article.</h2>
          <table className="guide-table">
            <thead><tr><th>Purpose</th><th>Markdown</th></tr></thead>
            <tbody>
              <tr><td>Section heading</td><td><code>## Section title</code></td></tr>
              <tr><td>Smaller heading</td><td><code>### Smaller heading</code></td></tr>
              <tr><td>Bold text</td><td><code>**important words**</code></td></tr>
              <tr><td>Italic text</td><td><code>*book title or emphasis*</code></td></tr>
              <tr><td>Quotation</td><td><code>&gt; Quoted or emphasized passage</code></td></tr>
              <tr><td>Bullet list</td><td><code>- First item</code></td></tr>
              <tr><td>Numbered list</td><td><code>1. First item</code></td></tr>
            </tbody>
          </table>
          <p className="guide-note">Leave a blank line between paragraphs, headings, lists, images, and quotations. This makes the source easier to edit and prevents formatting surprises.</p>
        </section>

        <section className="guide-section">
          <p className="label">03 // Links and slide decks</p>
          <h2>Link to an exact public URL.</h2>
          <p>A normal Markdown link contains visible text in square brackets and the destination in parentheses.</p>
          <pre className="guide-example">{`[Read the NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)`}</pre>
          <p>PDF slide decks work the same way. The address must point to the PDF itself—not merely the folder that contains it.</p>
          <pre className="guide-example">{`[View the slide deck](${publishedRoot}/articles/slides/confidentiality-integrity-and-availability-slides.pdf)`}</pre>
          <p className="guide-note">Use the complete <code>https://</code> address. Links open in a new tab. Markdown can reference an uploaded file, but it cannot upload the file for you.</p>
        </section>

        <section className="guide-section">
          <p className="label">04 // Images</p>
          <h2>Provide a useful description.</h2>
          <p>Add an exclamation mark before ordinary link syntax. The text inside the brackets becomes alternative text for screen readers and appears if the image cannot load.</p>
          <pre className="guide-example">{`![Diagram showing confidentiality, integrity, and availability](${publishedRoot}/articles/images/cia-triad-diagram.jpg)`}</pre>
          <ul>
            <li>Use a complete HTTP or HTTPS image address.</li>
            <li>Point to the exact image file, such as <code>.jpg</code>, <code>.png</code>, <code>.webp</code>, or <code>.gif</code>.</li>
            <li>Describe the information conveyed by the image rather than writing “image” or repeating the filename.</li>
            <li>Upload only images you created, are authorized to use, or that have appropriate licensing.</li>
          </ul>
          <p className="guide-note">There is currently no image uploader in <code>/control</code>. Place a file in the project’s public article-image directory and publish it through the normal repository workflow, or use a stable external image URL.</p>
        </section>

        <section className="guide-section">
          <p className="label">05 // Discussion questions</p>
          <h2>Keep every question separate.</h2>
          <p>Every editor-created article must end with the exact section heading below. Each question needs its own numbered line and must end with a question mark.</p>
          <pre className="guide-example">{`## Questions for Discussion

1. Which part of the CIA triad would matter most during a hospital outage?

2. When might confidentiality and availability conflict?

3. What evidence would help an organization decide between them?`}</pre>
        </section>

        <section className="guide-section">
          <p className="label">06 // Safety boundaries</p>
          <h2>What the renderer will reject.</h2>
          <p>For student safety and site security, article Markdown cannot run scripts or embed arbitrary webpages. Script, iframe, object, and embed elements are rejected. Raw HTML is not needed for supported formatting.</p>
          <p className="guide-note">Preview the complete article, test every link, confirm image alternative text, and then select <strong>Save article changes</strong>. Nothing becomes public until you separately select <strong>Publish changes</strong>.</p>
        </section>
      </div>
    </main>
  );
}
