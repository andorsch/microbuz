# Microbuz Cluj — Website Design Spec

**Date:** 2026-04-03  
**Project:** Static one-page website for microbuz rental business  
**Hosting:** GitHub Pages (fully static, no backend)

---

## Business Details

| Field | Value |
|-------|-------|
| Brand name | Microbuz Cluj |
| Legal entity | SCHVARCZ ELECTRIC SOLUTIONS SRL |
| CUI | RO39748741 |
| Location | Cluj-Napoca, România |
| Phone | 0746 063 301 |
| WhatsApp | wa.me/40746063301 (same number, +40 prefix) |
| Service | Microbuz rental 8+1 seats — **vehicle only, no driver, no airport transfer** |

---

## Design System

| Token | Value |
|-------|-------|
| Primary dark | `#0f1c3f` (navy) |
| Primary mid | `#1a3c6e` |
| Primary light | `#1e4d99` |
| Accent gold | `#f59e0b` |
| Accent orange | `#f97316` |
| WhatsApp green | `#25d366` |
| Text muted | `#64748b` |
| Background light | `#f8fafc` |
| Font | System stack: `'Segoe UI', system-ui, sans-serif` |

**Style direction:** Professional & Corporate — dark navy backgrounds, white text, gold accents. Bold, high-contrast, conversion-focused.

---

## File Structure

```
microbuz-cluj/
├── index.html      ← entire page
├── styles.css      ← all styles
├── script.js       ← dynamic copyright year only
├── .nojekyll       ← prevents GitHub Pages Jekyll processing (required)
├── favicon.ico     ← minimal favicon (prevents 404 on every load)
└── assets/
    └── images/     ← placeholder for future bus photo (bus.jpg)
```

All paths relative. No build tools, no npm, no frameworks. Compatible with GitHub Pages out of the box.

**`.nojekyll`** must be present at the repository root — without it, GitHub Pages runs Jekyll which strips files/dirs starting with `_` and can cause silent failures.

---

## SEO Requirements

- `<html lang="ro">` on the root element
- `<meta name="viewport" content="width=device-width, initial-scale=1">` in `<head>`
- `<title>`: `Închiriere Microbuz 8+1 Cluj-Napoca | Microbuz Cluj`
- `<meta name="description">`: `Închiriază microbuz 8+1 locuri în Cluj-Napoca. Ideal pentru evenimente, excursii și grupuri. Tarif de la 350 RON + TVA/zi. Sună: 0746 063 301.`
- `<link rel="canonical" href="https://inchirieremicrobuzcluj.ro">` — prevents crawl-equity split across GitHub Pages subdomain vs custom domain
- Keywords targeted: `inchiriere microbuz Cluj`, `microbuz 8+1 Cluj`, `inchiriere microbuz Cluj-Napoca`
- Semantic HTML5: `<header>`, `<main>`, `<section>`, `<footer>`
- All images: descriptive `alt` attributes (e.g. `alt="Ford Transit 8+1 de închiriat Cluj-Napoca"`)
- H1 → H2 → H3 heading hierarchy respected
- JSON-LD `LocalBusiness` schema in `<head>`
- Favicon: `<link rel="icon" href="favicon.ico">` — prevents 404 on every page load

### Open Graph & Social Meta Tags

Required for correct WhatsApp link previews and social sharing:

```html
<meta property="og:type" content="website">
<meta property="og:title" content="Închiriere Microbuz 8+1 Cluj-Napoca | Microbuz Cluj">
<meta property="og:description" content="Închiriază microbuz 8+1 locuri în Cluj-Napoca. Ideal pentru evenimente, excursii și grupuri. Tarif de la 350 RON + TVA/zi.">
<meta property="og:url" content="https://inchirieremicrobuzcluj.ro">
<meta property="og:image" content="https://inchirieremicrobuzcluj.ro/assets/images/bus.jpg">
<meta name="twitter:card" content="summary_large_image">
```

*(Substitute final domain. If no custom domain yet, use the GitHub Pages URL pattern: `https://<username>.github.io/<repo>/`)*

### JSON-LD Schema

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Microbuz Cluj",
  "legalName": "SCHVARCZ ELECTRIC SOLUTIONS SRL",
  "telephone": "+40746063301",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Cluj-Napoca",
    "addressCountry": "RO"
  },
  "url": "https://inchirieremicrobuzcluj.ro",
  "description": "Închiriere microbuz 8+1 locuri în Cluj-Napoca. Ideal pentru evenimente, excursii și grupuri."
}
```

*(Substitute `url` with final domain before launch. `priceRange` omitted — the Schema.org property expects symbolic values like `"$$"`, not price strings; pricing is covered by page content and `description`.)*

---

## Page Sections (top → bottom)

### 1. Sticky Header
- Background: `#0f1c3f`, bottom border `2px solid #f59e0b`
- Left: logo "MICROBUZ CLUJ" in gold, bold
- Right: CTA button `📞 0746 063 301` — `tel:` link, gold bg, navy text
- `position: sticky; top: 0; z-index: 100`

### 2. Hero
- Background: gradient `#0f1c3f → #1a3c6e → #1e4d99`
- Badge pill: "Cluj-Napoca · Disponibil 7/7" — gold border, transparent bg
- H1: "Închiriere **Microbuz 8+1** în Cluj-Napoca" — "Microbuz 8+1" in gold
- Subtext: "Închiriază microbuzul pentru evenimentul sau excursia ta. Simplu, rapid, la prețuri corecte."
- CTA button: `📞 Sună acum` — gold bg, navy text, box shadow, `tel:` link
- Phone number below button: `0746 063 301` — muted white

### 3. Services Strip
- Dark navy background `#1a2744`
- 3-column CSS grid, gold dividers
- Columns: `💍 Evenimente` / `🏔️ Excursii` / `👥 Grupuri`
- Icon + label in gold uppercase

### 4. Services Detail
- White background
- Section label: "Servicii" in gold uppercase
- H2: "Când poți închiria"
- 3 cards, each with `border-left: 4px solid #f59e0b`, light bg `#f8fafc`
  1. **Evenimente speciale** 💍 — Nunți, botezuri, petreceri, team building
  2. **Excursii & turism** 🏔️ — Ieșiri în natură, city breaks, stațiuni
  3. **Grupuri & deplasări** 👥 — Transport angajați, delegații, grupuri de 9

### 5. Vehicle Section
- Background: `#0f1c3f` (dark)
- Section label: "Vehiculul nostru"
- H2: "Ford Transit 8+1"
- Image: `<img src="assets/images/bus.jpg" alt="Ford Transit 8+1 de închiriat Cluj-Napoca">`. **Fallback when image is absent:** render a `div` with gradient background `linear-gradient(135deg, #1a3c6e, #2563eb)`, rounded corners, `height: 200px`, centered bus emoji `🚌` as visual placeholder. When a real photo is added, replace the div with the `<img>` tag.
- 2-column features grid (6 items):
  - ❄️ Aer condiționat
  - 🛋️ Scaune confortabile
  - 🧳 Spațiu mare bagaje
  - 🔌 Prize USB
  - 🧹 Mereu curat
  - 🛡️ Asigurat complet

### 6. Why Us
- White background
- H2: "Alegeți calitatea"
- 4 items, each with gold circle checkmark:
  1. **Rezervare rapidă** — Suni, stabilim detaliile, microbuzul e al tău
  2. **Prețuri corecte, fără surprize** — Ofertă clară înainte de închiriere
  3. **Vehicul în stare perfectă** — Ford Transit modern, climatizat, verificat tehnic
  4. **Flexibilitate maximă** — Disponibil 7 zile din 7

### 7. Pricing
- Background: gradient `#1a3c6e → #0f1c3f` (dark)
- Section label: "Tarife"
- H2: "Prețuri transparente"
- Price card: **350 RON** + TVA / zi — gold number, dark semi-transparent card, gold border
- Deposit info box: "Depozit de garanție: 300–500 €" — explains it varies by period/factors, returned in full. **Note:** deposit intentionally quoted in EUR (business policy), daily rate in RON. Do not convert to RON.
- CTA: `📞 Cere ofertă personalizată` — `tel:` link, gold button

### 8. Contact
- Light bg `#f8fafc`
- H2: "Contactează-ne"
- 3 clickable rows (no form):
  - 📞 Telefon — `0746 063 301` — `tel:+40746063301` (E.164 format for reliable mobile behavior)
  - 💬 WhatsApp — `0746 063 301` — `https://wa.me/40746063301`
  - 📍 Locație — Cluj-Napoca, România (not a link)
- Each row: white card, colored left border, icon + label + value

### 9. Footer
- Background: `#0a1225`
- Logo "MICROBUZ CLUJ" in gold
- Divider line
- Company block:
  ```
  SCHVARCZ ELECTRIC SOLUTIONS SRL
  CUI: RO39748741
  Cluj-Napoca, România
  ```
- Copyright: `© <year> Microbuz Cluj · Închiriere microbuz Cluj-Napoca · Toate drepturile rezervate`
- `<year>` populated by JS: `new Date().getFullYear()`

### 10. WhatsApp Floating Button
- Fixed, bottom-right: `bottom: 24px; right: 24px`
- Green circle `#25d366`, 52×52px, chat icon
- Links to `https://wa.me/40746063301`
- Box shadow with green glow
- `z-index: 999`

---

## script.js

Single responsibility: set copyright year dynamically.

```js
document.getElementById('year').textContent = new Date().getFullYear();
```

Loaded with `defer` in `<head>`:
```html
<script src="script.js" defer></script>
```

Using `defer` ensures the DOM is ready before the script runs (safe access to `#year`) and does not block page rendering. No other JS needed. Smooth scrolling handled via CSS `scroll-behavior: smooth` on `html`.

---

## GitHub Pages Compatibility

- All paths relative (no absolute `/` root paths)
- No server-side rendering, no API calls
- No `404` dependency — everything in `index.html`
- `.nojekyll` file in root to prevent Jekyll processing
- Assets referenced as `assets/images/bus.jpg` (relative)

---

## Out of Scope

- Airport transfer service (explicitly excluded)
- Driver/chauffeur service (vehicle rental only)
- Contact form with backend submission
- Booking system
- Multi-language support
