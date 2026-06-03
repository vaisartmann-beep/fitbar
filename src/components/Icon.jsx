/* Icon.jsx — line icons + CSS product silhouettes */
import React from "react";

export function Icon({ name, size = 20, stroke = 1.7, style }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    chevron: <polyline points="6 9 12 15 18 9" {...p} />,
    chevronR: <polyline points="9 6 15 12 9 18" {...p} />,
    search: <g {...p}><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.5" y2="16.5" /></g>,
    user: <g {...p}><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-6 8-6s8 2 8 6" /></g>,
    cart: <g {...p}><circle cx="9" cy="20" r="1.6" /><circle cx="18" cy="20" r="1.6" /><path d="M2 3h3l2.4 13.2a1.5 1.5 0 0 0 1.5 1.3h8.2a1.5 1.5 0 0 0 1.5-1.2L21 7H6" /></g>,
    truck: <g {...p}><path d="M3 6h11v9H3z" /><path d="M14 9h4l3 3v3h-7z" /><circle cx="7.5" cy="18" r="1.7" /><circle cx="17.5" cy="18" r="1.7" /></g>,
    rotate: <g {...p}><path d="M4 12a8 8 0 0 1 13.6-5.7L21 9" /><polyline points="21 4 21 9 16 9" /><path d="M20 12a8 8 0 0 1-13.6 5.7L3 15" /><polyline points="3 20 3 15 8 15" /></g>,
    shield: <g {...p}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><polyline points="9 12 11.5 14.5 16 9.5" /></g>,
    check: <g {...p}><circle cx="12" cy="12" r="9" /><polyline points="8 12.5 11 15.5 16 9.5" /></g>,
    headset: <g {...p}><path d="M4 13v-1a8 8 0 0 1 16 0v1" /><path d="M4 13a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2z" /><path d="M20 13a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2z" /><path d="M20 18v1a3 3 0 0 1-3 3h-3" /></g>,
    drop: <path d="M12 3c3 4 6 7 6 10.5A6 6 0 0 1 6 13.5C6 10 9 7 12 3z" {...p} />,
    muscle: <g {...p}><path d="M6.5 9.5h11" /><path d="M4 9.5h2.5v5H4z" /><path d="M17.5 9.5H20v5h-2.5z" /><path d="M6.5 8h11v8h-11z" /></g>,
    bolt: <polygon points="13 2 4 14 11 14 10 22 20 9 13 9 13 2" {...p} />,
    heart: <path d="M12 20s-7-4.4-9.2-8.3C1.2 8.5 2.7 5 6 5c2 0 3.2 1.3 4 2.4C10.8 6.3 12 5 14 5c3.3 0 4.8 3.5 3.2 6.7C19 15.6 12 20 12 20z" {...p} />,
    leaf: <g {...p}><path d="M4 20c0-9 7-15 16-15 0 9-6 15-15 15H4z" /><path d="M4 20c4-6 8-8 12-9" /></g>,
    moon: <path d="M20 14.5A8 8 0 0 1 9.5 4 7.5 7.5 0 1 0 20 14.5z" {...p} />,
    star: <polygon points="12 3 14.6 8.7 21 9.5 16.3 13.8 17.6 20 12 16.9 6.4 20 7.7 13.8 3 9.5 9.4 8.7" />,
    pin: <g {...p}><path d="M12 21c5-5 7-8.4 7-11A7 7 0 0 0 5 10c0 2.6 2 6 7 11z" /><circle cx="12" cy="10" r="2.5" /></g>,
    clock: <g {...p}><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15.5 14" /></g>,
    phone: <path d="M5 4h3l1.5 5-2 1.5a12 12 0 0 0 6 6l1.5-2 5 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" {...p} />,
    mail: <g {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><polyline points="3.5 6.5 12 13 20.5 6.5" /></g>,
    arrowR: <g {...p}><line x1="4" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" /></g>,
    plus: <g {...p}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></g>,
    minus: <line x1="5" y1="12" x2="19" y2="12" {...p} />,
    close: <g {...p}><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></g>,
    external: <g {...p}><path d="M14 5h5v5" /><line x1="19" y1="5" x2="11" y2="13" /><path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" /></g>,
    directions: <g {...p}><polygon points="12 2 22 12 12 22 2 12 12 2" /><path d="M9 13v-2a2 2 0 0 1 2-2h4" /><polyline points="13 7 16 9 13 11" /></g>,
    fb: <path d="M14 7h2V4h-2c-2.2 0-3.5 1.4-3.5 3.7V10H8v3h2.5v8H14v-8h2.3l.5-3H14V8c0-.7.3-1 1-1z" fill="currentColor" />,
    ig: <g {...p}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" /></g>,
    flame: <path d="M12 3c1 3-1.5 4.5-1.5 7A2.5 2.5 0 0 0 13 12c0-1 .5-1.7.5-1.7.8 1 2 2.6 2 4.7a3.5 3.5 0 0 1-7 0c0-3 3.5-4.6 3.5-12z" {...p} />,
    globe: <g {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" /></g>,
    grid: <g {...p}><rect x="3.5" y="3.5" width="7" height="7" rx="1.4" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.4" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.4" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.4" /></g>,
  };
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} style={{ display: "block", flex: "none", ...style }} aria-hidden="true">
      {paths[name] || null}
    </svg>
  );
}

export const GOAL_ICON = { weightloss: "drop", muscle: "muscle", energy: "bolt", endurance: "heart", health: "leaf", recovery: "moon" };
export const WHY_ICON = { delivery: "truck", payment: "shield", brands: "check", support: "headset", returns: "rotate" };

/* Product silhouette — clean monochrome container stand-ins (no fake brand photos). */
export function ProductShot({ container = "tub", tint = 20, label }) {
  const accent = `oklch(0.62 0.13 ${tint})`;
  const body = `oklch(0.93 0.012 ${tint})`;
  const bodyEdge = `oklch(0.85 0.02 ${tint})`;
  const cap = `oklch(0.42 0.04 ${tint})`;
  const shapes = {
    tub: (
      <div className="shot-tub">
        <div className="shot-lid" />
        <div className="shot-body">
          <div className="shot-band" />
          <div className="shot-strip" />
        </div>
      </div>
    ),
    bottle: (
      <div className="shot-bottle">
        <div className="shot-neck" /><div className="shot-cap2" />
        <div className="shot-body2"><div className="shot-band" /></div>
      </div>
    ),
    pouch: (
      <div className="shot-pouch">
        <div className="shot-seal" />
        <div className="shot-bag"><div className="shot-band" /></div>
      </div>
    ),
    can: (
      <div className="shot-can">
        <div className="shot-canTop" />
        <div className="shot-canBody"><div className="shot-strip" /></div>
      </div>
    ),
    bar: (
      <div className="shot-bar"><div className="shot-barInner" /></div>
    ),
  };
  return (
    <div className="shot" style={{ "--accent": accent, "--body": body, "--bodyEdge": bodyEdge, "--cap": cap }}>
      <div className="shot-shadow" />
      {shapes[container] || shapes.tub}
    </div>
  );
}
