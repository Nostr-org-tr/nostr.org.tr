# Design — Nostr Türkiye Topluluğu (nostr.org.tr)

A locked design system for `nostr.org.tr`. Every page and component implementation reads this file as the single source of truth.

/* Hallmark · genre: editorial · macrostructure: app-family · design-system: design.md · designed-as-app */

## Genre
**editorial** (supported with modern-minimal technical clarity for developer tools and relay monitors).

## Macrostructure Family
Pages within the application belong to one of four families:

1. **Hub & Marketing Pages** (`index.astro`, `kampanya.astro`, `en/campaign.astro`)
   - Macrostructure: *Marquee Hero* & *Pillar Rhythm*
   - Nav: N1b (Structured community nav with grouped dropdowns)
   - Footer: Ft5 (Statement colophon with ecosystem links)
   - Knob values: High typographic hierarchy, live WebSocket relay pingers, clear call-to-actions.

2. **Manifesto & Long-Form Reading Pages** (`manifesto.astro`, `en/manifesto.astro`, `rehber.astro`, vertical guides, `blog/*`)
   - Macrostructure: *Long Document* & *Typographic Colophon*
   - Reading measure: `max-w-[65ch]`
   - Sidebar/Marginalia: Fast section jumping, article progress, bilingual toggling.

3. **Directory & Ecosystem Pages** (`topluluk.astro`, `roleler.astro`, `projeler.astro`, `takip-listeleri.astro`, `konusmalar.astro`)
   - Macrostructure: *Tabular Index* & *Curated Bento*
   - Features: High-density data presentation, instant copy-to-clipboard, filterable list views.

4. **Interactive Tools Suite** (`src/pages/araclar/*`, `ToolLayout.astro`)
   - Macrostructure: *Workbench*
   - Features: Dedicated input/output panelling, 8-state interactive controls, cryptographic key safety badges.

---

## Theme & Palette

Light-first priority with seamless, high-contrast dark mode support.

### CSS Custom Properties
```css
:root {
  /* Surface / Paper */
  --color-paper: oklch(0.985 0.005 85);       /* #faf9f5 warm crisp paper */
  --color-paper-2: oklch(0.955 0.008 85);     /* #f3f1ea secondary container */
  --color-paper-card: oklch(1 0 0);           /* #ffffff elevated card */
  --color-paper-hover: oklch(0.94 0.01 85);   /* #eeece4 card hover */

  /* Ink / Typography */
  --color-ink: oklch(0.18 0.01 260);          /* #18181b primary ink */
  --color-ink-2: oklch(0.42 0.015 260);       /* #52525b secondary ink */
  --color-ink-muted: oklch(0.58 0.015 260);   /* #71717a subtle caption */

  /* Borders / Dividers */
  --color-rule: oklch(0.90 0.008 85);         /* #e4e2d9 subtle hairline */
  --color-rule-strong: oklch(0.82 0.01 85);   /* #d1cfc7 strong border */

  /* Brand Accents */
  --color-accent: oklch(0.55 0.22 290);       /* #7c3aed Nostr purple */
  --color-accent-hover: oklch(0.48 0.23 290); /* #6d28d9 deep purple */
  --color-accent-subtle: oklch(0.96 0.03 290);/* #f5f3ff purple tint */
  --color-accent-ink: oklch(0.99 0 0);        /* #ffffff text on purple */

  /* Community & Status Accents */
  --color-accent-tr: oklch(0.58 0.22 18);     /* #e11d48 Turkey crimson */
  --color-accent-tr-subtle: oklch(0.96 0.03 18);
  --color-lightning: oklch(0.75 0.18 80);     /* #f59e0b Lightning amber */
  --color-success: oklch(0.65 0.18 145);      /* #16a34a Relay online green */
  --color-focus: oklch(0.55 0.22 290);        /* #7c3aed outline focus ring */

  /* Spacing Scale (4pt named) */
  --space-3xs: 0.25rem;  /* 4px */
  --space-2xs: 0.5rem;   /* 8px */
  --space-xs:  0.75rem;  /* 12px */
  --space-sm:  1rem;     /* 16px */
  --space-md:  1.5rem;   /* 24px */
  --space-lg:  2rem;     /* 32px */
  --space-xl:  3rem;     /* 48px */
  --space-2xl: 4.5rem;   /* 72px */
  --space-3xl: 6rem;     /* 96px */

  /* Radii */
  --radius-sm: 0.375rem; /* 6px */
  --radius-md: 0.625rem; /* 10px */
  --radius-lg: 0.875rem; /* 14px */
  --radius-xl: 1.25rem;  /* 20px */
  --radius-pill: 9999px;

  /* Motion */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-short: 180ms;
  --dur-med: 280ms;
}

.dark {
  /* Surface / Paper */
  --color-paper: oklch(0.13 0.015 260);       /* #0b0f19 deep slate */
  --color-paper-2: oklch(0.17 0.018 260);     /* #111827 secondary surface */
  --color-paper-card: oklch(0.16 0.018 260);  /* #0f1624 elevated card */
  --color-paper-hover: oklch(0.20 0.02 260);  /* #172033 card hover */

  /* Ink / Typography */
  --color-ink: oklch(0.97 0.005 260);         /* #f8fafc primary ink */
  --color-ink-2: oklch(0.75 0.015 260);       /* #cbd5e1 secondary ink */
  --color-ink-muted: oklch(0.55 0.015 260);   /* #64748b subtle caption */

  /* Borders / Dividers */
  --color-rule: oklch(0.24 0.02 260);         /* #1e293b hairline */
  --color-rule-strong: oklch(0.32 0.025 260); /* #334155 strong border */

  /* Brand Accents */
  --color-accent: oklch(0.68 0.20 290);       /* #a78bfa bright purple */
  --color-accent-hover: oklch(0.74 0.18 290); /* #c084fc lighter purple */
  --color-accent-subtle: oklch(0.20 0.05 290);/* #2e1065 deep purple container */
  --color-accent-ink: oklch(0.10 0.02 260);   /* dark ink on bright button */
}
```

---

## Typography

- **Display**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif`
  - Weight: 700 / 800
  - Style: `normal` (**No italic display headings**)
  - Tracking: `-0.025em`
  - Line-height: `1.15` to `1.25`
- **Body**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif`
  - Weight: 400 (regular) / 500 (medium) / 600 (semibold)
  - Tracking: `-0.01em`
  - Line-height: `1.65`
  - Paragraph measure: `max-w-[65ch]`
- **Monospace**: `JetBrains Mono`, `Fira Code`, `monospace`
  - Weight: 400 / 500 / 600
  - Used for: `npub1...`, `nsec1...`, `nprofile1...`, NIP identifiers (`NIP-05`, `NIP-19`), WebSocket URLs (`wss://...`), cryptographic event signatures, and code blocks.

---

## Component Voice & Interactions

1. **Buttons & Action Triggers**:
   - Primary: Solid `--color-accent` background with clean contrast text, rounded `--radius-md` or `--radius-lg`, active scale `0.98`, no fuzzy excessive shadows.
   - Secondary: Clean `--color-paper-card` with 1px `--color-rule-strong` hairline border.
   - Microinteraction: High tactile response, clear hover background shifts.
   - All interactive components support **8 states**: `default`, `hover`, `:focus-visible`, `:active`, `disabled`, `loading`, `error`, `success`.

2. **Badges & Meta Chips**:
   - Structured typography with 1px border, monospace key labels where applicable.
   - Status indicators: Pulse dots for live WebSocket relay connections and Blossom servers.

3. **Code & Key Display**:
   - Truncated middle with one-click copy feedback.
   - High contrast monospace styling on subtle container background.

---

## What Pages MUST Share
- The header brand mark: `nostr` + `.org.tr` badge.
- The cohesive color palette and 4pt spacing rhythm.
- The font pairing: Sans display/body + JetBrains Mono for keys/protocols.
- Section heading hierarchy (Sub-label eyebrow + display heading + crisp subtitle).
- The Ft5 statement colophon footer.

## What Pages MAY Differ On
- Macrostructure family according to page job (Marketing vs. Long Document vs. Directory vs. Interactive Workbench).
- Internal column count (Single-column reading, 2-column workbench, 3/4-column tabular bento).
