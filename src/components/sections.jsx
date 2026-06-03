/* sections.jsx — reusable cards + content sections */
import React from "react";
import { Icon, ProductShot, GOAL_ICON, WHY_ICON } from "./Icon.jsx";
import { money } from "./money.js";
import { CATEGORY_META, GOAL_META, BRANDS, WHY_META, POPULAR_SEARCHES } from "../data/data.js";

export { money };

export function SectionHead({ title, sub, kicker, action, onAction }) {
  return (
    <div className="sec-head">
      <div>
        {kicker ? <div className="sec-kicker">{kicker}</div> : null}
        <h2 className="sec-title">{title}</h2>
        {sub ? <p className="sec-sub">{sub}</p> : null}
      </div>
      {action ? (
        <button className="link-btn" onClick={onAction}>
          {action} <Icon name="arrowR" size={17} />
        </button>
      ) : null}
    </div>
  );
}

export function ProductCard({ p, t, lang, onAdd }) {
  const [added, setAdded] = React.useState(false);
  const badge = p.badge === "new" ? t.prod.new : p.badge === "hot" ? t.prod.hot : null;
  function add(e) {
    e.stopPropagation();
    onAdd(p);
    setAdded(true);
    clearTimeout(add._t); add._t = setTimeout(() => setAdded(false), 1400);
  }
  return (
    <article className="pcard" tabIndex={0}>
      <div className="pcard-media">
        {badge ? <span className={"pbadge " + (p.badge === "hot" ? "pbadge-hot" : "")}>{badge}</span> : null}
        <ProductShot container={p.container} tint={p.tint} />
        <button className={"pcard-add " + (added ? "is-added" : "")} onClick={add} aria-label={t.prod.add}>
          <Icon name={added ? "check" : "plus"} size={18} />
          <span>{added ? t.prod.added : t.prod.add}</span>
        </button>
      </div>
      <div className="pcard-body">
        <div className="pcard-brand">{p.brand}</div>
        <h3 className="pcard-name">{p.name}</h3>
        <div className="pcard-foot">
          <span className="pcard-price">{money(p.price, lang)}</span>
          {p.flavors ? <span className="pcard-flav">{p.flavors} {t.prod.flavors}</span> : null}
        </div>
      </div>
    </article>
  );
}

export function ProductRow({ products, t, lang, onAdd }) {
  return (
    <div className="pgrid">
      {products.map((p) => <ProductCard key={p.id} p={p} t={t} lang={lang} onAdd={onAdd} />)}
    </div>
  );
}

/* ---- Popular categories ---- */
export function CategoriesSection({ t }) {
  return (
    <section className="band">
      <div className="wrap">
        <SectionHead title={t.cats.title} sub={t.cats.sub} action={t.cats.all} />
        <div className="cat-grid">
          {CATEGORY_META.map((c) => {
            const [name, desc] = t.cats.items[c.key];
            return (
              <a key={c.key} className="catcard" href="#">
                <div className="catcard-media" style={{ "--ch": c.tint }}>
                  <ProductShot container={c.container} tint={c.tint} />
                  <span className="catcard-count">{c.count} {t.cats.count}</span>
                </div>
                <div className="catcard-body">
                  <h3>{name}</h3>
                  <p>{desc}</p>
                  <span className="catcard-go"><Icon name="arrowR" size={16} /></span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---- Shop by goal ---- */
export function GoalsSection({ t }) {
  return (
    <section className="band">
      <div className="wrap">
        <SectionHead title={t.goals.title} sub={t.goals.sub} />
        <div className="goal-grid">
          {GOAL_META.map((g) => {
            const [name, desc] = t.goals.items[g.key];
            return (
              <a key={g.key} className="goalcard" href="#">
                <span className="goal-ic"><Icon name={GOAL_ICON[g.key]} size={24} /></span>
                <h3>{name}</h3>
                <p>{desc}</p>
                <span className="goal-arrow"><Icon name="arrowR" size={16} /></span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---- Brands ---- */
export function BrandsSection({ t }) {
  return (
    <section className="band band-tight">
      <div className="wrap">
        <SectionHead title={t.brands.title} sub={t.brands.sub} action={t.brands.all} />
        <div className="brand-grid">
          {BRANDS.map((b) => (
            <a key={b} className="brand-chip" href="#">{b}</a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Why choose us (dark) ---- */
export function WhySection({ t }) {
  return (
    <section className="band band-dark why-band">
      <div className="why-bg" aria-hidden="true" />
      <div className="wrap why-wrap">
        <div className="sec-head">
          <div>
            <h2 className="sec-title onlight">{t.why.title}</h2>
            <p className="sec-sub onlight-sub">{t.why.sub}</p>
          </div>
        </div>
        <div className="why-grid">
          {WHY_META.map((w) => {
            const [title, desc] = t.why.items[w.key];
            return (
              <div key={w.key} className="whycard">
                <span className="why-ic"><Icon name={WHY_ICON[w.key]} size={24} /></span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---- Reviews ---- */
export function ReviewsSection({ t }) {
  return (
    <section className="band">
      <div className="wrap">
        <SectionHead title={t.reviews.title} sub={t.reviews.sub} />
        <div className="rev-grid">
          {t.reviews.items.map(([body, name], i) => (
            <figure key={i} className="revcard">
              <div className="rev-stars">{[0,1,2,3,4].map((s)=><Icon key={s} name="star" size={18} />)}</div>
              <blockquote>“{body}”</blockquote>
              <figcaption>{name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Store / map ---- */
export function StoreSection({ t }) {
  return (
    <section className="band">
      <div className="wrap">
        <SectionHead title={t.store.title} sub={t.store.sub} />
        <div className="store-grid">
          <div className="store-info">
            <ul>
              <li><span className="store-ic"><Icon name="pin" size={18} /></span>
                <div><strong>{t.store.name}</strong><span>{t.store.address}</span></div></li>
              <li><span className="store-ic"><Icon name="clock" size={18} /></span>
                <div><strong>{t.store.hoursLabel}</strong>{t.store.hours.map((h,i)=><span key={i}>{h}</span>)}</div></li>
              <li><span className="store-ic"><Icon name="phone" size={18} /></span>
                <div><a href={"tel:" + t.store.phone.replace(/\s/g,"")}>{t.store.phone}</a></div></li>
              <li><span className="store-ic"><Icon name="mail" size={18} /></span>
                <div><a href={"mailto:" + t.store.email}>{t.store.email}</a></div></li>
            </ul>
            <div className="store-cta">
              <a className="btn btn-dark sm" href="#"><Icon name="directions" size={17} />{t.store.directions}</a>
              <a className="btn btn-ghost sm" href="#"><Icon name="external" size={17} />{t.store.visit}</a>
            </div>
          </div>
          <div className="store-map" role="img" aria-label="Map: Rävala pst 6, Tallinn">
            <div className="map-grid-lines" />
            <div className="map-road map-road-1" /><div className="map-road map-road-2" /><div className="map-road map-road-3" />
            <div className="map-pin"><Icon name="pin" size={30} /></div>
            <div className="map-card">
              <strong>Fitbar.ee — Sport Nutrition Store</strong>
              <span>Rävala pst 6, 10143 Tallinn</span>
              <span className="map-rate"><Icon name="star" size={14} /> 4.9 · 37</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Newsletter (dark, full-bleed) ---- */
export function NewsletterSection({ t }) {
  const [val, setVal] = React.useState("");
  const [done, setDone] = React.useState(false);
  function submit(e) { e.preventDefault(); if (val.includes("@")) setDone(true); }
  return (
    <section className="news-band">
      <div className="news-bg" aria-hidden="true" />
      <div className="wrap news-wrap">
        <div className="news-text">
          <h2>{t.news.title}</h2>
          <p>{t.news.sub}</p>
        </div>
        {done ? (
          <div className="news-done">{t.news.done}</div>
        ) : (
          <form className="news-form" onSubmit={submit}>
            <input type="email" required value={val} onChange={(e)=>setVal(e.target.value)} placeholder={t.news.ph} aria-label={t.news.ph} />
            <button className="btn btn-red" type="submit">{t.news.btn}</button>
            <span className="news-note">{t.news.note}</span>
          </form>
        )}
      </div>
    </section>
  );
}

/* ---- Popular searches ---- */
export function PopularSearches({ t }) {
  return (
    <section className="band-dark pop-band">
      <div className="wrap">
        <div className="pop-label"><Icon name="flame" size={16} />{t.popular.title}</div>
        <div className="pop-chips">
          {POPULAR_SEARCHES.map((s) => <a key={s} className="pop-chip" href="#">{s}</a>)}
        </div>
      </div>
    </section>
  );
}
