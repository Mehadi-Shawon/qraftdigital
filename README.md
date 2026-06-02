# Qraft Digital — Official Website

The official website for **Qraft Digital**, a premier digital engineering agency based in Dhaka, Bangladesh, building high-performance digital products for clients worldwide.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React 18](https://react.dev/) |
| Build Tool | [Vite 5](https://vitejs.dev/) |
| Animations | [Framer Motion 11](https://www.framer.com/motion/) |
| Styling | CSS Custom Properties + Inline Styles |
| Icons | [Google Material Symbols](https://fonts.google.com/icons) |
| Fonts | Space Grotesk · Work Sans (Google Fonts) |
| Forms | [Formspree](https://formspree.io/) |
| Routing | Custom SPA router (no external dependency) |

---

## Pages

| Route | Description |
|---|---|
| `home` | Hero, services overview, featured work, testimonials |
| `services` | Full services breakdown |
| `work` | Project portfolio with category filters |
| `about` | Team, founder profile, agency story |
| `contact` | Multi-step enquiry form + meeting booking |
| `terms` | Terms of Service |
| `privacy` | Privacy Policy |

---

## Project Structure

```
src/
├── assets/               # Static images (founder photo, etc.)
├── components/
│   ├── Header.jsx        # Sticky nav + "Start a Project" modal trigger
│   ├── Footer.jsx        # Footer with social links, legal, wordmark
│   ├── MobileMenu.jsx    # Full-screen mobile navigation
│   ├── ProjectModal.jsx  # Popup project enquiry form
│   ├── LoadingScreen.jsx # Intro loading animation
│   └── UI.jsx            # Shared primitives (Reveal, GlassCard, LimeBtn, etc.)
├── context/
│   └── ThemeContext.jsx  # Dark/light theme toggle
├── pages/
│   ├── HomePage.jsx
│   ├── ServicesPage.jsx
│   ├── WorkPage.jsx
│   ├── AboutPage.jsx
│   ├── ContactPage.jsx
│   ├── TermsPage.jsx
│   └── PrivacyPage.jsx
├── styles/
│   └── global.css        # Design tokens, base styles, responsive breakpoints
└── App.jsx               # SPA router + page transitions
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Install & Run

```bash
# Clone the repository
git clone https://github.com/Mehadi-Shawon/qraftdigital.git
cd qraftdigital

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output is generated in the `dist/` folder, ready to deploy to any static host (Vercel, Netlify, Cloudflare Pages, etc.).

### Preview Production Build

```bash
npm run preview
```

---

## Configuration

### Contact Forms

Both the project enquiry modal and the contact page multi-step form use **Formspree** for form handling.

1. Create a free account at [formspree.io](https://formspree.io/)
2. Create a new form and copy the form ID
3. Replace `YOUR_FORM_ID` in the following files:

```
src/components/ProjectModal.jsx  → const FORMSPREE_ID = "YOUR_FORM_ID"
src/pages/ContactPage.jsx        → const FORMSPREE_ID = "YOUR_FORM_ID"
```

---

## Design System

### Color Tokens

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#04020c` | Page background |
| `--surface` | `#0a0618` | Card backgrounds |
| `--border` | `rgba(255,255,255,0.08)` | Borders |
| `--lime` | `#CCFF00` | Primary accent |
| `--text` | `#f0eeff` | Primary text |
| `--text2` | `rgba(240,238,255,0.6)` | Secondary text |
| `--text3` | `rgba(240,238,255,0.3)` | Muted text |

### Key Components

- **`<Reveal>`** — Scroll-triggered fade-up animation wrapper
- **`<StaggerContainer>` / `<StaggerItem>`** — Staggered list animations
- **`<GlassCard>`** — Glassmorphism card with backdrop blur
- **`<LimeBtn>`** — Primary lime CTA button
- **`<GhostBtn>`** — Outlined ghost button
- **`<SectionLabel>`** — Uppercase lime section tag
- **`<Icon>`** — Material Symbols icon wrapper

---

## Deployment

The site is a fully static SPA and can be deployed to any static hosting provider.

**Recommended: Vercel**

```bash
npm i -g vercel
vercel --prod
```

**Netlify** — drag and drop the `dist/` folder after running `npm run build`.

---

## License

All rights reserved © 2025 Qraft Digital. This codebase is proprietary and not licensed for redistribution.

---

*Built with precision. Designed for performance.*
