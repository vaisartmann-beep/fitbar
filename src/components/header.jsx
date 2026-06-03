/* header.jsx — wordmark, header, mega-menu, language menu, hero, footer */
import React from "react";
import { Icon, ProductShot } from "./Icon.jsx";
import { money } from "./money.js";
import { LANGS, MEGA, POPULAR_NOW } from "../data/data.js";

export function Wordmark({ light }) {
  return (
    <span className={"wordmark " + (light ? "wm-light" : "")}>
      <span className="wm-fit">FIT</span><span className="wm-bar">BAR</span><span className="wm-ee">.ee</span>
    </span>
  );
}

/* ---------- Language menu ---------- */
export function LangMenu({ lang, setLang }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", onDoc); return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const cur = LANGS.find((l) => l.code === lang);
  return (
    <div className="langmenu" ref={ref}>
      <button className="lang-btn" onClick={() => setOpen((o) => !o)} aria-haspopup="true" aria-expanded={open}>
        <Icon name="globe" size={17} style={{ opacity: .85 }} />
        <span className="lang-code">{cur.code.toUpperCase()}</span>
        <Icon name="chevron" size={15} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s", opacity: .6 }} />
      </button>
      {open ? (
        <div className="lang-pop">
          {LANGS.map((l) => (
            <button key={l.code} className={"lang-item " + (l.code === lang ? "is-on" : "")}
              onClick={() => { setLang(l.code); setOpen(false); }}>
              <span className="lang-badge">{l.code.toUpperCase()}</span>{l.label}
              {l.code === lang ? <Icon name="check" size={16} style={{ marginLeft: "auto" }} /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* ---------- Mega menu panel ---------- */
export function MegaMenu({ t, lang, onClose }) {
  const cols = MEGA[lang];
  const MCAT = ["accessories", "amino", "preworkout", "protein", "creatine", "protein", "preworkout", "hydration"];
  const curl = (i) => "#/kataloog" + (MCAT[i] ? "?category=" + MCAT[i] : "");
  return (
    <div className="mega" onMouseLeave={onClose}>
      <div className="mega-inner">
        <a className="mega-allhead" href="#/kataloog">{lang === "ee" ? "Kõik sportlastele" : t.cats.all} <Icon name="arrowR" size={16} /></a>
        <div className="mega-cols">
          {cols.map((c, i) => (
            <div key={i} className="mega-col">
              <h4>{c.h}</h4>
              <ul>{c.items.map((it) => <li key={it}><a href={curl(i)}>{it}</a></li>)}</ul>
              {c.all && c.items.length ? <a className="mega-all" href={curl(i)}>{lang==="ee"?"Vaata kõiki":t.cats.all} <Icon name="chevronR" size={13} /></a> : null}
            </div>
          ))}
        </div>
        <aside className="mega-pop">
          <div className="mega-pop-label"><Icon name="flame" size={15} />{t.popular.title}</div>
          {POPULAR_NOW.map((p) => (
            <a key={p.id} className="mega-pop-item" href="#/toode">
              <span className="mega-pop-shot"><ProductShot container={p.container} tint={p.tint} /></span>
              <span className="mega-pop-meta">
                <span className="mega-pop-name">{p.name}</span>
                <span className="mega-pop-price">{money(p.price, lang)}</span>
                <span className="mega-pop-view">{lang==="ee"?"Vaata":t.cats.all.split(" ")[0]} <Icon name="arrowR" size={13} /></span>
              </span>
            </a>
          ))}
        </aside>
      </div>
    </div>
  );
}

/* ---------- Header ---------- */
export function Header({ t, lang, setLang, cartCount, onCart }) {
  const [mega, setMega] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const tgt = document.querySelector(".scroll-root");
    function onScroll() { setScrolled((tgt ? tgt.scrollTop : window.scrollY) > 8); }
    (tgt || window).addEventListener("scroll", onScroll, { passive: true });
    return () => (tgt || window).removeEventListener("scroll", onScroll);
  }, []);
  const navItems = [
    { key: "supplements", mega: true }, { key: "athletes", mega: true }, { key: "food", mega: true },
    { key: "vegan", mega: true }, { key: "new" }, { key: "brands", mega: true }, { key: "sales", sale: true },
  ];
  return (
    <header className={"hdr " + (scrolled ? "is-scrolled" : "")}>
      <div className="promo"><div className="wrap promo-in"><Icon name="truck" size={15} />{t.promo}</div></div>
      <div className="hdr-main">
        <div className="wrap hdr-row">
          <a className="hdr-brand" href="#/" aria-label="Fitbar.ee">
            <span className="brand-plate"><Wordmark light /></span>
          </a>
          <nav className="hdr-nav" onMouseLeave={() => setMega(false)}>
            {navItems.map((n) => (
              <button key={n.key}
                className={"nav-item " + (n.sale ? "nav-sale " : "") + (mega === n.key ? "is-open" : "")}
                onMouseEnter={() => setMega(n.mega ? n.key : false)}
                onClick={() => n.mega && setMega((m) => (m === n.key ? false : n.key))}>
                {t.nav[n.key]}
                {n.mega ? <Icon name="chevron" size={14} /> : null}
              </button>
            ))}
            {mega ? <MegaMenu t={t} lang={lang} onClose={() => setMega(false)} /> : null}
          </nav>
          <div className="hdr-actions">
            <button className="icon-btn search-trigger" aria-label="Search"><Icon name="search" size={20} /></button>
            <LangMenu lang={lang} setLang={setLang} />
            <button className="icon-btn" aria-label={t.account}><Icon name="user" size={20} /></button>
            <button className="icon-btn cart-btn" aria-label={t.cart} onClick={onCart}>
              <Icon name="cart" size={20} />
              {cartCount > 0 ? <span className="cart-dot">{cartCount}</span> : null}
            </button>
          </div>
        </div>
        <div className="wrap hdr-searchrow">
          <div className="searchbar">
            <Icon name="search" size={18} />
            <input placeholder={t.searchPh} aria-label={t.searchPh} />
          </div>
        </div>
      </div>
      {mega ? <div className="mega-scrim" onClick={() => setMega(false)} /> : null}
    </header>
  );
}

/* ---------- Hero (3 layouts) ---------- */
export function TrustStrip({ t }) {
  const items = [["truck", t.trust.delivery], ["rotate", t.trust.returns], ["shield", t.trust.payment], ["check", t.trust.quality]];
  return (
    <div className="trust-card">
      {items.map(([ic, [a, b]], i) => (
        <div key={i} className="trust-item">
          <span className="trust-ic"><Icon name={ic} size={20} /></span>
          <div><strong>{a}</strong><span>{b}</span></div>
        </div>
      ))}
    </div>
  );
}

export function Hero({ t, layout, onShop }) {
  return (
    <section className={"hero hero-" + layout}>
      <div className="hero-bg" aria-hidden="true"><div className="hero-photo" /><div className="hero-veil" /></div>
      <div className="wrap hero-wrap">
        <div className="hero-text">
          <div className="hero-eyebrow"><span className="eyebrow-dot" />{t.hero.eyebrow}</div>
          <h1 className="hero-title">{t.hero.title1} <span className="hl">{t.hero.title2}</span></h1>
          <p className="hero-sub">{t.hero.sub}</p>
          <div className="hero-cta">
            <button className="btn btn-red lg" onClick={onShop}>{t.hero.cta1} <Icon name="arrowR" size={18} /></button>
            <a className="btn btn-glass lg" href="#">{t.hero.cta2}</a>
          </div>
          <div className="hero-meta">{t.hero.meta}</div>
        </div>
        <div className="hero-side"><TrustStrip t={t} /></div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
const PAYMENTS = ["VISA", "Mastercard", "Apple Pay", "Google Pay", "Swedbank", "SEB", "LHV", "Luminor", "Inbank"];
export function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="wrap foot-grid">
        <div className="foot-brand">
          <Wordmark light />
          <p>{t.footer.tagline}</p>
          <div className="foot-social">
            <a href="#" aria-label="Facebook"><Icon name="fb" size={18} /></a>
            <a href="#" aria-label="Instagram"><Icon name="ig" size={18} /></a>
          </div>
        </div>
        <div className="foot-col">
          <h4>{t.footer.shop}</h4>
          <ul>{t.footer.shopLinks.map((l) => <li key={l}><a href="#">{l}</a></li>)}</ul>
        </div>
        <div className="foot-col">
          <h4>{t.footer.info}</h4>
          <ul>{t.footer.infoLinks.map((l) => <li key={l}><a href="#">{l}</a></li>)}</ul>
        </div>
        <div className="foot-col foot-contact">
          <h4>{t.footer.contact}</h4>
          <ul>
            <li><span className="foot-ic"><Icon name="pin" size={16} /></span>{t.store.address}</li>
            <li><span className="foot-ic"><Icon name="phone" size={16} /></span><a href={"tel:"+t.store.phone.replace(/\s/g,"")}>{t.store.phone}</a></li>
            <li><span className="foot-ic"><Icon name="mail" size={16} /></span><a href={"mailto:"+t.store.email}>{t.store.email}</a></li>
            <li className="foot-hours"><span className="foot-ic"><Icon name="clock" size={16} /></span>
              <span>{t.footer.hours.map((h,i)=><span key={i} className="foot-hour">{h}</span>)}</span></li>
          </ul>
        </div>
      </div>
      <div className="foot-bottom">
        <div className="wrap foot-bottom-in">
          <span className="foot-rights">{t.footer.rights}</span>
          <div className="foot-pay">
            {PAYMENTS.map((p) => <span key={p} className="pay-badge">{p}</span>)}
          </div>
        </div>
      </div>
    </footer>
  );
}
