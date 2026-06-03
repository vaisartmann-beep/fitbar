/* App.jsx — composes the product page */
import React from "react";
import { Icon, ProductShot } from "./components/Icon.jsx";
import { money } from "./components/money.js";
import { Header, Footer } from "./components/header.jsx";
import { SectionHead, NewsletterSection, PopularSearches } from "./components/sections.jsx";
import {
  PRODUCT, RELATED_IDS, PDP_REVIEWS,
  Gallery, BuyBox, KeyFacts, Bundle, ForWho, Nutrition, Faq, Reviews, Related, TechDetails,
} from "./components/pdp.jsx";
import { I18N, NEW_PRODUCTS, BESTSELLERS } from "./data/data.js";

function PdpCart({ open, onClose, items, setItems, t }) {
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
            <div className="ship-bar"><div className="ship-msg">{left > 0 ? t.cartUI.freeLeft(money(left, "ee").replace(" €", "").replace("€", "")) : t.cartUI.freeOk}</div>
              <div className="ship-track"><div className="ship-fill" style={{ width: pct + "%" }} /></div></div>
            <div className="drawer-items">
              {items.map((it) => (
                <div key={it.id} className="ditem">
                  <span className="ditem-shot"><ProductShot container={it.container} tint={it.tint} /></span>
                  <div className="ditem-mid"><div className="ditem-brand">{it.brand}</div><div className="ditem-name">{it.name}</div>
                    <div className="ditem-row"><div className="qty">
                      <button onClick={() => setQty(it.id, -1)}><Icon name="minus" size={15} /></button><span>{it.qty}</span>
                      <button onClick={() => setQty(it.id, 1)}><Icon name="plus" size={15} /></button></div>
                      <span className="ditem-price">{money(it.price * it.qty, "ee")}</span></div></div>
                  <button className="ditem-x" onClick={() => setQty(it.id, -999)}><Icon name="close" size={16} /></button>
                </div>
              ))}
            </div>
            <div className="drawer-foot"><div className="drawer-sub"><span>{t.cartUI.subtotal}</span><strong>{money(subtotal, "ee")}</strong></div>
              <button className="btn btn-red full lg">{t.cartUI.checkout} <Icon name="arrowR" size={18} /></button></div>
          </React.Fragment>
        )}
      </aside>
    </React.Fragment>
  );
}

const PDP_TABS = [["kirjeldus", "Kirjeldus"], ["toitumine", "Toitumine"], ["kasutamine", "Kasutamine"], ["kkk", "KKK"], ["reviews", "Arvustused"]];

function StickyBar({ p, show, onAdd, fi, pi, qty, sub, onEdit }) {
  const pack = p.packs[pi];
  const eff = sub ? pack.price * (1 - p.subPct / 100) : pack.price;
  return (
    <div className={"pdp-sticky " + (show ? "is-show" : "")}>
      <div className="wrap pdp-sticky-in">
        <div className="pdp-sticky-l">
          <span className="pdp-sticky-shot"><ProductShot container={p.container} tint={p.tint} /></span>
          <div>
            <div className="pdp-sticky-name">{p.h1}</div>
            <div className="pdp-sticky-sub">
              <span>{p.flavours[fi]} · {pack.label}{qty > 1 ? " · " + qty + " tk" : ""}{sub ? " · −" + p.subPct + "%" : ""}</span>
              <button className="pdp-sticky-edit" onClick={onEdit}>Muuda</button>
            </div>
          </div>
        </div>
        <div className="pdp-sticky-r">
          <span className="pdp-sticky-price">{money(eff * qty, "ee")}</span>
          <button className="btn btn-red" onClick={() => onAdd({ qty, flavour: p.flavours[fi], pack: pack.label, price: eff, sub })}><Icon name="cart" size={17} />Lisa korvi</button>
        </div>
      </div>
    </div>
  );
}

export default function Pdp() {
  const lang = "ee";
  const t = I18N[lang];
  const p = PRODUCT;
  const [cart, setCart] = React.useState([]);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [fi, setFi] = React.useState(0);
  const [pi, setPi] = React.useState(0);
  const [qty, setQty] = React.useState(1);
  const [sub, setSub] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const [stuck, setStuck] = React.useState(false);
  const [tab, setTab] = React.useState("kirjeldus");
  const buyRef = React.useRef(null);
  const related = RELATED_IDS.map((id) => [...NEW_PRODUCTS, ...BESTSELLERS].find((x) => x.id === id)).filter(Boolean);
  const bundleAddons = p.bundle.ids.map((id) => [...NEW_PRODUCTS, ...BESTSELLERS].find((x) => x.id === id)).filter(Boolean)
    .map((x) => ({ id: "bnd-" + x.id, brand: x.brand, name: x.name.split(" — ")[0], price: x.price, container: x.container, tint: x.tint }));

  function mergeItem(a, item) {
    const ex = a.find((it) => it.id === item.id);
    return ex ? a.map((it) => it.id === item.id ? { ...it, qty: it.qty + item.qty } : it) : [...a, item];
  }
  function addToCart({ qty, flavour, pack, price, sub }) {
    const id = "ele-" + flavour + "-" + pack + (sub ? "-s" : "");
    const item = { id, brand: p.brand, name: p.h1.split(" — ")[0] + " · " + flavour + " · " + pack + (sub ? " · püsitellimus" : ""), price, container: p.container, tint: p.tint, qty };
    setCart((a) => mergeItem(a, item));
    setToast(flavour + " · " + pack); clearTimeout(addToCart._t); addToCart._t = setTimeout(() => setToast(null), 2200);
  }
  function addMany(items) {
    setCart((a) => items.reduce((acc, it) => mergeItem(acc, it), a));
    setToast("komplekt (" + items.length + " toodet)"); clearTimeout(addToCart._t); addToCart._t = setTimeout(() => setToast(null), 2400);
    setCartOpen(true);
  }
  const cartCount = cart.reduce((s, it) => s + it.qty, 0);

  React.useEffect(() => {
    function onScroll() {
      const b = buyRef.current; if (b) setStuck(b.getBoundingClientRect().bottom < 70);
      let cur = "kirjeldus";
      for (const [id] of PDP_TABS) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top < 160) cur = id; }
      setTab(cur);
    }
    window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const ld = {
      "@context": "https://schema.org", "@type": "Product",
      name: p.name, sku: p.sku, brand: { "@type": "Brand", name: p.brand },
      description: p.tagline, category: p.categories.join(", "),
      offers: { "@type": "Offer", price: p.packs[0].price.toFixed(2), priceCurrency: "EUR", availability: "https://schema.org/InStock",
        seller: { "@type": "Organization", name: "Fitbar OÜ" } },
      gtin13: "5056555204128", weight: { "@type": "QuantitativeValue", value: 95, unitCode: "GRM" },
      additionalProperty: p.certs.map(([, label]) => ({ "@type": "PropertyValue", name: label, value: "Jah" })),
      aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviews, bestRating: 5 },
      review: PDP_REVIEWS.map(([r, name, body]) => ({ "@type": "Review", author: { "@type": "Person", name },
        reviewRating: { "@type": "Rating", ratingValue: r, bestRating: 5 }, reviewBody: body })),
    };
    const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement:
      ["Avaleht", "Pood", "Enne treeningut", p.h1].map((n, i) => ({ "@type": "ListItem", position: i + 1, name: n })) };
    const faq = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity:
      p.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
    const el = document.createElement("script"); el.type = "application/ld+json"; el.id = "pdp-ld";
    el.textContent = JSON.stringify([ld, breadcrumb, faq]); document.head.appendChild(el);
    document.title = p.name + " — Fitbar.ee";
    return () => { const e = document.getElementById("pdp-ld"); if (e) e.remove(); };
  }, []);

  function goTab(id) { const el = document.getElementById(id); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: "smooth" }); }
  function scrollToBuy() { const b = buyRef.current; if (b) window.scrollTo({ top: b.getBoundingClientRect().top + window.scrollY - 130, behavior: "smooth" }); }

  return (
    <React.Fragment>
      <Header t={t} lang={lang} setLang={() => {}} cartCount={cartCount} onCart={() => setCartOpen(true)} />
      <main>
        <section className="pdp-hero">
          <div className="wrap">
            <div className="pdp-grid" ref={buyRef}>
              <Gallery p={p} flavourIdx={fi} />
              <BuyBox p={p} onAdd={addToCart} fi={fi} setFi={setFi} pi={pi} setPi={setPi} qty={qty} setQty={setQty} sub={sub} setSub={setSub} />
            </div>
          </div>
        </section>

        <KeyFacts p={p} />

        <section className="band">
          <div className="wrap">
            <SectionHead title="Sageli ostetakse koos" sub={"Komplektina säästad " + p.bundle.save + "%"} />
            <Bundle p={p} addons={bundleAddons} onAddMany={addMany} />
          </div>
        </section>

        <div className="pdp-tabsbar">
          <div className="wrap pdp-tabsbar-in">
            {PDP_TABS.map(([id, label]) => (
              <button key={id} className={"pdp-tab " + (tab === id ? "is-on" : "")} onClick={() => goTab(id)}>{label}</button>
            ))}
          </div>
        </div>

        <div className="wrap pdp-content">
          <section id="kirjeldus" className="pdp-sec">
            <h2>Kirjeldus</h2>
            <ForWho p={p} />
            {p.description.map((d, i) => <p key={i} className="pdp-p" dangerouslySetInnerHTML={{ __html: d }} />)}
            <h3 className="pdp-h3">Toote eelised</h3>
            <ul className="pdp-benefits">
              {p.benefits.map(([h, d]) => <li key={h}><span className="pdp-ben-ic"><Icon name="check" size={16} /></span><div><b>{h}</b><span>{d}</span></div></li>)}
            </ul>
          </section>

          <section id="toitumine" className="pdp-sec">
            <h2>Koostis & toitumine</h2>
            <h3 className="pdp-h3">Koostisosad</h3>
            <p className="pdp-p pdp-muted">{p.ingredients}</p>
            <p className="pdp-p pdp-muted"><b>Allergeenid:</b> {p.allergens}</p>
            <h3 className="pdp-h3">Toitumisalane teave</h3>
            <Nutrition n={p.nutrition} />
          </section>

          <section id="kasutamine" className="pdp-sec">
            <h2>Kasutamine</h2>
            <p className="pdp-p" dangerouslySetInnerHTML={{ __html: p.usage }} />
            <div className="pdp-warn"><span className="pdp-warn-ic"><Icon name="shield" size={18} /></span>
              <div><b>Hoiatused ja oluline teave</b><p>{p.warnings}</p></div></div>
          </section>


          <section id="kkk" className="pdp-sec">
            <h2>Korduma kippuvad küsimused</h2>
            <Faq items={p.faq} />
          </section>

          <section className="pdp-sec">
            <h2>Arvustused</h2>
            <Reviews p={p} />
          </section>

          <TechDetails p={p} />
        </div>

        <section className="band">
          <div className="wrap">
            <SectionHead title="Seotud tooted" sub="Sulle võivad meeldida ka need" />
            <Related products={related} />
          </div>
        </section>
        <NewsletterSection t={t} />
        <PopularSearches t={t} />
      </main>
      <Footer t={t} />

      <StickyBar p={p} show={stuck && !cartOpen} onAdd={addToCart} fi={fi} pi={pi} qty={qty} sub={sub} onEdit={scrollToBuy} />
      <PdpCart open={cartOpen} onClose={() => setCartOpen(false)} items={cart} setItems={setCart} t={t} />
      <div className={"pdp-toast " + (toast ? "is-show" : "")}>
        <Icon name="check" size={18} /><span>Lisatud korvi: <b>{toast}</b></span>
        <button onClick={() => { setToast(null); setCartOpen(true); }}>Vaata korvi</button>
      </div>
    </React.Fragment>
  );
}
