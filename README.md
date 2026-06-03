# Fitbar.ee — toote kaart (PDP)

Applied Nutrition Endurance Electrolyte toote detailileht (product detail page) Fitbar.ee jaoks.
Ehitatud **Vite + React**-iga; disain on üks-ühele Claude Design prototüübist.

**Live:** https://vaisartmann-beep.github.io/fitbar/

## Mis sees on

- Galerii pisipiltidega, ostukast (kogus / maitse / fasung), Subscribe & Save (−5%)
- Kiire ülevaate riba, "Sageli ostetakse koos" komplekt allahindlusega
- Kleepuvad jaotuse-tabid skrollspaiga, kirjeldus, koostis + toitumise label
- KKK akordion, arvustused, seotud tooted, uudiskiri
- Kleepuv osturiba (peegeldab valikut), ostukorvi sahtel, toast-teade
- JSON-LD struktuurandmed (Product / Offer / AggregateRating / BreadcrumbList / FAQPage) — SEO ja AI-sõbralik

## Kohalik käivitamine

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # väljund: dist/
npm run preview  # eelvaade buildist
```

## Deploy

Iga `git push` `main` harusse käivitab GitHub Actionsi töövoo
([.github/workflows/deploy.yml](.github/workflows/deploy.yml)), mis ehitab ja
avaldab lehe GitHub Pagesisse automaatselt.

> Märkus: kui muudad repo nime, uuenda `base` väärtust failis
> [vite.config.js](vite.config.js) vastavaks (`/<repo-nimi>/`).
