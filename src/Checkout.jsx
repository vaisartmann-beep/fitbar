/* Checkout.jsx — checkout page (4-lang) */
import React from "react";
import { Icon, ProductShot } from "./components/Icon.jsx";
import { money } from "./components/money.js";
import { Wordmark, LangMenu } from "./components/header.jsx";

const CHK_UI = {
  ee: { title: "Vormista tellimus", secure: "Turvaline makse", back: "Tagasi poodi", contact: "Kontaktandmed", delivery: "Tarneviis", payment: "Makseviis",
    email: "E-post", phone: "Telefon", firstName: "Eesnimi", lastName: "Perekonnanimi", street: "Tänav, maja, korter", city: "Linn", zip: "Postiindeks", machine: "Vali pakiautomaat",
    machines: ["Tallinn Kristiine Omniva", "Tallinn Ülemiste DPD", "Tallinn Rocca al Mare Omniva", "Tartu Lõunakeskus DPD"],
    dLocker: ["Pakiautomaat", "Omniva / DPD · 1–2 tööpäeva"], dCourier: ["Kuller koju", "1–3 tööpäeva"], dPickup: ["Tule poodi järele", "Rävala 6, Tallinn · tasuta"],
    free: "Tasuta", payCard: "Pangakaart", payCardSub: "Visa, Mastercard", payBank: "Pangalink", payBankSub: "Swedbank, SEB, LHV, Luminor", payApple: "Apple Pay", payGoogle: "Google Pay",
    sumTitle: "Sinu tellimus", subtotal: "Vahesumma", shipping: "Tarne", total: "Kokku", promoPh: "Sooduskood", apply: "Rakenda", promoOk: "Kood rakendatud", promoBad: "Vigane kood",
    pay: "Maksa", freeLeft: (x) => "Lisa veel " + x + " tasuta tarneks", terms: "Tellimust vormistades nõustud müügitingimustega.",
    trust: [["shield", "Krüpteeritud makse (Montonio)"], ["rotate", "14 päeva tagastusõigus"], ["truck", "Tasuta tarne alates 89€"]],
    sOk: "Aitäh tellimuse eest!", sSub: "Saatsime kinnituse sinu e-postile. Pakk on teel.", sOrder: "Tellimuse nr", sCont: "Jätka ostlemist", items: "toodet" },
  en: { title: "Checkout", secure: "Secure payment", back: "Back to shop", contact: "Contact details", delivery: "Delivery", payment: "Payment",
    email: "Email", phone: "Phone", firstName: "First name", lastName: "Last name", street: "Street, house, apt", city: "City", zip: "Postal code", machine: "Choose a parcel locker",
    machines: ["Tallinn Kristiine Omniva", "Tallinn Ülemiste DPD", "Tallinn Rocca al Mare Omniva", "Tartu Lõunakeskus DPD"],
    dLocker: ["Parcel locker", "Omniva / DPD · 1–2 business days"], dCourier: ["Courier to door", "1–3 business days"], dPickup: ["Pick up in store", "Rävala 6, Tallinn · free"],
    free: "Free", payCard: "Card", payCardSub: "Visa, Mastercard", payBank: "Bank link", payBankSub: "Swedbank, SEB, LHV, Luminor", payApple: "Apple Pay", payGoogle: "Google Pay",
    sumTitle: "Your order", subtotal: "Subtotal", shipping: "Shipping", total: "Total", promoPh: "Promo code", apply: "Apply", promoOk: "Code applied", promoBad: "Invalid code",
    pay: "Pay", freeLeft: (x) => "Add " + x + " more for free delivery", terms: "By placing the order you agree to the terms of sale.",
    trust: [["shield", "Encrypted payment (Montonio)"], ["rotate", "14-day return policy"], ["truck", "Free delivery over €89"]],
    sOk: "Thank you for your order!", sSub: "We've sent a confirmation to your email. Your parcel is on the way.", sOrder: "Order no.", sCont: "Continue shopping", items: "items" },
  ru: { title: "Оформление заказа", secure: "Безопасная оплата", back: "Назад в магазин", contact: "Контактные данные", delivery: "Доставка", payment: "Оплата",
    email: "E-mail", phone: "Телефон", firstName: "Имя", lastName: "Фамилия", street: "Улица, дом, кв.", city: "Город", zip: "Индекс", machine: "Выберите почтомат",
    machines: ["Tallinn Kristiine Omniva", "Tallinn Ülemiste DPD", "Tallinn Rocca al Mare Omniva", "Tartu Lõunakeskus DPD"],
    dLocker: ["Почтомат", "Omniva / DPD · 1–2 дня"], dCourier: ["Курьер до двери", "1–3 рабочих дня"], dPickup: ["Самовывоз", "Rävala 6, Таллинн · бесплатно"],
    free: "Бесплатно", payCard: "Картой", payCardSub: "Visa, Mastercard", payBank: "Банк-линк", payBankSub: "Swedbank, SEB, LHV, Luminor", payApple: "Apple Pay", payGoogle: "Google Pay",
    sumTitle: "Ваш заказ", subtotal: "Сумма", shipping: "Доставка", total: "Итого", promoPh: "Промокод", apply: "Применить", promoOk: "Код применён", promoBad: "Неверный код",
    pay: "Оплатить", freeLeft: (x) => "Добавьте ещё " + x + " до бесплатной доставки", terms: "Оформляя заказ, вы соглашаетесь с условиями продажи.",
    trust: [["shield", "Шифрованная оплата (Montonio)"], ["rotate", "Возврат 14 дней"], ["truck", "Бесплатная доставка от 89€"]],
    sOk: "Спасибо за заказ!", sSub: "Мы отправили подтверждение на ваш e-mail. Посылка уже в пути.", sOrder: "Номер заказа", sCont: "Продолжить покупки", items: "товаров" },
  fi: { title: "Kassa", secure: "Turvallinen maksu", back: "Takaisin kauppaan", contact: "Yhteystiedot", delivery: "Toimitus", payment: "Maksu",
    email: "Sähköposti", phone: "Puhelin", firstName: "Etunimi", lastName: "Sukunimi", street: "Katu, talo, asunto", city: "Kaupunki", zip: "Postinumero", machine: "Valitse pakettiautomaatti",
    machines: ["Tallinn Kristiine Omniva", "Tallinn Ülemiste DPD", "Tallinn Rocca al Mare Omniva", "Tartu Lõunakeskus DPD"],
    dLocker: ["Pakettiautomaatti", "Omniva / DPD · 1–2 arkipäivää"], dCourier: ["Kuriiri kotiin", "1–3 arkipäivää"], dPickup: ["Nouto myymälästä", "Rävala 6, Tallinna · ilmainen"],
    free: "Ilmainen", payCard: "Kortti", payCardSub: "Visa, Mastercard", payBank: "Pankkilinkki", payBankSub: "Swedbank, SEB, LHV, Luminor", payApple: "Apple Pay", payGoogle: "Google Pay",
    sumTitle: "Tilauksesi", subtotal: "Välisumma", shipping: "Toimitus", total: "Yhteensä", promoPh: "Alennuskoodi", apply: "Käytä", promoOk: "Koodi käytetty", promoBad: "Virheellinen koodi",
    pay: "Maksa", freeLeft: (x) => "Lisää vielä " + x + " ilmaiseen toimitukseen", terms: "Tilaamalla hyväksyt myyntiehdot.",
    trust: [["shield", "Salattu maksu (Montonio)"], ["rotate", "14 päivän palautusoikeus"], ["truck", "Ilmainen toimitus yli 89€"]],
    sOk: "Kiitos tilauksesta!", sSub: "Lähetimme vahvistuksen sähköpostiisi. Pakettisi on matkalla.", sOrder: "Tilausnro", sCont: "Jatka ostoksia", items: "tuotetta" },
};

const CHK_CART0 = [
  { id: "c1", brand: "Optimum Nutrition", name: "Whey Gold Standard · Šokolaad · 450 g", price: 29.90, container: "pouch", tint: 20, qty: 1 },
  { id: "c2", brand: "OstroVit", name: "Creatine HCL 2400 mg · 150 caps", price: 14.90, container: "tub", tint: 230, qty: 2 },
  { id: "c3", brand: "Applied Nutrition", name: "Endurance Electrolyte · Apelsin · 20 tabletti", price: 8.90, container: "tub", tint: 135, qty: 1 },
];

function Field({ label, value, onChange, type, ph, half }) {
  return (
    <label className={"chk-field " + (half ? "half" : "")}>
      <span>{label}</span>
      <input type={type || "text"} value={value} onChange={(e) => onChange(e.target.value)} placeholder={ph || ""} />
    </label>
  );
}
function OptCard({ on, onClick, icon, title, sub, price }) {
  return (
    <button className={"chk-opt " + (on ? "is-on" : "")} onClick={onClick}>
      <span className="chk-radio" />
      {icon ? <span className="chk-opt-ic"><Icon name={icon} size={19} /></span> : null}
      <span className="chk-opt-txt"><b>{title}</b>{sub ? <span>{sub}</span> : null}</span>
      {price != null ? <span className="chk-opt-price">{price}</span> : null}
    </button>
  );
}

export default function Checkout({ params }) {
  const q0 = params || new URLSearchParams();
  const [lang, setLang] = React.useState(() => { const l = q0.get("lang"); return ["ee", "en", "ru", "fi"].includes(l) ? l : "ee"; });
  const t = CHK_UI[lang] || CHK_UI.ee;
  const [items, setItems] = React.useState(CHK_CART0);
  const [form, setForm] = React.useState({ email: "", phone: "", firstName: "", lastName: "", street: "", city: "", zip: "", machine: 0 });
  const [delivery, setDelivery] = React.useState("locker");
  const [pay, setPay] = React.useState("bank");
  const [bank, setBank] = React.useState("Swedbank");
  const [promo, setPromo] = React.useState("");
  const [promoOk, setPromoOk] = React.useState(false);
  const [promoErr, setPromoErr] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const set = (k) => (v) => setForm((s) => ({ ...s, [k]: v }));

  React.useEffect(() => { document.documentElement.lang = lang === "ee" ? "et" : lang; document.title = t.title + " — Fitbar.ee"; }, [lang]);

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const discount = promoOk ? subtotal * 0.1 : 0;
  const afterDisc = subtotal - discount;
  const shipBase = { locker: 2.99, courier: 4.99, pickup: 0 }[delivery];
  const shipping = delivery === "pickup" ? 0 : (afterDisc >= 89 ? 0 : shipBase);
  const total = afterDisc + shipping;
  const count = items.reduce((s, it) => s + it.qty, 0);
  function setQty(id, d) { setItems((a) => a.flatMap((it) => it.id !== id ? [it] : (it.qty + d <= 0 ? [] : [{ ...it, qty: it.qty + d }]))); }
  function applyPromo() { if (promo.trim().toUpperCase() === "FIT10") { setPromoOk(true); setPromoErr(false); } else { setPromoErr(true); setPromoOk(false); } }
  const orderNo = "FB-2026-" + String(4280 + count).padStart(4, "0");

  if (done) {
    return (
      <div className="chk-success">
        <div className="chk-success-card">
          <span className="chk-success-ic"><Icon name="check" size={40} /></span>
          <h1>{t.sOk}</h1>
          <p>{t.sSub}</p>
          <div className="chk-order-no">{t.sOrder}: <b>{orderNo}</b></div>
          <a className="btn btn-red lg" href="#/kataloog">{t.sCont}</a>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <header className="chk-top">
        <div className="wrap chk-top-in">
          <a href="#/" className="chk-logo"><Wordmark light /></a>
          <div className="chk-secure"><Icon name="shield" size={16} />{t.secure}</div>
          <LangMenu lang={lang} setLang={setLang} />
        </div>
      </header>
      <main className="chk-main">
        <div className="wrap">
          <a className="chk-back" href="#/kataloog"><Icon name="chevron" size={16} style={{ transform: "rotate(90deg)" }} />{t.back}</a>
          <h1 className="chk-h1">{t.title}</h1>
          <div className="chk-grid">
            <div className="chk-left">
              {/* contact */}
              <section className="chk-sec">
                <h2><span className="chk-step">1</span>{t.contact}</h2>
                <div className="chk-fields">
                  <Field label={t.email} value={form.email} onChange={set("email")} type="email" ph="nimi@email.ee" />
                  <Field label={t.phone} value={form.phone} onChange={set("phone")} type="tel" ph="+372 5xx xxx xx" />
                  <Field label={t.firstName} value={form.firstName} onChange={set("firstName")} half />
                  <Field label={t.lastName} value={form.lastName} onChange={set("lastName")} half />
                </div>
              </section>
              {/* delivery */}
              <section className="chk-sec">
                <h2><span className="chk-step">2</span>{t.delivery}</h2>
                <div className="chk-opts">
                  <OptCard on={delivery === "locker"} onClick={() => setDelivery("locker")} icon="truck" title={t.dLocker[0]} sub={t.dLocker[1]} price="2,99 €" />
                  <OptCard on={delivery === "courier"} onClick={() => setDelivery("courier")} icon="truck" title={t.dCourier[0]} sub={t.dCourier[1]} price="4,99 €" />
                  <OptCard on={delivery === "pickup"} onClick={() => setDelivery("pickup")} icon="pin" title={t.dPickup[0]} sub={t.dPickup[1]} price={t.free} />
                </div>
                {delivery === "locker" ? (
                  <label className="chk-field" style={{ marginTop: "14px" }}><span>{t.machine}</span>
                    <select value={form.machine} onChange={(e) => set("machine")(+e.target.value)}>
                      {t.machines.map((m, i) => <option key={i} value={i}>{m}</option>)}
                    </select>
                  </label>
                ) : null}
                {delivery === "courier" ? (
                  <div className="chk-fields" style={{ marginTop: "14px" }}>
                    <Field label={t.street} value={form.street} onChange={set("street")} />
                    <Field label={t.city} value={form.city} onChange={set("city")} half />
                    <Field label={t.zip} value={form.zip} onChange={set("zip")} half />
                  </div>
                ) : null}
              </section>
              {/* payment */}
              <section className="chk-sec">
                <h2><span className="chk-step">3</span>{t.payment}</h2>
                <div className="chk-opts">
                  <OptCard on={pay === "bank"} onClick={() => setPay("bank")} icon="shield" title={t.payBank} sub={t.payBankSub} />
                  {pay === "bank" ? (
                    <div className="chk-banks">
                      {["Swedbank", "SEB", "LHV", "Luminor"].map((b) => (
                        <button key={b} className={"chk-bank " + (bank === b ? "is-on" : "")} onClick={() => setBank(b)}>{b}</button>
                      ))}
                    </div>
                  ) : null}
                  <OptCard on={pay === "card"} onClick={() => setPay("card")} icon="check" title={t.payCard} sub={t.payCardSub} />
                  <OptCard on={pay === "apple"} onClick={() => setPay("apple")} title={t.payApple} />
                  <OptCard on={pay === "google"} onClick={() => setPay("google")} title={t.payGoogle} />
                </div>
              </section>
            </div>

            {/* summary */}
            <aside className="chk-summary">
              <div className="chk-sum-card">
                <h3>{t.sumTitle} <span className="chk-sum-count">{count}</span></h3>
                <div className="chk-sum-items">
                  {items.map((it) => (
                    <div key={it.id} className="chk-sitem">
                      <span className="chk-sitem-shot"><ProductShot container={it.container} tint={it.tint} /></span>
                      <div className="chk-sitem-mid"><div className="chk-sitem-name">{it.name}</div>
                        <div className="chk-sitem-row"><div className="qty">
                          <button onClick={() => setQty(it.id, -1)}><Icon name="minus" size={14} /></button><span>{it.qty}</span>
                          <button onClick={() => setQty(it.id, 1)}><Icon name="plus" size={14} /></button></div>
                          <span className="chk-sitem-price">{money(it.price * it.qty, lang)}</span></div></div>
                    </div>
                  ))}
                </div>
                <div className="chk-promo">
                  <input value={promo} onChange={(e) => { setPromo(e.target.value); setPromoErr(false); }} placeholder={t.promoPh} />
                  <button onClick={applyPromo}>{t.apply}</button>
                </div>
                {promoOk ? <div className="chk-promo-ok"><Icon name="check" size={14} />{t.promoOk} (−10%)</div> : null}
                {promoErr ? <div className="chk-promo-bad">{t.promoBad}</div> : null}
                <div className="chk-totals">
                  <div className="chk-trow"><span>{t.subtotal}</span><span>{money(subtotal, lang)}</span></div>
                  {promoOk ? <div className="chk-trow chk-disc"><span>−10%</span><span>−{money(discount, lang)}</span></div> : null}
                  <div className="chk-trow"><span>{t.shipping}</span><span>{shipping === 0 ? t.free : money(shipping, lang)}</span></div>
                  <div className="chk-trow chk-total"><span>{t.total}</span><strong>{money(total, lang)}</strong></div>
                </div>
                <button className="btn btn-red full lg chk-pay" disabled={!form.email.includes("@")} onClick={() => setDone(true)}>
                  <Icon name="shield" size={18} />{t.pay} {money(total, lang)}
                </button>
                <p className="chk-terms">{t.terms}</p>
                <div className="chk-trust">
                  {t.trust.map(([ic, tx]) => <div key={tx}><Icon name={ic} size={15} />{tx}</div>)}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}
