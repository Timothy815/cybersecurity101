import type { Metadata } from "next";
import { ArticleShell } from "../../ui/article-shell";

export const metadata: Metadata = {
  title: "Cybersecurity Course Syllabus | Cybersecurity Classroom Hub",
  description: "Course purpose, expectations, procedures, content, assessment, and pathways to success.",
};

const sections = [
  ["description", "Course description"],
  ["norms", "Classroom norms"],
  ["ethical-use", "Ethical use of technology"],
  ["procedures", "Classroom procedures"],
  ["professional", "Becoming a cybersecurity professional"],
  ["content", "Course content"],
  ["assessment", "Assessment and success"],
] satisfies [string, string][];

export default function CourseSyllabus() {
  return (
    <ArticleShell
      eyebrow="Course document // August 3, 2026"
      title={<>Cybersecurity Course <em>Syllabus</em></>}
      deck="Course purpose, expectations, procedures, content, and pathways to success."
      meta={["Course information", "8 min read", "Permanent reference"]}
      sections={sections}
      pdfHref="/articles/pdfs/cybersecurity-course-syllabus.pdf"
    >
      <h2 id="description">Course Description</h2>
      <p className="article-lede">Welcome to Cybersecurity, a hands-on course focused on protecting computer systems, networks, applications, and information.</p>
      <p>This year, our primary emphasis will be defensive cybersecurity, preparation for the CompTIA Security+ certification, and preparation for the AP Cybersecurity assessment. Students will learn how organizations identify risks, prevent attacks, monitor systems, respond to incidents, and recover from security events.</p>
      <p>Networking will be taught as a supporting foundation rather than as the main focus of the course. Students will learn the networking concepts needed for cybersecurity, including IP addressing, subnetting, ports, protocols, network devices, and traffic flow.</p>
      <p>Students will also learn introductory Python programming and use it to solve problems, process data, analyze information, and automate simple cybersecurity tasks.</p>

      <h2 id="norms">Classroom Norms</h2>
      <div className="policy-list">
        <p><strong>Respect for All</strong>{" "}Treat classmates, instructors, guests, equipment, and school property with respect. Listen when others speak, use appropriate language, and help create a classroom where everyone can learn.</p>
        <p><strong>Preparedness</strong>{" "}Come to class with the required materials, completed assignments, and a mindset ready for learning. Technical work often requires patience, persistence, and careful attention to detail.</p>
        <p><strong>Focus on Learning</strong>{" "}Cell phones should remain in lockers unless permission is given for an instructional purpose. Class time should remain focused on learning and professional development.</p>
        <p><strong>Engagement</strong>{" "}Participate actively in discussions, labs, investigations, group work, review activities, and hands-on practice. Technical skills develop through practice, not observation alone.</p>
        <p><strong>Integrity</strong>{" "}Complete your own work unless collaboration is specifically permitted. Sources, code, tools, and outside assistance must be acknowledged when required. Copying work, sharing test content, falsifying results, or submitting work created by another person or tool as your own is not permitted.</p>
      </div>

      <h2 id="ethical-use">Ethical Use of Technology</h2>
      <p>Cybersecurity knowledge carries serious responsibilities. Tools and techniques taught in this course may only be used in teacher-approved labs, virtual machines, accounts, and networks.</p>
      <p>Students may not scan, access, test, disrupt, modify, or investigate school systems, personal devices, websites, or outside networks without explicit authorization. Having the technical ability to perform an action does not provide permission to do so.</p>
      <p>Suspected security problems should be reported to the instructor rather than independently investigated. Serious safety, security, or ethical violations may result in immediate disciplinary action.</p>

      <h2 id="procedures">Classroom Procedures</h2>
      <h3>Assignments, Late Work, and Resubmissions</h3>
      <p><strong>Assignment Deadlines:</strong> Assignments will have clearly stated deadlines. Students who anticipate difficulty meeting a deadline should communicate with the instructor before the assignment is due.</p>
      <p><strong>Late Work:</strong> Late assignments may generally be submitted within two school days of the original due date. After that time, the assignment may no longer be accepted unless the student has an excused absence, documented circumstances, or a previously approved extension.</p>
      <p>Some labs, simulations, presentations, and group activities depend on specialized equipment or class participation and may not be available for late completion. Students are responsible for confirming that digital submissions have uploaded correctly and can be opened.</p>
      <p><strong>Retakes and Resubmissions:</strong> Students may be permitted to retake an assessment or resubmit an assignment to demonstrate improved understanding. Retakes and resubmissions must generally be completed within two school days after the graded work is returned.</p>
      <p>Before another attempt, students may be required to complete corrections, additional practice, tutoring, or a reflection demonstrating that further learning has occurred. The purpose of a retake or resubmission is to show improved understanding, not simply to repeat the original attempt.</p>
      <p><strong>Attendance:</strong> Success in this course depends heavily on attendance and participation. Students are expected to maintain at least 85% attendance. Many activities require specialized equipment, software, demonstrations, teamwork, or guided practice that may be difficult to recreate outside class. Students who are absent are responsible for checking the class platform, obtaining missed materials, and arranging a plan for eligible make-up work.</p>

      <h3>Employability Points</h3>
      <p>This course develops both technical skills and the professional habits expected in cybersecurity and information technology careers.</p>
      <p>Students begin each class period with 10 employability points. These points reflect punctuality, preparation, participation, teamwork, communication, focus, and responsible technology use.</p>
      <ul>
        <li>First infraction: Warning</li>
        <li>Second infraction: Loss of 5 points</li>
        <li>Third infraction: Loss of the remaining 5 points</li>
        <li>Continued infractions: Parent contact, office referral, removal from an activity, or additional consequences</li>
      </ul>
      <p>Serious safety, security, or ethical violations may result in immediate consequences.</p>

      <h2 id="professional">Becoming a Cybersecurity Professional</h2>
      <p>Cybersecurity is more than memorizing vocabulary or learning how to use security tools. It requires disciplined problem-solving, sound judgment, ethical decision-making, and the ability to work with incomplete information.</p>
      <p>Throughout the course, students will learn to identify problems, gather evidence, separate facts from assumptions, test possible solutions, evaluate results, document their work, and communicate clear recommendations.</p>
      <p>Students should expect to encounter problems that do not have an obvious first step or a single perfect answer. Productive struggle, troubleshooting, revision, and persistence are important parts of the learning process.</p>

      <h2 id="content">Course Content</h2>
      <h3>Defensive Cybersecurity</h3>
      <p>Students will study major cybersecurity concepts, including:</p>
      <ul className="article-columns">
        <li>Security principles and controls</li><li>Threats, vulnerabilities, malware, and social engineering</li><li>Identity and access management</li><li>System and network hardening</li><li>Firewalls, segmentation, and secure architecture</li><li>Encryption and data protection</li><li>Vulnerability management</li><li>Security monitoring and log analysis</li><li>Incident response</li><li>Risk management</li><li>Business continuity and disaster recovery</li><li>Security policies, privacy, law, and ethics</li>
      </ul>
      <p>Offensive techniques may be examined in controlled environments so students can better understand how attacks work and how to prevent, detect, and respond to them.</p>

      <h3>Networking Foundations</h3>
      <p>Students will learn the networking concepts necessary to understand cybersecurity, including IP addressing, subnetting, ports and protocols, TCP and UDP, DNS, DHCP, network devices, routing and switching concepts, segmentation, wireless security, and network traffic analysis.</p>
      <p>Networking is not the primary subject of this course, but students must understand how systems communicate in order to secure them.</p>

      <h3>Python Programming</h3>
      <p>Students will learn introductory Python concepts such as variables, input and output, conditional statements, loops, functions, strings, lists, dictionaries, files, and basic error handling.</p>
      <p>Programming activities may include processing logs, searching for patterns, validating data, working with IP addresses, and automating simple cybersecurity tasks.</p>

      <h3>Security+ and AP Preparation</h3>
      <p>Preparation for the Security+ certification and AP Cybersecurity assessment will be integrated throughout the course.</p>
      <p>Students may complete certification-style questions, AP-style written responses, scenario analyses, hands-on labs, performance-based tasks, practice tests, technical documentation, vocabulary reviews, and timed activities.</p>
      <p>Students should expect to review material regularly and complete some independent study outside of major assessments.</p>

      <h2 id="assessment">Assessment and Success</h2>
      <p>Student learning may be assessed through:</p>
      <ul>
        <li>Hands-on labs and investigations</li><li>Quizzes and tests</li><li>Security+ and AP-style questions</li><li>Programming assignments</li><li>Projects and presentations</li><li>Written explanations and scenario analyses</li><li>Technical documentation</li><li>Practice certification exams</li><li>Employability performance</li>
      </ul>
      <p>Grades will reflect both knowledge and application. Students must be able not only to recognize terms, but also to analyze evidence, solve problems, explain decisions, and perform technical tasks.</p>

      <h3>Expectations for Success</h3>
      <p>Students are most likely to succeed when they attend consistently, participate actively, review material regularly, ask questions, read directions carefully, document their work, accept feedback, practice exam-style questions, and seek help before falling significantly behind.</p>
      <p>Cybersecurity combines networking, operating systems, programming, communication, risk analysis, and human behavior. Students are not expected to know everything immediately, but they are expected to make a consistent and honest effort to improve.</p>

      <h3>Looking Ahead</h3>
      <p>By the end of this course, students should be better prepared to pursue the CompTIA Security+ certification, complete the AP Cybersecurity assessment, continue into advanced technical study, and make responsible decisions when working with technology.</p>
      <p className="article-callout">The goal of this course is not simply to learn a collection of tools. It is to develop the knowledge, judgment, ethics, and problem-solving skills needed to protect digital systems and information.</p>
    </ArticleShell>
  );
}
