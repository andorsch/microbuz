# Microbuz Cluj Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready, fully static one-page website for a microbuz rental business in Cluj-Napoca, optimised for GitHub Pages hosting and local SEO.

**Architecture:** Single `index.html` with all page sections, `styles.css` for all visual styling, and a minimal `script.js` (dynamic copyright year only). No build tools, no npm, no frameworks — pure HTML/CSS/JS that GitHub Pages serves directly as static files.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox), vanilla JS (one line), GitHub Pages

---

## File Map

| File | Responsibility |
|------|---------------|
| `index.html` | Full page markup — all sections, SEO meta, JSON-LD schema |
| `styles.css` | All styles — reset, design tokens, layout, sections, responsive |
| `script.js` | Single responsibility: set `#year` span to `new Date().getFullYear()` |
| `.nojekyll` | Empty file — prevents GitHub Pages from running Jekyll |
| `favicon.ico` | Minimal favicon — prevents 404 on every page load |
| `assets/images/` | Directory for future bus photo (empty for now) |

---

## Task 1: Project Scaffold & GitHub Pages Setup

**Files:**
- Create: `index.html`
- Create: `styles.css`
- Create: `script.js`
- Create: `.nojekyll`
- Create: `favicon.ico` (1×1 transparent ICO)
- Create: `assets/images/.gitkeep`

- [ ] **Step 1: Create `.nojekyll`**

```bash
touch /Users/andorsch/dev/microbuz/.nojekyll
```

This empty file tells GitHub Pages to skip Jekyll processing. Without it, directories starting with `_` get stripped and builds can fail silently.

- [ ] **Step 2: Create a minimal `favicon.ico`**

Create `favicon.ico` using a minimal 1×1 transparent ICO (base64-encoded). Write this file using the Write tool with binary-safe content, or use the following shell command to generate a valid minimal ICO:

```bash
# Minimal 1x1 transparent ICO (hex bytes)
printf '\x00\x00\x01\x00\x01\x00\x01\x01\x00\x00\x01\x00\x18\x00\x28\x00\x00\x00\x16\x00\x00\x00\x28\x00\x00\x00\x01\x00\x00\x00\x02\x00\x00\x00\x01\x00\x18\x00\x00\x00\x00\x00\x04\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x0f\x1c\x3f\x00\x00\x00\x00\x00' > /Users/andorsch/dev/microbuz/favicon.ico
```

- [ ] **Step 3: Create empty `assets/images/` directory**

```bash
mkdir -p /Users/andorsch/dev/microbuz/assets/images
touch /Users/andorsch/dev/microbuz/assets/images/.gitkeep
```

- [ ] **Step 4: Create empty `styles.css` and `script.js`**

Create `styles.css` — empty for now (filled in Task 2).
Create `script.js` with only the year script:

```js
document.getElementById('year').textContent = new Date().getFullYear();
```

- [ ] **Step 5: Create the `index.html` skeleton**

Create `index.html` with the full `<head>` block — all meta tags, SEO, schema. No body content yet.

```html
<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Închiriere Microbuz 8+1 Cluj-Napoca | Microbuz Cluj</title>
  <meta name="description" content="Închiriază microbuz 8+1 locuri în Cluj-Napoca. Ideal pentru evenimente, excursii și grupuri. Tarif de la 350 RON + TVA/zi. Sună: 0746 063 301.">
  <link rel="canonical" href="https://inchirieremicrobuzcluj.ro">
  <link rel="icon" href="favicon.ico">

  <!-- Open Graph / WhatsApp preview -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Închiriere Microbuz 8+1 Cluj-Napoca | Microbuz Cluj">
  <meta property="og:description" content="Închiriază microbuz 8+1 locuri în Cluj-Napoca. Ideal pentru evenimente, excursii și grupuri. Tarif de la 350 RON + TVA/zi.">
  <meta property="og:url" content="https://inchirieremicrobuzcluj.ro">
  <meta property="og:image" content="https://inchirieremicrobuzcluj.ro/assets/images/bus.jpg">
  <meta name="twitter:card" content="summary_large_image">

  <!-- JSON-LD LocalBusiness schema -->
  <script type="application/ld+json">
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
  </script>

  <link rel="stylesheet" href="styles.css">
  <script src="script.js" defer></script>
</head>
<body>
  <!-- sections added in Tasks 2-8 -->
</body>
</html>
```

- [ ] **Step 6: Serve locally and verify**

Open via a local server (not `file://` — browsers block linked CSS/JS on direct file opens):

```bash
cd /Users/andorsch/dev/microbuz
python3 -m http.server 8080
```

Open `http://localhost:8080` in browser. Expected: blank white page, no console errors, page title reads "Închiriere Microbuz 8+1 Cluj-Napoca | Microbuz Cluj".

- [ ] **Step 7: Commit**

```bash
cd /Users/andorsch/dev/microbuz
git add index.html styles.css script.js .nojekyll favicon.ico assets/
git commit -m "feat: project scaffold with SEO head, .nojekyll, favicon"
```

---

## Task 2: CSS Design System & Reset

**Files:**
- Modify: `styles.css`

- [ ] **Step 1: Write the CSS reset and design tokens**

Add to `styles.css`:

```css
/* === RESET === */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* === DESIGN TOKENS === */
:root {
  --navy:       #0f1c3f;
  --navy-mid:   #1a3c6e;
  --navy-light: #1e4d99;
  --navy-dark:  #1a2744;
  --navy-deep:  #0a1225;
  --gold:       #f59e0b;
  --gold-hover: #d97706;
  --orange:     #f97316;
  --green-wa:   #25d366;
  --blue-ph:    #2563eb;
  --text-muted: #64748b;
  --bg-light:   #f8fafc;
  --bg-border:  #e2e8f0;
  --white:      #ffffff;
}

/* === BASE === */
html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  color: var(--navy);
  background: var(--white);
  line-height: 1.5;
}

a {
  text-decoration: none;
  color: inherit;
}

img {
  max-width: 100%;
  display: block;
}
```

- [ ] **Step 2: Add reusable layout utilities**

```css
/* === UTILITIES === */
.section {
  padding: 48px 24px;
}

.section-label {
  color: var(--gold);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.section-title {
  font-size: 26px;
  font-weight: 900;
  line-height: 1.2;
  margin-bottom: 24px;
}

.section-title--light {
  color: var(--white);
}

.section-title--dark {
  color: var(--navy);
}

/* Tablet and up */
@media (min-width: 640px) {
  .section {
    padding: 64px 48px;
  }

  .section-title {
    font-size: 32px;
  }
}
```

- [ ] **Step 3: Verify styles load**

Reload `index.html` in browser. Body should now use the system font. No console errors.

- [ ] **Step 4: Commit**

```bash
git add styles.css
git commit -m "feat: CSS design tokens, reset, and layout utilities"
```

---

## Task 3: Header & Hero Section

**Files:**
- Modify: `index.html` (inside `<body>`)
- Modify: `styles.css`

- [ ] **Step 1: Add header and hero HTML to `<body>`**

```html
<body>

  <!-- HEADER -->
  <header class="site-header">
    <div class="site-logo">MICROBUZ CLUJ</div>
    <a href="tel:+40746063301" class="header-cta">📞 0746 063 301</a>
  </header>

  <main>

    <!-- HERO -->
    <section class="hero" aria-label="Închiriere microbuz Cluj-Napoca">
      <div class="hero-badge">Cluj-Napoca · Disponibil 7/7</div>
      <h1 class="hero-title">
        Închiriere <span class="hero-title__accent">Microbuz 8+1</span><br>
        în Cluj-Napoca
      </h1>
      <p class="hero-sub">
        Închiriază microbuzul pentru evenimentul sau excursia ta.<br>
        Simplu, rapid, la prețuri corecte.
      </p>
      <a href="tel:+40746063301" class="hero-cta">📞 Sună acum</a>
      <span class="hero-phone">0746 063 301</span>
    </section>

    <!-- remaining sections added in later tasks -->

  </main>

  <!-- FOOTER added in Task 8 -->

</body>
```

- [ ] **Step 2: Add header and hero CSS to `styles.css`**

```css
/* === HEADER === */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--navy);
  border-bottom: 2px solid var(--gold);
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.site-logo {
  color: var(--gold);
  font-weight: 900;
  font-size: 15px;
  letter-spacing: 1px;
}

.header-cta {
  background: var(--gold);
  color: var(--navy);
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 800;
  font-size: 13px;
  transition: background 0.2s;
}

.header-cta:hover {
  background: var(--gold-hover);
}

/* === HERO === */
.hero {
  background: linear-gradient(160deg, var(--navy) 0%, var(--navy-mid) 60%, var(--navy-light) 100%);
  padding: 56px 24px 48px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: -60px;
  right: -60px;
  width: 280px;
  height: 280px;
  background: rgba(245, 158, 11, 0.05);
  border-radius: 50%;
  pointer-events: none;
}

.hero-badge {
  display: inline-block;
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.4);
  color: var(--gold);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 5px 16px;
  border-radius: 20px;
  margin-bottom: 20px;
}

.hero-title {
  color: var(--white);
  font-size: 32px;
  font-weight: 900;
  line-height: 1.15;
  margin-bottom: 16px;
}

.hero-title__accent {
  color: var(--gold);
}

.hero-sub {
  color: rgba(255, 255, 255, 0.65);
  font-size: 15px;
  margin-bottom: 32px;
  line-height: 1.6;
}

.hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--gold);
  color: var(--navy);
  padding: 15px 32px;
  border-radius: 8px;
  font-weight: 900;
  font-size: 17px;
  box-shadow: 0 4px 24px rgba(245, 158, 11, 0.4);
  transition: background 0.2s, transform 0.15s;
}

.hero-cta:hover {
  background: var(--gold-hover);
  transform: translateY(-1px);
}

.hero-phone {
  display: block;
  color: rgba(255, 255, 255, 0.35);
  font-size: 13px;
  margin-top: 14px;
  letter-spacing: 1px;
}

@media (min-width: 640px) {
  .hero-title {
    font-size: 42px;
  }

  .hero-sub {
    font-size: 17px;
  }
}
```

- [ ] **Step 3: Verify in browser**

Reload. Expected: dark navy hero with gold H1 accent, sticky header visible at top, phone CTA button in header, main CTA button in hero centered.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: sticky header and hero section"
```

---

## Task 4: Services Strip + Services Detail Section

**Files:**
- Modify: `index.html` (inside `<main>`, after hero)
- Modify: `styles.css`

- [ ] **Step 1: Add services HTML after the hero section**

```html
    <!-- SERVICES STRIP -->
    <div class="services-strip" aria-hidden="true">
      <div class="strip-item">
        <span class="strip-icon">💍</span>
        <span class="strip-name">Evenimente</span>
      </div>
      <div class="strip-item">
        <span class="strip-icon">🏔️</span>
        <span class="strip-name">Excursii</span>
      </div>
      <div class="strip-item">
        <span class="strip-icon">👥</span>
        <span class="strip-name">Grupuri</span>
      </div>
    </div>

    <!-- SERVICES DETAIL -->
    <section class="section services-section" id="servicii">
      <p class="section-label">Servicii</p>
      <h2 class="section-title section-title--dark">Când poți închiria</h2>
      <ul class="svc-list">
        <li class="svc-card">
          <span class="svc-card__icon">💍</span>
          <div>
            <h3 class="svc-card__title">Evenimente speciale</h3>
            <p class="svc-card__text">Nunți, botezuri, petreceri, team building. Microbuzul tău pentru ziua cea mare — tu organizezi, noi asigurăm vehiculul.</p>
          </div>
        </li>
        <li class="svc-card">
          <span class="svc-card__icon">🏔️</span>
          <div>
            <h3 class="svc-card__title">Excursii & turism</h3>
            <p class="svc-card__text">Ieșiri în natură, city breaks, vizite la mănăstiri sau stațiuni. Închiriezi microbuzul și mergi unde vrei tu.</p>
          </div>
        </li>
        <li class="svc-card">
          <span class="svc-card__icon">👥</span>
          <div>
            <h3 class="svc-card__title">Grupuri & deplasări</h3>
            <p class="svc-card__text">Deplasări de grup, transport angajați, delegații — orice ocazie în care ai nevoie de un vehicul spațios pentru 9 persoane.</p>
          </div>
        </li>
      </ul>
    </section>
```

- [ ] **Step 2: Add services CSS**

```css
/* === SERVICES STRIP === */
.services-strip {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background: var(--navy-dark);
}

.strip-item {
  padding: 18px 12px;
  text-align: center;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.strip-item:last-child {
  border-right: none;
}

.strip-icon {
  font-size: 24px;
  line-height: 1;
}

.strip-name {
  color: var(--gold);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* === SERVICES DETAIL === */
.services-section {
  background: var(--white);
}

.svc-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.svc-card {
  background: var(--bg-light);
  border-radius: 10px;
  padding: 18px;
  border-left: 4px solid var(--gold);
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.svc-card__icon {
  font-size: 28px;
  flex-shrink: 0;
  line-height: 1;
  margin-top: 2px;
}

.svc-card__title {
  color: var(--navy);
  font-size: 15px;
  font-weight: 800;
  margin-bottom: 5px;
}

.svc-card__text {
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.6;
}
```

- [ ] **Step 3: Verify in browser**

Reload. Expected: dark strip with 3 icons, white section below with 3 service cards, each with gold left border.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: services strip and services detail section"
```

---

## Task 5: Vehicle Section & Why Us Section

**Files:**
- Modify: `index.html` (inside `<main>`, after services)
- Modify: `styles.css`

- [ ] **Step 1: Add vehicle and why-us HTML**

```html
    <!-- VEHICLE -->
    <section class="vehicle-section section" id="vehicul">
      <p class="section-label">Vehiculul nostru</p>
      <h2 class="section-title section-title--light">Ford Transit 8+1</h2>
      <!-- Placeholder — replace with real photo when available:
           <img src="assets/images/bus.jpg" alt="Ford Transit 8+1 de închiriat Cluj-Napoca" width="800" height="500">
      -->
      <div class="vehicle-img" role="img" aria-label="Ford Transit 8+1 de închiriat Cluj-Napoca">
        🚌
      </div>
      <ul class="vehicle-features">
        <li class="vf-item"><span>❄️</span><span class="vf-text">Aer condiționat</span></li>
        <li class="vf-item"><span>🛋️</span><span class="vf-text">Scaune confortabile</span></li>
        <li class="vf-item"><span>🧳</span><span class="vf-text">Spațiu mare bagaje</span></li>
        <li class="vf-item"><span>🔌</span><span class="vf-text">Prize USB</span></li>
        <li class="vf-item"><span>🧹</span><span class="vf-text">Mereu curat</span></li>
        <li class="vf-item"><span>🛡️</span><span class="vf-text">Asigurat complet</span></li>
      </ul>
    </section>

    <!-- WHY US -->
    <section class="section why-section" id="de-ce-noi">
      <p class="section-label">De ce noi</p>
      <h2 class="section-title section-title--dark">Alegeți calitatea</h2>
      <ul class="why-list">
        <li class="why-item">
          <div class="why-check" aria-hidden="true">✓</div>
          <div>
            <h3 class="why-item__title">Rezervare rapidă</h3>
            <p class="why-item__text">Suni, stabilim detaliile, microbuzul e al tău. Fără birocrație inutilă.</p>
          </div>
        </li>
        <li class="why-item">
          <div class="why-check" aria-hidden="true">✓</div>
          <div>
            <h3 class="why-item__title">Prețuri corecte, fără surprize</h3>
            <p class="why-item__text">Ofertă clară înainte de închiriere. Plătești exact ce s-a stabilit.</p>
          </div>
        </li>
        <li class="why-item">
          <div class="why-check" aria-hidden="true">✓</div>
          <div>
            <h3 class="why-item__title">Vehicul în stare perfectă</h3>
            <p class="why-item__text">Ford Transit modern, climatizat, curat și verificat tehnic înainte de fiecare închiriere.</p>
          </div>
        </li>
        <li class="why-item">
          <div class="why-check" aria-hidden="true">✓</div>
          <div>
            <h3 class="why-item__title">Flexibilitate maximă</h3>
            <p class="why-item__text">Disponibil 7 zile din 7. Adaptăm programul la nevoile tale.</p>
          </div>
        </li>
      </ul>
    </section>
```

- [ ] **Step 2: Add vehicle and why-us CSS**

```css
/* === VEHICLE SECTION === */
.vehicle-section {
  background: var(--navy);
}

.vehicle-img {
  background: linear-gradient(135deg, var(--navy-mid), var(--navy-light));
  border-radius: 14px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
  margin-bottom: 24px;
  border: 2px solid rgba(245, 158, 11, 0.25);
}

.vehicle-features {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.vf-item {
  background: rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
}

.vf-text {
  color: rgba(255, 255, 255, 0.85);
  font-size: 13px;
  font-weight: 600;
}

/* === WHY US === */
.why-section {
  background: var(--white);
}

.why-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.why-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.why-check {
  width: 34px;
  height: 34px;
  background: linear-gradient(135deg, var(--gold), var(--orange));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-weight: 900;
  font-size: 15px;
  flex-shrink: 0;
}

.why-item__title {
  color: var(--navy);
  font-size: 15px;
  font-weight: 800;
  margin-bottom: 4px;
}

.why-item__text {
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.5;
}
```

- [ ] **Step 3: Verify in browser**

Reload. Expected: dark vehicle section with emoji bus placeholder and 2-column feature grid, then white "De ce noi" section with 4 gold-circle checkmarks.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: vehicle section and why-us section"
```

---

## Task 6: Pricing Section & Contact Section

**Files:**
- Modify: `index.html` (inside `<main>`, after why-us)
- Modify: `styles.css`

- [ ] **Step 1: Add pricing and contact HTML**

```html
    <!-- PRICING -->
    <section class="pricing-section section" id="tarife">
      <p class="section-label">Tarife</p>
      <h2 class="section-title section-title--light">Prețuri transparente</h2>
      <div class="price-card">
        <div class="price-main">350 RON</div>
        <div class="price-unit">+ TVA / zi</div>
        <p class="price-note">Tarif de bază per zi de închiriere. Pentru perioade mai lungi sau situații speciale, contactați-ne pentru o ofertă personalizată.</p>
      </div>
      <div class="deposit-box">
        <span class="deposit-icon">🔐</span>
        <p class="deposit-text">
          <strong>Depozit de garanție: 300–500 €</strong><br>
          Valoarea exactă depinde de perioada de închiriere și alți factori. Se returnează integral la predarea vehiculului în starea primită.
        </p>
      </div>
      <a href="tel:+40746063301" class="pricing-cta">📞 Cere ofertă personalizată</a>
    </section>

    <!-- CONTACT -->
    <section class="section contact-section" id="contact">
      <p class="section-label">Contact</p>
      <h2 class="section-title section-title--dark">Contactează-ne</h2>
      <ul class="contact-list">
        <li>
          <a href="tel:+40746063301" class="contact-link contact-link--phone">
            <span class="contact-icon">📞</span>
            <div>
              <span class="contact-label">Telefon</span>
              <span class="contact-value">0746 063 301</span>
            </div>
          </a>
        </li>
        <li>
          <a href="https://wa.me/40746063301" class="contact-link contact-link--wa" target="_blank" rel="noopener noreferrer">
            <span class="contact-icon">💬</span>
            <div>
              <span class="contact-label">WhatsApp</span>
              <span class="contact-value">0746 063 301</span>
            </div>
          </a>
        </li>
        <li>
          <div class="contact-link contact-link--loc">
            <span class="contact-icon">📍</span>
            <div>
              <span class="contact-label">Locație</span>
              <span class="contact-value">Cluj-Napoca, România</span>
            </div>
          </div>
        </li>
      </ul>
    </section>
```

- [ ] **Step 2: Add pricing and contact CSS**

```css
/* === PRICING === */
.pricing-section {
  background: linear-gradient(135deg, var(--navy-mid) 0%, var(--navy) 100%);
  text-align: center;
}

.price-card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(245, 158, 11, 0.3);
  border-radius: 14px;
  padding: 28px 20px;
  margin-bottom: 14px;
}

.price-main {
  color: var(--gold);
  font-size: 42px;
  font-weight: 900;
  line-height: 1;
  margin-bottom: 4px;
}

.price-unit {
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
  margin-bottom: 12px;
}

.price-note {
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  line-height: 1.6;
}

.deposit-box {
  background: rgba(245, 158, 11, 0.08);
  border: 1px solid rgba(245, 158, 11, 0.2);
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 28px;
  display: flex;
  gap: 14px;
  align-items: flex-start;
  text-align: left;
}

.deposit-icon {
  font-size: 22px;
  flex-shrink: 0;
  margin-top: 2px;
}

.deposit-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  line-height: 1.6;
}

.deposit-text strong {
  color: var(--white);
}

.pricing-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--gold);
  color: var(--navy);
  padding: 15px 32px;
  border-radius: 8px;
  font-weight: 900;
  font-size: 16px;
  transition: background 0.2s, transform 0.15s;
}

.pricing-cta:hover {
  background: var(--gold-hover);
  transform: translateY(-1px);
}

/* === CONTACT === */
.contact-section {
  background: var(--bg-light);
}

.contact-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 14px;
  background: var(--white);
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.contact-link--phone { border-left: 4px solid var(--blue-ph); }
.contact-link--wa    { border-left: 4px solid var(--green-wa); }
.contact-link--loc   { border-left: 4px solid var(--gold); }

.contact-icon {
  font-size: 22px;
  flex-shrink: 0;
}

.contact-label {
  display: block;
  font-size: 10px;
  color: #94a3b8;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 2px;
}

.contact-value {
  display: block;
  font-size: 15px;
  color: var(--navy);
  font-weight: 800;
}
```

- [ ] **Step 3: Verify in browser**

Reload. Expected: dark gradient pricing section with gold price card and deposit box, then light contact section with 3 colored-border rows (blue phone, green WhatsApp, gold location). No form.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: pricing section and contact section"
```

---

## Task 7: Footer & WhatsApp Floating Button

**Files:**
- Modify: `index.html` (close `<main>`, add `<footer>` and floating button)
- Modify: `styles.css`

- [ ] **Step 1: Close `<main>` and add footer + floating button HTML**

After the closing `</section>` of the contact section, close `</main>` then add:

```html
  </main>

  <!-- FOOTER -->
  <footer class="site-footer">
    <div class="footer-logo">MICROBUZ CLUJ</div>
    <hr class="footer-divider">
    <address class="footer-company">
      <strong>SCHVARCZ ELECTRIC SOLUTIONS SRL</strong><br>
      CUI: RO39748741<br>
      Cluj-Napoca, România
    </address>
    <p class="footer-copy">
      © <span id="year"></span> Microbuz Cluj · Închiriere microbuz Cluj-Napoca · Toate drepturile rezervate
    </p>
  </footer>

  <!-- WHATSAPP FLOATING BUTTON -->
  <a href="https://wa.me/40746063301"
     class="wa-float"
     target="_blank"
     rel="noopener noreferrer"
     aria-label="Contactează-ne pe WhatsApp">
    💬
  </a>
```

- [ ] **Step 2: Add footer and floating button CSS**

```css
/* === FOOTER === */
.site-footer {
  background: var(--navy-deep);
  padding: 32px 24px;
  text-align: center;
}

.footer-logo {
  color: var(--gold);
  font-weight: 900;
  font-size: 17px;
  margin-bottom: 16px;
}

.footer-divider {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin: 0 0 16px;
}

.footer-company {
  font-style: normal;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  line-height: 1.8;
  margin-bottom: 14px;
}

.footer-company strong {
  color: rgba(255, 255, 255, 0.75);
  font-size: 13px;
}

.footer-copy {
  color: rgba(255, 255, 255, 0.25);
  font-size: 11px;
}

/* === WHATSAPP FLOAT === */
.wa-float {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  background: var(--green-wa);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.45);
  z-index: 999;
  transition: transform 0.2s, box-shadow 0.2s;
}

.wa-float:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 28px rgba(37, 211, 102, 0.6);
}
```

- [ ] **Step 3: Verify `script.js` updates the year**

Reload. Expected: footer shows "© 2026 Microbuz Cluj …" (current year). Check browser console — no errors.

- [ ] **Step 4: Verify WhatsApp button**

Expected: green circle fixed bottom-right, does not overlap footer content on scroll. Click opens WhatsApp (or wa.me on desktop).

- [ ] **Step 5: Commit**

```bash
git add index.html styles.css
git commit -m "feat: footer with company details and WhatsApp floating button"
```

---

## Task 8: Responsive Polish & Final QA

**Files:**
- Modify: `styles.css`

- [ ] **Step 1: Add tablet/desktop media queries**

```css
/* === RESPONSIVE — tablet and up (640px+) === */
@media (min-width: 640px) {
  .site-header {
    padding: 12px 40px;
  }

  .site-logo {
    font-size: 18px;
  }

  .vehicle-features {
    grid-template-columns: 1fr 1fr 1fr;
  }

  .svc-list {
    gap: 18px;
  }

  .price-main {
    font-size: 52px;
  }
}

/* === RESPONSIVE — desktop (1024px+) === */
@media (min-width: 1024px) {
  .hero {
    padding: 80px 48px 72px;
  }

  .hero-title {
    font-size: 52px;
  }

  .section {
    padding: 72px 80px;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }

  .vehicle-section,
  .pricing-section,
  .site-footer {
    padding-left: 80px;
    padding-right: 80px;
  }

  .svc-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .why-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .contact-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
}
```

- [ ] **Step 2: Mobile QA checklist**

Open browser DevTools, toggle mobile view (375px width). Check:
- [ ] Header fits without overflow — logo + CTA button on one line
- [ ] Hero text doesn't overflow — line breaks cleanly
- [ ] Services strip — 3 columns readable
- [ ] Vehicle features — 2 columns fit
- [ ] Price card centered
- [ ] Contact rows full-width
- [ ] WhatsApp button doesn't cover essential content

- [ ] **Step 3: Desktop QA checklist**

Switch to desktop view (1280px). Check:
- [ ] Max-width constraint prevents over-wide lines
- [ ] Services cards display in 3 columns
- [ ] Why-us in 2 columns
- [ ] Contact links in 3 columns
- [ ] Sticky header stays on top

- [ ] **Step 4: Check all links**
- [ ] `📞 Sună acum` in header → `tel:+40746063301`
- [ ] `📞 Sună acum` in hero → `tel:+40746063301`
- [ ] `📞 Cere ofertă personalizată` in pricing → `tel:+40746063301`
- [ ] `📞 Telefon` in contact → `tel:+40746063301`
- [ ] `💬 WhatsApp` in contact → `https://wa.me/40746063301`
- [ ] `💬` floating button → `https://wa.me/40746063301`

- [ ] **Step 5: Validate HTML**

Open [validator.w3.org](https://validator.w3.org/) and paste the HTML. Expected: no errors, at most minor warnings.

- [ ] **Step 6: Commit**

```bash
git add styles.css
git commit -m "feat: responsive breakpoints and final QA polish"
```

---

## Task 9: GitHub Pages Deployment

**Files:**
- No new files — deploy existing repo

- [ ] **Step 1: Verify `.nojekyll` exists at repo root**

```bash
ls /Users/andorsch/dev/microbuz/.nojekyll
```

Expected: file exists (empty).

- [ ] **Step 2: Push to GitHub**

```bash
cd /Users/andorsch/dev/microbuz
git remote -v   # confirm remote exists; if not, add it via GitHub
git push origin main
```

- [ ] **Step 3: Enable GitHub Pages in repo settings**

Go to the repo on GitHub → Settings → Pages → Source: **Deploy from branch** → Branch: `main` → Folder: `/ (root)` → Save.

- [ ] **Step 4: Add custom domain**

In the same Pages settings, enter `inchirieremicrobuzcluj.ro` in the Custom domain field. GitHub will create a `CNAME` file in the repo. **Pull it immediately so it isn't lost on the next push:**

```bash
git pull origin main
git log --oneline -3  # confirm CNAME commit appears
```

Also add DNS A records at your registrar pointing `inchirieremicrobuzcluj.ro` to GitHub Pages IPs:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

- [ ] **Step 5: Verify live site**

After DNS propagates (up to 24h), open `https://inchirieremicrobuzcluj.ro`. Expected:
- Correct title in browser tab
- All sections render
- Sticky header works
- Phone CTA clickable
- WhatsApp float visible
- Footer shows current year

- [ ] **Step 6: Test Open Graph preview**

Paste `https://inchirieremicrobuzcluj.ro` into [opengraph.xyz](https://www.opengraph.xyz/) or WhatsApp chat. Expected: title + description + image preview.

- [ ] **Step 7: Submit to Google Search Console**

Go to [search.google.com/search-console](https://search.google.com/search-console), add property `https://inchirieremicrobuzcluj.ro`. Use **DNS TXT verification** (simplest for static sites — no server access needed): Google gives you a TXT record value, add it at your DNS registrar, click Verify. Once verified, request indexing for the root URL.
