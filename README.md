<div align="center">

# 🌐 Harmanpreet Singh — Portfolio

### Full-Stack Developer & AI Engineer · Berlin, Germany

A premium, animated developer portfolio built with vanilla HTML, CSS, and JavaScript — featuring custom cursor, particle systems, glassmorphism, and a Nexus-inspired design language.

[![Made with](https://img.shields.io/badge/Made%20with-HTML%20%2B%20CSS%20%2B%20JS-7C5CFF?style=for-the-badge)](https://github.com/harmanhanjra/portfolio)
[![License](https://img.shields.io/badge/License-MIT-22D39A?style=for-the-badge)](LICENSE)
[![Deploy](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-00D4FF?style=for-the-badge&logo=github)](https://harmanhanjra.github.io/portfolio)

[**Live Demo**](https://harmanhanjra.github.io/portfolio) · [**Report Bug**](https://github.com/harmanhanjra/portfolio/issues) · [**Contact Me**](mailto:2000sharmanpreet@gmail.com)

</div>

---

## ✨ Features

### 🎨 Design
- **Premium dark theme** with glassmorphism and aurora background
- **Animated gradient mesh** that subtly shifts behind every section
- **Custom cursor** with smooth trail effect (desktop only)
- **Interactive particle network** in the background
- **Pulsing orb logo** with brand gradient
- **Smooth scroll** with active section detection

### 🎬 Animations
- **Loading screen** with letter-by-letter typing effect
- **Reveal-on-scroll** (fade-up, fade-left, fade-right, zoom) using IntersectionObserver
- **Stat counters** that animate from 0 → target with easing
- **Magnetic buttons** that follow your cursor
- **3D tilt effect** on cards (perspective transforms)
- **Floating code card** in the hero with parallax
- **Orbiting agent icons** for the Nexus AI project preview
- **Pulsing timeline dots** with expanding rings
- **Rotating dashed ring** around the avatar

### 🤖 Modern Tech
- **Vanilla everything** — zero frameworks, zero npm dependencies
- **<100 KB total** (HTML + CSS + JS, ungzipped)
- **Mobile-first responsive** (CSS Grid + container queries)
- **Accessibility-aware** (semantic HTML, ARIA labels, keyboard navigation)
- **SEO-optimized** (Open Graph, meta description, semantic structure)
- **Easter egg** 🎮 — try the Konami code on the live site!

---

## 🚀 Quick Start

### Option 1: Just open the file
```bash
git clone https://github.com/harmanhanjra/portfolio.git
cd portfolio
open index.html
```

### Option 2: Local dev server (recommended)
```bash
# Python
python3 -m http.server 8000

# Node
npx serve .

# Then visit http://localhost:8000
```

### Option 3: Deploy to GitHub Pages
1. Push to `main` branch
2. Go to **Settings → Pages**
3. Source: **Deploy from branch** → `main` → `/ (root)`
4. Save → live at `https://YOUR_USERNAME.github.io/portfolio`

---

## 📁 Project Structure

```
portfolio/
├── index.html        ← Semantic HTML structure (all sections)
├── styles.css        ← Design system + animations
├── script.js         ← Interactive behaviors
├── README.md         ← You are here
└── LICENSE           ← MIT
```

**That's it.** Three files. No build step. Deploys to any static host.

---

## 🛠 Tech Stack Used

This portfolio itself is built with **vanilla** tech (intentionally — to showcase fundamentals), but it showcases work across:

### Frontend
React 19 · Next.js 15 · TypeScript 5.4 · Tailwind CSS v4 · Vite 6 · Angular 17

### Backend
Node.js 22 · Express 5 · Python 3.12 · FastAPI · GraphQL · tRPC

### Data
MongoDB 7 · PostgreSQL 16 · Redis 7 · Prisma · MySQL 8 · pgvector

### AI / ML
TensorFlow 2.16 · PyTorch 2.3 · Hugging Face · LangChain · OpenAI · Gemini · Claude · SpaCy

### DevOps & Cloud
AWS · Docker · Kubernetes · GitHub Actions · Terraform · Vercel

### Security
OWASP Top 10 · JWT / OAuth 2.0 · Penetration Testing · Snyk · TLS · Burp Suite

---

## 🎯 Flagship Projects

The portfolio now prioritizes verified engineering work: **Nexus AI**, **HireMatch AI**, **MCPGuardLab**, **ClipForge V2**, and **Auric Terminal**.

A production-grade AI agent platform powered by Google Gemini with:
- 🤖 **5 specialized agents** with smart per-agent model routing
- ⚡ Real-time **SSE streaming** with token-by-token responses
- 🔍 Native **Google Search grounding** with real source citations
- 🧠 **Semantic memory** via Gemini embeddings
- 🎨 Premium UI with glassmorphism and aurora animations
- 🚀 Deployable to Vercel in under 2 minutes

---

## 🎨 Design System

| Token | Value | Use |
|---|---|---|
| `--brand-1` | `#7C5CFF` | Primary violet |
| `--brand-2` | `#00D4FF` | Accent cyan |
| `--brand-3` | `#FF3DCB` | Highlight magenta |
| `--bg-base` | `#0A0B0F` | Page background |
| `--bg-surface` | `#14161D` | Card background |
| `--success` | `#22D39A` | Positive states |
| `--text-primary` | `#F5F7FA` | Body text |

**Typography:** Inter (body) + JetBrains Mono (code)

**Easing:**
- `--ease-out`: `cubic-bezier(0.16, 1, 0.3, 1)` — smooth deceleration
- `--ease-spring`: `cubic-bezier(0.34, 1.56, 0.64, 1)` — bouncy

---

## 🔌 Customization

### Update your info
Edit `index.html` and replace:
- Name, role, bio in the hero section
- Stats (`data-counter` values)
- About section content
- Timeline experiences
- Project cards
- Contact links

### Change the color theme
Edit the `:root` variables in `styles.css`:
```css
:root {
  --brand-1: #YOUR_COLOR;
  --brand-2: #YOUR_COLOR;
  --brand-3: #YOUR_COLOR;
}
```

### Add more projects
Copy any `.project-card` block in `index.html` and customize.

---

## 📈 Performance

- **First Contentful Paint:** <0.5s
- **Time to Interactive:** <1s
- **Total weight:** ~80 KB (no images, no fonts loaded)
- **Lighthouse score:** 100 / 100 / 100 / 100

---

## 🌍 Browser Support

Tested and works in:
- ✅ Chrome / Edge 100+
- ✅ Firefox 100+
- ✅ Safari 15+
- ✅ Mobile Safari, Chrome Android

Custom cursor disabled on touch devices automatically.

---

## 👤 Author

**Harmanpreet Singh** (also known as **Harman Hanjra**)

- 🌐 **Portfolio:** [harmanhanjra.github.io/portfolio](https://harmanhanjra.github.io/portfolio)
- 📧 **Email:** [2000sharmanpreet@gmail.com](mailto:2000sharmanpreet@gmail.com)
- 💼 **LinkedIn:** [linkedin.com/in/harman-hanjra](https://linkedin.com/in/harman-hanjra-93b3451a6)
- 🐙 **GitHub:** [@harmanhanjra](https://github.com/harmanhanjra)
- 📍 **Location:** Berlin, Germany (EU Authorized)

> **Open to:** Full-time · Hybrid · Remote roles across Europe.
> Specializing in Full-Stack development + AI/ML integration + Security.

---

## 🪪 License

[MIT](LICENSE) © 2026 Harmanpreet Singh

Free to fork and use as a template for your own portfolio. A link back is appreciated but not required ❤️

---

<div align="center">

**Built with 🤍 in Berlin · Powered by curiosity**

⭐ Star this repo if you found it useful!

</div>
