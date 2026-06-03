/* bento.jsx — Bento hero + product spotlight + smart product card (homepage) */
import React from "react";
import { Icon, ProductShot, GOAL_ICON } from "./Icon.jsx";
import { money } from "./money.js";
import { CATEGORY_META, GOAL_META, NEW_PRODUCTS, BESTSELLERS } from "../data/data.js";

function catUrl(key) { const m = { athletes: "goal=muscle", supplements: "category=vitamins", vegan: "vegan=1", food: "category=snacks" }; return "#/kataloog" + (m[key] ? "?" + m[key] : ""); }
const PDP_URL = "#/toode";

export function BentoHero({ t, lang, onShop, onAdd }) {
  const catA = CATEGORY_META[0], catB = CATEGORY_META[1];
  const [aName] = t.cats.items[catA.key], [bName] = t.cats.items[catB.key];
  const goalKeys = GOAL_META.slice(0, 5);
  const best = BESTSELLERS[4]; // Applied Creatine
  const [added, setAdded] = React.useState(false);
  function addBest(e) { e.stopPropagation(); onAdd(best); setAdded(true); clearTimeout(addBest._t); addBest._t = setTimeout(() => setAdded(false), 1400); }
  return (
    <section className="bento-band">
      <div className="wrap">
        <div className="bento">
          <div className="bh-tile bh-hero">
            <div className="bh-hero-glow" />
            <div className="bh-hero-top">
              <div className="bh-eyebrow"><span className="eyebrow-dot" />{t.hero.eyebrow}</div>
            </div>
            <div className="bh-hero-main">
              <h1 className="bh-title">{t.hero.title1} <span className="hl">{t.hero.title2}</span></h1>
              <p className="bh-sub">{t.hero.sub}</p>
              <div className="bh-cta">
                <button className="btn btn-red lg" onClick={onShop}>{t.hero.cta1} <Icon name="arrowR" size={18} /></button>
                <a className="bh-browse" href="#">{t.bento.browse} <Icon name="arrowR" size={15} /></a>
              </div>
            </div>
          </div>

          <a className="bh-tile bh-cat" href={catUrl(catA.key)}>
            <div className="bh-cat-shot" style={{ "--ch": catA.tint }}><ProductShot container={catA.container} tint={catA.tint} /></div>
            <div className="bh-cat-l"><b>{aName}</b><span>{catA.count} {t.cats.count}</span></div>
            <span className="bh-cat-go"><Icon name="arrowR" size={15} /></span>
          </a>

          <a className="bh-tile bh-cat" href={catUrl(catB.key)}>
            <div className="bh-cat-shot" style={{ "--ch": catB.tint }}><ProductShot container={catB.container} tint={catB.tint} /></div>
            <div className="bh-cat-l"><b>{bName}</b><span>{catB.count} {t.cats.count}</span></div>
            <span className="bh-cat-go"><Icon name="arrowR" size={15} /></span>
          </a>

          <div className="bh-tile bh-goals">
            <span className="bh-goals-k"><Icon name="bolt" size={14} />{t.goals.title}</span>
            <div className="bh-goals-chips">
              {goalKeys.map((g) => <a key={g.key} href="#"><Icon name={GOAL_ICON[g.key]} size={15} />{t.goals.items[g.key][0]}</a>)}
            </div>
          </div>

          <div className="bh-tile bh-trust">
            <div className="bh-trust-bg" />
            <div className="bh-trust-rate"><span className="bh-stars">★★★★★</span><b>4.9</b><span className="bh-rate-c">· 37</span></div>
            <ul className="bh-trust-list">
              <li><Icon name="truck" size={15} />{t.trust.delivery[0]} <em>89€+</em></li>
              <li><Icon name="rotate" size={15} />{t.trust.returns[0]}</li>
              <li><Icon name="shield" size={15} />{t.trust.payment[0]}</li>
            </ul>
          </div>

          <article className="bh-tile bh-prod" onClick={() => { window.location.href = PDP_URL; }} style={{ cursor: "pointer" }}>
            <span className="bh-badge">{t.prod.hot}</span>
            <div className="bh-prod-shot"><ProductShot container={best.container} tint={best.tint} /></div>
            <div className="bh-prod-l">
              <span className="bh-prod-brand">{best.brand}</span>
              <b>{best.name}</b>
              <div className="bh-prod-foot">
                <span className="bh-prod-price">{money(best.price, lang)}</span>
                <button className={"bh-add " + (added ? "is-added" : "")} onClick={addBest} aria-label={t.prod.add}>
                  <Icon name={added ? "check" : "plus"} size={16} />
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export function ProductSpotlight({ t, lang, onAdd }) {
  const p = NEW_PRODUCTS.find((x) => x.id === "n7") || NEW_PRODUCTS[6];
  const [added, setAdded] = React.useState(false);
  function add() { onAdd(p); setAdded(true); clearTimeout(add._t); add._t = setTimeout(() => setAdded(false), 1500); }
  const specs = [t.spot.specA, t.spot.specB, t.spot.specC];
  return (
    <section className="band spot-band">
      <div className="wrap">
        <div className="spot">
          <div className="spot-left">
            <div className="spot-kicker"><span className="eyebrow-dot" />{t.spot.kicker}</div>
            <div className="spot-brand">{p.brand}</div>
            <h2 className="spot-name">{p.name.split(" — ")[0]}</h2>
            <p className="spot-lead">{t.spot.lead}</p>
            <div className="spot-row">
              <span className="spot-price">{money(p.price, lang)}</span>
              <button className={"btn btn-red lg " + (added ? "spot-added" : "")} onClick={add}>
                <Icon name={added ? "check" : "plus"} size={18} />{added ? t.prod.added : t.prod.add}
              </button>
              <a className="spot-view" href={PDP_URL}>{t.spot.view} <Icon name="arrowR" size={15} /></a>
            </div>
            <div className="spot-specs">
              {specs.map(([a, b], i) => <div key={i}><b>{a}</b><span>{b}</span></div>)}
            </div>
          </div>
          <div className="spot-stage">
            <div className="spot-ring" /><div className="spot-ped" />
            <span className="spot-flav">{p.flavors} {t.prod.flavors}</span>
            <div className="spot-shot"><ProductShot container={p.container} tint={p.tint} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProductCardX({ p, t, lang, onAdd, cartMap, onStep }) {
  const variants = p.variants || null;
  const [vi, setVi] = React.useState(0);
  const badge = p.badge === "new" ? t.prod.new : p.badge === "hot" ? t.prod.hot : null;
  const currentId = variants ? p.id + "-" + vi : p.id;
  const qty = (cartMap && cartMap[currentId]) || 0;
  function add(e) {
    e.stopPropagation();
    const item = variants
      ? { ...p, id: currentId, name: p.name.split(" — ")[0] + " · " + variants[vi] }
      : p;
    onAdd(item);
  }
  function step(e, d) { e.stopPropagation(); onStep(currentId, d); }
  return (
    <article className="pcardx" tabIndex={0} onClick={() => { window.location.href = PDP_URL; }} style={{ cursor: "pointer" }}>
      <div className="pcardx-media">
        {badge ? <span className={"pbadge " + (p.badge === "hot" ? "pbadge-hot" : "")}>{badge}</span> : null}
        <ProductShot container={p.container} tint={p.tint} />
        {p.facts ? (
          <div className="pcx-facts">
            <div className="pcx-facts-h">{t.prod.facts}</div>
            <div className="pcx-facts-g">
              {p.facts.map(([k, v], i) => <div key={i} className="pcx-fact"><b>{v}</b><span>{k}</span></div>)}
            </div>
          </div>
        ) : null}
      </div>
      <div className="pcardx-body">
        <div className="pcardx-brand">{p.brand}</div>
        <h3 className="pcardx-name">{p.name}</h3>
        {variants ? (
          <div className="pcx-vars">
            <div className="pcx-vars-h">{t.prod.choose}</div>
            <div className="pcx-vars-row">
              {variants.map((v, i) => (
                <button key={i} className={"pcx-chip " + (i === vi ? "is-on" : "")}
                  title={v} onClick={(e) => { e.stopPropagation(); setVi(i); }}>{v}</button>
              ))}
            </div>
          </div>
        ) : null}
        <div className="pcardx-foot">
          <span className="pcardx-price">{money(p.price, lang)}</span>
          {qty > 0 ? (
            <div className="pcx-qty">
              <button onClick={(e) => step(e, -1)} aria-label="-"><Icon name="minus" size={15} /></button>
              <span>{qty}</span>
              <button onClick={(e) => step(e, 1)} aria-label="+"><Icon name="plus" size={15} /></button>
            </div>
          ) : (
            <button className="pcx-add" onClick={add}>
              <Icon name="cart" size={16} /><span>{t.prod.add}</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProductRowX({ products, t, lang, onAdd, cartMap, onStep }) {
  return (
    <div className="pgrid pgrid-x">
      {products.map((p) => <ProductCardX key={p.id} p={p} t={t} lang={lang} onAdd={onAdd} cartMap={cartMap} onStep={onStep} />)}
    </div>
  );
}
