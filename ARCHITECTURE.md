# Bouwbedrijf Website Architectuur & Design Systeem

> Een complete template voor professionele bouwbedrijf websites met lead capture, portfolio management en admin dashboard.

---

## Inhoudsopgave

1. [Overzicht](#overzicht)
2. [Tech Stack](#tech-stack)
3. [Project Structuur](#project-structuur)
4. [Design Systeem](#design-systeem)
5. [Component Architectuur](#component-architectuur)
6. [Pagina Structuur & Routing](#pagina-structuur--routing)
7. [Formulieren & Lead Capture](#formulieren--lead-capture)
8. [Database Schema](#database-schema)
9. [Admin Dashboard](#admin-dashboard)
10. [Email Systeem](#email-systeem)
11. [Analytics & Tracking](#analytics--tracking)
12. [Animaties & Interacties](#animaties--interacties)
13. [Implementatie Gids](#implementatie-gids)

---

## Overzicht

Deze architectuur beschrijft een moderne, professionele website voor bouwbedrijven met de volgende kernfuncties:

- **Premium Design** - Warme, professionele uitstraling met subtiele animaties
- **Lead Generatie** - Multi-step formulieren voor offertes en afspraken
- **Portfolio Showcase** - Dynamische projecten galerij met filtering
- **Admin CMS** - Volledig dashboard voor offerte-, afspraak- en projectbeheer
- **Email Automatisering** - Bevestigingen, agenda-uitnodigingen, admin notificaties
- **Analytics** - GA4-compatible tracking voor conversie-optimalisatie

---

## Tech Stack

### Core Framework
```
Next.js         v16+     App Router met TypeScript
React           v19+     Laatste versie
TypeScript      v5+      Type-safe development
```

### Styling & UI
```
Tailwind CSS    v3.4+    Utility-first CSS framework
PostCSS         v8+      CSS processing
Lucide React    v0.469+  500+ iconen bibliotheek
```

### Database & ORM
```
Prisma          v6+      Type-safe ORM
PostgreSQL/MySQL         Relationele database
```

### Formulier & Validatie
```
Zod             v3.23+   TypeScript-first schema validatie
```

### Email
```
Resend          v6+      Transactionele email API
```

### Security
```
bcryptjs        v2.4+    Wachtwoord hashing
```

### Package.json Dependencies
```json
{
  "dependencies": {
    "next": "^16.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@prisma/client": "^6.0.0",
    "lucide-react": "^0.469.0",
    "zod": "^3.23.0",
    "resend": "^6.7.0",
    "bcryptjs": "^2.4.3"
  },
  "devDependencies": {
    "typescript": "^5",
    "tailwindcss": "^3.4.1",
    "prisma": "^6.0.0",
    "@types/node": "^20",
    "@types/react": "^19",
    "eslint": "^9",
    "postcss": "^8",
    "autoprefixer": "^10"
  }
}
```

---

## Project Structuur

```
project/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── page.tsx                  # Homepage
│   │   ├── layout.tsx                # Root layout
│   │   ├── globals.css               # Global styles
│   │   │
│   │   ├── diensten/                 # Diensten pagina's
│   │   │   ├── page.tsx              # Overzicht
│   │   │   ├── totaalrenovatie/      # Dienst detail
│   │   │   ├── renovatie/
│   │   │   ├── afwerking/
│   │   │   └── technieken/
│   │   │
│   │   ├── projecten/                # Portfolio
│   │   │   └── page.tsx
│   │   │
│   │   ├── afspraak/                 # Afspraak boeken
│   │   │   └── page.tsx
│   │   │
│   │   ├── offerte/                  # Offerte aanvragen
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── contact/                  # Contact pagina
│   │   │   └── page.tsx
│   │   │
│   │   ├── aanpak/                   # Over ons / Aanpak
│   │   │   └── page.tsx
│   │   │
│   │   ├── admin/                    # Admin dashboard
│   │   │   ├── page.tsx              # Dashboard
│   │   │   └── login/
│   │   │       └── page.tsx
│   │   │
│   │   └── api/                      # Backend API routes
│   │       ├── quotes/               # Offerte endpoints
│   │       │   └── route.ts
│   │       ├── appointments/         # Afspraak endpoints
│   │       │   └── route.ts
│   │       ├── projects/             # Project endpoints
│   │       │   └── route.ts
│   │       ├── availability/         # Beschikbaarheid
│   │       │   └── route.ts
│   │       ├── analytics/            # Analytics tracking
│   │       │   └── track/route.ts
│   │       └── admin/                # Admin API's
│   │           ├── auth/
│   │           ├── quotes/
│   │           ├── appointments/
│   │           ├── projects/
│   │           └── settings/
│   │
│   ├── components/                   # React componenten
│   │   ├── Header.tsx                # Navigatie header
│   │   ├── Footer.tsx                # Footer
│   │   ├── Logo.tsx                  # Bedrijfslogo (SVG)
│   │   ├── BookingFlow.tsx           # Multi-step booking
│   │   ├── TrackedLink.tsx           # Analytics links
│   │   ├── SectionHeader.tsx         # Sectie titels
│   │   ├── CTABanner.tsx             # Call-to-action banner
│   │   │
│   │   ├── offerte/
│   │   │   └── OfferteFormulier.tsx  # Multi-step offerte
│   │   │
│   │   └── admin/                    # Admin componenten
│   │       ├── AdminDashboard.tsx
│   │       ├── QuotesManager.tsx
│   │       ├── AppointmentsManager.tsx
│   │       ├── ProjectsManager.tsx
│   │       └── SettingsManager.tsx
│   │
│   ├── lib/                          # Utilities
│   │   ├── db.ts                     # Prisma client
│   │   ├── auth.ts                   # Authenticatie helpers
│   │   ├── email.ts                  # Email templates
│   │   ├── fonts.ts                  # Google Fonts setup
│   │   ├── analytics.ts              # GA4 tracking
│   │   └── validations/
│   │       └── quote.ts              # Zod schemas
│   │
│   └── hooks/                        # Custom React hooks
│       └── useScrollAnimation.ts
│
├── prisma/
│   ├── schema.prisma                 # Database schema
│   └── seed.ts                       # Test data seeding
│
├── public/                           # Static assets
│   └── images/
│
├── middleware.ts                     # Auth middleware
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── .env.example
```

---

## Design Systeem

### Kleurenpalet

Het design gebruikt een warm, premium kleurenschema:

```typescript
// tailwind.config.ts
colors: {
  // Noir - Warme houtskool voor tekst en donkere achtergronden
  noir: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917',
    950: '#0c0a09',
  },

  // Accent - Bosgroen als primaire merkkleur
  accent: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#5a7a6b',    // Secundair accent
    500: '#3d5c56',    // Medium accent
    600: '#2d4a47',    // Primair (logo kleur)
    700: '#166534',
    800: '#14532d',
    900: '#052e16',
    950: '#022c22',
  },

  // Ivory - Warme crème voor lichte achtergronden
  ivory: {
    50: '#ffffff',
    100: '#fdfcfb',
    200: '#faf8f5',
    300: '#f5f1ec',
    400: '#ebe4db',
    500: '#e0d6ca',
  },
}
```

### Typografie

```typescript
// tailwind.config.ts
fontFamily: {
  display: ['var(--font-display)', 'Playfair Display', 'serif'],
  sans: ['var(--font-sans)', 'DM Sans', 'sans-serif'],
}

// Responsive font sizes met clamp()
fontSize: {
  'hero': ['clamp(3rem, 10vw, 8rem)', { lineHeight: '0.9', letterSpacing: '-0.03em' }],
  'display-xl': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
  'display-lg': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
  'display-md': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
  'display-sm': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.3' }],
}
```

### Fonts Setup

```typescript
// src/lib/fonts.ts
import { Playfair_Display, DM_Sans } from 'next/font/google'

export const displayFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const sansFont = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})
```

### Animaties

```typescript
// tailwind.config.ts
animation: {
  'fade-in': 'fadeIn 1s ease-out forwards',
  'fade-up': 'fadeUp 1s ease-out forwards',
  'fade-down': 'fadeDown 0.6s ease-out forwards',
  'scale-in': 'scaleIn 0.8s ease-out forwards',
  'slide-up': 'slideUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
  'slide-left': 'slideLeft 0.8s ease-out forwards',
  'reveal': 'reveal 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
  'float': 'float 6s ease-in-out infinite',
  'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
}

keyframes: {
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  fadeUp: {
    '0%': { opacity: '0', transform: 'translateY(30px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  fadeDown: {
    '0%': { opacity: '0', transform: 'translateY(-20px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  scaleIn: {
    '0%': { opacity: '0', transform: 'scale(0.95)' },
    '100%': { opacity: '1', transform: 'scale(1)' },
  },
  slideUp: {
    '0%': { opacity: '0', transform: 'translateY(80px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  slideLeft: {
    '0%': { opacity: '0', transform: 'translateX(40px)' },
    '100%': { opacity: '1', transform: 'translateX(0)' },
  },
  reveal: {
    '0%': { opacity: '0', transform: 'scale(0.98) translateY(20px)' },
    '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
  },
  float: {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-20px)' },
  },
}
```

### Schaduwen

```typescript
// tailwind.config.ts
boxShadow: {
  'soft': '0 4px 30px rgba(0, 0, 0, 0.06)',
  'soft-lg': '0 10px 50px rgba(0, 0, 0, 0.1)',
  'soft-xl': '0 25px 80px rgba(0, 0, 0, 0.12)',
  'glow': '0 0 40px rgba(45, 74, 71, 0.3)',
  'glow-lg': '0 0 60px rgba(45, 74, 71, 0.4)',
}
```

### Layout Utilities

```css
/* src/app/globals.css */
@layer components {
  .container-wide {
    @apply max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-16;
  }

  .container-custom {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }

  .section-padding {
    @apply py-24 md:py-32 lg:py-40;
  }

  .section-padding-sm {
    @apply py-16 md:py-20 lg:py-24;
  }
}
```

### Button Componenten

```css
/* src/app/globals.css */
@layer components {
  .btn-primary {
    @apply bg-noir-900 text-white px-8 py-4 font-medium
           hover:bg-noir-800 transition-all duration-300;
  }

  .btn-secondary {
    @apply border border-noir-300 text-noir-700 px-8 py-4
           font-medium hover:border-noir-900 hover:text-noir-900
           transition-all duration-300;
  }

  .btn-accent {
    @apply bg-accent-500 text-white px-8 py-4 font-medium
           hover:bg-accent-600 transition-all duration-300;
  }

  .btn-ghost {
    @apply text-noir-600 hover:text-noir-900
           transition-all duration-300;
  }
}
```

### Card Componenten

```css
@layer components {
  .card {
    @apply bg-white rounded-2xl shadow-soft
           transition-all duration-500 hover:shadow-soft-lg;
  }

  .card-bordered {
    @apply border border-noir-100 hover:border-accent-500;
  }
}
```

### Form Inputs

```css
@layer components {
  .input-field {
    @apply w-full px-0 py-4 bg-transparent border-b border-noir-200
           text-noir-900 placeholder-noir-400
           focus:outline-none focus:border-accent-500
           transition-colors duration-300;
  }

  .input-label {
    @apply block text-sm font-medium text-noir-600 mb-2;
  }

  .input-field-boxed {
    @apply w-full px-4 py-3 bg-ivory-100 border border-noir-200
           rounded-lg text-noir-900 placeholder-noir-400
           focus:outline-none focus:border-accent-500 focus:ring-2
           focus:ring-accent-500/20 transition-all duration-300;
  }
}
```

---

## Component Architectuur

### Header Component

```tsx
// src/components/Header.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import Logo from './Logo'

const navigation = [
  { name: 'Diensten', href: '/diensten' },
  { name: 'Projecten', href: '/projecten' },
  { name: 'Aanpak', href: '/aanpak' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
      ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-soft' : 'bg-transparent'}`}>

      <nav className="container-wide">
        <div className="flex items-center justify-between h-20 lg:h-24">

          {/* Logo */}
          <Link href="/" className="relative z-10">
            <Logo className="h-12 lg:h-16 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-300
                  ${pathname === item.href
                    ? 'text-accent-600'
                    : 'text-noir-600 hover:text-noir-900'}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+31612345678" className="flex items-center gap-2 text-noir-600
                hover:text-noir-900 transition-colors">
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">+31 6 12 34 56 78</span>
            </a>
            <Link href="/offerte" className="btn-primary text-sm">
              Offerte aanvragen
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-noir-900"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-40 pt-24">
          <div className="container-wide py-8 space-y-6">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-2xl font-display text-noir-900
                  animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-8 space-y-4 animate-fade-up" style={{ animationDelay: '400ms' }}>
              <Link href="/offerte" className="btn-primary block text-center">
                Offerte aanvragen
              </Link>
              <Link href="/afspraak" className="btn-secondary block text-center">
                Afspraak maken
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
```

### Footer Component

```tsx
// src/components/Footer.tsx
import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import Logo from './Logo'

const footerLinks = {
  diensten: [
    { name: 'Totaalrenovatie', href: '/diensten/totaalrenovatie' },
    { name: 'Renovatie', href: '/diensten/renovatie' },
    { name: 'Afwerking', href: '/diensten/afwerking' },
    { name: 'Technieken', href: '/diensten/technieken' },
  ],
  bedrijf: [
    { name: 'Over ons', href: '/aanpak' },
    { name: 'Projecten', href: '/projecten' },
    { name: 'Contact', href: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-noir-950 text-white">
      <div className="container-wide section-padding-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Logo className="h-12 w-auto text-white mb-6" />
            <p className="text-noir-400 text-sm leading-relaxed">
              Vakmanschap en kwaliteit voor uw renovatieproject.
              Van ontwerp tot oplevering.
            </p>
          </div>

          {/* Diensten Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Diensten
            </h4>
            <ul className="space-y-3">
              {footerLinks.diensten.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}
                    className="text-noir-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bedrijf Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Bedrijf
            </h4>
            <ul className="space-y-3">
              {footerLinks.bedrijf.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}
                    className="text-noir-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+31612345678"
                  className="flex items-center gap-3 text-noir-400 hover:text-white transition-colors">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">+31 6 12 34 56 78</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@bedrijf.nl"
                  className="flex items-center gap-3 text-noir-400 hover:text-white transition-colors">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">info@bedrijf.nl</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-noir-400">
                  <MapPin className="h-4 w-4 mt-0.5" />
                  <span className="text-sm">
                    Voorbeeldstraat 123<br />
                    1234 AB Amsterdam
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-noir-800 flex flex-col md:flex-row
          justify-between items-center gap-4">
          <p className="text-noir-500 text-sm">
            &copy; {new Date().getFullYear()} Bedrijfsnaam. Alle rechten voorbehouden.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-noir-500 hover:text-white text-sm transition-colors">
              Privacy
            </Link>
            <Link href="/voorwaarden" className="text-noir-500 hover:text-white text-sm transition-colors">
              Voorwaarden
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

### Scroll Animation Hook

```typescript
// src/hooks/useScrollAnimation.ts
import { useEffect, useRef, useState } from 'react'

interface ScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            observer.unobserve(element)
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce])

  return { ref, isVisible }
}
```

### Animated Section Component

```tsx
// src/components/AnimatedSection.tsx
'use client'

import { ReactNode } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface AnimatedSectionProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}

export function AnimatedSection({
  children,
  delay = 0,
  direction = 'up',
  className = ''
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation()

  const transforms = {
    up: 'translateY(60px)',
    down: 'translateY(-60px)',
    left: 'translateX(60px)',
    right: 'translateX(-60px)',
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0)' : transforms[direction],
        transition: `opacity 0.8s ease-out, transform 0.8s ease-out`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
```

### Tracked CTA Component

```tsx
// src/components/TrackedLink.tsx
'use client'

import Link from 'next/link'
import { ReactNode } from 'react'
import { trackCTAClick, trackClickToCall } from '@/lib/analytics'

interface TrackedCTAProps {
  href: string
  location: string
  label: string
  children: ReactNode
  className?: string
}

export function TrackedCTA({
  href,
  location,
  label,
  children,
  className
}: TrackedCTAProps) {
  const handleClick = () => {
    if (href.startsWith('tel:')) {
      trackClickToCall(href.replace('tel:', ''), location)
    } else {
      trackCTAClick(label, location, href)
    }
  }

  if (href.startsWith('tel:') || href.startsWith('mailto:')) {
    return (
      <a href={href} onClick={handleClick} className={className}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}
```

---

## Pagina Structuur & Routing

### Publieke Pagina's

| Route | Doel | Belangrijkste Elementen |
|-------|------|------------------------|
| `/` | Homepage | Hero, diensten, projecten, waarden, CTA |
| `/diensten` | Diensten overzicht | Grid met 4 hoofddiensten |
| `/diensten/[service]` | Dienst detail | Features, scope, FAQ's, CTA |
| `/projecten` | Portfolio | Grid met categorieën en filtering |
| `/afspraak` | Afspraak boeken | Multi-step formulier met kalender |
| `/offerte` | Offerte aanvragen | Uitgebreid multi-step formulier |
| `/contact` | Contact | Quick inquiry formulier, contactinfo |
| `/aanpak` | Over ons | Missie, waarden, werkwijze |

### Admin Pagina's (Beveiligd)

| Route | Doel |
|-------|------|
| `/admin/login` | Admin inlog |
| `/admin` | Dashboard met offertes, afspraken, projecten |

### API Routes

```
POST /api/quotes              # Offerte indienen
POST /api/appointments        # Afspraak boeken
GET  /api/projects            # Projecten ophalen
GET  /api/availability        # Beschikbare tijdslots
POST /api/analytics/track     # Analytics events

# Admin (beveiligd)
/api/admin/quotes/*           # Offerte beheer
/api/admin/appointments/*     # Afspraak beheer
/api/admin/projects/*         # Project beheer
/api/admin/settings           # Instellingen
/api/admin/auth/*             # Authenticatie
```

---

## Formulieren & Lead Capture

### Multi-Step Offerte Formulier

```tsx
// src/components/offerte/OfferteFormulier.tsx
'use client'

import { useState } from 'react'
import { z } from 'zod'

// Stap definities
const steps = [
  { id: 1, title: 'Uw woning', description: 'Type en locatie' },
  { id: 2, title: 'Diensten', description: 'Wat wilt u laten doen?' },
  { id: 3, title: 'Details', description: 'Budget en omschrijving' },
  { id: 4, title: 'Contact', description: 'Uw gegevens' },
]

// Zod validatie schema
const QuoteSchema = z.object({
  propertyType: z.enum(['rijwoning', 'herenhuis', 'appartement', 'villa', 'anders']),
  postalCode: z.string().regex(/^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/, 'Ongeldige postcode'),
  city: z.string().min(2, 'Stad is verplicht'),
  services: z.array(z.string()).min(1, 'Selecteer minimaal één dienst'),
  budgetRange: z.enum(['tot-25k', '25k-50k', '50k-100k', '100k-200k', '200k-plus']),
  description: z.string().min(10, 'Beschrijf uw project'),
  fullName: z.string().min(2, 'Naam is verplicht'),
  email: z.string().email('Ongeldig emailadres'),
  phone: z.string().min(10, 'Telefoonnummer is verplicht'),
  gdprConsent: z.literal(true, { errorMap: () => ({ message: 'Akkoord vereist' }) }),
})

export default function OfferteFormulier() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    propertyType: '',
    postalCode: '',
    city: '',
    services: [] as string[],
    budgetRange: '',
    description: '',
    fullName: '',
    email: '',
    phone: '',
    gdprConsent: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateStep = (step: number) => {
    // Valideer alleen velden voor huidige stap
    const stepFields = {
      1: ['propertyType', 'postalCode', 'city'],
      2: ['services'],
      3: ['budgetRange', 'description'],
      4: ['fullName', 'email', 'phone', 'gdprConsent'],
    }

    const partialSchema = QuoteSchema.pick(
      stepFields[step as keyof typeof stepFields].reduce((acc, field) => {
        acc[field as keyof typeof formData] = true
        return acc
      }, {} as Record<string, true>)
    )

    try {
      partialSchema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message
        })
        setErrors(fieldErrors)
      }
      return false
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Submission failed')

      const result = await response.json()
      // Redirect naar bevestigingspagina of toon succes
      window.location.href = `/offerte/bevestiging?ref=${result.referenceNumber}`
    } catch (error) {
      setErrors({ submit: 'Er ging iets mis. Probeer het opnieuw.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between mb-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex-1 text-center ${
                step.id <= currentStep ? 'text-accent-600' : 'text-noir-400'
              }`}
            >
              <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center
                ${step.id <= currentStep ? 'bg-accent-600 text-white' : 'bg-noir-200'}`}>
                {step.id}
              </div>
              <p className="text-sm mt-2 hidden sm:block">{step.title}</p>
            </div>
          ))}
        </div>
        <div className="h-2 bg-noir-100 rounded-full">
          <div
            className="h-full bg-accent-600 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Steps */}
      <form onSubmit={(e) => e.preventDefault()}>
        {currentStep === 1 && (
          <StepPropertyInfo formData={formData} setFormData={setFormData} errors={errors} />
        )}
        {currentStep === 2 && (
          <StepServices formData={formData} setFormData={setFormData} errors={errors} />
        )}
        {currentStep === 3 && (
          <StepDetails formData={formData} setFormData={setFormData} errors={errors} />
        )}
        {currentStep === 4 && (
          <StepContact formData={formData} setFormData={setFormData} errors={errors} />
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-12">
          {currentStep > 1 && (
            <button type="button" onClick={prevStep} className="btn-secondary">
              Vorige
            </button>
          )}
          {currentStep < steps.length ? (
            <button type="button" onClick={nextStep} className="btn-primary ml-auto">
              Volgende
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-accent ml-auto"
            >
              {isSubmitting ? 'Versturen...' : 'Offerte aanvragen'}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
```

### Afspraak Boeken Component

```tsx
// src/components/BookingFlow.tsx (vereenvoudigd)
'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, User, Home } from 'lucide-react'

interface TimeSlot {
  time: string
  available: boolean
}

interface AvailableDate {
  date: string
  slots: TimeSlot[]
}

export default function BookingFlow() {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [availableDates, setAvailableDates] = useState<AvailableDate[]>([])
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    gemeente: '',
    projectType: '',
    message: '',
  })

  useEffect(() => {
    // Haal beschikbare data op
    fetch('/api/availability')
      .then((res) => res.json())
      .then((data) => setAvailableDates(data.dates))
  }, [])

  const handleSubmit = async () => {
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
      }),
    })

    if (response.ok) {
      const result = await response.json()
      // Succes handling
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Calendar */}
        <div>
          <h3 className="text-xl font-display mb-6 flex items-center gap-3">
            <Calendar className="h-5 w-5 text-accent-600" />
            Kies een datum
          </h3>
          <div className="grid grid-cols-7 gap-2">
            {/* Calendar rendering */}
            {availableDates.map((dateInfo) => (
              <button
                key={dateInfo.date}
                onClick={() => setSelectedDate(dateInfo.date)}
                className={`p-3 rounded-lg text-center transition-all
                  ${selectedDate === dateInfo.date
                    ? 'bg-accent-600 text-white'
                    : 'bg-ivory-100 hover:bg-ivory-200'}`}
              >
                {new Date(dateInfo.date).getDate()}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Time Slots */}
        <div>
          <h3 className="text-xl font-display mb-6 flex items-center gap-3">
            <Clock className="h-5 w-5 text-accent-600" />
            Kies een tijdstip
          </h3>
          {selectedDate && (
            <div className="grid grid-cols-3 gap-3">
              {availableDates
                .find((d) => d.date === selectedDate)
                ?.slots.filter((s) => s.available)
                .map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => setSelectedTime(slot.time)}
                    className={`p-3 rounded-lg text-center transition-all
                      ${selectedTime === slot.time
                        ? 'bg-accent-600 text-white'
                        : 'border border-noir-200 hover:border-accent-500'}`}
                  >
                    {slot.time}
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Contact Form */}
      {selectedDate && selectedTime && (
        <div className="mt-12 animate-fade-up">
          <h3 className="text-xl font-display mb-6 flex items-center gap-3">
            <User className="h-5 w-5 text-accent-600" />
            Uw gegevens
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Volledige naam"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="input-field-boxed"
            />
            <input
              type="email"
              placeholder="E-mailadres"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input-field-boxed"
            />
            <input
              type="tel"
              placeholder="Telefoonnummer"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="input-field-boxed"
            />
            <input
              type="text"
              placeholder="Gemeente"
              value={formData.gemeente}
              onChange={(e) => setFormData({ ...formData, gemeente: e.target.value })}
              className="input-field-boxed"
            />
          </div>
          <textarea
            placeholder="Omschrijf kort uw project..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="input-field-boxed mt-6 min-h-32"
          />
          <button onClick={handleSubmit} className="btn-accent w-full mt-8">
            Afspraak bevestigen
          </button>
        </div>
      )}
    </div>
  )
}
```

---

## Database Schema

### Prisma Schema

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Admin gebruikers
model User {
  id           String    @id @default(cuid())
  email        String    @unique
  passwordHash String
  fullName     String
  role         UserRole  @default(ADMIN)
  isActive     Boolean   @default(true)
  lastLogin    DateTime?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt

  assignedQuotes QuoteRequest[]
}

enum UserRole {
  ADMIN
  SUPERADMIN
}

// Offerte aanvragen
model QuoteRequest {
  id              String      @id @default(cuid())
  referenceNumber String      @unique
  status          QuoteStatus @default(NEW)

  // Klant informatie
  fullName        String
  email           String
  phone           String

  // Locatie
  postalCode      String
  city            String
  propertyType    PropertyType

  // Project details
  services        QuoteServiceSelection[]
  budgetRange     BudgetRange
  description     String      @db.Text

  // GDPR
  gdprConsent     Boolean

  // Toewijzing
  assignedTo      User?       @relation(fields: [assignedToId], references: [id])
  assignedToId    String?

  // Metadata
  notes           QuoteNote[]
  statusHistory   QuoteStatusHistory[]

  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  deletedAt       DateTime?   // Soft delete

  @@index([status])
  @@index([createdAt])
}

enum QuoteStatus {
  NEW
  CONTACTED
  SITE_VISIT
  QUOTE_SENT
  NEGOTIATING
  WON
  LOST
  ARCHIVED
}

enum PropertyType {
  RIJWONING
  HERENHUIS
  APPARTEMENT
  VILLA
  ANDERS
}

enum BudgetRange {
  TOT_25K
  K25_50K
  K50_100K
  K100_200K
  K200_PLUS
}

// Diensten selectie bij offerte
model QuoteServiceSelection {
  id        String       @id @default(cuid())
  quote     QuoteRequest @relation(fields: [quoteId], references: [id], onDelete: Cascade)
  quoteId   String
  service   ServiceType  @relation(fields: [serviceId], references: [id])
  serviceId String

  @@unique([quoteId, serviceId])
}

// Beschikbare diensten
model ServiceType {
  id          String  @id @default(cuid())
  name        String
  slug        String  @unique
  description String?
  isActive    Boolean @default(true)

  quoteSelections QuoteServiceSelection[]
}

// Notities bij offertes
model QuoteNote {
  id        String       @id @default(cuid())
  quote     QuoteRequest @relation(fields: [quoteId], references: [id], onDelete: Cascade)
  quoteId   String
  content   String       @db.Text
  createdAt DateTime     @default(now())
}

// Status geschiedenis
model QuoteStatusHistory {
  id        String       @id @default(cuid())
  quote     QuoteRequest @relation(fields: [quoteId], references: [id], onDelete: Cascade)
  quoteId   String
  status    QuoteStatus
  createdAt DateTime     @default(now())
}

// Afspraken
model Appointment {
  id              String            @id @default(cuid())
  referenceNumber String            @unique
  status          AppointmentStatus @default(PENDING)

  // Klant informatie
  fullName        String
  email           String
  phone           String
  gemeente        String

  // Afspraak details
  appointmentDate DateTime
  appointmentTime String
  projectType     String?
  propertyType    String?
  message         String?           @db.Text
  priorities      String[]

  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt

  @@index([appointmentDate])
  @@index([status])
}

enum AppointmentStatus {
  PENDING
  CONFIRMED
  RESCHEDULED
  COMPLETED
  CANCELLED
  NO_SHOW
}

// Beschikbaarheid
model Availability {
  id        String   @id @default(cuid())
  date      DateTime @unique
  slots     Json     // Array of { time: string, available: boolean }
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// Projecten (portfolio)
model Project {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String?  @db.Text
  category    String
  location    String?
  year        Int?
  images      String[] // Array van image URLs
  featured    Boolean  @default(false)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([category])
  @@index([featured])
}
```

### Database Helpers

```typescript
// src/lib/db.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

// Referentienummer generator
export async function generateReferenceNumber(prefix = 'NAM'): Promise<string> {
  const year = new Date().getFullYear()
  const count = await db.quoteRequest.count({
    where: {
      createdAt: {
        gte: new Date(`${year}-01-01`),
        lt: new Date(`${year + 1}-01-01`),
      },
    },
  })
  const number = (count + 1).toString().padStart(4, '0')
  return `${prefix}-${year}-${number}`
}
```

---

## Admin Dashboard

### Dashboard Structuur

```tsx
// src/components/admin/AdminDashboard.tsx
'use client'

import { useState } from 'react'
import {
  LayoutDashboard, FileText, Calendar, Briefcase,
  Settings, BarChart3, LogOut
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
  { name: 'Offertes', icon: FileText, id: 'quotes' },
  { name: 'Afspraken', icon: Calendar, id: 'appointments' },
  { name: 'Projecten', icon: Briefcase, id: 'projects' },
  { name: 'Analytics', icon: BarChart3, id: 'analytics' },
  { name: 'Instellingen', icon: Settings, id: 'settings' },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="min-h-screen bg-ivory-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-noir-950 text-white">
        <div className="p-6">
          <h1 className="text-xl font-display">Admin Panel</h1>
        </div>
        <nav className="px-4">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1
                transition-colors ${activeTab === item.id
                  ? 'bg-accent-600 text-white'
                  : 'text-noir-400 hover:text-white hover:bg-noir-800'}`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-noir-400
              hover:text-white transition-colors">
            <LogOut className="h-5 w-5" />
            Uitloggen
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {activeTab === 'dashboard' && <DashboardOverview />}
        {activeTab === 'quotes' && <QuotesManager />}
        {activeTab === 'appointments' && <AppointmentsManager />}
        {activeTab === 'projects' && <ProjectsManager />}
        {activeTab === 'analytics' && <AnalyticsDashboard />}
        {activeTab === 'settings' && <SettingsManager />}
      </main>
    </div>
  )
}
```

### Offerte Beheer

```tsx
// src/components/admin/QuotesManager.tsx
'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Eye, Mail, Trash2 } from 'lucide-react'

const statusColors = {
  NEW: 'bg-blue-100 text-blue-700',
  CONTACTED: 'bg-yellow-100 text-yellow-700',
  SITE_VISIT: 'bg-purple-100 text-purple-700',
  QUOTE_SENT: 'bg-orange-100 text-orange-700',
  NEGOTIATING: 'bg-indigo-100 text-indigo-700',
  WON: 'bg-green-100 text-green-700',
  LOST: 'bg-red-100 text-red-700',
  ARCHIVED: 'bg-gray-100 text-gray-700',
}

const statusLabels = {
  NEW: 'Nieuw',
  CONTACTED: 'Gecontacteerd',
  SITE_VISIT: 'Plaatsbezoek',
  QUOTE_SENT: 'Offerte verstuurd',
  NEGOTIATING: 'In onderhandeling',
  WON: 'Gewonnen',
  LOST: 'Verloren',
  ARCHIVED: 'Gearchiveerd',
}

export default function QuotesManager() {
  const [quotes, setQuotes] = useState([])
  const [filter, setFilter] = useState('ALL')
  const [search, setSearch] = useState('')
  const [selectedQuote, setSelectedQuote] = useState(null)

  useEffect(() => {
    fetchQuotes()
  }, [filter])

  const fetchQuotes = async () => {
    const params = new URLSearchParams()
    if (filter !== 'ALL') params.set('status', filter)
    if (search) params.set('search', search)

    const response = await fetch(`/api/admin/quotes?${params}`)
    const data = await response.json()
    setQuotes(data.quotes)
  }

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/quotes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    fetchQuotes()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-display">Offerte Aanvragen</h2>
        <div className="flex gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-noir-400" />
            <input
              type="text"
              placeholder="Zoeken..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="ALL">Alle statussen</option>
            {Object.entries(statusLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Quotes Table */}
      <div className="bg-white rounded-xl shadow-soft overflow-hidden">
        <table className="w-full">
          <thead className="bg-ivory-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-noir-600">Ref</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-noir-600">Naam</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-noir-600">Locatie</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-noir-600">Budget</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-noir-600">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-noir-600">Datum</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-noir-600">Acties</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote: any) => (
              <tr key={quote.id} className="border-t border-ivory-200 hover:bg-ivory-50">
                <td className="px-6 py-4 text-sm font-mono">{quote.referenceNumber}</td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium">{quote.fullName}</p>
                    <p className="text-sm text-noir-500">{quote.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  {quote.postalCode} {quote.city}
                </td>
                <td className="px-6 py-4 text-sm">{quote.budgetRange}</td>
                <td className="px-6 py-4">
                  <select
                    value={quote.status}
                    onChange={(e) => updateStatus(quote.id, e.target.value)}
                    className={`px-3 py-1 rounded-full text-sm font-medium
                      ${statusColors[quote.status as keyof typeof statusColors]}`}
                  >
                    {Object.entries(statusLabels).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 text-sm text-noir-500">
                  {new Date(quote.createdAt).toLocaleDateString('nl-NL')}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setSelectedQuote(quote)}
                      className="p-2 hover:bg-ivory-100 rounded-lg"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <a href={`mailto:${quote.email}`} className="p-2 hover:bg-ivory-100 rounded-lg">
                      <Mail className="h-4 w-4" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
```

---

## Email Systeem

### Email Configuratie

```typescript
// src/lib/email.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailOptions {
  to: string
  subject: string
  html: string
  attachments?: Array<{
    filename: string
    content: Buffer | string
  }>
}

export async function sendEmail(options: EmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@example.com',
      ...options,
    })

    if (error) throw error
    return data
  } catch (error) {
    console.error('Email error:', error)
    throw error
  }
}
```

### Offerte Bevestiging Email

```typescript
// src/lib/email.ts (vervolg)

interface QuoteData {
  referenceNumber: string
  fullName: string
  email: string
  propertyType: string
  city: string
  services: string[]
  budgetRange: string
}

export async function sendQuoteConfirmation(quote: QuoteData) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1c1917; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .header { text-align: center; margin-bottom: 40px; }
        .logo { font-size: 24px; font-weight: bold; color: #2d4a47; }
        .content { background: #faf8f5; padding: 30px; border-radius: 8px; }
        .reference { font-size: 14px; color: #78716c; margin-bottom: 20px; }
        h1 { font-size: 24px; margin-bottom: 20px; }
        .details { margin: 30px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e7e5e4; }
        .label { color: #78716c; }
        .value { font-weight: 500; }
        .footer { text-align: center; margin-top: 40px; color: #78716c; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">BEDRIJFSNAAM</div>
        </div>

        <div class="content">
          <p class="reference">Referentie: ${quote.referenceNumber}</p>
          <h1>Bedankt voor uw aanvraag!</h1>
          <p>Beste ${quote.fullName},</p>
          <p>Wij hebben uw offerte aanvraag in goede orde ontvangen.
             Binnen 2 werkdagen nemen wij contact met u op om uw wensen te bespreken.</p>

          <div class="details">
            <div class="detail-row">
              <span class="label">Type woning</span>
              <span class="value">${quote.propertyType}</span>
            </div>
            <div class="detail-row">
              <span class="label">Locatie</span>
              <span class="value">${quote.city}</span>
            </div>
            <div class="detail-row">
              <span class="label">Diensten</span>
              <span class="value">${quote.services.join(', ')}</span>
            </div>
            <div class="detail-row">
              <span class="label">Budget</span>
              <span class="value">${quote.budgetRange}</span>
            </div>
          </div>

          <p>Heeft u vragen? Neem gerust contact met ons op.</p>
        </div>

        <div class="footer">
          <p>Met vriendelijke groet,<br>Team Bedrijfsnaam</p>
          <p>+31 6 12 34 56 78 | info@bedrijf.nl</p>
        </div>
      </div>
    </body>
    </html>
  `

  await sendEmail({
    to: quote.email,
    subject: `Offerte aanvraag ontvangen - ${quote.referenceNumber}`,
    html,
  })
}
```

### Afspraak Bevestiging met iCal

```typescript
// src/lib/email.ts (vervolg)

function generateICalEvent(appointment: {
  date: Date
  time: string
  fullName: string
  gemeente: string
}): string {
  const startDate = new Date(appointment.date)
  const [hours, minutes] = appointment.time.split(':')
  startDate.setHours(parseInt(hours), parseInt(minutes))

  const endDate = new Date(startDate)
  endDate.setHours(endDate.getHours() + 1)

  const formatDate = (date: Date) =>
    date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Bedrijfsnaam//Afspraak//NL
BEGIN:VEVENT
UID:${Date.now()}@bedrijf.nl
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:Kennismaking Bedrijfsnaam - ${appointment.fullName}
DESCRIPTION:Kennismakingsgesprek met ${appointment.fullName}
LOCATION:${appointment.gemeente}
END:VEVENT
END:VCALENDAR`
}

export async function sendAppointmentConfirmation(appointment: {
  referenceNumber: string
  fullName: string
  email: string
  appointmentDate: Date
  appointmentTime: string
  gemeente: string
}) {
  const icalContent = generateICalEvent({
    date: appointment.appointmentDate,
    time: appointment.appointmentTime,
    fullName: appointment.fullName,
    gemeente: appointment.gemeente,
  })

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        /* Zelfde styling als quote email */
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">BEDRIJFSNAAM</div>
        </div>

        <div class="content">
          <p class="reference">Referentie: ${appointment.referenceNumber}</p>
          <h1>Uw afspraak is bevestigd!</h1>
          <p>Beste ${appointment.fullName},</p>
          <p>Wij kijken ernaar uit u te ontmoeten.</p>

          <div class="appointment-box" style="background: #2d4a47; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0;">
            <p style="font-size: 18px; margin: 0;">
              ${new Date(appointment.appointmentDate).toLocaleDateString('nl-NL', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p style="font-size: 24px; font-weight: bold; margin: 10px 0;">
              ${appointment.appointmentTime}
            </p>
            <p style="margin: 0;">${appointment.gemeente}</p>
          </div>

          <p>Voeg de afspraak toe aan uw agenda via de bijlage.</p>
        </div>

        <div class="footer">
          <p>Met vriendelijke groet,<br>Team Bedrijfsnaam</p>
        </div>
      </div>
    </body>
    </html>
  `

  await sendEmail({
    to: appointment.email,
    subject: `Afspraak bevestigd - ${new Date(appointment.appointmentDate).toLocaleDateString('nl-NL')} ${appointment.appointmentTime}`,
    html,
    attachments: [
      {
        filename: 'afspraak.ics',
        content: icalContent,
      },
    ],
  })
}
```

---

## Analytics & Tracking

### Analytics Helper

```typescript
// src/lib/analytics.ts
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

// GA4-compatible event tracking
export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params)
  }

  // Also push to dataLayer for GTM
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    })
  }
}

// CTA Click tracking
export function trackCTAClick(label: string, location: string, destination: string) {
  trackEvent('cta_click', {
    cta_label: label,
    cta_location: location,
    cta_destination: destination,
  })
}

// Click to call tracking
export function trackClickToCall(phoneNumber: string, location: string) {
  trackEvent('click_to_call', {
    phone_number: phoneNumber,
    call_location: location,
  })
}

// Form progress tracking
export function trackFormProgress(formName: string, step: number, stepName: string) {
  trackEvent('form_progress', {
    form_name: formName,
    form_step: step,
    step_name: stepName,
  })
}

// Form submission tracking
export function trackFormSubmission(formName: string, success: boolean, errorMessage?: string) {
  trackEvent('form_submission', {
    form_name: formName,
    submission_success: success,
    error_message: errorMessage,
  })
}

// Page view tracking
export function trackPageView(pagePath: string, pageTitle: string) {
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle,
  })
}

// Scroll depth tracking
export function trackScrollDepth(depth: number) {
  trackEvent('scroll_depth', {
    scroll_percentage: depth,
  })
}
```

### Analytics Component

```tsx
// src/components/Analytics.tsx
'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import Script from 'next/script'
import { trackPageView } from '@/lib/analytics'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID

export default function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      trackPageView(pathname, document.title)
    }
  }, [pathname, searchParams])

  if (!GA_MEASUREMENT_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}
```

---

## Animaties & Interacties

### Homepage Hero met Animaties

```tsx
// Voorbeeld hero sectie met geavanceerde animaties
'use client'

import { useEffect, useState, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { TrackedCTA } from '@/components/TrackedLink'

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsLoaded(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating circles */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-500/5 rounded-full
            blur-3xl animate-float"
          style={{
            transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-400/10 rounded-full
            blur-2xl animate-float"
          style={{
            animationDelay: '2s',
            transform: `translate(${mousePosition.x * -1.5}px, ${mousePosition.y * -1.5}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
      </div>

      {/* Content */}
      <div className="container-wide relative z-10">
        <div className="max-w-4xl">
          {/* Subtitle */}
          <p
            className="text-accent-600 font-medium tracking-wider uppercase mb-6"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease-out 0.2s',
            }}
          >
            Vakmanschap & Kwaliteit
          </p>

          {/* Main Title with Character Animation */}
          <h1 className="text-hero font-display text-noir-950 mb-8">
            {['Uw', 'renovatie', 'in', 'vertrouwde', 'handen'].map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-[0.3em]">
                {word.split('').map((char, charIndex) => (
                  <span
                    key={charIndex}
                    className="inline-block"
                    style={{
                      opacity: isLoaded ? 1 : 0,
                      transform: isLoaded ? 'translateY(0) rotate(0)' : 'translateY(60px) rotate(5deg)',
                      transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1)`,
                      transitionDelay: `${0.4 + wordIndex * 0.1 + charIndex * 0.03}s`,
                    }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          {/* Description */}
          <p
            className="text-xl text-noir-600 max-w-2xl mb-12"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease-out 1.2s',
            }}
          >
            Van ontwerp tot oplevering. Wij transformeren uw woning met oog voor
            detail en respect voor uw budget.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-wrap gap-4"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease-out 1.4s',
            }}
          >
            <TrackedCTA
              href="/offerte"
              location="hero"
              label="Offerte aanvragen"
              className="group btn-accent inline-flex items-center gap-3"
            >
              Offerte aanvragen
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </TrackedCTA>
            <TrackedCTA
              href="/projecten"
              location="hero"
              label="Bekijk projecten"
              className="btn-secondary"
            >
              Bekijk onze projecten
            </TrackedCTA>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 1s ease-out 2s',
        }}
      >
        <div className="w-6 h-10 border-2 border-noir-300 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-noir-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
```

### Scroll-Triggered Service Cards

```tsx
// Diensten sectie met gestaffelde animaties
'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Home, Hammer, Paintbrush, Wrench } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: Home,
    title: 'Totaalrenovatie',
    description: 'Complete transformatie van uw woning, van A tot Z.',
    href: '/diensten/totaalrenovatie',
  },
  {
    icon: Hammer,
    title: 'Renovatie',
    description: 'Gerichte verbouwingen en aanpassingen.',
    href: '/diensten/renovatie',
  },
  {
    icon: Paintbrush,
    title: 'Afwerking',
    description: 'Perfecte afwerking voor elk project.',
    href: '/diensten/afwerking',
  },
  {
    icon: Wrench,
    title: 'Technieken',
    description: 'Elektra, sanitair en verwarming.',
    href: '/diensten/technieken',
  },
]

export function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} className="section-padding bg-ivory-100">
      <div className="container-wide">
        <div className="text-center mb-16">
          <h2
            className="text-display-lg font-display mb-4"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.8s ease-out',
            }}
          >
            Onze Diensten
          </h2>
          <p
            className="text-lg text-noir-600 max-w-2xl mx-auto"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.8s ease-out 0.2s',
            }}
          >
            Van kleine verbouwingen tot complete renovaties
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Link
              key={service.title}
              href={service.href}
              className="group card card-bordered p-8 hover:border-accent-500"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
                transition: 'all 0.8s ease-out',
                transitionDelay: `${0.1 + index * 0.15}s`,
              }}
            >
              <div className="w-14 h-14 bg-accent-500/10 rounded-xl flex items-center justify-center
                  mb-6 group-hover:bg-accent-500 transition-colors duration-500">
                <service.icon className="h-7 w-7 text-accent-600 group-hover:text-white
                    transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-display mb-3 group-hover:text-accent-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-noir-600">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## Implementatie Gids

### 1. Project Setup

```bash
# Create new Next.js project
npx create-next-app@latest bouwbedrijf-website --typescript --tailwind --eslint --app

cd bouwbedrijf-website

# Install dependencies
npm install @prisma/client lucide-react zod resend bcryptjs
npm install -D prisma @types/bcryptjs

# Initialize Prisma
npx prisma init
```

### 2. Environment Variables

```bash
# .env
DATABASE_URL="postgresql://user:password@localhost:5432/construction_db"
RESEND_API_KEY="re_xxxxxxxxxxxx"
FROM_EMAIL="info@uwbedrijf.nl"
ADMIN_EMAIL="admin@uwbedrijf.nl"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

### 3. Database Setup

```bash
# Push schema to database
npx prisma db push

# Generate Prisma client
npx prisma generate

# Seed initial data (optional)
npx prisma db seed
```

### 4. Aanpassen voor Uw Bedrijf

**Stap 1: Branding**
- Vervang logo in `src/components/Logo.tsx`
- Update kleuren in `tailwind.config.ts` (accent kleuren)
- Update fonts als gewenst in `src/lib/fonts.ts`

**Stap 2: Content**
- Update bedrijfsnaam en contactgegevens
- Pas diensten aan in diensten pagina's
- Voeg eigen projecten toe via admin of database
- Update FAQ's per dienst

**Stap 3: Configuratie**
- Stel email templates in met eigen branding
- Configureer analytics (GA4 ID)
- Pas beschikbaarheid/tijdslots aan

### 5. Deployment Checklist

```markdown
□ Environment variables ingesteld
□ Database migraties uitgevoerd
□ Admin gebruiker aangemaakt
□ Email templates getest
□ Analytics tracking gevalideerd
□ Formulieren getest
□ Mobile responsiveness gecontroleerd
□ Laadsnelheid geoptimaliseerd
□ SEO metadata ingevuld
□ SSL certificaat actief
```

---

## Conclusie

Deze architectuur biedt een complete oplossing voor bouwbedrijf websites met:

- **Professional Design** - Premium uitstraling met moderne animaties
- **Lead Generation** - Effectieve funnels voor offertes en afspraken
- **Admin Tools** - Volledig beheer van leads en content
- **Schaalbaarheid** - Modulaire componenten en database abstractie
- **Performance** - Geoptimaliseerd voor snelheid en SEO

Door deze template te volgen kunnen bouwbedrijven snel een professionele online aanwezigheid opzetten die leads genereert en vertrouwen uitstraalt.

---

*Laatst bijgewerkt: Januari 2026*
