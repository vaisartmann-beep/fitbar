/* Home.jsx — Fitbar.ee homepage (Bento hero + product spotlight) */
import React from "react";
import { Icon, ProductShot } from "./components/Icon.jsx";
import { money } from "./components/money.js";
import { Header, Footer } from "./components/header.jsx";
import {
  SectionHead, CategoriesSection, GoalsSection, BrandsSection,
  WhySection, ReviewsSection, StoreSection, NewsletterSection, PopularSearches,
} from "./components/sections.jsx";
import { BentoHero, ProductSpotlight, ProductRowX } from "./components/bento.jsx";
import { I18N, NEW_PRODUCTS, BESTSELLERS } from "./data/data.js";

const FREE_SHIP = 89;

function CartDrawer({ open, onClose, items, setItems, t, lang }) {
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const count = items.reduce((s, it) => s + it.qty, 0);
  const left = Math.max(0, FREE_SHIP - subtotal);
  const pct = Math.min(100, (subtotal / FREE_SHIP) * 100);
  function setQty(id, d) { setItems((arr) => arr.map((it) => it.id === id ? { ...it, qty: Math.max(1, it.qty + d) } : it)); }
  function remove(id) { setItems((arr) => arr.filter((it) => it.id !== id)); }
  return (
    <React.Fragment>
      <div className={"drawer-scrim " + (open ? "is-open" : "")} onClick={onClose} />
      <aside className={"drawer " + (open ? "is-open" : "")} aria-hidden={!open}>
        <div className="drawer-head">
          <h3><Icon name="cart" size={20} />{t.cartUI.title} {count ? <span className="drawer-count">{count}</span> : null}</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><Icon name="close" size={20} /></button>
        </div>
        {items.length === 0 ? (
          <div className="drawer-empty">
            <span className="empty-ic"><Icon name="cart" size={34} /></span>
            <p>{t.cartUI.empty}</p>
            <button className="btn btn-red" onClick={onClose}>{t.cartUI.emptyCta}</button>
          </div>
        ) : (
          <React.Fragment>
            <div className="ship-bar">
              <div className="ship-msg">{left > 0 ? t.cartUI.freeLeft(money(left, lang).replace(" €", "").replace("€", "")) : t.cartUI.freeOk}</div>
              <div className="ship-track"><div className="ship-fill" style={{ width: pct + "%" }} /></div>
            </div>
            <div className="drawer-items">
              {items.map((it) => (
                <div key={it.id} className="ditem">
                  <span className="ditem-shot"><ProductShot container={it.container} tint={it.tint} /></span>
                  <div className="ditem-mid">
                    <div className="ditem-brand">{it.brand}</div>
                    <div className="ditem-name">{it.name}</div>
                    <div className="ditem-row">
                      <div className="qty">
                        <button onClick={() => setQty(it.id, -1)} aria-label="-"><Icon name="minus" size={15} /></button>
                        <span>{it.qty}</span>
                        <button onClick={() => setQty(it.id, 1)} aria-label="+"><Icon name="plus" size={15} /></button>
                      </div>
                      <span className="ditem-price">{money(it.price * it.qty, lang)}</span>
                    </div>
                  </div>
                  <button className="ditem-x" onClick={() => remove(it.id)} aria-label={t.cartUI.remove}><Icon name="close" size={16} /></button>
                </div>
              ))}
            </div>
            <div className="drawer-foot">
              <div className="drawer-sub"><span>{t.cartUI.subtotal}</span><strong>{money(subtotal, lang)}</strong></div>
              <button className="btn btn-red full lg" onClick={() => { window.location.hash = "#/checkout"; }}>{t.cartUI.checkout} <Icon name="arrowR" size={18} /></button>
            </div>
          </React.Fragment>
        )}
      </aside>
    </React.Fragment>
  );
}

export default function Home() {
  const [lang, setLang] = React.useState("ee");
  const t = I18N[lang] || I18N.ee;
  const [cart, setCart] = React.useState([]);
  const [cartOpen, setCartOpen] = React.useState(false);

  React.useEffect(() => {
    document.documentElement.lang = lang === "ee" ? "et" : lang;
    document.title = "Fitbar.ee — Sporttoidud ja toidulisandid · Tallinn";
  }, [lang]);

  function addToCart(p) {
    setCart((arr) => {
      const ex = arr.find((it) => it.id === p.id);
      if (ex) return arr.map((it) => it.id === p.id ? { ...it, qty: it.qty + 1 } : it);
      return [...arr, { ...p, qty: 1 }];
    });
  }
  const cartCount = cart.reduce((s, it) => s + it.qty, 0);
  const cartMap = React.useMemo(() => Object.fromEntries(cart.map((it) => [it.id, it.qty])), [cart]);
  function stepCart(id, d) {
    setCart((arr) => arr.flatMap((it) => it.id !== id ? [it] : (it.qty + d <= 0 ? [] : [{ ...it, qty: it.qty + d }])));
  }
  function scrollToNew() {
    const el = document.getElementById("new-products");
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: "smooth" });
  }

  return (
    <React.Fragment>
      <Header t={t} lang={lang} setLang={setLang} cartCount={cartCount} onCart={() => setCartOpen(true)} />
      <main>
        <BentoHero t={t} lang={lang} onShop={scrollToNew} onAdd={addToCart} />
        <CategoriesSection t={t} />
        <GoalsSection t={t} />
        <ProductSpotlight t={t} lang={lang} onAdd={addToCart} />
        <section className="band" id="new-products">
          <div className="wrap">
            <SectionHead title={t.newp.title} sub={t.newp.sub} action={t.newp.all} />
            <ProductRowX products={NEW_PRODUCTS} t={t} lang={lang} onAdd={addToCart} cartMap={cartMap} onStep={stepCart} />
          </div>
        </section>
        <BrandsSection t={t} />
        <WhySection t={t} />
        <section className="band">
          <div className="wrap">
            <SectionHead title={t.best.title} sub={t.best.sub} action={t.best.all} />
            <ProductRowX products={BESTSELLERS} t={t} lang={lang} onAdd={addToCart} cartMap={cartMap} onStep={stepCart} />
          </div>
        </section>
        <ReviewsSection t={t} />
        <StoreSection t={t} />
        <NewsletterSection t={t} />
        <PopularSearches t={t} />
      </main>
      <Footer t={t} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={cart} setItems={setCart} t={t} lang={lang} />
    </React.Fragment>
  );
}
