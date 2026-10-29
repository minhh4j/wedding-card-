"use client";

import { useEffect, useState } from "react";

const RECEPTION = new Date("2027-01-09T16:30:00+05:30");
const VENUE = "Olive Convention Centre, Kollamchina, Kadappadi";
const MAP_Q = encodeURIComponent("Olive Convention Centre Kadappadi Kerala");

const weddings = [
  {
    groom: "Gokul",
    bride: "Ardra",
    brideParents: "D/o. Rajeev T & Smitha N R",
    brideHome: "‘Sreebhavan’, Cheloor, Thattarakkal, Kunnamangalam",
    date: "Friday, 8th January 2027",
    malayalam: "1202 Dhanu 24",
    place: "at Bride’s Residence",
    muhurtham: "10.20 am & 10.45 am",
    bg: "/couples/gokul-ardra.jpg",
    bgPos: "center top / cover",
  },
  {
    groom: "Rahul",
    bride: "Jisna",
    brideParents: "D/o. Suresh K V & Sajini P C",
    brideHome: "Koyappa, Vazhakkalil, Kondotty",
    date: "Saturday, 9th January 2027",
    malayalam: "1202 Dhanu 25",
    place: "at K.P. Lounge, Kuruppath, Kondotty",
    muhurtham: "10.45 am & 11.15 am",
    bg: "/couples/rahul-jisna.jpg",
    bgPos: "center top / cover",
  },
];

// Heart divider (from heart_divider_transparent.svg, trimmed and resized).
// The artwork is used as a mask and filled with the site's gold, so it matches the theme.
const HEART_MASK = "url(/heart-divider.png) center / contain no-repeat";

function Divider() {
  return (
    <div
      role="presentation"
      style={{
        width: "min(300px, 82%)",
        aspectRatio: "720 / 91",
        margin: "1.25rem auto",
        background: "linear-gradient(90deg, #b8893a, #e2b867 50%, #b8893a)",
        WebkitMask: HEART_MASK,
        mask: HEART_MASK,
      }}
    />
  );
}

// Brass peacock diya (from brass_hanging_diya_transparent.svg, resized for the web).
// It hangs by its own brass chain from the top edge; a soft glow flickers over the flame.
function Lamp({ className = "", size = 104, style }: { className?: string; size?: number; style?: React.CSSProperties }) {
  return (
    <div className={`lamp ${className}`} style={{ width: size, pointerEvents: "none", zIndex: 20, ...style }} aria-hidden>
      <div style={{ position: "relative" }}>
        <img src="/hanging-diya.png" alt="" width={420} height={525} style={{ display: "block", width: "100%", height: "auto", filter: "drop-shadow(0 6px 10px rgba(90,60,15,.25))" }} />
        <span
          className="flame"
          style={{
            position: "absolute", left: "calc(64% - 22px)", top: "calc(76% - 26px)", width: 44, height: 44, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,214,120,.75) 0%, rgba(255,170,60,.3) 40%, transparent 70%)",
            mixBlendMode: "screen",
          }}
        />
      </div>
    </div>
  );
}

function Jasmine({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="180" height="260" viewBox="0 0 180 260" aria-hidden>
      <path d="M20 0 C40 80 30 160 60 260" stroke="#3f6b2a" strokeWidth="3" fill="none" />
      {Array.from({ length: 9 }).map((_, i) => {
        const y = 20 + i * 26;
        const x = 22 + Math.sin(i) * 14 + i * 3;
        return (
          <g key={i}>
            <ellipse cx={x + 22} cy={y} rx="16" ry="6" fill="#4d7a35" transform={`rotate(-30 ${x + 22} ${y})`} />
            {[0, 72, 144, 216, 288].map((r) => (
              <ellipse key={r} cx={x} cy={y - 7} rx="3.5" ry="8" fill="#fffdf6" stroke="#e8dcc0" strokeWidth=".6" transform={`rotate(${r} ${x} ${y})`} />
            ))}
            <circle cx={x} cy={y} r="2.5" fill="#e9cf7a" />
          </g>
        );
      })}
    </svg>
  );
}

function Lotus() {
  return (
    <svg width="48" height="26" viewBox="0 0 48 26" fill="none" stroke="var(--gold)" strokeWidth="1.3" aria-hidden>
      <path d="M24 24 C18 16 18 8 24 2 C30 8 30 16 24 24Z" fill="rgba(220,192,138,.25)" />
      <path d="M24 24 C16 20 11 13 12 7 C18 9 22 15 24 24Z" />
      <path d="M24 24 C32 20 37 13 36 7 C30 9 26 15 24 24Z" />
      <path d="M24 24 C14 24 6 20 3 14 C11 13 19 17 24 24Z" />
      <path d="M24 24 C34 24 42 20 45 14 C37 13 29 17 24 24Z" />
    </svg>
  );
}

function Mandala({ className = "", stroke = "#b8893a", width = 0.6 }: { className?: string; stroke?: string; width?: number }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" stroke={stroke} strokeWidth={width} aria-hidden>
      {[90, 75, 60, 40, 22].map((r) => <circle key={r} cx="100" cy="100" r={r} />)}
      {Array.from({ length: 24 }).map((_, i) => (
        <g key={i} transform={`rotate(${i * 15} 100 100)`}>
          <path d="M100 10 C108 25 108 35 100 40 C92 35 92 25 100 10Z" />
          <path d="M100 40 C105 48 105 54 100 60 C95 54 95 48 100 40Z" />
          <circle cx="100" cy="68" r="2" />
        </g>
      ))}
    </svg>
  );
}

function Drape({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="130" viewBox="0 0 130 800" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="cloth" x1="0" x2="1">
          <stop offset="0" stopColor="#efe4c8" /><stop offset=".6" stopColor="#fbf6e9" /><stop offset="1" stopColor="#e9dcbc" />
        </linearGradient>
        <linearGradient id="kasavu" x1="0" x2="1">
          <stop offset="0" stopColor="#a8762d" /><stop offset=".5" stopColor="#e8c477" /><stop offset="1" stopColor="#a8762d" />
        </linearGradient>
      </defs>
      <path d="M0 0 H110 C80 200 120 400 70 800 H0Z" fill="url(#cloth)" />
      <path d="M100 0 H112 C82 200 122 400 72 800 H60 C110 400 70 200 100 0Z" fill="url(#kasavu)" />
      <path d="M30 0 C40 300 10 500 25 800" stroke="#e2d4b0" strokeWidth="2" fill="none" />
    </svg>
  );
}

function Garland({ className = "" }: { className?: string }) {
  const n = 23;
  return (
    <svg className={className} viewBox="0 0 900 120" aria-hidden>
      {Array.from({ length: n }).map((_, i) => {
        const t = i / (n - 1);
        const x = 20 + t * 860;
        const y = 10 + Math.sin(t * Math.PI) * 70;
        return (
          <g key={i}>
            {i % 2 === 0 && <ellipse cx={x} cy={y - 8} rx="12" ry="5" fill="#4d7a35" transform={`rotate(${(t - 0.5) * 60} ${x} ${y - 8})`} />}
            {[0, 72, 144, 216, 288].map((r) => (
              <ellipse key={r} cx={x} cy={y - 6} rx="3.5" ry="7" fill="#fffdf6" stroke="#e3d3ad" strokeWidth=".6" transform={`rotate(${r} ${x} ${y})`} />
            ))}
            <circle cx={x} cy={y} r="2.4" fill={i % 4 === 0 ? "#e2a33a" : "#e9cf7a"} />
          </g>
        );
      })}
    </svg>
  );
}

function Kolam({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 150" fill="none" stroke="#fff" strokeWidth="2" aria-hidden>
      {[110, 85, 60, 35].map((r) => <ellipse key={r} cx="150" cy="150" rx={r * 1.3} ry={r * 0.55} strokeDasharray="2 6" strokeLinecap="round" stroke="#c9a96a" />)}
      {Array.from({ length: 12 }).map((_, i) => (
        <path key={i} transform={`rotate(${i * 15 - 90} 150 150)`} d="M150 150 C140 120 160 110 150 85" stroke="#c9a96a" />
      ))}
    </svg>
  );
}

type Phase = "idle" | "closing" | "opening";

// Keyframes live here (not globals.css) so they load reliably with the component.
// All motion uses transform/opacity with one shared ease for a calm, even feel.
const EASE = "cubic-bezier(.65,0,.35,1)";
const DOOR_CSS = `
@keyframes cardOut { from { opacity: 1; transform: none; filter: blur(0); } to { opacity: 0; transform: translateY(-14px) scale(.94); filter: blur(3px); } }
@keyframes doorInL { from { transform: translateX(-100%); } to { transform: translateX(0); } }
@keyframes doorInR { from { transform: translateX(100%); } to { transform: translateX(0); } }
@keyframes doorOpenL { from { transform: rotateY(0); } to { transform: rotateY(-96deg); } }
@keyframes doorOpenR { from { transform: rotateY(0); } to { transform: rotateY(96deg); } }
@keyframes sealIn { from { opacity: 0; transform: translate(-50%,-50%) scale(.7); } to { opacity: 1; transform: translate(-50%,-50%) scale(1); } }
@keyframes sealOut { from { opacity: 1; transform: translate(-50%,-50%) scale(1); } to { opacity: 0; transform: translate(-50%,-50%) scale(1.3); } }
@keyframes sealGlow { 0%,100% { box-shadow: 0 0 16px 2px rgba(232,196,119,.45), inset 0 0 0 5px rgba(255,243,207,.55); }
  50% { box-shadow: 0 0 34px 10px rgba(232,196,119,.75), inset 0 0 0 5px rgba(255,243,207,.55); } }
@keyframes glow { 0% { opacity: 0; transform: translate(-50%,-50%) scale(.5); } 35% { opacity: 1; } 100% { opacity: 0; transform: translate(-50%,-50%) scale(1.7); } }
@keyframes drift { 0% { opacity: 0; transform: translate(-50%,-50%) translate(0,0) rotate(0) scale(.5); } 15% { opacity: 1; }
  100% { opacity: 0; transform: translate(-50%,-50%) translate(var(--dx), var(--dy)) rotate(var(--rot)) scale(1); } }
@keyframes fadeAway { to { opacity: 0; visibility: hidden; } }
`;

/* ---- Icons ---- */

function JasmineFlower({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden>
      <defs>
        <radialGradient id="jasminePetal" cx="50%" cy="85%" r="85%">
          <stop offset="0" stopColor="#fff6dc" />
          <stop offset=".55" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f1e4c2" />
        </radialGradient>
      </defs>
      {[0, 72, 144, 216, 288].map((r) => (
        <path key={r} d="M20 20 C13.5 16 13.5 5.5 20 3 C26.5 5.5 26.5 16 20 20Z" fill="url(#jasminePetal)" stroke="#e4d3a8" strokeWidth=".6" transform={`rotate(${r} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="3.2" fill="#f2c94c" />
      <circle cx="20" cy="20" r="1.4" fill="#cf8f1c" />
    </svg>
  );
}

function Sparkle({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <defs>
        <linearGradient id="sparkleGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff3cf" />
          <stop offset=".5" stopColor="#e8c477" />
          <stop offset="1" stopColor="#b8893a" />
        </linearGradient>
      </defs>
      <path d="M12 1 C13 8 16 11 23 12 C16 13 13 16 12 23 C11 16 8 13 1 12 C8 11 11 8 12 1Z" fill="url(#sparkleGold)" />
    </svg>
  );
}

function LotusEmblem() {
  return (
    <svg width="64" height="40" viewBox="0 0 64 40" aria-hidden>
      <defs>
        <linearGradient id="lotusInner" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5d8c41" />
          <stop offset="1" stopColor="#2f5a1e" />
        </linearGradient>
        <linearGradient id="lotusOuter" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7aa25a" />
          <stop offset="1" stopColor="#3d6e27" />
        </linearGradient>
      </defs>
      <g stroke="#fff3cf" strokeWidth=".8" strokeLinejoin="round">
        <path d="M32 35 C18 36.5 7 31 3 22 C14 20 25 25.5 32 35Z" fill="url(#lotusOuter)" />
        <path d="M32 35 C46 36.5 57 31 61 22 C50 20 39 25.5 32 35Z" fill="url(#lotusOuter)" />
        <path d="M32 35 C22 31.5 15 22 16 12 C25 15 30 23.5 32 35Z" fill="url(#lotusInner)" />
        <path d="M32 35 C42 31.5 49 22 48 12 C39 15 34 23.5 32 35Z" fill="url(#lotusInner)" />
        <path d="M32 35 C24.5 26 24.5 12 32 2 C39.5 12 39.5 26 32 35Z" fill="url(#lotusInner)" />
      </g>
      <path d="M13 37.5 Q32 41 51 37.5" fill="none" stroke="#2f5a1e" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/* ---- Doors ---- */

function Door({ side, phase }: { side: "l" | "r"; phase: Phase }) {
  const L = side === "l";
  const anim =
    phase === "closing"
      ? `${L ? "doorInL" : "doorInR"} .9s ${EASE} .15s both`
      : `${L ? "doorOpenL" : "doorOpenR"} 1.7s ${EASE} .1s both`;
  return (
    <div
      style={{
        position: "absolute", top: 0, bottom: 0, width: "50%", [L ? "left" : "right"]: 0,
        transformOrigin: L ? "left center" : "right center", animation: anim, willChange: "transform",
        background: "linear-gradient(180deg,#2f5a1e,#244a17)",
        borderLeft: L ? "none" : "1.5px solid #c99c4f", borderRight: L ? "1.5px solid #c99c4f" : "none",
        boxShadow: L ? "inset -18px 0 36px rgba(0,0,0,.3)" : "inset 18px 0 36px rgba(0,0,0,.3)",
        display: "flex", flexDirection: "column", gap: "4%", padding: "8% 9%",
        backfaceVisibility: "hidden",
      }}
    >
      {[0, 1].map((k) => (
        <div
          key={k}
          style={{
            flex: k ? 1.4 : 1, position: "relative", display: "grid", placeItems: "center",
            border: "1.5px solid #dcc08a", outline: "1px solid rgba(220,192,138,.35)", outlineOffset: -8,
            borderRadius: k ? "8px" : "120px 120px 8px 8px",
            background: "radial-gradient(circle, rgba(220,192,138,.12), transparent 70%)",
          }}
        >
          {/* the same mandala used in the hero */}
          <div style={{ width: "72%", opacity: 0.9 }}>
            <Mandala className="w-full" stroke="#dcc08a" width={1.2} />
          </div>
        </div>
      ))}
      {/* brass handle */}
      <div style={{ position: "absolute", top: "50%", [L ? "right" : "left"]: 14, width: 14, height: 14, borderRadius: "50%", transform: "translateY(-50%)", background: "radial-gradient(circle at 35% 35%, #fbe3a6, #b8893a 60%, #6d4a17)", boxShadow: "0 2px 5px rgba(0,0,0,.35)" }} />
    </div>
  );
}

type Flower = { dx: number; dy: number; rot: number; delay: number; size: number; sparkle: boolean };

function DoorOverlay({ phase }: { phase: Phase }) {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  useEffect(() => {
    // random values are made in the browser only
    setFlowers(
      Array.from({ length: 22 }, (_, i) => {
        const a = (i / 22) * Math.PI * 2 + Math.random() * 0.25;
        const d = 150 + Math.random() * 200;
        return { dx: Math.cos(a) * d, dy: Math.sin(a) * d, rot: Math.random() * 240 - 120, delay: Math.random() * 0.3, size: 16 + Math.random() * 12, sparkle: i % 4 === 0 };
      })
    );
  }, []);
  if (phase === "idle") return null;
  const opening = phase === "opening";
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, perspective: 2000, pointerEvents: "none", overflow: "hidden", animation: opening ? `fadeAway .6s ease 1.6s forwards` : undefined }}>
      <style>{DOOR_CSS}</style>
      <Door side="l" phase={phase} />
      <Door side="r" phase={phase} />

      {opening && (
        <>
          {/* soft warm light through the opening */}
          <div style={{ position: "absolute", left: "50%", top: "50%", width: "80vmax", height: "80vmax", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,246,220,.95) 0%, rgba(232,196,119,.45) 32%, transparent 62%)", animation: `glow 1.8s ${EASE} forwards`, willChange: "transform, opacity" }} />
          {flowers.map((f, i) => (
            <div
              key={i}
              style={{
                position: "absolute", left: "50%", top: "50%", opacity: 0, willChange: "transform, opacity",
                ["--dx" as string]: `${f.dx}px`, ["--dy" as string]: `${f.dy}px`, ["--rot" as string]: `${f.rot}deg`,
                animation: `drift 2.2s cubic-bezier(.22,1,.36,1) ${0.2 + f.delay}s forwards`,
              }}
            >
              {f.sparkle ? <Sparkle size={f.size * 0.7} /> : <JasmineFlower size={f.size} />}
            </div>
          ))}
        </>
      )}

      {/* lotus seal where the doors meet */}
      <div
        style={{
          position: "absolute", left: "50%", top: "50%", width: 104, height: 104, borderRadius: "50%",
          background: "radial-gradient(circle at 35% 30%, #fff3cf, #e2b867 48%, #a8762d 100%)",
          border: "1.5px solid #fff3cf", display: "grid", placeItems: "center", opacity: 0,
          animation: opening
            ? `sealOut .7s ${EASE} forwards`
            : `sealIn .6s ${EASE} .85s both, sealGlow 2.4s ease-in-out 1.45s infinite`,
        }}
      >
        <LotusEmblem />
      </div>
    </div>
  );
}

function Gallery() {
  const [imgs, setImgs] = useState<string[]>([]);
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [paused, setPaused] = useState(false);
  const [touchX, setTouchX] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/gallery").then((r) => r.json()).then(setImgs).catch(() => {});
  }, []);

  const n = imgs.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);

  useEffect(() => {
    if (n < 2 || paused || zoom) return;
    const id = setInterval(() => setI((v) => (v + 1) % n), 4500);
    return () => clearInterval(id);
  }, [n, paused, zoom]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "Escape") setZoom(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!n) return null;

  return (
    <Section className="show max-w-4xl mx-auto">
      <p className="serif uppercase tracking-[0.3em] text-sm text-[var(--gold)]">Cherished Moments</p>
      <h3 className="script text-5xl sm:text-6xl mt-2">Photo Gallery</h3>
      <div className="lotus-rule my-5"><Lotus /></div>

      <div
        className="pc"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX === null) return;
          const dx = e.changedTouches[0].clientX - touchX;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          setTouchX(null);
        }}
      >
        {/* Each card is 72% wide; the track shifts so the active card sits centered with neighbours peeking */}
        <div className="pc-track" style={{ transform: `translateX(calc(14% - ${i} * (72% + 14px)))` }}>
          {imgs.map((src, k) => (
            <button
              key={src}
              className={`pc-card ${k === i ? "on" : ""}`}
              onClick={() => (k === i ? setZoom(true) : setI(k))}
              aria-label={`Photo ${k + 1}`}
            >
              <img src={src} alt={`Photo ${k + 1}`} loading={k < 3 ? "eager" : "lazy"} />
              <span className="pc-num">{String(k + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
        {n > 1 && (
          <>
            <button className="pc-nav prev" onClick={() => go(-1)} aria-label="Previous photo">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
            </button>
            <button className="pc-nav next" onClick={() => go(1)} aria-label="Next photo">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          </>
        )}
      </div>

      {/* Progress bar + label + counter (inline styles so it shows without a server restart) */}
      <div style={{ maxWidth: 520, margin: "18px auto 0", padding: "0 4px" }}>
        <div style={{ height: 2, background: "rgba(184,137,58,.25)", borderRadius: 2, overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${((i + 1) / n) * 100}%`,
              background: "var(--green)",
              transition: "width .7s cubic-bezier(.65,0,.35,1)",
            }}
          />
        </div>
        <div className="serif" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", whiteSpace: "nowrap", gap: 12 }}>
          <span style={{ color: "var(--gold)" }}>Our Beautiful Moments</span>
          <span style={{ letterSpacing: ".15em" }}>
            <span style={{ color: "var(--green)", fontWeight: 700 }}>{String(i + 1).padStart(2, "0")}</span>
            <span style={{ color: "var(--gold-light)", margin: "0 8px" }}>/</span>
            <span style={{ color: "var(--gold)" }}>{String(n).padStart(2, "0")}</span>
          </span>
        </div>
      </div>

      {zoom && (
        <div className="lightbox" onClick={() => setZoom(false)}>
          <img src={imgs[i]} alt={`Photo ${i + 1}`} onClick={(e) => e.stopPropagation()} />
          <button className="close" aria-label="Close">✕</button>
          {n > 1 && (
            <>
              <button className="nav prev" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous photo">‹</button>
              <button className="nav next" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next photo">›</button>
            </>
          )}
        </div>
      )}
    </Section>
  );
}

function Petals() {
  const [items, setItems] = useState<{ left: number; delay: number; dur: number; size: number }[]>([]);
  useEffect(() => {
    setItems(Array.from({ length: 14 }, () => ({
      left: Math.random() * 100, delay: Math.random() * 12, dur: 10 + Math.random() * 10, size: 10 + Math.random() * 10,
    })));
  }, []);
  return (
    <>
      {items.map((p, i) => (
        <svg key={i} className="petal" style={{ left: `${p.left}%`, animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s` }} width={p.size} height={p.size} viewBox="0 0 20 20">
          {[0, 72, 144, 216, 288].map((r) => (
            <ellipse key={r} cx="10" cy="5" rx="2.5" ry="5" fill="#fffdf6" stroke="#e3d3ad" strokeWidth=".5" transform={`rotate(${r} 10 10)`} />
          ))}
          <circle cx="10" cy="10" r="1.8" fill="#e9cf7a" />
        </svg>
      ))}
    </>
  );
}

function Countdown() {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setLeft(Math.max(0, RECEPTION.getTime() - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const s = Math.floor((left ?? 0) / 1000);
  const parts = [
    ["Days", Math.floor(s / 86400)],
    ["Hours", Math.floor((s % 86400) / 3600)],
    ["Minutes", Math.floor((s % 3600) / 60)],
    ["Seconds", s % 60],
  ] as const;
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
      {parts.map(([label, v]) => (
        <div key={label} className="card py-3">
          <div className="serif text-3xl sm:text-4xl font-semibold">{left === null ? "--" : String(v).padStart(2, "0")}</div>
          <div className="text-[10px] sm:text-xs uppercase tracking-widest text-[var(--gold)]">{label}</div>
        </div>
      ))}
    </div>
  );
}

function Calendar() {
  // January 2027 starts on a Friday
  const blanks = 4;
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  return (
    <div className="card p-5 max-w-xs mx-auto">
      <div className="serif text-xl font-semibold mb-3">January 2027</div>
      <div className="grid grid-cols-7 gap-1 text-sm">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
          <div key={d} className="text-[var(--gold)] text-xs font-semibold">{d}</div>
        ))}
        {Array.from({ length: blanks }).map((_, i) => <div key={`b${i}`} />)}
        {days.map((d) => {
          const hl = d === 9;
          return (
            <div key={d} className={`aspect-square flex items-center justify-center rounded-full ${hl ? "bg-[var(--green)] text-[var(--ivory)] font-semibold ring-2 ring-[var(--gold-light)]" : ""}`}>
              {d}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`reveal px-4 py-16 text-center ${className}`}>{children}</section>;
}

function calendarLink() {
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: "Wedding Reception – Gokul & Ardra, Rahul & Jisna",
    dates: "20270109T110000Z/20270109T143000Z",
    location: VENUE,
    details: "With great pleasure, we invite you to join us for an evening of celebration and togetherness.",
  });
  return `https://calendar.google.com/calendar/render?${p}`;
}

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");

  // closing: card leaves, doors slide shut, seal glows → opening: page swaps in behind, doors swing open
  const openInvite = () => {
    if (phase !== "idle") return;
    setPhase("closing");
    setTimeout(() => {
      setOpened(true);
      window.scrollTo(0, 0);
      setPhase("opening");
    }, 1400);
    setTimeout(() => setPhase("idle"), 3800);
  };

  useEffect(() => {
    if (!opened) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("show")), { threshold: 0.15 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [opened]);

  if (!opened) {
    return (
      <main className="paper min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ paddingTop: 112 }}>
        {/* same pair as the hero, hanging in the extra top space; lined up with the card's right edge on wide screens */}
        <Lamp className="absolute top-0" size={104} style={{ right: "max(6px, calc(50% - 218px))" }} />
        <Lamp className="absolute top-0" size={70} style={{ right: "calc(max(6px, calc(50% - 218px)) + 66px)", animationDelay: "-1.6s" }} />
        <DoorOverlay phase={phase} />
        <div className="card max-w-md w-full text-center px-6 py-12 relative z-10" style={phase === "closing" ? { animation: "cardOut .6s cubic-bezier(.65,0,.35,1) forwards" } : undefined}>
          {/* names stay hidden until the invitation is opened */}
          {/* multiply blend lets any white in the artwork melt into the card */}
          <img
            src="/holding-hands.webp"
            alt="Bride and groom holding hands"
            style={{ display: "block", width: "min(240px, 72%)", height: "auto", margin: "-8px auto 14px", mixBlendMode: "multiply" }}
          />
          <p className="serif uppercase tracking-[0.3em] text-sm text-[var(--gold)]">Wedding Invitation</p>
          <h1 className="script text-5xl sm:text-6xl mt-6">You&apos;re Invited</h1>
          <Divider />
          <p className="serif text-lg">Saturday, 9 January 2027</p>
          <p className="italic text-sm mb-8">With joy, we invite you and your family</p>
          <button className="btn" onClick={openInvite}>Open Invitation</button>
        </div>
      </main>
    );
  }

  return (
    <main className="paper min-h-screen relative">
      <DoorOverlay phase={phase} />
      <Petals />

      {/* Hero */}
      <header className="hero relative min-h-screen flex items-center justify-center text-center px-4 py-20 overflow-hidden" style={{ paddingTop: 150 }}>
        {/* soft light + slow rotating mandala */}
        <div className="hero-glow" />
        <Mandala className="mandala absolute left-1/2 top-1/2 w-[720px] max-w-[160vw] -translate-x-1/2 -translate-y-1/2 opacity-[0.14]" />

        {/* kasavu drape, garland, lamps, foliage, kolam */}
        <Drape className="absolute left-0 top-0 h-full hidden sm:block" />
        <Garland className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] max-w-[120vw]" />
        {/* two diyas on the right, side by side with no gap: the big one outside, the current size next to it */}
        <Lamp className="absolute top-0" size={136} style={{ right: "clamp(0px, 4vw, 80px)" }} />
        <Lamp className="absolute top-0" size={84} style={{ right: "calc(clamp(0px, 4vw, 80px) + 68px)", animationDelay: "-1.6s" }} />
        <Jasmine className="absolute -bottom-6 right-0 opacity-80 -scale-x-100 rotate-180" />
        <Kolam className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[520px] max-w-[110vw] opacity-40" />

        {/* arched frame */}
        <div className="arch hero-in relative z-10 w-full max-w-lg px-6 sm:px-12 pt-16 pb-12">
          <span className="corner tl" /><span className="corner tr" /><span className="corner bl" /><span className="corner br" />
          <p className="serif uppercase tracking-[0.4em] text-xs sm:text-sm text-[var(--gold)]">॥ Save the Date ॥</p>
          <p className="italic text-sm mt-3 opacity-80">Together with their families</p>

          <h1 className="script name text-5xl sm:text-7xl mt-6">Gokul</h1>
          <p className="script text-3xl text-[var(--gold)] -my-1">&amp;</p>
          <h1 className="script name text-5xl sm:text-7xl">Ardra</h1>

          <div className="lotus-rule my-5"><Lotus /></div>

          <h2 className="script name text-[2.6rem] sm:text-6xl">Rahul</h2>
          <p className="script text-3xl text-[var(--gold)] -my-1">&amp;</p>
          <h2 className="script name text-[2.6rem] sm:text-6xl">Jisna</h2>

          <div className="date-ribbon serif mt-8">
            <span>Saturday</span>
            <strong>09</strong>
            <span>Jan 2027</span>
          </div>
        </div>

        <a href="#invite" className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce text-[var(--gold)]" aria-label="Scroll down">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
        </a>
      </header>

      {/* Parents & blessing */}
      <Section className="max-w-3xl mx-auto" >
        <div id="invite" />
        <p className="serif uppercase tracking-[0.3em] text-sm text-[var(--gold)]">With the blessings of</p>
        <h3 className="serif text-3xl font-bold mt-3">Balakrishnan C.P. &amp; Bindu M.</h3>
        <p className="italic mt-2">Naveena, Cherathu Parambil, Chendapuraya<br />A.R. Nagar · <a className="underline" href="tel:+919446543020">Mob: 9446543020</a></p>
        <Divider />
        <p className="italic text-lg sm:text-xl leading-relaxed">
          We solicit the honour of your gracious presence and blessings, along with your family,
          on the occasion of the wedding reception of our beloved sons
        </p>
      </Section>

      {/* Two weddings */}
      <Section className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {weddings.map((w) => (
            <div
              key={w.groom}
              className={`card p-8 ${w.bg ? "couple-bg pt-[22rem] sm:pt-[26rem]" : ""}`}
              style={
                w.bg
                  ? {
                      background: `linear-gradient(to top, rgba(248,243,230,.97) 0%, rgba(248,243,230,.9) 40%, rgba(248,243,230,.55) 58%, rgba(248,243,230,0) 78%), url(${w.bg}) ${w.bgPos} no-repeat, #f8f3e6`,
                    }
                  : undefined
              }
            >
              <h3 className="script text-5xl">{w.groom}</h3>
              <p className="script text-3xl">&amp;</p>
              <h3 className="script text-5xl">{w.bride}</h3>
              <p className="italic mt-4">({w.brideParents}<br />{w.brideHome})</p>
              <Divider />
              <p className="serif text-xl font-semibold">{w.date}</p>
              <p className="text-sm">({w.malayalam})</p>
              <p className="italic mt-2">{w.place}</p>
              <p className="mt-4 serif uppercase tracking-widest text-sm text-[var(--gold)]">Muhurtham</p>
              <p className="serif text-lg font-semibold">Between {w.muhurtham}</p>
            </div>
          ))}
        </div>
      </Section>

      <Gallery />

      {/* Reception */}
      <Section className="bg-[var(--green)] text-[var(--ivory)]">
        <p className="serif uppercase tracking-[0.3em] text-sm text-[var(--gold-light)]">Join Us</p>
        <h3 className="script text-5xl sm:text-6xl mt-2">Wedding Reception</h3>
        <p className="italic max-w-xl mx-auto mt-4">With great pleasure, we invite you to join us for an evening of celebration and togetherness</p>
        <div className="flex items-center justify-center gap-4 sm:gap-8 mt-10 serif">
          <div className="text-right">
            <div className="uppercase tracking-widest text-sm">Saturday</div>
            <div className="text-sm text-[var(--gold-light)]">4:30 – 8:00 PM</div>
          </div>
          <div className="border-x border-[var(--gold-light)] px-5 sm:px-8">
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-display), Georgia, serif",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: "clamp(3.5rem, 17vw, 4.75rem)",
                lineHeight: 1,
                fontVariantNumeric: "lining-nums",
                letterSpacing: "-.02em",
                background: "linear-gradient(180deg, #fff6dc 0%, #e8c477 60%, #c99c4f 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                padding: "0 .08em .06em",
              }}
            >
              09
            </span>
          </div>
          <div className="text-left">
            <div className="uppercase tracking-widest text-sm">January</div>
            <div className="text-sm text-[var(--gold-light)]">2027</div>
          </div>
        </div>
        <p className="serif text-xl mt-8 uppercase tracking-wider">{VENUE}</p>
      </Section>

      {/* Countdown + calendar */}
      <Section>
        <p className="serif uppercase tracking-[0.3em] text-sm text-[var(--gold)]">Counting down to the reception</p>
        <div className="mt-6"><Countdown /></div>
        <div className="mt-10"><Calendar /></div>
        <a className="btn mt-8" href={calendarLink()} target="_blank" rel="noreferrer">Add to Calendar</a>
      </Section>

      {/* Venue */}
      <Section className="max-w-3xl mx-auto">
        <p className="serif uppercase tracking-[0.3em] text-sm text-[var(--gold)]">Reception Venue</p>
        <h3 className="serif text-3xl font-bold mt-2">Olive Convention Centre</h3>
        <p className="italic">Kollamchina, Kadappadi</p>
        <div className="card overflow-hidden mt-6">
          <iframe title="Venue map" className="w-full h-72 border-0" loading="lazy" src={`https://maps.google.com/maps?q=${MAP_Q}&output=embed`} />
        </div>
        <a className="btn mt-6" href={`https://www.google.com/maps/search/?api=1&query=${MAP_Q}`} target="_blank" rel="noreferrer">Get Directions</a>
      </Section>

      {/* Invitation card section – hidden. Remove the "false &&" to show it again. */}
      {false && (
        <Section className="max-w-xl mx-auto">
          <p className="serif uppercase tracking-[0.3em] text-sm text-[var(--gold)]">Invitation Card</p>
          <img src="/invitation.jpeg" alt="Printed wedding invitation card" className="card mt-6 w-full p-2" />
          <a className="btn btn-outline mt-6" href="/invitation.jpeg" download>Download Card</a>
        </Section>
      )}

      <footer className="reveal text-center px-4 pb-16">
        <Divider />
        <p className="script text-4xl">Your presence would be the greatest gift</p>
        <p className="italic mt-4">Sharing the happiness: Athul Krishnan, Relatives &amp; Friends</p>
      </footer>
    </main>
  );
}