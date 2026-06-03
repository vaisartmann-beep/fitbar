/* pdp.jsx — product detail page components (Endurance Electrolyte) */
import React from "react";
import { Icon, ProductShot } from "./Icon.jsx";
import { money } from "./money.js";

export const PRODUCT = {
  brand: "Applied Nutrition",
  name: "Applied Nutrition Endurance Hydration Electrolyte — 20 tabletti",
  h1: "Endurance Hydration Electrolyte Effervescent — 20 tabletti",
  sku: "128",
  price: 8.90,
  perUnit: "0,45 € / tablett",
  rating: 4.8,
  reviews: 24,
  container: "tub", tint: 135,
  flavours: ["Apelsin", "Sidrun & laim", "Vimto®"],
  badges: ["Suhkruvaba", "Vegan", "6 kcal", "+ C-vitamiin", "Informed Sport"],
  categories: ["Enne treeningut", "Joogid", "Toidulisandid jooksjatele", "Toidulisandid veganitele"],
  tagline: "Kiiresti lahustuv elektrolüütide tablett kiireks hüdratatsiooniks treeningu ajal ja järel — naatrium, kaalium, kaltsium, magneesium ja C‑vitamiin.",
  packs: [
    { label: "1 tuub", sub: "20 tabletti", price: 8.90, per: "0,45 € / tablett" },
    { label: "3 tuubi", sub: "60 tabletti", price: 23.90, per: "0,40 € / tablett", tag: "Populaarne" },
    { label: "6 tuubi", sub: "120 tabletti", price: 44.90, per: "0,37 € / tablett", tag: "Parim hind" },
  ],
  sold: "320+ müüdud viimase 30 päeva jooksul",
  qa: 18,
  subPct: 5,
  forWhat: "Kiire hüdratatsioon ja elektrolüütide (Na, K, Ca, Mg) taastamine treeningu ajal ja järel — ilma suhkruta.",
  forWhom: "Jooksjatele, jalgratturitele ja kõigile, kes treenivad intensiivselt, higistavad palju või soovivad vältida krampe.",
  certs: [["leaf", "Vegan"], ["drop", "Suhkruvaba"], ["shield", "Informed Sport"], ["check", "Gluteenivaba"], ["check", "Laktoosivaba"]],
  specs: [
    ["Tootekood", "AN-128"], ["EAN / UPC", "5056555204128"], ["Netokaal", "95 g"],
    ["Mõõdud", "14 × 4 × 4 cm"], ["Parim enne", "04.2027"], ["Päritolu", "Suurbritannia"], ["Müügil alates", "05.2023"],
  ],
  bundle: { save: 15, ids: ["n4", "b8"] },
  highlights: [
    ["Elektrolüüdid", "Na · K · Ca · Mg"],
    ["C-vitamiin", "30 mg · 38% NRV"],
    ["Suhkur", "0 g · 6 kcal"],
    ["Kogus", "20 kihisevat tabletti"],
    ["Sobivus", "Vegan · Informed Sport"],
    ["Kasutus", "Enne & pärast treeningut"],
  ],
  description: [
    "<b>Applied Nutrition Endurance Electrolyte Tablets</b> on spetsiaalselt loodud efektiivseks hüdratatsiooniks ja elektrolüütide tasakaalu taastamiseks intensiivse füüsilise koormuse ajal või pärast seda. Üks kiiresti lahustuv tablett vees tagab kiire juurdeveo põhielektrolüütidele — naatriumile, kaaliumile, kaltsiumile ja magneesiumile — ning C‑vitamiinile.",
    "Toode aitab vältida <b>dehüdratsiooni</b> ja sellega kaasnevaid negatiivseid mõjusid nagu väsimuse suurenemine, vähenenud koordineeritavus ning halvenenud taastumine. Tabletid on <b>suhkruvabad</b>, sisaldavad vaid 6 kcal portsjonis ning sobivad <b>veganitele ja vegetaarlastele</b>.",
  ],
  benefits: [
    ["Hüdratatsioon", "Toetab optimaalset vedeliku- ja elektrolüütide tasakaalu intensiivse koormuse ajal"],
    ["Jõudlus", "Vähendab dehüdratsiooni riski ja aitab säilitada jõudlust"],
    ["Madal kalorsus", "Suhkruvaba ja vaid 6 kcal portsjonis"],
    ["Vegan", "Sobib veganitele ja vegetaarlastele"],
    ["Mugav", "Kiiresti lahustuv tablett — võta kaasa ja valmista igal pool"],
    ["Sertifitseeritud", "Informed Sport — turvaline professionaalsportlastele"],
  ],
  ingredients: "Happesus (sidrunhape), naatriumvesinikkarbonaat, täiteaine (sorbitool), kaaliumtsitraat, voolavustegur (polüetüleenglükool), magneesiumtsitraat, kaltsiumtsitraat, C‑vitamiin (L‑askorbiinhappena), magustaja (sukraloos), looduslikud värvained ja maitseained (olenevalt maitsest: apelsin, sidrun & laim, Vimto®), akaatsiakummi.",
  allergens: "Toode ei sisalda teadaolevaid levinud allergeene. Valmistatud tehases, kus käideldakse gluteeni sisaldavaid teravilju ja nende tooteid.",
  nutrition: {
    servings: "20", serving: "1 tablett (4 g)",
    rows: [
      ["Energia", "25 kJ / 6 kcal", "<1%"],
      ["Rasv", "0 g", "0%"],
      ["Süsivesikud", "1.5 g", "1%"],
      ["— millest suhkrud", "0 g", "0%"],
      ["Valk", "0 g", "0%"],
      ["Sool", "0.8 g", "13%"],
      ["Naatrium", "320 mg", "16%"],
      ["Kaalium", "150 mg", "8%"],
      ["Kaltsium", "80 mg", "10%"],
      ["Magneesium", "40 mg", "11%"],
      ["C-vitamiin", "30 mg", "38%"],
    ],
  },
  usage: "Lisage <b>1 tablett</b> 200 ml vette ja laske täielikult lahustuda. Tarbige valmis jook <b>kohe pärast valmistamist või 24 tunni jooksul</b>. Sobib tarbida nii treeningu ajal kui ka selle järel.",
  warnings: "Ärge ületage soovitatud päevast annust. Toidulisand ei asenda mitmekülgset ja tasakaalustatud toitumist ning tervislikku eluviisi. Enne tarbimist konsulteerige arstiga, kui olete alla 18‑aastane, rase, imetate, teil on neeru‑, südame‑ või muid terviseprobleeme või järgite soolapiirangutega dieeti. Hoida laste käest eemal. Säilitada kuivas kohas toatemperatuuril.",
  manufacturer: "Applied Nutrition",
  distributor: "Fitbar OÜ, Rävala 6, 10141 Tallinn, info@fitbar.ee",
  faq: [
    ["Millal Endurance tablette tarbida?", "Sobib nii treeningu ajal kui ka pärast seda. Pikematel trennidel ja võistlustel võta üks jook iga 45–60 minuti järel, et hoida elektrolüütide tasakaal."],
    ["Kas toode on vegan?", "Jah — tabletid sobivad veganitele ja vegetaarlastele ning on suhkruvabad."],
    ["Kui palju suhkrut tablett sisaldab?", "0 g suhkrut. Üks tablett annab vaid 6 kcal."],
    ["Kuidas jooki valmistada?", "Lahusta 1 tablett 200 ml vees ja joo 24 tunni jooksul."],
    ["Kas sobib professionaalsportlastele?", "Jah, toode kuulub Informed Sport programmi, mis testib keelatud ainete suhtes."],
  ],
};

export const RELATED_IDS = ["b8", "b5", "n2", "n4"];

/* ---- gallery ---- */
export function Gallery({ p, flavourIdx }) {
  const shots = [p.container, "bottle", "tub", "can"];
  const [active, setActive] = React.useState(0);
  const tints = [p.tint, p.tint + 30, p.tint - 20, p.tint + 10];
  return (
    <div className="pdp-gallery">
      <div className="pdp-main">
        <div className="pdp-main-badges">
          <span className="pdp-imgbadge">UUS</span>
        </div>
        <div className="pdp-main-shot"><ProductShot container={shots[active]} tint={tints[active]} /></div>
        <span className="pdp-photo-note">[ toote foto ]</span>
      </div>
      <div className="pdp-thumbs">
        {shots.map((s, i) => (
          <button key={i} className={"pdp-thumb " + (i === active ? "is-on" : "")} onClick={() => setActive(i)} aria-label={"Vaade " + (i + 1)}>
            <ProductShot container={s} tint={tints[i]} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---- buy box ---- */
export function BuyBox({ p, onAdd, fi, setFi, pi, setPi, qty, setQty, sub, setSub }) {
  const pack = p.packs[pi];
  const base = pack.price;
  const eff = sub ? base * (1 - p.subPct / 100) : base;
  const total = eff * qty;
  const left = Math.max(0, 89 - total);
  const pct = Math.min(100, (total / 89) * 100);
  return (
    <div className="pdp-buy">
      <nav className="pdp-crumbs" aria-label="Breadcrumb">
        <a href="#/">Avaleht</a><span>/</span><a href="#">Pood</a><span>/</span><a href="#">Enne treeningut</a>
      </nav>
      <a className="pdp-brand" href="#">{p.brand}</a>
      <h1 className="pdp-title">{p.h1}</h1>
      <div className="pdp-rate">
        <span className="pdp-stars">{[0,1,2,3,4].map((s)=><Icon key={s} name="star" size={17} />)}</span>
        <b>{p.rating.toFixed(1)}</b><a href="#reviews" className="pdp-rate-c">{p.reviews} arvustust</a>
        <a href="#kkk" className="pdp-rate-c">{p.qa} küsimust</a>
        <span className="pdp-instock"><span className="dot" />Laos</span>
      </div>
      <div className="pdp-social"><Icon name="flame" size={14} />{p.sold}</div>
      <p className="pdp-tagline">{p.tagline}</p>

      <div className="pdp-certs">
        {p.certs.map(([ic, label]) => (
          <span key={label} className="pdp-cert"><Icon name={ic} size={15} />{label}</span>
        ))}
      </div>

      <div className="pdp-packs">
        <div className="pdp-flav-h">Kogus</div>
        <div className="pdp-pack-row">
          {p.packs.map((pk, i) => (
            <button key={pk.label} className={"pdp-pack " + (i === pi ? "is-on" : "")} onClick={() => setPi(i)}>
              {pk.tag ? <span className="pdp-pack-tag">{pk.tag}</span> : null}
              <span className="pdp-pack-l">{pk.label}</span>
              <span className="pdp-pack-s">{pk.sub}</span>
              <span className="pdp-pack-p">{money(pk.price, "ee")}</span>
              <span className="pdp-pack-u">{pk.per}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="pdp-flav">
        <div className="pdp-flav-h">Maitse</div>
        <div className="pdp-flav-row">
          {p.flavours.map((f, i) => (
            <button key={f} className={"pdp-flav-chip " + (i === fi ? "is-on" : "")} onClick={() => setFi(i)}>{f}</button>
          ))}
        </div>
      </div>

      <div className="pdp-mode">
        <button className={"pdp-mode-opt " + (!sub ? "is-on" : "")} onClick={() => setSub(false)}>
          <span className="pdp-radio" />
          <span className="pdp-mode-txt">
            <span className="pdp-mode-title">Ühekordne ost</span>
            <span className="pdp-mode-sub">{money(base, "ee")}</span>
          </span>
        </button>
        <button className={"pdp-mode-opt " + (sub ? "is-on" : "")} onClick={() => setSub(true)}>
          <span className="pdp-radio" />
          <span className="pdp-mode-txt">
            <span className="pdp-mode-title">Püsitellimus <span className="pdp-mode-badge">−{p.subPct}%</span></span>
            <span className="pdp-mode-sub">{money(base * (1 - p.subPct / 100), "ee")} · tühista igal ajal</span>
          </span>
        </button>
      </div>

      <div className="pdp-pricerow">
        <span className="pdp-price">{money(total, "ee")}</span>
        {sub ? <span className="pdp-price-old">{money(base * qty, "ee")}</span> : null}
        <span className="pdp-perunit">{pack.per}</span>
      </div>

      <div className="pdp-actions">
        <div className="pdp-qty">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="-"><Icon name="minus" size={17} /></button>
          <span>{qty}</span>
          <button onClick={() => setQty((q) => q + 1)} aria-label="+"><Icon name="plus" size={17} /></button>
        </div>
        <button className="btn btn-red lg pdp-add" onClick={() => onAdd({ qty, flavour: p.flavours[fi], pack: pack.label, price: eff, sub })}>
          <Icon name="cart" size={19} />Lisa ostukorvi
        </button>
        <button className="pdp-wish" aria-label="Soovinimekiri"><Icon name="heart" size={20} /></button>
      </div>

      <div className="pdp-ship">
        <Icon name="truck" size={16} />
        {left > 0 ? <span>Lisa veel <b>{money(left, "ee")}</b> tasuta tarne saamiseks</span> : <span><b>Sul on tasuta tarne!</b> 🎉</span>}
        <div className="pdp-ship-track"><div className="pdp-ship-fill" style={{ width: pct + "%" }} /></div>
      </div>

      <div className="pdp-trust">
        {[["truck","Tasuta tarne alates 89€"],["bolt","Kiire tarne 1–3 päeva"],["shield","Turvaline makse"],["rotate","14 päeva tagastus"]].map(([ic,tx])=>(
          <div key={tx} className="pdp-trust-i"><Icon name={ic} size={17} />{tx}</div>
        ))}
      </div>

      <dl className="pdp-meta">
        <div><dt>Tootekood</dt><dd>{p.sku}</dd></div>
        <div><dt>Kategooriad</dt><dd>{p.categories.map((c,i)=><React.Fragment key={c}><a href="#">{c}</a>{i<p.categories.length-1?", ":""}</React.Fragment>)}</dd></div>
        <div><dt>Bränd</dt><dd><a href="#">{p.brand}</a></dd></div>
      </dl>
    </div>
  );
}

/* ---- "Milleks / Kellele" ---- */
export function ForWho({ p }) {
  return (
    <div className="pdp-forwho">
      <div className="pdp-fw"><span className="pdp-fw-ic"><Icon name="bolt" size={18} /></span>
        <div><b>Milleks?</b><p>{p.forWhat}</p></div></div>
      <div className="pdp-fw"><span className="pdp-fw-ic"><Icon name="heart" size={18} /></span>
        <div><b>Kellele sobib?</b><p>{p.forWhom}</p></div></div>
    </div>
  );
}

/* ---- frequently bought together ---- */
export function Bundle({ p, addons, onAddMany }) {
  const main = { id: "ele-bundle", brand: p.brand, name: p.h1.split(" — ")[0], price: p.packs[0].price, container: p.container, tint: p.tint };
  const items = [main, ...addons];
  const [picked, setPicked] = React.useState(items.map(() => true));
  const chosen = items.filter((_, i) => picked[i]);
  const sum = chosen.reduce((s, it) => s + it.price, 0);
  const saved = sum * p.bundle.save / 100;
  function toggle(i) { setPicked((a) => a.map((v, j) => j === i ? !v : v)); }
  return (
    <div className="pdp-fbt">
      <div className="pdp-fbt-items">
        {items.map((it, i) => (
          <React.Fragment key={it.id}>
            {i > 0 ? <span className="pdp-fbt-plus"><Icon name="plus" size={18} /></span> : null}
            <label className={"pdp-fbt-card " + (picked[i] ? "is-on" : "")}>
              <input type="checkbox" checked={picked[i]} onChange={() => toggle(i)} />
              <span className="pdp-fbt-check"><Icon name="check" size={13} /></span>
              <span className="pdp-fbt-shot"><ProductShot container={it.container} tint={it.tint} /></span>
              <span className="pdp-fbt-name">{it.name}</span>
              <span className="pdp-fbt-price">{money(it.price, "ee")}</span>
            </label>
          </React.Fragment>
        ))}
      </div>
      <div className="pdp-fbt-buy">
        <div className="pdp-fbt-tag">Komplekt · säästad {p.bundle.save}%</div>
        <div className="pdp-fbt-total">
          <span className="pdp-fbt-now">{money(sum - saved, "ee")}</span>
          <span className="pdp-fbt-was">{money(sum, "ee")}</span>
        </div>
        <div className="pdp-fbt-save">Sääst {money(saved, "ee")}</div>
        <button className="btn btn-red full" disabled={chosen.length === 0}
          onClick={() => onAddMany(chosen.map((it) => ({ ...it, price: it.price * (1 - p.bundle.save / 100), qty: 1 })))}>
          Lisa valitud korvi ({chosen.length})
        </button>
      </div>
    </div>
  );
}

/* ---- tech specs ---- */
export function TechSpecs({ specs }) {
  return (
    <dl className="pdp-specs">
      {specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
    </dl>
  );
}

/* ---- collapsible tech + manufacturer block (at page end) ---- */
export function TechDetails({ p }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className={"pdp-techbox " + (open ? "is-open" : "")}>
      <button className="pdp-techbtn" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span><Icon name="grid" size={17} />Tehnilised andmed</span>
        <Icon name="chevron" size={18} />
      </button>
      <div className="pdp-techbody">
        <div className="pdp-techinner">
          <TechSpecs specs={p.specs} />
          <dl className="pdp-maker">
            <div><dt>Tootja</dt><dd>{p.manufacturer}</dd></div>
            <div><dt>Turustaja</dt><dd>{p.distributor}</dd></div>
          </dl>
        </div>
      </div>
    </div>
  );
}

/* ---- key facts band ---- */
export function KeyFacts({ p }) {
  return (
    <section className="pdp-keyfacts">
      <div className="wrap">
        <div className="pdp-kf-head"><Icon name="flame" size={15} />Kiire ülevaade</div>
        <dl className="pdp-kf-grid">
          {p.highlights.map(([k, v]) => <div key={k} className="pdp-kf"><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
      </div>
    </section>
  );
}

/* ---- nutrition (3 formats) ---- */
function nfPct(s) { if (!s) return 0; if (s.includes("<")) return 1.5; const m = s.match(/(\d+)/); return m ? +m[1] : 0; }
function NutriMeta({ n }) {
  return <div className="pdp-nutri-meta"><span>Portsjoneid pakis: <b>{n.servings}</b></span><span>Portsjon: <b>{n.serving}</b></span></div>;
}
export function NutriTable({ n }) {
  return (
    <div className="pdp-nutri">
      <NutriMeta n={n} />
      <table className="pdp-table">
        <thead><tr><th scope="col">Toitaine</th><th scope="col">Kogus (1 tablett)</th><th scope="col">%NRV*</th></tr></thead>
        <tbody>
          {n.rows.map((r) => (
            <tr key={r[0]} className={r[0].startsWith("—") ? "sub" : ""}>
              <th scope="row">{r[0]}</th><td>{r[1]}</td><td>{r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="pdp-nutri-note">*NRV — päevane soovituslik kogus täiskasvanule.</p>
    </div>
  );
}
function NutriLabel({ n }) {
  return (
    <div className="nf-label">
      <div className="nf-label-head">Toitumisalane teave</div>
      <div className="nf-rule-thin" />
      <div className="nf-label-meta"><span>Portsjoneid pakis: <b>{n.servings}</b></span><span>Portsjon: <b>{n.serving}</b></span></div>
      <div className="nf-rule-thick" />
      <div className="nf-colhead"><span>Kogus (1 tablett)</span><span>%NRV*</span></div>
      <div className="nf-rule-med" />
      {n.rows.map((r, i) => {
        const sub = r[0].startsWith("—");
        const macro = i < 6 && !sub;
        return (
          <React.Fragment key={r[0]}>
            {i === 6 ? <div className="nf-rule-thick" /> : null}
            <div className={"nf-row " + (sub ? "nf-sub " : "") + (macro ? "nf-macro" : "")}>
              <span className="nf-name">{r[0]}</span>
              <span className="nf-amt">{r[1]}</span>
              <span className="nf-nrv">{r[2]}</span>
            </div>
          </React.Fragment>
        );
      })}
      <div className="nf-rule-thick" />
      <p className="nf-note">*NRV — päevane soovituslik kogus täiskasvanule.</p>
    </div>
  );
}
function NutriBars({ n }) {
  return (
    <div className="nf-bars">
      <NutriMeta n={n} />
      <div className="nf-bars-list">
        {n.rows.map((r) => {
          const sub = r[0].startsWith("—");
          return (
            <div key={r[0]} className={"nf-bar " + (sub ? "nf-bar-sub" : "")}>
              <div className="nf-bar-top"><span className="nf-bar-name">{r[0]}</span><span className="nf-bar-amt">{r[1]}</span></div>
              <div className="nf-bar-row2">
                <div className="nf-bar-track"><div className="nf-bar-fill" style={{ width: Math.min(100, nfPct(r[2])) + "%" }} /></div>
                <span className="nf-bar-pct">{r[2]}</span>
              </div>
            </div>
          );
        })}
      </div>
      <p className="pdp-nutri-note">*NRV — päevane soovituslik kogus täiskasvanule. Riba näitab osakaalu päevasest normist.</p>
    </div>
  );
}
export function Nutrition({ n }) {
  return <NutriLabel n={n} />;
}

/* ---- FAQ accordion ---- */
export function Faq({ items }) {
  const [open, setOpen] = React.useState(0);
  return (
    <div className="pdp-faq">
      {items.map(([q, a], i) => (
        <div key={i} className={"pdp-faq-i " + (open === i ? "is-open" : "")}>
          <button className="pdp-faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            {q}<Icon name="chevron" size={18} />
          </button>
          <div className="pdp-faq-a"><p>{a}</p></div>
        </div>
      ))}
    </div>
  );
}

/* ---- reviews ---- */
export const PDP_REVIEWS = [
  [5, "Margus T.", "Parim elektrolüüt mis proovinud. Pikkadel jooksudel hoiab energiat ja krampe pole. Maitse meeldiv, mitte liiga magus."],
  [5, "Liis K.", "Kasutan kuumade trennide ajal. Lahustub kiiresti, ei jää setet. Vimto maitse on lemmik!"],
  [4, "Andrei P.", "Hea koostis ja Informed Sport sertifikaat. Hind ok. Tahaks suuremat pakki."],
];
export function Reviews({ p }) {
  return (
    <div className="pdp-reviews" id="reviews">
      <div className="pdp-rev-summary">
        <div className="pdp-rev-big">{p.rating.toFixed(1)}<span>/5</span></div>
        <div className="pdp-stars lg">{[0,1,2,3,4].map((s)=><Icon key={s} name="star" size={20} />)}</div>
        <div className="pdp-rev-count">{p.reviews} arvustust</div>
      </div>
      <div className="pdp-rev-list">
        {PDP_REVIEWS.map(([r, name, body], i) => (
          <figure key={i} className="pdp-rev">
            <div className="pdp-stars">{[0,1,2,3,4].map((s)=><Icon key={s} name="star" size={15} style={{opacity:s<r?1:.25}} />)}</div>
            <blockquote>{body}</blockquote>
            <figcaption>{name} <span className="pdp-rev-v">✓ Kinnitatud ost</span></figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

/* ---- related ---- */
export function Related({ products }) {
  return (
    <div className="pgrid">
      {products.map((p) => (
        <a key={p.id} className="pcard" href="#" style={{ textDecoration: "none" }}>
          <div className="pcard-media"><ProductShot container={p.container} tint={p.tint} /></div>
          <div className="pcard-body">
            <div className="pcard-brand">{p.brand}</div>
            <h3 className="pcard-name">{p.name}</h3>
            <div className="pcard-foot"><span className="pcard-price">{money(p.price, "ee")}</span>
              {p.flavors ? <span className="pcard-flav">{p.flavors} maitset</span> : null}</div>
          </div>
        </a>
      ))}
    </div>
  );
}
