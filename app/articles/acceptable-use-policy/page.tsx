import type { Metadata } from "next";
import { ArticleShell } from "../../ui/article-shell";

export const metadata: Metadata = {
  title: "Acceptable Use Policy | Cybersecurity Classroom Hub",
  description: "Authorization, legal, ethical, and safety boundaries for cybersecurity coursework.",
};

const sections = [
  ["introduction", "Introduction"],
  ["educational-use", "Educational use only"],
  ["illegal-activities", "Prohibition of illegal activities"],
  ["legal-risks", "Legal risks and responsibilities"],
  ["consequences", "Consequences of violation"],
  ["acknowledgment", "Acknowledgment and signatures"],
] satisfies [string, string][];

export default function AcceptableUsePolicy() {
  return (
    <ArticleShell
      eyebrow="Course policy // August 3, 2026"
      title={<>Acceptable Use <em>Policy</em></>}
      deck="Kankakee Area Career Center Cyber Security and Penetration Testing Program"
      meta={["Policy & Ethics", "4 min read", "Permanent reference"]}
      sections={sections}
      pdfHref="/articles/pdfs/acceptable-use-policy.pdf"
    >
      <h2 id="introduction">Introduction</h2>
      <p className="article-lede">The Cyber Security and Penetration Testing course at Kankakee Area Career Center is designed to provide students with valuable skills in networking, cybersecurity, ethical hacking, and penetration testing.</p>
      <p>These skills are intended for educational purposes and to foster a deeper understanding of how to protect systems from unauthorized access and threats. This Acceptable Use Policy outlines the rules and responsibilities of students participating in this course and sets clear boundaries to prevent misuse of the skills learned.</p>

      <h2 id="educational-use">1. Educational Use Only</h2>
      <ul>
        <li>The skills and techniques taught in this course are to be used solely for educational purposes within the confines of the classroom or as part of authorized assignments.</li>
        <li>Any use of these skills outside the scope of class assignments and without explicit permission is strictly prohibited.</li>
      </ul>
      <p className="article-callout">Technical ability is not authorization.</p>

      <h2 id="illegal-activities">2. Prohibition of Illegal Activities</h2>
      <ul>
        <li>Students are expressly forbidden from using their skills to engage in any form of unauthorized access, hacking, or penetration testing on any systems, networks, or devices without explicit written permission from the system owner.</li>
        <li>This includes, but is not limited to, hacking into social media accounts, school systems, government networks, private databases, or any other unauthorized targets.</li>
      </ul>

      <h2 id="legal-risks">3. Legal Risks and Responsibilities</h2>
      <ul>
        <li>Students must be aware that unauthorized hacking and cyber activities are illegal and can lead to severe legal consequences.</li>
        <li>Violations of cybersecurity laws can result in criminal charges, substantial fines, and imprisonment. Students are reminded that they are of an age where they can be prosecuted as adults under state and federal laws.</li>
        <li>The Kankakee Area Career Center will not be held liable for any illegal activities conducted by students using skills learned in this course.</li>
      </ul>

      <h2 id="consequences">4. Consequences of Policy Violation</h2>
      <ul>
        <li>Any student found to be in violation of this policy will be subject to immediate removal from the program.</li>
        <li>Violations may also result in disciplinary action from the school and potential legal action by authorities.</li>
        <li>Parents/guardians and students will be held financially responsible for any damages or legal fees resulting from unauthorized activities.</li>
      </ul>

      <h2 id="acknowledgment">5. Acknowledgment of Responsibility</h2>
      <ul>
        <li>By signing this policy, students acknowledge their understanding of the legal implications and responsibilities associated with the skills they will learn.</li>
        <li>Parents/guardians also acknowledge understanding of these terms and agree to support the enforcement of this policy.</li>
      </ul>

      <section className="signature-section">
        <h3>Signatures</h3>
        <p>By signing below, we acknowledge that we have read, understood, and agree to abide by the terms of this Acceptable Use Policy. We understand the serious legal consequences of any misuse of the skills learned in the Cyber Security and Penetration Testing course. The student may be removed from the KACC Cybersecurity program for a policy violation if the KACC administration deems it appropriate.</p>
        <div className="signature-grid">
          <div><span>Student name (print)</span><i>________________________________</i></div><div><span>Student signature</span><i>________________________________</i></div><div><span>Date</span><i>____________</i></div>
          <div><span>Parent/guardian name (print)</span><i>________________________________</i></div><div><span>Parent/guardian signature</span><i>________________________________</i></div><div><span>Date</span><i>____________</i></div>
          <div><span>Instructor name (print)</span><i>________________________________</i></div><div><span>Instructor signature</span><i>________________________________</i></div><div><span>Date</span><i>____________</i></div>
          <div><span>Director name (print)</span><i>________________________________</i></div><div><span>Director signature</span><i>________________________________</i></div><div><span>Date</span><i>____________</i></div>
        </div>
      </section>
    </ArticleShell>
  );
}
