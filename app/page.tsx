"use client";
import { useMemo, useState } from "react";

const resources = [
  ["Security+ Study Path", "Objectives, checkpoints, and certification practice by domain.", "Certification"],
  ["Cybersecurity Lab Guide", "Lab expectations, evidence standards, troubleshooting, and safety.", "Lab"],
  ["Networking Quick Reference", "IP addressing, ports, protocols, subnetting, and packet flow.", "Reference"],
  ["Python for Defenders", "Small programs for logs, validation, and useful automation.", "Code"],
  ["Career & Competition Board", "Competitions, certifications, scholarships, and career pathways.", "Opportunities"],
  ["Assignment Portal", "Current classroom instructions, materials, and submissions.", "Classroom"],
];
const readings = [
  ["Why Defensive Security Begins with Asset Knowledge", "A practical look at why defenders cannot protect systems they have not identified, classified, and prioritized.", "Field note", "8 min"],
  ["The Human Layer of the Attack Surface", "How urgency, trust, authority, and routine can be exploited—and how strong processes reduce human risk.", "Discussion brief", "6 min"],
  ["Reading a Packet Like Evidence", "Move from headers and flags to a defensible explanation of what occurred on a network.", "Technical primer", "10 min"],
];
const terms = [
  ["Attack surface", "Every point where an unauthorized user could try to enter, affect, or extract data from a system.", "Risk"],
  ["Availability", "The assurance that systems and data are accessible to authorized users when needed.", "CIA triad"],
  ["Confidentiality", "The protection of information from unauthorized access or disclosure.", "CIA triad"],
  ["Defense in depth", "Multiple, overlapping safeguards that prevent one failed control from exposing the whole system.", "Architecture"],
  ["Integrity", "The assurance that information and systems have not been altered improperly.", "CIA triad"],
  ["Least privilege", "Giving a user, process, or device only the access required to complete its task.", "Access control"],
  ["Threat", "A circumstance or actor with the potential to cause harm by exploiting a vulnerability.", "Risk"],
  ["Vulnerability", "A weakness that could be exploited to compromise a system or its information.", "Risk"],
];

function Logo(){return <span className="logo" aria-hidden="true">CS</span>}

export default function Home(){
  const [query,setQuery]=useState("");
  const [filter,setFilter]=useState("All");
  const [wordQuery,setWordQuery]=useState("");
  const tags=["All",...new Set(resources.map(r=>r[2]))];
  const shownResources=filter==="All"?resources:resources.filter(r=>r[2]===filter);
  const shownTerms=terms.filter(t=>t.join(" ").toLowerCase().includes(wordQuery.toLowerCase()));
  const results=useMemo(()=>{
    const q=query.trim().toLowerCase(); if(!q)return [];
    return [...resources.map(r=>["Resource",r[0],r[1],"#resources"]),...readings.map(r=>["Reading",r[0],r[1],"#readings"]),...terms.map(t=>["Word wall",t[0],t[1],"#word-wall"])].filter(r=>r.join(" ").toLowerCase().includes(q)).slice(0,6);
  },[query]);
  return <main id="top">
    <header><a className="brand" href="#top"><Logo/><span><strong>CYBER / CLASSROOM</strong><small>Student operations hub</small></span></a><nav aria-label="Primary navigation"><a href="#dispatch">Dispatch</a><a href="#resources">Resources</a><a href="#readings">Readings</a><a href="#word-wall">Word wall</a></nav><a className="portal" href="#resources">Class portal ↗</a></header>
    <section className="hero">
      <div className="hero-copy"><div className="online"><i/> Systems online · Classroom hub</div><p className="label">Cybersecurity operations // 2026–27</p><h1>Learn to think<br/>like a <em>defender.</em></h1><p className="lead">Your launch point for class updates, Security+ preparation, readings, technical resources, and the language of cybersecurity.</p><div className="actions"><a className="button" href="#dispatch">Read the latest dispatch <b>→</b></a><a href="#resources">Browse resource vault ↘</a></div>
        <div className="search-wrap"><label htmlFor="hub-search">Search the classroom hub</label><div className="search"><span>⌕</span><input id="hub-search" type="search" placeholder="Try “least privilege” or “Python”" value={query} onChange={e=>setQuery(e.target.value)}/><kbd>⌘ K</kbd></div>{query&&<div className="results" aria-live="polite">{results.length?results.map(r=><a href={r[3]} key={r[0]+r[1]} onClick={()=>setQuery("")}><span>{r[0]}</span><strong>{r[1]}</strong><small>{r[2]}</small></a>):<p>No matches yet. Try a broader term.</p>}</div>}</div>
      </div>
      <aside className="brief"><div className="brief-top"><span>Current briefing</span><b>ED. 01</b></div><div className="brief-body"><small>August // Opening brief</small><h2>Welcome to the Security Operations Center</h2><p>We begin with professional ethics, the defender’s mindset, and the core principles that shape every decision we make this year.</p></div><dl><div><dt>Focus</dt><dd>Defensive security</dd></div><div><dt>Next</dt><dd>CIA triad</dd></div><div><dt>Status</dt><dd className="ready">● Ready</dd></div></dl><a href="#dispatch">Open full dispatch <span>→</span></a></aside>
    </section>
    <div className="signal">{["01 // Security+ readiness", "02 // AP cybersecurity preparation", "03 // Defensive operations", "04 // Professional practice"].map(item => <span key={item}>{item}</span>)}</div>
    <section className="section dispatch" id="dispatch"><div className="section-head"><div><p className="label">01 // Classroom dispatch</p><h2>What matters <em>right now.</em></h2></div><p>One concise briefing for announcements, learning priorities, deadlines, and what is coming next.</p></div><div className="dispatch-grid">
      <article className="dispatch-main"><div className="meta"><span>Latest edition</span><span>August 2026</span><span>4 min read</span></div><h3>Launch Week: Build the habits of a security professional</h3><p>Cybersecurity begins before the first tool is opened. This edition introduces the habits we will use all year: document what you observe, protect the integrity of evidence, ask precise questions, and act only with clear authorization.</p><div className="steps"><div><b>01</b><p><strong>Prepare</strong>Review expectations and the lab safety agreement.</p></div><div><b>02</b><p><strong>Practice</strong>Explain the CIA triad in your own words.</p></div><div><b>03</b><p><strong>Bring</strong>Curiosity and the patience to troubleshoot carefully.</p></div></div><a className="dark-button" href="#readings">Continue with readings →</a></article>
      <aside className="radar"><p className="label">On the radar</p>{[["Now","Course onboarding","Ethics, expectations, and lab readiness"],["Next","Core security principles","CIA triad, risk, threats, and controls"],["Soon","Network foundations","Addressing, ports, protocols, and packets"]].map(r=><div className="radar-item" key={r[0]}><span>{r[0]}</span><p><strong>{r[1]}</strong><small>{r[2]}</small></p></div>)}<div className="radar-links"><small>Class documents</small><a href="https://docs.google.com/document/d/14bfBx9qaTDE3L97S5G0eFasuDinf-HBdQ-QQWm2IR-I/edit?usp=sharing" target="_blank" rel="noreferrer">Course syllabus <span aria-hidden="true">↗</span></a><a href="https://docs.google.com/document/d/1g9z8IVEGKGIbGVAKZbniZLvc2HQoXQH5TM_DiHL-Sr4/edit?usp=sharing" target="_blank" rel="noreferrer">Acceptable use policy <span aria-hidden="true">↗</span></a></div><a href="#resources">Open course roadmap ↗</a></aside>
    </div></section>
    <section className="section resources" id="resources"><div className="section-head light"><div><p className="label">02 // Resource vault</p><h2>The right tool,<br/><em>when you need it.</em></h2></div><p>Study guides, lab references, classroom destinations, and career resources—organized for fast retrieval.</p></div><div className="filters" aria-label="Filter resources">{tags.map(tag=><button key={tag} className={filter===tag?"active":""} aria-pressed={filter===tag} onClick={()=>setFilter(tag)}>{tag}</button>)}</div><div className="resource-grid">{shownResources.map((r,i)=><article key={r[0]}><span className="number">{String(i+1).padStart(2,"0")}</span><small>{r[2]}</small><h3>{r[0]}</h3><p>{r[1]}</p><div><span>Open resource</span><button aria-label={`Open ${r[0]}`}>↗</button></div></article>)}</div></section>
    <section className="section readings" id="readings"><div className="section-head"><div><p className="label">03 // Reading room</p><h2>Read. Question.<br/><em>Connect.</em></h2></div><p>Articles and technical primers selected to move classroom ideas into real-world context.</p></div><div className="reading-list">{readings.map((r,i)=><article key={r[0]}><span className="reading-no">0{i+1}</span><div><small>{r[2]}{" // "}{r[3]}</small><h3>{r[0]}</h3><p>{r[1]}</p></div><a href="#word-wall">Explore terms ↗</a></article>)}</div></section>
    <section className="section glossary" id="word-wall"><div className="glossary-intro"><p className="label">04 // Digital word wall</p><h2>Build your<br/><em>cyber vocabulary.</em></h2><p>Precise language leads to precise thinking. Search the terms we use in class and connect each one to its larger domain.</p><label className="word-search"><span className="sr-only">Search word wall</span><input type="search" placeholder="Search a term or domain…" value={wordQuery} onChange={e=>setWordQuery(e.target.value)}/><span>⌕</span></label><div className="alphabet">{"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(l=><span className={terms.some(t=>t[0].startsWith(l))?"on":""} key={l}>{l}</span>)}</div></div><div className="terms" aria-live="polite">{shownTerms.map(t=><article key={t[0]}><div><h3>{t[0]}</h3><small>{t[2]}</small></div><p>{t[1]}</p></article>)}{!shownTerms.length&&<p>No matching terms. Try another keyword.</p>}</div></section>
    <section className="closing"><div><p className="label">Need a starting point?</p><h2>Check the latest dispatch.<br/>Then check the evidence.</h2></div><a className="dark-button" href="#top">Return to mission control ↑</a></section>
    <footer><a className="brand" href="#top"><Logo/><span><strong>CYBER / CLASSROOM</strong><small>Learn · Defend · Grow</small></span></a><p>Built for the students who will defend what comes next.</p><nav><a href="#dispatch">Dispatch</a><a href="#resources">Resources</a><a href="#readings">Readings</a><a href="#word-wall">Word wall</a></nav></footer>
  </main>
}
