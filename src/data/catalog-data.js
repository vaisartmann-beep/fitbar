/* catalog-data.js — catalog products (with filter metadata) + i18n */
import { NEW_PRODUCTS, BESTSELLERS } from "./data.js";

/* enrichment for existing products, keyed by id: [category, goal, vegan, sugarfree, glutenfree, inStock, rating, sold] */
const CAT_META = {
  n1: ["vitamins", "health", false, true, true, true, 4.7, 210],
  n2: ["hydration", "energy", true, true, true, true, 4.6, 540],
  n3: ["vitamins", "health", true, true, true, true, 4.5, 90],
  n4: ["creatine", "muscle", true, true, true, true, 4.8, 320],
  n5: ["accessories", "muscle", true, true, true, true, 4.4, 150],
  n6: ["amino", "health", true, true, true, false, 4.3, 60],
  n7: ["protein", "muscle", false, false, true, true, 4.9, 880],
  n8: ["vitamins", "recovery", true, true, true, true, 4.5, 70],
  b1: ["vitamins", "health", true, true, true, true, 4.6, 130],
  b2: ["vitamins", "recovery", true, true, true, true, 4.4, 110],
  b3: ["snacks", "muscle", false, true, false, true, 4.8, 1240],
  b4: ["vitamins", "health", true, true, true, true, 4.6, 260],
  b5: ["creatine", "muscle", true, true, true, true, 4.9, 760],
  b6: ["hydration", "endurance", true, true, true, true, 4.8, 430],
  b7: ["protein", "muscle", false, false, true, true, 4.7, 510],
  b8: ["preworkout", "energy", true, true, true, true, 4.6, 300],
};

/* extra products for a fuller catalog */
const EXTRA = [
  { id: "x1", name: "Optimum Nutrition Gold Standard Whey — 2270 g", brand: "Optimum Nutrition", price: 74.90, container: "pouch", tint: 20, flavors: 6,
    facts: [["Valk", "24g"], ["BCAA", "5.5g"], ["Portsjon", "30g"]], variants: ["Šokolaad", "Vanill", "Maasikas", "Banaan", "Kookos", "Küpsis"],
    meta: ["protein", "muscle", false, false, true, true, 4.9, 1530] },
  { id: "x2", name: "BSN Syntha-6 — 2270 g", brand: "BSN", price: 64.90, container: "pouch", tint: 30, flavors: 4,
    facts: [["Valk", "22g"], ["Kiudaine", "5g"]], variants: ["Šokolaad", "Vanill", "Maasikas", "Küpsis"],
    meta: ["protein", "muscle", false, false, false, true, 4.7, 420] },
  { id: "x3", name: "Scitec Nutrition BCAA Xpress — 280 g", brand: "Scitec Nutrition", price: 16.90, container: "tub", tint: 145, flavors: 3,
    facts: [["BCAA", "2:1:1"], ["Portsjon", "7g"]], variants: ["Sidrun", "Apelsin", "Kirss"],
    meta: ["amino", "endurance", true, true, true, true, 4.6, 280] },
  { id: "x4", name: "Mutant Mass Gainer — 2200 g", brand: "Mutant", price: 39.90, container: "pouch", tint: 30, flavors: 3,
    facts: [["Kalorid", "1100"], ["Valk", "56g"]], variants: ["Šokolaad", "Vanill", "Maasikas"],
    meta: ["protein", "muscle", false, false, false, true, 4.5, 190] },
  { id: "x5", name: "IconFit Vegan Protein — 1000 g", brand: "IconFit", price: 24.90, container: "pouch", tint: 145, flavors: 4,
    facts: [["Valk", "21g"], ["Taimne", "100%"]], variants: ["Šokolaad", "Vanill", "Maasikas", "Maitsestamata"],
    meta: ["protein", "muscle", true, true, true, true, 4.7, 340] },
  { id: "x6", name: "NOW Foods Magnesium Citrate — 120 caps", brand: "NOW Foods", price: 13.90, container: "bottle", tint: 280,
    facts: [["Magneesium", "400mg"], ["Kapslid", "120"]],
    meta: ["vitamins", "recovery", true, true, true, true, 4.7, 410] },
  { id: "x7", name: "Optimum Nutrition Gold Standard Pre-Workout — 330 g", brand: "Optimum Nutrition", price: 29.90, container: "tub", tint: 20, flavors: 3,
    facts: [["Kofeiin", "175mg"], ["Beeta-alaniin", "1.5g"]], variants: ["Arbuus", "Sinine vaarikas", "Puuvili"],
    meta: ["preworkout", "energy", true, true, true, true, 4.6, 360] },
  { id: "x8", name: "Cellucor C4 Original — 390 g", brand: "Cellucor", price: 27.90, container: "tub", tint: 20, flavors: 5,
    facts: [["Kofeiin", "150mg"], ["Portsjon", "6.5g"]], variants: ["Arbuus", "Mango", "Puuvili", "Limonaad", "Kirss"],
    meta: ["preworkout", "energy", true, true, true, false, 4.5, 220] },
  { id: "x9", name: "OstroVit Vitamin D3 4000 IU — 200 tabs", brand: "OstroVit", price: 6.90, container: "bottle", tint: 60,
    facts: [["D3", "4000 IU"], ["Tabletid", "200"]],
    meta: ["vitamins", "health", true, true, true, true, 4.8, 670] },
  { id: "x10", name: "Applied Nutrition ABE Pre-Workout — 315 g", brand: "Applied Nutrition", price: 26.90, container: "tub", tint: 250, flavors: 4,
    facts: [["Kofeiin", "200mg"], ["Sitrulliin", "4g"]], variants: ["Energiajook", "Maasikas", "Ananass", "Cola"],
    meta: ["preworkout", "energy", true, true, true, true, 4.7, 480] },
  { id: "x11", name: "Barebells Soft Protein Bar — Hazelnut Nougat 55 g", brand: "Barebells", price: 3.20, container: "bar", tint: 30, flavors: 4,
    facts: [["Valk", "15g"], ["Suhkur", "1g"]], variants: ["Hazelnut", "Salty Peanut", "Cookie Dough", "Caramel"],
    meta: ["snacks", "recovery", false, false, false, true, 4.8, 920] },
  { id: "x12", name: "Optimum Nutrition Micronised Creatine — 634 g", brand: "Optimum Nutrition", price: 32.90, container: "tub", tint: 20,
    facts: [["Kreatiin", "5g"], ["Portsjoneid", "200"]],
    meta: ["creatine", "muscle", true, true, true, true, 4.9, 740] },
];

export function buildCatalog() {
  const base = [...NEW_PRODUCTS, ...BESTSELLERS].map((p) => {
    const m = CAT_META[p.id] || ["vitamins", "health", true, true, true, true, 4.5, 100];
    return { ...p, category: m[0], goal: m[1], vegan: m[2], sugarfree: m[3], glutenfree: m[4], inStock: m[5], rating: m[6], sold: m[7], badgeNew: p.badge === "new" };
  });
  const extra = EXTRA.map((p) => {
    const m = p.meta;
    return { ...p, category: m[0], goal: m[1], vegan: m[2], sugarfree: m[3], glutenfree: m[4], inStock: m[5], rating: m[6], sold: m[7], badgeNew: false, badge: undefined };
  });
  return [...base, ...extra];
}

/* category labels per language */
export const CAT_CATS = [
  ["protein", { ee: "Proteiin", en: "Protein", ru: "Протеин", fi: "Proteiini" }],
  ["creatine", { ee: "Kreatiin", en: "Creatine", ru: "Креатин", fi: "Kreatiini" }],
  ["amino", { ee: "Aminohapped", en: "Amino acids", ru: "Аминокислоты", fi: "Aminohapot" }],
  ["preworkout", { ee: "Enne treeningut", en: "Pre-workout", ru: "Предтрен", fi: "Pre-workout" }],
  ["vitamins", { ee: "Vitamiinid", en: "Vitamins", ru: "Витамины", fi: "Vitamiinit" }],
  ["hydration", { ee: "Hüdratatsioon", en: "Hydration", ru: "Гидратация", fi: "Nesteytys" }],
  ["snacks", { ee: "Batoonid & snäkid", en: "Bars & snacks", ru: "Батончики и снеки", fi: "Patukat & napostelu" }],
  ["accessories", { ee: "Aksessuaarid", en: "Accessories", ru: "Аксессуары", fi: "Tarvikkeet" }],
];
export const CAT_GOALS = ["weightloss", "muscle", "energy", "endurance", "health", "recovery"];

export const CAT_UI = {
  ee: { title: "Kõik tooted", crumbs: ["Avaleht", "Pood"], results: (n) => n + " toodet", sortLabel: "Sorteeri",
    sorts: { popular: "Populaarsed", priceAsc: "Hind: odavam", priceDesc: "Hind: kallim", rating: "Hinnang", new: "Uudised" },
    fCategory: "Kategooria", fBrand: "Bränd", fGoal: "Eesmärk", fPrice: "Hind", fDiet: "Dieet", fAvail: "Saadavus",
    vegan: "Vegan", sugarfree: "Suhkruvaba", glutenfree: "Gluteenivaba", inStock: "Laos", from: "Alates", to: "Kuni",
    clear: "Tühjenda kõik", filters: "Filtrid", apply: "Näita tooteid", noResults: "Tooteid ei leitud", noResultsSub: "Proovi filtreid muuta.",
    search: "Otsi tootest…", reset: "Lähtesta", flavorsW: "maitset", added: "Lisatud", showMore: "Näita rohkem" },
  en: { title: "All products", crumbs: ["Home", "Shop"], results: (n) => n + " products", sortLabel: "Sort",
    sorts: { popular: "Popular", priceAsc: "Price: low to high", priceDesc: "Price: high to low", rating: "Rating", new: "Newest" },
    fCategory: "Category", fBrand: "Brand", fGoal: "Goal", fPrice: "Price", fDiet: "Diet", fAvail: "Availability",
    vegan: "Vegan", sugarfree: "Sugar-free", glutenfree: "Gluten-free", inStock: "In stock", from: "From", to: "To",
    clear: "Clear all", filters: "Filters", apply: "Show products", noResults: "No products found", noResultsSub: "Try adjusting the filters.",
    search: "Search products…", reset: "Reset", flavorsW: "flavours", added: "Added", showMore: "Show more" },
  ru: { title: "Все товары", crumbs: ["Главная", "Магазин"], results: (n) => n + " товаров", sortLabel: "Сортировка",
    sorts: { popular: "Популярные", priceAsc: "Цена: по возрастанию", priceDesc: "Цена: по убыванию", rating: "Рейтинг", new: "Новинки" },
    fCategory: "Категория", fBrand: "Бренд", fGoal: "Цель", fPrice: "Цена", fDiet: "Диета", fAvail: "Наличие",
    vegan: "Веган", sugarfree: "Без сахара", glutenfree: "Без глютена", inStock: "В наличии", from: "От", to: "До",
    clear: "Сбросить всё", filters: "Фильтры", apply: "Показать товары", noResults: "Товары не найдены", noResultsSub: "Попробуйте изменить фильтры.",
    search: "Поиск товаров…", reset: "Сброс", flavorsW: "вкуса", added: "Добавлено", showMore: "Показать ещё" },
  fi: { title: "Kaikki tuotteet", crumbs: ["Etusivu", "Kauppa"], results: (n) => n + " tuotetta", sortLabel: "Lajittele",
    sorts: { popular: "Suositut", priceAsc: "Hinta: halvin", priceDesc: "Hinta: kallein", rating: "Arvosana", new: "Uutuudet" },
    fCategory: "Kategoria", fBrand: "Merkki", fGoal: "Tavoite", fPrice: "Hinta", fDiet: "Ruokavalio", fAvail: "Saatavuus",
    vegan: "Vegaani", sugarfree: "Sokeriton", glutenfree: "Gluteeniton", inStock: "Varastossa", from: "Alkaen", to: "Asti",
    clear: "Tyhjennä kaikki", filters: "Suodattimet", apply: "Näytä tuotteet", noResults: "Tuotteita ei löytynyt", noResultsSub: "Kokeile muuttaa suodattimia.",
    search: "Hae tuotteita…", reset: "Nollaa", flavorsW: "makua", added: "Lisätty", showMore: "Näytä lisää" },
};
