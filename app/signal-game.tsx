"use client";

import { useEffect, useRef, useState } from "react";

const positions = [{ x: 18, y: 24 }, { x: 72, y: 62 }, { x: 44, y: 38 }, { x: 80, y: 20 }, { x: 24, y: 72 }, { x: 58, y: 76 }, { x: 64, y: 30 }, { x: 32, y: 50 }];
type Phase = "ready" | "playing" | "paused" | "done";

export default function SignalGame() {
  const [phase, setPhase] = useState<Phase>("ready");
  const [remaining, setRemaining] = useState(30);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [best, setBest] = useState(0);
  const [target, setTarget] = useState(0);
  const [feedback, setFeedback] = useState("Find your flow.");
  const deadline = useRef(0);
  const targetButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try { const value = Number(localStorage.getItem("syd-signal-best")); if (Number.isFinite(value)) setBest(Math.max(0, value)); } catch { /* Storage is optional. */ }
  }, []);

  useEffect(() => {
    if (phase !== "playing") return;
    const timer = window.setInterval(() => {
      const seconds = Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000));
      setRemaining(seconds);
      if (!seconds) setPhase("done");
    }, 100);
    const hide = () => { if (document.hidden) { setRemaining(Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000))); setPhase("paused"); } };
    document.addEventListener("visibilitychange", hide);
    return () => { clearInterval(timer); document.removeEventListener("visibilitychange", hide); };
  }, [phase]);

  useEffect(() => {
    if (phase !== "done") return;
    setBest(previous => {
      const next = Math.max(previous, score);
      try { localStorage.setItem("syd-signal-best", String(next)); } catch { /* Play still works without storage. */ }
      return next;
    });
  }, [phase, score]);

  function start() {
    setScore(0); setCombo(0); setRemaining(30); setTarget(Math.floor(Math.random() * positions.length));
    setFeedback("Follow the blue signal."); deadline.current = Date.now() + 30000; setPhase("playing");
    window.requestAnimationFrame(() => targetButton.current?.focus({ preventScroll: true }));
  }
  function collect() {
    if (phase !== "playing" || Date.now() >= deadline.current) return;
    const next = combo + 1;
    const multiplier = Math.min(4, 1 + Math.floor(next / 5));
    setScore(value => value + 10 * multiplier); setCombo(next);
    setFeedback(next % 5 === 0 ? `${multiplier}× multiplier. Keep going!` : `Signal collected · +${10 * multiplier}`);
    setTarget(previous => (previous + 1 + Math.floor(Math.random() * (positions.length - 1))) % positions.length);
  }

  return <section className="playground" id="play" aria-labelledby="game-title">
    <div className="game-heading"><div><p className="section-index">05 / A LITTLE PLAY</p><h2 id="game-title">Less scrolling.<br /><span>More playing.</span></h2></div><p>A tiny experiment in focus and flow. Collect blue signals in 30 seconds. Every five signals boosts your multiplier; missing breaks your combo.</p></div>
    <div className="game-shell">
      <div className="game-toolbar"><span className="game-name"><i /> SIGNAL SPRINT</span><div className="game-stats"><span>SCORE <strong>{score.toString().padStart(3, "0")}</strong></span><span>TIME <strong>{remaining}s</strong></span><span>BEST <strong>{best}</strong></span></div></div>
      <div className={`signal-arena ${phase === "playing" ? "is-playing" : ""}`} onClick={() => { if (phase === "playing" && Date.now() < deadline.current) { setCombo(0); setFeedback("Missed. Find the next signal."); } }}>
        <div className="arena-orbit" aria-hidden="true" /><span className="arena-label" aria-hidden="true">SB / EXPERIMENT 001</span>
        {phase === "playing" ? <button ref={targetButton} className="signal-target" style={{ left: `${positions[target].x}%`, top: `${positions[target].y}%` }} aria-label="Collect blue signal" onClick={event => { event.stopPropagation(); collect(); }}><span aria-hidden="true">✦</span></button> : <div className="game-overlay">
          <span className="game-symbol" aria-hidden="true">✦</span><p className="section-index">{phase === "done" ? "RUN COMPLETE" : phase === "paused" ? "TAKE A BREATHER" : "30 SECONDS. FIND YOUR FLOW."}</p>
          <h3>{phase === "done" ? `${score} points. Nice flow.` : phase === "paused" ? "Signal on standby." : "Catch a little brilliance."}</h3>
          <p>{phase === "done" ? "One more round? Your best is saved on this device." : "Click or tap the glowing signal. Keyboard: Tab to the signal, then press Enter or Space."}</p>
          <button className="primary-button" onClick={event => { event.stopPropagation(); if (phase === "paused" && remaining > 0) { deadline.current = Date.now() + remaining * 1000; setPhase("playing"); window.requestAnimationFrame(() => targetButton.current?.focus({ preventScroll: true })); } else start(); }}>{phase === "paused" && remaining > 0 ? "Resume game" : phase === "done" ? "Play again" : "Start game"} <span aria-hidden="true">→</span></button>
        </div>}
      </div>
      <div className="game-bottom"><p role="status">{phase === "done" ? "Round complete. Play again to beat your best." : feedback}</p><div><span>COMBO {combo} · {Math.min(4, 1 + Math.floor(combo / 5))}×</span>{phase === "playing" && <button onClick={() => { setRemaining(Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000))); setPhase("paused"); }}>Pause</button>}{phase === "paused" && <button onClick={start}>Restart</button>}</div></div>
    </div>
  </section>;
}
