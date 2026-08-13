"use client";

import { useEffect, useRef, useState } from "react";

const roles = [
  {
    year: "2016 — 2019",
    role: "Application Systems Engineer",
    company: "Fujitsu Philippines",
    copy: "Led a cross-functional team from responsive AngularJS interfaces through EWS-powered integrations and automated testing.",
    tags: ["AngularJS", "Java", "EWS", "Selenium"],
  },
  {
    year: "2019 — 2022",
    role: "Full Stack Developer",
    company: "DXC Technology",
    copy: "Built progressive web apps, data visualization tools, and scalable full-stack platforms while guiding multiple delivery teams.",
    tags: ["Angular", "Spring Boot", "D3.js", "Azure"],
  },
  {
    year: "2022 — NOW",
    role: "UI Systems Engineer",
    company: "Willis Towers Watson",
    copy: "Shapes front-end architecture, shared component systems, performance, and application security across enterprise products.",
    tags: ["Angular", "Blazor", ".NET", "Design systems"],
  },
];

const projects = [
  {
    number: "01",
    title: "Natural language. Structured answers.",
    label: "AI-POWERED DATA QUERY",
    copy: "A secure application that turns plain English into SQL, opening business data to the people who need it — no query language required.",
    stack: "Blazor · .NET 9 · Semantic Kernel · Azure OpenAI",
    tone: "project-blue",
    visual: <div className="query-demo" aria-hidden="true"><span>Ask your data</span><strong>“Show quarterly growth by region”</strong><i /><small>Query generated in real time</small></div>,
  },
  {
    number: "02",
    title: "Property data, brought into focus.",
    label: "DATA-DRIVEN REAL ESTATE",
    copy: "A central intelligence layer for property portfolios, combining OCR, visual analytics, and location context into one clear view.",
    stack: "Vue.js · Ruby on Rails · AWS · Google Maps",
    tone: "project-grid",
    visual: <div className="data-demo" aria-hidden="true"><div className="map-dot d1" /><div className="map-dot d2" /><div className="map-dot d3" /><span className="bar b1" /><span className="bar b2" /><span className="bar b3" /><span className="bar b4" /></div>,
  },
  {
    number: "03",
    title: "Seeing skin health sooner.",
    label: "AI DERMATOLOGY EXPERIENCE",
    copy: "A clinic-ready web experience using image-based machine learning to help identify acne-prone areas and accelerate assessments.",
    stack: "Vue.js · Python · Azure",
    tone: "project-orbit",
    visual: <div className="scan-demo" aria-hidden="true"><div className="face-orbit"><span /><i /><b /></div><small>analysis complete</small></div>,
  },
];

const stackGroups = [
  { name: "Interfaces", items: ["Angular", "React", "Vue.js", "Blazor", "Tailwind CSS"] },
  { name: "Logic", items: ["C#", "Java", "Python", ".NET", "Spring Boot"] },
  { name: "Intelligence", items: ["Semantic Kernel", "Azure OpenAI", "D3.js", "OCR"] },
  { name: "Cloud + Quality", items: ["AWS", "Azure", "GitHub", "Checkmarx", "Snyk"] },
];

function Arrow({ direction = "right" }: { direction?: "left" | "right" }) {
  return <span aria-hidden="true">{direction === "right" ? "→" : "←"}</span>;
}

export default function Home() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeRole, setActiveRole] = useState(2);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible"));
    }, { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const goToRole = (index: number) => {
    const next = Math.max(0, Math.min(roles.length - 1, index));
    setActiveRole(next);
    trackRef.current?.children[next]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <main>
      <nav className="nav-shell" aria-label="Primary navigation">
        <a href="#top" className="monogram" aria-label="Syd Bautista, home">SB<span>.</span></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu"><span /><span /></button>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#story" onClick={() => setMenuOpen(false)}>Story</a>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#stack" onClick={() => setMenuOpen(false)}>Stack</a>
          <a className="nav-cta" href="/Syd-Bautista-CV-2026.pdf" download>Download CV <Arrow /></a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-glow" aria-hidden="true"><div className="core"><span>SB</span></div><i className="orbit one" /><i className="orbit two" /><i className="orbit three" /></div>
        <div className="hero-copy">
          <p className="eyebrow">UI SYSTEMS ENGINEER · MANILA</p>
          <h1>I engineer the<br /><span>way ideas feel.</span></h1>
          <p className="hero-intro">I’m Syd Bautista — a front-end specialist building scalable systems, intuitive products, and intelligent experiences.</p>
          <div className="hero-actions"><a className="primary-button" href="#work">Explore my work <Arrow /></a><a className="text-link" href="#story">Follow the story <span>↓</span></a></div>
        </div>
        <div className="scroll-cue"><span>SCROLL TO EXPLORE</span><i /></div>
      </section>

      <section className="statement" id="story" data-reveal>
        <p className="section-index">01 / THE POINT OF VIEW</p>
        <h2>Interfaces should disappear.<br /><span>Impact should remain.</span></h2>
        <p>For over a decade, I’ve worked where systems thinking meets human behavior — turning complexity into products that feel clear, fast, and inevitable.</p>
        <div className="metrics">
          <div><strong>10+</strong><span>years crafting digital products</span></div>
          <div><strong>3</strong><span>enterprise chapters</span></div>
          <div><strong>∞</strong><span>curiosity for what’s next</span></div>
        </div>
      </section>

      <section className="career" aria-labelledby="career-title">
        <div className="section-head" data-reveal>
          <div><p className="section-index">02 / CAREER PROGRESSION</p><h2 id="career-title">Built in chapters.<br /><span>Always moving forward.</span></h2></div>
          <div className="carousel-controls"><button onClick={() => goToRole(activeRole - 1)} aria-label="Previous role" disabled={activeRole === 0}><Arrow direction="left" /></button><span>{String(activeRole + 1).padStart(2, "0")} / 03</span><button onClick={() => goToRole(activeRole + 1)} aria-label="Next role" disabled={activeRole === 2}><Arrow /></button></div>
        </div>
        <div className="timeline-line"><span style={{ width: `${((activeRole + 1) / roles.length) * 100}%` }} /></div>
        <div className="career-track" ref={trackRef}>
          {roles.map((item, index) => <article className={`role-card ${activeRole === index ? "active" : ""}`} key={item.company} onClick={() => setActiveRole(index)}>
            <div className="role-number">0{index + 1}</div><p>{item.year}</p><h3>{item.role}</h3><h4>{item.company}</h4><div className="role-divider" /><p className="role-copy">{item.copy}</p><div className="tag-row">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
          </article>)}
        </div>
      </section>

      <section className="projects" id="work">
        <div className="projects-intro" data-reveal><p className="section-index">03 / SELECTED PROJECTS</p><h2>Experiments with<br /><span>real-world consequences.</span></h2></div>
        {projects.map((project) => <article className={`project ${project.tone}`} key={project.number} data-reveal>
          <div className="project-content"><p className="project-label"><span>{project.number}</span>{project.label}</p><h3>{project.title}</h3><p>{project.copy}</p><div className="project-stack">{project.stack}</div></div>
          <div className="project-visual">{project.visual}</div>
        </article>)}
      </section>

      <section className="stack" id="stack">
        <div className="stack-heading" data-reveal><p className="section-index">04 / THE TOOLKIT</p><h2>A stack that adapts.<br /><span>A mindset that scales.</span></h2><p>Tools change. The ability to choose, connect, and shape them is the real technology.</p></div>
        <div className="stack-grid">
          {stackGroups.map((group, index) => <div className="stack-group" key={group.name} data-reveal><div className="stack-number">0{index + 1}</div><h3>{group.name}</h3><div>{group.items.map(item => <span key={item}>{item}</span>)}</div></div>)}
        </div>
        <div className="learning" data-reveal><span className="pulse" /><p>CURRENTLY EXPLORING</p><strong>Deeper React patterns · Semantic Kernel · Applied Python</strong></div>
      </section>

      <footer>
        <div className="footer-glow" />
        <p className="section-index">THE NEXT CHAPTER</p>
        <h2>Let’s build something<br /><span>people remember.</span></h2>
        <p className="footer-copy">Open to ambitious products, thoughtful teams, and problems worth solving.</p>
        <div className="footer-actions"><a className="primary-button" href="mailto:sydbautista05@gmail.com">Email me <Arrow /></a><a className="outline-button" href="https://www.linkedin.com/in/sydbautista/" target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
        <div className="footer-bottom"><a href="#top" className="monogram">SB<span>.</span></a><p>© 2026 SYD BAUTISTA · MANDALUYONG, PH</p><a href="#top">BACK TO TOP ↑</a></div>
      </footer>
    </main>
  );
}
