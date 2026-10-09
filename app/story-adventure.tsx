"use client";

import { useEffect, useRef, useState } from "react";

const chapters = [
  { year: "2016–2019", company: "Fujitsu Philippines", title: "The Forge Nebula", role: "Application Systems Engineer", scene: "workshop", intro: "Launch into the Forge Nebula, a playful map of Syd’s first career chapter. Three destinations reveal interfaces, integrations, and teamwork.", relics: [
    { name: "Interface planet", symbol: "⌘", x: 2, y: 2, title: "Making complexity approachable", text: "At Fujitsu Philippines, Syd designed responsive admin and user experiences with AngularJS. The interface was one part of a much larger system.", token: "Interfaces" },
    { name: "Integration moon", symbol: "⇄", x: 8, y: 1, title: "Connecting the pieces", text: "Syd built EWS APIs for scheduling and notes, connecting what people saw on screen to the services behind it. Java was also part of this chapter’s toolkit.", token: "Integration" },
    { name: "Crew station", symbol: "⚑", x: 6, y: 5, title: "Building together", text: "Syd led a cross-functional delivery team and introduced Selenium and unit-test automation. Delivering a product meant coordinating people as well as code.", token: "Teamwork" }
  ], question: "The Forge Nebula is ready to ship. How can you help it stay reliable as it changes?", options: ["Add automated checks to the delivery workflow", "Rely only on the first successful demo", "Skip checking the integrations"], correct: 0, lesson: "That connects to Syd’s work introducing Selenium and unit-test automation. You’ve earned the Builder badge.", badge: "Builder" },
  { year: "2019–2022", company: "DXC Technology", title: "The Data Constellation", role: "Full Stack Developer", scene: "city", intro: "Chart a course through the Data Constellation. Explore applications, data, and team guidance from Syd’s full-stack chapter.", relics: [
    { name: "Application planet", symbol: "▤", x: 3, y: 1, title: "Beyond a single screen", text: "At DXC Technology, Syd delivered progressive web apps for clients and internal teams, working across Angular and Spring Boot.", token: "Full stack" },
    { name: "Data moon", symbol: "◈", x: 8, y: 3, title: "Making data visible", text: "Data processing and visualization became part of Syd’s work. D3.js helped shape information into experiences people could explore.", token: "Data" },
    { name: "Knowledge station", symbol: "▥", x: 2, y: 5, title: "Helping the next person", text: "Syd guided scalable solutions across multiple teams and created documentation that accelerated onboarding. The toolkit here also included Azure.", token: "Guidance" }
  ], question: "A new teammate arrives in the city. What helps them find their way into the project?", options: ["Give them a list of unexplained acronyms", "Share clear documentation and a map of the system", "Let them discover every dependency alone"], correct: 1, lesson: "Exactly. Documentation and guidance were part of this chapter, alongside the technical work. You’ve earned the Connector badge.", badge: "Connector" },
  { year: "2022–present", company: "Willis Towers Watson", title: "The Architect Galaxy", role: "UI Systems Engineer", scene: "garden", intro: "Welcome to the Architect Galaxy. Explore how architecture, collaboration, and security connect in Syd’s enterprise work.", relics: [
    { name: "Component planet", symbol: "❖", x: 2, y: 3, title: "A system that grows", text: "At Willis Towers Watson, Syd leads front-end architecture and framework strategy, creating reusable Angular modules and component libraries.", token: "Architecture" },
    { name: "Collaboration moon", symbol: "∞", x: 6, y: 1, title: "Where disciplines meet", text: "Syd partners with UX and backend teams on performance. Angular, Blazor, .NET, and design systems form this chapter’s toolkit.", token: "Collaboration" },
    { name: "Security station", symbol: "◇", x: 8, y: 5, title: "Care beyond the interface", text: "Syd resolves security findings across the delivery lifecycle. The work considers how an application behaves and how safely it can be delivered.", token: "Security" }
  ], question: "Several products need the same interface pattern. What gives the garden room to grow?", options: ["Copy the component independently into every product", "Give each version completely different behavior", "Build a reusable component with a shared approach"], correct: 2, lesson: "That reflects Syd’s work on shared Angular modules and component libraries. You’ve earned the Architect badge.", badge: "Architect" }
];

export default function StoryAdventure() {
  const [started, setStarted] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [position, setPosition] = useState({ x: 5, y: 6 });
  const [found, setFound] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [solved, setSolved] = useState(false);
  const [finished, setFinished] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const board = useRef<HTMLDivElement>(null);
  const current = chapters[chapter];
  const flightLog = useRef<HTMLElement>(null);
  const thruster = useRef<ReturnType<typeof setInterval> | null>(null);
  function stopThrust() { if (thruster.current !== null) { clearInterval(thruster.current); thruster.current = null; } }
  useEffect(() => {
    const stop = () => stopThrust();
    window.addEventListener("blur", stop);
    document.addEventListener("visibilitychange", stop);
    return () => { stopThrust(); window.removeEventListener("blur", stop); document.removeEventListener("visibilitychange", stop); };
  }, []);
  function thrust(dx: number, dy: number) { stopThrust(); move(dx * .35, dy * .35); thruster.current = setInterval(() => move(dx * .35, dy * .35), 70); }
  function steer(clientX: number, clientY: number) {
    const rect = board.current?.getBoundingClientRect();
    if (!rect) return;
    stopThrust();
    setPosition({ x: Math.max(0, Math.min(10, (clientX - rect.left) / rect.width * 11 - .5)), y: Math.max(0, Math.min(6, (clientY - rect.top) / rect.height * 7 - .5)) });
  }

  useEffect(() => {
    if (!started || finished) return;
    const index = current.relics.findIndex(r => Math.hypot(r.x - position.x, r.y - position.y) < .65);
    if (index >= 0) { setSelected(index); setFound(previous => previous.includes(index) ? previous : [...previous, index]); }
  }, [position, current, started, finished]);

  function focusWorld() { board.current?.scrollIntoView({ block: "center" }); board.current?.focus({ preventScroll: true }); }
  function move(dx: number, dy: number) {
    setPosition(p => ({ x: Math.max(0, Math.min(10, p.x + dx)), y: Math.max(0, Math.min(6, p.y + dy)) }));
  }
  function reset() { stopThrust(); setChapter(0); setPosition({ x: 5, y: 6 }); setFound([]); setSelected(null); setSolved(false); setFinished(false); setAnswer(null); setStarted(true); window.requestAnimationFrame(() => focusWorld()); }
  function next() {
    stopThrust();
    if (chapter === 2) { setFinished(true); return; }
    setChapter(c => c + 1); setPosition({ x: 5, y: 6 }); setFound([]); setSelected(null); setSolved(false); setAnswer(null);
    window.requestAnimationFrame(() => focusWorld());
  }

  return <section className="story-adventure" aria-labelledby="adventure-title">
    <div className="adventure-heading"><p className="section-index">AN INTERACTIVE PORTRAIT / SYD BAUTISTA</p><h2 id="adventure-title">One spaceship.<br /><span>A universe of stories.</span></h2><p>Pilot your ship through my career. Every planet holds a piece of my story.</p></div>
    <div className="adventure-shell">
      <div className="adventure-top"><span className="game-name"><i /> SYD / FLIGHT LOG</span><span>{finished ? "JOURNEY COMPLETE" : `CHAPTER 0${chapter + 1} / 03`} <b>{current.year}</b></span><button onClick={reset}>Restart journey</button></div>
      {!started ? <div className="adventure-start"><div className="world-preview" aria-hidden="true"><span>✦</span><i /><span>◉</span><i /><span>✧</span></div><p className="section-index">FORGE NEBULA → DATA CONSTELLATION → ARCHITECT GALAXY</p><h2>Hi, I’m Syd.<br />Your next mission: meet me.</h2><p>I’m a front-end specialist based in Manila. Board a spaceship and explore three career systems. Tap planets to discover the teams, tools, and ideas that shaped my work.</p><button className="primary-button" onClick={reset}>Launch spaceship <span aria-hidden="true">→</span></button><small>Touch to fly. No timer. Explore at your own pace.</small><a href="#story">Prefer to read? Explore the portfolio ↓</a></div> : finished ? <div className="adventure-ending"><p className="section-index">THREE CHAPTERS. ONE CONTINUING JOURNEY.</p><h2>You’ve met the builder,<br />the connector, and the architect.</h2><div className="earned-badges">{chapters.map(c => <span key={c.badge}>✦ {c.badge}</span>)}</div><p>That’s my career so far: shaping interfaces, connecting systems, and helping teams build together. My curiosity continues through deeper React patterns, Semantic Kernel, and applied Python.</p><div className="ending-links"><a className="primary-button" href="#work">Discover my projects →</a><a className="outline-button" href="mailto:sydbautista05@gmail.com">Let’s build something ↗</a></div><button className="adventure-replay" onClick={reset}>Explore again ↻</button></div> : <>
        <div className="adventure-chapters" aria-label="Journey progress">{chapters.map((c, i) => <span className={i === chapter ? "active" : i < chapter ? "complete" : ""} key={c.title}>{i < chapter ? "✓" : `0${i + 1}`} {c.title}</span>)}</div>
        <div className="adventure-layout">
          <div className="world-column"><div ref={board} className={`adventure-world ${current.scene}`} role="group" tabIndex={0} onPointerDown={e => { if ((e.target as HTMLElement).closest("button")) return; e.currentTarget.setPointerCapture(e.pointerId); steer(e.clientX, e.clientY); }} onPointerMove={e => { if (e.currentTarget.hasPointerCapture(e.pointerId)) steer(e.clientX, e.clientY); }} onPointerUp={e => { if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId); }} aria-label={`${current.title}. Drag to pilot, tap a planet to visit, or use the thruster buttons. Keyboard: arrow keys or WASD.`} onKeyDown={e => { const direction: Record<string, number[]> = { ArrowUp: [0,-1], w:[0,-1], ArrowDown:[0,1], s:[0,1], ArrowLeft:[-1,0], a:[-1,0], ArrowRight:[1,0], d:[1,0] }; const delta = direction[e.key]; if (delta && e.target === e.currentTarget) { e.preventDefault(); move(delta[0], delta[1]); } }}>
            <div className="space-stars" aria-hidden="true" /><div className="space-nebula" aria-hidden="true" /><div className="space-orbits" aria-hidden="true"><i /><i /></div><span className="world-caption">{current.title} / {current.company}</span>
            {current.relics.map((r, i) => <button key={r.name} className={`story-landmark ${found.includes(i) ? "discovered" : ""}`} style={{left:`${(r.x + .5) / 11 * 100}%`, top:`${(r.y + .5) / 7 * 100}%`}} onClick={() => { stopThrust(); setPosition({x:r.x,y:r.y}); setSelected(i); setFound(previous => previous.includes(i) ? previous : [...previous,i]); }} aria-label={`${r.name}${found.includes(i) ? ", discovered" : ", explore"}`}><span aria-hidden="true">{r.symbol}</span><small>{r.name}</small><i aria-hidden="true">{found.includes(i) ? "✓" : "+"}</i></button>)}
            <div className="story-player" style={{left:`${(position.x + .5) / 11 * 100}%`,top:`${(position.y + .5) / 7 * 100}%`}} aria-hidden="true"><svg viewBox="0 0 64 80" width="46" height="58"><path className="ship-flame" d="M25 57 L32 79 L39 57Z" fill="#50c9ff" /><path d="M32 3 L46 42 L58 60 L41 55 L32 61 L23 55 L6 60 L18 42Z" fill="#d6eeff" stroke="#88caff" strokeWidth="2" /><path d="M32 14 L39 38 L32 43 L25 38Z" fill="#176bad" /><path d="M32 45V60" stroke="#15619e" strokeWidth="3" /></svg></div>
          </div><div className="world-controls"><p>Drag to fly · tap a planet to visit<br /><span className="desktop-flight-hint">Keyboard: arrows / WASD</span></p><div className="direction-pad">{[{label:"Move left",symbol:"←",dx:-1,dy:0},{label:"Move up",symbol:"↑",dx:0,dy:-1},{label:"Move down",symbol:"↓",dx:0,dy:1},{label:"Move right",symbol:"→",dx:1,dy:0}].map(d => <button key={d.label} aria-label={d.label} onPointerDown={e => { e.preventDefault(); e.currentTarget.setPointerCapture(e.pointerId); thrust(d.dx,d.dy); }} onPointerUp={stopThrust} onPointerCancel={stopThrust} onLostPointerCapture={stopThrust} onClick={e => { if (e.detail === 0) move(d.dx,d.dy); }}>{d.symbol}</button>)}</div></div>{selected !== null && <button className="transmission-link" onClick={() => flightLog.current?.scrollIntoView({ block: "start" })}>Read transmission: {current.relics[selected].token} ↓</button>}</div>
          <aside ref={flightLog} className="story-dialogue" aria-label="Chapter story"><p className="section-index">{current.year} / {current.company}</p><h2>{current.title}</h2><span className="story-role">{current.role}</span><div className="story-discovery" aria-live="polite">{selected === null ? <><h3>Your mission: explore 3 destinations.</h3><p>{current.intro}</p><p className="story-hint">Tap a glowing planet to fly there and receive a story transmission.</p></> : <><span className="discovery-label">TRANSMISSION RECEIVED / {current.relics[selected].token}</span><h3>{current.relics[selected].title}</h3><p>{current.relics[selected].text}</p></>}</div><div className="inventory" aria-label="Discoveries">{current.relics.map((r,i) => <span className={found.includes(i) ? "collected" : ""} key={r.token}>{found.includes(i) ? "✓" : "○"} {r.token}</span>)}</div><p className="quest-count">{found.length} / 3 stories discovered</p><button className="return-to-ship" onClick={focusWorld}>Back to spaceship ↑</button></aside>
        </div>
        {found.length === 3 && <div className="chapter-quest"><div><p className="section-index">CHAPTER CHALLENGE / A PLAYFUL SCENARIO</p><h3>{solved ? "Chapter complete. Badge earned." : current.question}</h3><p role="status">{answer ?? "Choose an approach to unlock the next chapter."}</p></div>{solved ? <div className="quest-success"><span>✦ {current.badge}</span><button className="primary-button" onClick={next}>{chapter === 2 ? "Finish the journey" : "Warp to the next system"} →</button></div> : <div className="quest-options">{current.options.map((option,i) => <button key={option} onClick={() => { if (i === current.correct) { setSolved(true); setAnswer(current.lesson); } else setAnswer("Try another approach. Look back at the stories you discovered for a clue."); }}><span>0{i+1}</span>{option}</button>)}</div>}</div>}
      </>}
    </div>
  </section>;
}
