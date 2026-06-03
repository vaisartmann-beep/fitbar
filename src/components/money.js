/* money — currency formatting helper (shared) */
export function money(n, lang) {
  const s = n.toFixed(2).replace(".", lang === "en" ? "." : ",");
  return `${s} €`;
}
