# Basecamp Community Platform

The digital home for the **Basecamp Community** — an open, multidisciplinary gathering for learners, builders, founders, engineers, designers, and hobbyists. **Not limited to students.**

Built strictly adhering to the Product Requirements Document (`prd.md`) and Technical Requirements Document (`trd.md`).

---

## 🏔️ Architecture Overview

The platform is focused on the high-performance, dark-first Next.js application:

```text
basecamp/
├── frontend/                  # Next.js 15 + React 19 + Tailwind CSS + GSAP + Framer Motion
│   ├── app/
│   │   ├── page.tsx           # Flagship homepage with 100-frame background scroll sequence
│   │   ├── about/             # Community manifesto, principles & organizers
│   │   ├── events/            # Searchable expedition & workshop directory
│   │   ├── events/[slug]/     # Event detail, schedule, speakers & instant registration
│   │   ├── community/         # Guilds & join application form with confetti celebration
│   │   ├── contact/           # Direct transmission steward contact form
│   │   └── account/           # Authenticated Member Area
│   │       ├── profile/       # Profile & craft preferences
│   │       └── registrations/ # Digital boarding passes & simulated QR tickets
│   ├── components/
│   │   ├── BasecampLogo.tsx   # Official geometric mountain emblem & typography
│   │   ├── BackgroundScrollCanvas.tsx # Persistent GSAP ScrollTrigger 100-frame background
│   │   ├── AscentHUD.tsx      # Real-time elevation & telemetry climbing widget (920m -> 1478m)
│   │   ├── ActivityTicker.tsx # Infinite marquee activity ticker
│   │   ├── TiltCard.tsx       # 3D spring tilt with laser border beam
│   │   ├── EventCard.tsx      # Interactive event cards with spotlight and capacity bar
│   │   ├── ConnectModal.tsx   # Frictionless connection & RSVP modal with confetti
│   │   └── CursorGlow.tsx     # Desktop mouse spotlight aura
│   ├── lib/                   # State store with localStorage persistence & typed mock database
│   └── public/
│       ├── sequence/          # 100 cinematic animation frames (001.jpg - 100.jpg)
│       └── logo.jpg           # Official Basecamp mountain emblem
├── sequence/                  # Original 100 animation frames provided
├── prd.md                     # Product Requirements Document
├── trd.md                     # Technical Requirements Document
├── package.json               # Root workspace scripts
└── README.md
```

---

## 🚀 Quickstart & Running

1. **Install Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Start the Application**:
   ```bash
   npm run dev
   # or for production build
   npm run build
   npm run start
   ```

3. **Visit the Community Portal**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.
