# BELLI — Business Enhancer

## Project Overview
Premium one-page institutional website for a boutique consulting firm called BELLI. Built with a minimal, white + beige aesthetic, modern typography, and smooth scroll animations. All content is in Spanish.

## Tech Stack
- **Frontend:** React + TypeScript + Vite + Wouter (routing)
- **Styling:** Tailwind CSS + shadcn/ui components
- **Animations:** Framer Motion
- **Backend:** Express.js (minimal, serves frontend)

## Architecture
- Single-page layout with smooth scroll navigation
- All sections live in `client/src/pages/home.tsx`
- No database needed (contact form is frontend-only for now)

## Sections
1. **Navbar** — Fixed, sticky, transparent → white on scroll, mobile hamburger menu
2. **Hero** — "Business Enhancer" headline, serif italic accent, dual CTAs
3. **Services** — 4 cards: Estrategia Ecommerce, Transformación Digital, Gestión de Proyectos Tech, Crecimiento Comercial
4. **How We Work** — Two columns: "Consultoría por proyecto" (bordered) vs "Asesoría recurrente" (dark bg)
5. **Results** — 4 metric tiles with placeholder data + disclaimer
6. **About** — 17+ years corporate, 10+ ecommerce, MBA ESCP (London & Paris)
7. **Contact** — Form (name, email, company, message) + email/WhatsApp secondary contacts
8. **Footer** — "BELLI — Business Enhancer" dark background

## Design Tokens
- Font: Inter (sans-serif body), Playfair Display (serif headings)
- Colors: White background, stone-900 (black) typography, amber-50 accent backgrounds
- Style: No border-radius on cards/buttons (sharp corners), uppercase tracking-widest labels

## Key Files
- `client/src/pages/home.tsx` — Full one-page layout
- `client/src/App.tsx` — Router setup
- `client/src/index.css` — Global styles + design tokens
- `client/index.html` — SEO meta tags, Google Fonts
