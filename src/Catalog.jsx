/* Catalog.jsx — catalog page with filters */
import React from "react";
import { Icon, ProductShot } from "./components/Icon.jsx";
import { money } from "./components/money.js";
import { Header, Footer } from "./components/header.jsx";
import { NewsletterSection, PopularSearches } from "./components/sections.jsx";
import { ProductCardX } from "./components/bento.jsx";
import { I18N } from "./data/data.js";
import { buildCatalog, CAT_CATS, CAT_GOALS, CAT_UI } from "./data/catalog-data.js";

function CatCart({ open, onClose, items, setItems, t, lang }) {
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const count = items.reduce((s, it) => s + it.qty, 0);
  const left = Math.max(0, 89 - subtotal);
  const pct = Math.min(100, (subtotal / 89) * 100);
  function setQty(id, d) { setItems((a) => a.flatMap((it) => it.id !== id ? [it] : (it.qty + d <= 0 ? [] : [{ ...it, qty: it.qty + d }]))); }
  return (
    <React.Fragment>
      <div className={"drawer-scrim " + (open ? "is-open" : "")} onClick={onClose} />
      <aside className={"drawer " + (open ? "is-open" : "")} aria-hidden={!open}>
        <div className="drawer-head">
          <h3><Icon name="cart" size={20} />{t.cartUI.title} {count ? <span className="drawer-count">{count}</span> : null}</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><Icon name="close" size={20} /></button>
        </div>
        {items.length === 0 ? (
          <div className="drawer-empty"><span className="empty-ic"><Icon name="cart" size={34} /></span><p>{t.cartUI.empty}</p>
            <button className="btn btn-red" onClick={onClose}>{t.cartUI.emptyCta}</button></div>
        ) : (
          <React.Fragment>
            <div className="ship-bar"><div className="ship-msg">{left > 0 ? t.cartUI.freeLeft(money(left, lang).replace(" €", "").replace("€", "")) : t.cartUI.freeOk}</div>
              <div className="ship-track"><div className="ship-fill" style={{ width: pct + "%" }} /></div></div>
            <div className="drawer-items">
              {items.map((it) => (
                <div key={it.id} className="ditem">
                  <span className="ditem-shot"><ProductShot container={it.container} tint={it.tint} /></span>
                  <div className="ditem-mid"><div className="ditem-brand">{it.brand}</div><div className="ditem-name">{it.name}</div>
                    <div className="ditem-row"><div className="qty">
                      <button onClick={() => setQty(it.id, -1)}><Icon name="minus" size={15} /></button><span>{it.qty}</span>
                      <button onClick={() => setQty(it.id, 1)}><Icon name="plus" size={15} /></button></div>
                      <span className="ditem-price">{money(it.price * it.qty, lang)}</span></div></div>
                  <button className="ditem-x" onClick={() => setQty(it.id, -999)}><Icon name="close" size={16} /></button>
                </div>
              ))}
            </div>
            <div className="drawer-foot"><div className="drawer-sub"><span>{t.cartUI.subtotal}</span><strong>{money(subtotal, lang)}</strong></div>
              <button className="btn btn-red full lg" onClick={() => { window.location.hash = "#/checkout"; }}>{t.cartUI.checkout} <Icon name="arrowR" size={18} /></button></div>
          </React.Fragment>
        )}
      </aside>
    </React.Fragment>
  );
}

function FilterGroup({ title, children }) {
  const [open, setOpen] = React.useState(true);
  return (
    <div className={"fg " + (open ? "is-open" : "")}>
      <button className="fg-head" onClick={() => setOpen((o) => !o)}>{title}<Icon name="chevron" size={16} /></button>
      {open ? <div className="fg-body">{children}</div> : null}
    </div>
  );
}
function Check({ on, onClick, label, count }) {
  return (
    <button className={"fchk " + (on ? "is-on" : "")} onClick={onClick}>
      <span className="fchk-box"><Icon name="check" size={12} /></span>
      <span className="fchk-l">{label}</span>
      {count != null ? <span className="fchk-c">{count}</span> : null}
    </button>
  );
}

function FiltersPanel({ ct, ut, lang, all, f, setF, toggleSet, brands, maxPrice }) {
  const catCount = (key) => all.filter((p) => p.category === key).length;
  const brandCount = (b) => all.filter((p) => p.brand === b).length;
  const goalCount = (key) => all.filter((p) => p.goal === key).length;
  return (
    <div className="filters">
      <FilterGroup title={ut.fCategory}>
        {CAT_CATS.map(([key, labels]) => <Check key={key} on={f.cats.has(key)} onClick={() => toggleSet("cats", key)} label={labels[lang]} count={catCount(key)} />)}
      </FilterGroup>
      <FilterGroup title={ut.fGoal}>
        {CAT_GOALS.map((key) => <Check key={key} on={f.goals.has(key)} onClick={() => toggleSet("goals", key)} label={ct.goals.items[key][0]} count={goalCount(key)} />)}
      </FilterGroup>
      <FilterGroup title={ut.fBrand}>
        {brands.map((b) => <Check key={b} on={f.brands.has(b)} onClick={() => toggleSet("brands", b)} label={b} count={brandCount(b)} />)}
      </FilterGroup>
      <FilterGroup title={ut.fPrice}>
        <div className="fprice">
          <input type="range" min="0" max={maxPrice} value={f.price} onChange={(e) => setF((s) => ({ ...s, price: +e.target.value }))} />
          <div className="fprice-row"><span>0 €</span><span><b>{money(f.price, lang)}</b></span></div>
        </div>
      </FilterGroup>
      <FilterGroup title={ut.fDiet}>
        <Check on={f.vegan} onClick={() => setF((s) => ({ ...s, vegan: !s.vegan }))} label={ut.vegan} />
        <Check on={f.sugarfree} onClick={() => setF((s) => ({ ...s, sugarfree: !s.sugarfree }))} label={ut.sugarfree} />
        <Check on={f.glutenfree} onClick={() => setF((s) => ({ ...s, glutenfree: !s.glutenfree }))} label={ut.glutenfree} />
      </FilterGroup>
      <FilterGroup title={ut.fAvail}>
        <Check on={f.inStock} onClick={() => setF((s) => ({ ...s, inStock: !s.inStock }))} label={ut.inStock} />
      </FilterGroup>
    </div>
  );
}

const EMPTY_F = () => ({ cats: new Set(), brands: new Set(), goals: new Set(), vegan: false, sugarfree: false, glutenfree: false, inStock: false, price: 80, q: "" });

export default function Catalog({ params }) {
  const q0 = params || new URLSearchParams();
  const [lang, setLang] = React.useState(() => { const l = q0.get("lang"); return ["ee", "en", "ru", "fi"].includes(l) ? l : "ee"; });
  const ct = I18N[lang] || I18N.ee;
  const ut = CAT_UI[lang] || CAT_UI.ee;
  const all = React.useMemo(() => buildCatalog(), []);
  const brands = React.useMemo(() => [...new Set(all.map((p) => p.brand))].sort(), [all]);
  const maxPrice = React.useMemo(() => Math.ceil(Math.max(...all.map((p) => p.price)) / 5) * 5, [all]);
  const [f, setF] = React.useState(() => {
    const s = { ...EMPTY_F(), price: maxPrice };
    const cat = q0.get("category"); if (cat && CAT_CATS.some((c) => c[0] === cat)) s.cats = new Set([cat]);
    const goal = q0.get("goal"); if (goal && CAT_GOALS.includes(goal)) s.goals = new Set([goal]);
    if (q0.get("vegan") === "1") s.vegan = true;
    const q = q0.get("q"); if (q) s.q = q;
    return s;
  });
  const [sort, setSort] = React.useState("popular");
  const [cart, setCart] = React.useState([]);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [mobileF, setMobileF] = React.useState(false);
  const [toast, setToast] = React.useState(null);

  React.useEffect(() => { document.documentElement.lang = lang === "ee" ? "et" : lang; document.title = ut.title + " — Fitbar.ee"; }, [lang]);

  function toggleSet(key, val) { setF((s) => { const n = new Set(s[key]); n.has(val) ? n.delete(val) : n.add(val); return { ...s, [key]: n }; }); }
  function clearAll() { setF({ ...EMPTY_F(), price: maxPrice }); }

  const filtered = React.useMemo(() => {
    let r = all.filter((p) => {
      if (f.cats.size && !f.cats.has(p.category)) return false;
      if (f.brands.size && !f.brands.has(p.brand)) return false;
      if (f.goals.size && !f.goals.has(p.goal)) return false;
      if (f.vegan && !p.vegan) return false;
      if (f.sugarfree && !p.sugarfree) return false;
      if (f.glutenfree && !p.glutenfree) return false;
      if (f.inStock && !p.inStock) return false;
      if (p.price > f.price) return false;
      if (f.q && !(p.name + " " + p.brand).toLowerCase().includes(f.q.toLowerCase())) return false;
      return true;
    });
    const by = { priceAsc: (a, b) => a.price - b.price, priceDesc: (a, b) => b.price - a.price, rating: (a, b) => b.rating - a.rating, new: (a, b) => (b.badgeNew ? 1 : 0) - (a.badgeNew ? 1 : 0), popular: (a, b) => b.sold - a.sold };
    return [...r].sort(by[sort] || by.popular);
  }, [all, f, sort]);

  const cartMap = React.useMemo(() => Object.fromEntries(cart.map((it) => [it.id, it.qty])), [cart]);
  function addToCart(p) { setCart((a) => { const ex = a.find((it) => it.id === p.id); return ex ? a.map((it) => it.id === p.id ? { ...it, qty: it.qty + 1 } : it) : [...a, { ...p, qty: 1 }]; });
    setToast(p.name); clearTimeout(addToCart._t); addToCart._t = setTimeout(() => setToast(null), 1800); }
  function stepCart(id, d) { setCart((a) => a.flatMap((it) => it.id !== id ? [it] : (it.qty + d <= 0 ? [] : [{ ...it, qty: it.qty + d }]))); }
  const cartCount = cart.reduce((s, it) => s + it.qty, 0);

  /* active filter chips */
  const chips = [];
  f.cats.forEach((k) => chips.push([ut.fCategory, CAT_CATS.find((c) => c[0] === k)[1][lang], () => toggleSet("cats", k)]));
  f.goals.forEach((k) => chips.push([ut.fGoal, ct.goals.items[k][0], () => toggleSet("goals", k)]));
  f.brands.forEach((b) => chips.push([ut.fBrand, b, () => toggleSet("brands", b)]));
  if (f.vegan) chips.push([ut.fDiet, ut.vegan, () => setF((s) => ({ ...s, vegan: false }))]);
  if (f.sugarfree) chips.push([ut.fDiet, ut.sugarfree, () => setF((s) => ({ ...s, sugarfree: false }))]);
  if (f.glutenfree) chips.push([ut.fDiet, ut.glutenfree, () => setF((s) => ({ ...s, glutenfree: false }))]);
  if (f.inStock) chips.push([ut.fAvail, ut.inStock, () => setF((s) => ({ ...s, inStock: false }))]);
  if (f.price < maxPrice) chips.push([ut.fPrice, "≤ " + money(f.price, lang), () => setF((s) => ({ ...s, price: maxPrice }))]);

  return (
    <React.Fragment>
      <Header t={ct} lang={lang} setLang={setLang} cartCount={cartCount} onCart={() => setCartOpen(true)} />
      <main className="cat-main">
        <div className="wrap">
          <nav className="pdp-crumbs cat-crumbs"><a href="#/">{ut.crumbs[0]}</a><span>/</span><a href="#">{ut.crumbs[1]}</a></nav>
          <div className="cat-head">
            <div><h1 className="cat-title">{ut.title}</h1><span className="cat-count">{ut.results(filtered.length)}</span></div>
            <div className="cat-tools">
              <div className="cat-search"><Icon name="search" size={17} /><input value={f.q} onChange={(e) => setF((s) => ({ ...s, q: e.target.value }))} placeholder={ut.search} /></div>
              <label className="cat-sort"><span>{ut.sortLabel}:</span>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  {Object.entries(ut.sorts).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select><Icon name="chevron" size={15} />
              </label>
              <button className="cat-fbtn" onClick={() => setMobileF(true)}><Icon name="grid" size={16} />{ut.filters}{chips.length ? <span className="cat-fbtn-n">{chips.length}</span> : null}</button>
            </div>
          </div>

          {chips.length ? (
            <div className="cat-chips">
              {chips.map(([g, l, rm], i) => <button key={i} className="cat-chip" onClick={rm}><span className="cat-chip-g">{g}:</span>{l}<Icon name="close" size={13} /></button>)}
              <button className="cat-chip-clear" onClick={clearAll}>{ut.clear}</button>
            </div>
          ) : null}

          <div className="cat-layout">
            <aside className="cat-sidebar">
              <FiltersPanel ct={ct} ut={ut} lang={lang} all={all} f={f} setF={setF} toggleSet={toggleSet} brands={brands} maxPrice={maxPrice} />
            </aside>
            <div className="cat-results">
              {filtered.length === 0 ? (
                <div className="cat-empty"><span className="empty-ic"><Icon name="search" size={30} /></span><h3>{ut.noResults}</h3><p>{ut.noResultsSub}</p>
                  <button className="btn btn-red" onClick={clearAll}>{ut.clear}</button></div>
              ) : (
                <div className="pgrid pgrid-x cat-grid">
                  {filtered.map((p) => <ProductCardX key={p.id} p={p} t={{ prod: { add: ct.prod.add, added: ct.prod.added, flavors: ut.flavorsW, new: ct.prod.new, hot: ct.prod.hot, facts: ct.prod.facts, choose: ct.prod.choose } }} lang={lang} onAdd={addToCart} cartMap={cartMap} onStep={stepCart} />)}
                </div>
              )}
            </div>
          </div>
        </div>
        <NewsletterSection t={ct} />
        <PopularSearches t={ct} />
      </main>
      <Footer t={ct} />

      {/* mobile filter drawer */}
      <div className={"drawer-scrim " + (mobileF ? "is-open" : "")} onClick={() => setMobileF(false)} />
      <aside className={"cat-fdrawer " + (mobileF ? "is-open" : "")}>
        <div className="drawer-head"><h3>{ut.filters}</h3><button className="icon-btn" onClick={() => setMobileF(false)}><Icon name="close" size={20} /></button></div>
        <div className="cat-fdrawer-body">
          <FiltersPanel ct={ct} ut={ut} lang={lang} all={all} f={f} setF={setF} toggleSet={toggleSet} brands={brands} maxPrice={maxPrice} />
        </div>
        <div className="cat-fdrawer-foot"><button className="btn btn-ghost" onClick={clearAll}>{ut.clear}</button><button className="btn btn-red" onClick={() => setMobileF(false)}>{ut.apply} ({filtered.length})</button></div>
      </aside>

      <CatCart open={cartOpen} onClose={() => setCartOpen(false)} items={cart} setItems={setCart} t={ct} lang={lang} />
      <div className={"pdp-toast " + (toast ? "is-show" : "")}><Icon name="check" size={18} /><span>{ut.added}: <b>{toast}</b></span>
        <button onClick={() => { setToast(null); setCartOpen(true); }}>{ct.cartUI.title}</button></div>
    </React.Fragment>
  );
}
