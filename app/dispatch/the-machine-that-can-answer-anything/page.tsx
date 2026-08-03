import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleShell } from "../../ui/article-shell";
import { getArticle } from "../../lib/articles";

const article = getArticle("the-machine-that-can-answer-anything");

export const metadata: Metadata = {
  title: "The Machine That Can Answer Anything | Cybersecurity Classroom Hub",
  description:
    "Responsibility, artificial intelligence, and the future cyber defender.",
};

const sections = [
  ["finished-answer", "The temptation of the finished answer"],
  ["confidence-problem", "The confidence problem"],
  ["prompt-door", "The prompt is also a door"],
  ["honesty", "Honesty in the age of invisible assistance"],
  ["person-behind-tool", "The person behind the tool"],
  ["future-defender", "What kind of defender will you become?"],
  ["questions", "Questions worth arguing about"],
 ] satisfies [string, string][];

export default function SecondDispatch() {
  if (!article.visible) notFound();
  return (
    <ArticleShell
      eyebrow={`Dispatch ${String(article.edition).padStart(2, "0")} // ${article.publishedLabel}`}
      title={<>The Machine That Can <em>Answer Anything</em></>}
      deck={article.deck}
      meta={[`Dispatch ${String(article.edition).padStart(2, "0")}`, article.readTime, article.subject]}
      sections={sections}
      pdfHref={article.pdfHref}
    >
          <p className="article-lede">Imagine that you are working in a security operations center late at night. A warning flashes across the screen. An employee’s account has downloaded thousands of files at an unusual hour.</p>
          <p>You ask an artificial intelligence system to investigate.</p>
          <p>Within seconds, it produces an answer:</p>
          <blockquote>The account has likely been compromised. Disable it immediately.</blockquote>
          <p>The recommendation is clear, confident, and wrapped in professional language. The AI points to unusual behavior, possible data theft, and the danger of waiting too long. You follow its advice.</p>
          <p>Minutes later, you discover that the employee was a system administrator performing an approved backup. Disabling the account interrupted the process and corrupted part of the organization’s recovery system.</p>
          <p>The AI made a mistake.</p>
          <p>But who is responsible?</p>
          <p>The software cannot apologize to the administrator. It cannot explain itself to your employer. It cannot accept disciplinary action or repair the damaged system. It generated the recommendation, but a human being made the decision to trust it.</p>
          <p>That difference matters.</p>
          <p>Artificial intelligence is rapidly becoming part of cybersecurity. It can examine enormous collections of logs, identify suspicious patterns, summarize threat reports, generate code, explain technical errors, and suggest ways to respond to an attack. It can perform in seconds work that might take a person hours.</p>
          <p>The same technology can also produce convincing phishing messages, locate weaknesses, automate deception, and help attackers operate at greater speed. AI is both shield and sword, microscope and smoke machine. It can reveal what humans overlook, but it can also make falsehood look polished and believable.</p>
          <p>The central challenge is no longer whether students should use AI. You almost certainly will. The more important question is what kind of person you become while using it.</p>

          <h2 id="finished-answer">The Temptation of the Finished Answer</h2>
          <p>Students have always looked for shortcuts. Search engines made it easier to find information. Online videos made it easier to learn procedures. Calculators made arithmetic faster. None of those tools automatically destroyed learning.</p>
          <p>AI is different because it does not merely locate an answer. It can produce one.</p>
          <p>It can write the paragraph, create the script, explain the vulnerability, design the network, and generate the commands. It can turn a blank screen into something that looks complete.</p>
          <p>That can be helpful. It can also be dangerous.</p>
          <p>Suppose you ask AI to write a Python script that searches a log file for failed login attempts. The script runs. It produces a clean report. It even includes comments explaining each section.</p>
          <p>You submit it.</p>
          <p>Did you complete the assignment?</p>
          <p>That depends on what the assignment was meant to measure.</p>
          <p>If the purpose was simply to obtain a report, perhaps the script succeeded. But if the purpose was to learn loops, conditions, file handling, and pattern recognition, the finished output may conceal the fact that the learning never happened.</p>
          <p>The screen shows a working program. The student’s mind may still show an empty file.</p>
          <p>There is a difference between using AI to overcome an obstacle and using it to avoid the obstacle entirely. Asking AI to explain an error message can help you understand a problem. Asking it to replace the entire problem-solving process can leave you with an answer you cannot defend.</p>
          <p>This matters in every subject, but it matters especially in cybersecurity.</p>
          <p>A student who submits an essay they do not understand may earn a grade they did not deserve. A technician who runs a command they do not understand may erase data, weaken a firewall, expose a password, or disconnect an essential system.</p>
          <p className="article-callout">In cybersecurity, ignorance can execute.</p>
          <p>That is why one of the most important questions in this classroom will be simple:</p>
          <blockquote>Can you explain what you submitted?</blockquote>
          <p>Not vaguely. Not after reopening the AI conversation. Can you explain why the solution works, what assumptions it makes, what risks it introduces, and what might happen if part of it fails?</p>
          <p>A person who can generate commands is not necessarily a system administrator. A person who can generate code is not necessarily a programmer. A person who can generate an answer is not necessarily educated.</p>
          <p>The goal is not merely to produce work that looks intelligent. The goal is to become intelligent enough to judge the work.</p>

          <h2 id="confidence-problem">The Confidence Problem</h2>
          <p>AI does not need to know that something is true in order to say it convincingly.</p>
          <p>It can invent a quotation, cite a source that does not exist, misunderstand the question, recommend an outdated command, or create code containing a subtle vulnerability. It may sound just as certain when it is wrong as when it is right.</p>
          <p>That is one of its strangest qualities. Human uncertainty often announces itself. We hesitate. We use phrases such as “I think” or “I am not sure.” AI can present a weak answer with excellent grammar, perfect headings, and the calm authority of an instruction manual.</p>
          <p className="article-callout">Fluency is not accuracy.</p>
          <p>Imagine asking an AI assistant which software library you should install for a security project. It recommends a package with a professional-sounding name. The package seems reasonable, so you install it.</p>
          <p>But the package did not exist when the AI suggested it. The name was invented.</p>
          <p>Now imagine that an attacker notices AI systems repeatedly recommending this imaginary package. The attacker registers the name and uploads malicious code under it. The next person who follows the AI’s advice installs the attacker’s software.</p>
          <p>The mistake began as a hallucination. It ended as a supply-chain attack.</p>
          <p>That is why cybersecurity professionals cannot treat AI output as a verdict. It is better treated as a lead, a draft, or a hypothesis.</p>
          <p>An AI-generated explanation of a security alert may be useful. It may also be incomplete. A recommended command may solve one problem while creating another. A generated script may work during a simple test and fail when it encounters unexpected data.</p>
          <p>The responsible user asks questions that the irresponsible user skips.</p>
          <p>Where did this information come from? Does the source exist? What permissions does this command require? What files will it change? Can the action be reversed? Is the suggested package legitimate? What data is being sent? What other explanation might fit the evidence?</p>
          <p>This is not distrust for its own sake. It is the same habit used by good scientists, journalists, programmers, and investigators.</p>
          <p>Trust should be earned by evidence.</p>

          <h2 id="prompt-door">The Prompt Is Also a Door</h2>
          <p>There is another risk that is easy to overlook. Every time you type information into an AI system, you may be sharing data with an outside service.</p>
          <p className="article-callout">A prompt is not a private thought. It is a transmission.</p>
          <p>Suppose you are troubleshooting a school server. You copy the system logs into a public AI assistant and ask it to identify the problem. Your intention is reasonable. You are trying to fix something.</p>
          <p>But what did you just share?</p>
          <p>The logs may contain usernames, internal addresses, software versions, file locations, authentication failures, or information about how the network is organized. Even if no password appears, the collection of details may still be valuable to an attacker.</p>
          <p>Good intentions do not automatically make an action safe.</p>
          <p>A future employer may give you access to customer records, source code, internal reports, security scans, or confidential communications. Uploading that information into an unapproved AI system could expose the organization even if the AI gives you an excellent answer.</p>
          <p>This is sometimes called shadow AI: the use of AI tools that an organization has not approved or cannot monitor. The danger is not that every public AI tool is secretly malicious. The danger is that you may not know where the information goes, how long it is stored, or how it may be used.</p>
          <p>Cybersecurity students should recognize the irony. A person may use AI to solve a security problem while creating a new security problem through the prompt itself.</p>
          <p>Responsible AI use therefore begins before the answer appears. It begins with deciding what information should never be entered.</p>
          <p>Passwords, private keys, student records, personal information, private network diagrams, vulnerability reports, confidential messages, unreleased code, and real security data do not belong in an unapproved system.</p>
          <p>Sometimes the safest prompt is the one you do not send.</p>

          <h2 id="honesty">Honesty in the Age of Invisible Assistance</h2>
          <p>There is a temptation to think that AI use only becomes dishonest when someone copies an entire assignment.</p>
          <p>The truth is less convenient.</p>
          <p>AI can contribute in small ways. It can rewrite a paragraph, suggest code, organize an argument, correct grammar, generate examples, or explain a difficult idea. These uses may be entirely appropriate.</p>
          <p>The ethical question is not whether AI touched the work. The question is whether the final submission honestly represents the student’s knowledge and effort.</p>
          <p>Consider two students.</p>
          <p>The first writes a program, encounters an error, and asks AI to explain what the error means. The student then corrects the program and documents the change.</p>
          <p>The second asks AI to generate the entire program, studies it until they can offer a rough explanation, and submits it without mentioning the AI.</p>
          <p>Both students may understand something by the end. But they did not complete the same intellectual task.</p>
          <p>The second student may argue, “I learned from it afterward.”</p>
          <p>Perhaps. But understanding someone else’s solution is not identical to creating your own. Watching a musician play a song can teach you something about music. It does not mean you performed the concert.</p>
          <p>Transparency matters because trust matters.</p>
          <p>In professional cybersecurity, analysts document what tools they used, what evidence they examined, what assumptions they made, and why they reached a conclusion. Their work must be reviewed by others. Decisions should be traceable.</p>
          <p>AI should not become an invisible ghostwriter hiding inside technical work.</p>
          <p>When AI contributes meaningfully, acknowledge it. Explain what it helped with, what you changed, and what you verified. That disclosure is not an admission of weakness. It is evidence that you understand professional accountability.</p>
          <p>The strongest cybersecurity professionals are not those who pretend to know everything. They are those who know the limits of their knowledge and make those limits visible.</p>

          <h2 id="person-behind-tool">The Person Behind the Tool</h2>
          <p>The ACM Code of Ethics asks computing professionals to avoid harm, be honest, respect privacy, maintain competence, and carefully evaluate the systems they build.</p>
          <p>AI does not remove these responsibilities. It increases them.</p>
          <p>If AI can produce more code, more quickly, then more code must be reviewed. If it can generate more persuasive messages, then people must become more alert to deception. If it can make decisions at machine speed, then humans must decide which decisions should never be fully automated.</p>
          <p className="article-callout">Speed is not the same as wisdom.</p>
          <p>A security system might detect unusual behavior faster than any human analyst. But unusual does not always mean malicious. A student may log in from another location. An employee may work at an unexpected hour. A user with a disability may interact with a system in a way that differs from the pattern the AI considers normal.</p>
          <p>A machine can identify a deviation. It cannot automatically understand the life behind it.</p>
          <p>This is where human judgment becomes essential. Not because humans are perfect, but because responsibility must belong somewhere.</p>
          <p>You may someday be asked to decide whether an account should be disabled, whether a system should be disconnected, whether a vulnerability should be reported, or whether an automated tool has treated someone unfairly.</p>
          <p>The AI may give you a recommendation.</p>
          <p>It will not carry the consequences.</p>

          <h2 id="future-defender">What Kind of Defender Will You Become?</h2>
          <p>AI will change the work of programmers, analysts, engineers, teachers, and students. Some tasks that once required hours will take minutes. Some entry-level skills may become less valuable. New skills will take their place.</p>
          <p>One of those skills will be knowing how to work with machines that sound intelligent without surrendering your own judgment.</p>
          <p>Another will be knowing when not to use them.</p>
          <p>The future will not belong only to people who can produce answers quickly. Machines are already very good at that. It will belong to people who can recognize weak evidence, ask better questions, protect sensitive information, explain their reasoning, and accept responsibility when things go wrong.</p>
          <p>AI can help you learn faster. It can also help you avoid learning.</p>
          <p>It can make you more capable. It can also make you dependent.</p>
          <p>It can reveal mistakes. It can also hide them beneath polished language.</p>
          <p>The tool does not decide which path you take.</p>
          <p>You do.</p>
          <p>The most valuable asset you bring into cybersecurity will not be a certification, a programming language, or access to the newest AI model. It will be your judgment: the ability to stop, question, verify, and think when the machine has already produced an answer.</p>
          <p>AI may help build the shield.</p>
          <p>It cannot decide what is worth protecting.</p>
          <p>That responsibility remains human.</p>

          <section className="discussion" id="questions">
            <p className="label">Class discussion</p>
            <h2>Questions Worth Arguing About</h2>
            <ol>
              <li>If a student uses AI to complete an assignment and later learns how the answer works, is submitting it still dishonest?</li>
              <li>Should students receive full credit for code they can explain but did not personally write?</li>
              <li>When an AI system and a human analyst disagree, who should have the final authority?</li>
              <li>Is using an unapproved AI tool to solve an urgent security problem ever justified?</li>
              <li>If AI makes an incorrect recommendation, how should responsibility be divided among the user, the developer, and the organization that adopted it?</li>
            </ol>
          </section>

    </ArticleShell>
  );
}
