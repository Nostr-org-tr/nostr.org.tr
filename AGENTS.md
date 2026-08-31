# Nostr Türkiye Topluluğu - Agent Architecture & Team Workflow

This document defines the agent roles, operational guidelines, and responsibilities for building and maintaining `nostr.org.tr`.

---

## 🤖 Agent Roles & Roster

| Agent Role | Primary Focus | Core Files & Areas | Spec Document |
| :--- | :--- | :--- | :--- |
| **Frontend Architect** | Astro, Tailwind, UI/UX, Light-first theme, Accessibility, Layouts | `src/layouts/`, `src/components/`, `astro.config.mjs`, `tailwind.config.mjs` | [frontend-architect.md](file:///.agents/frontend-architect.md) |
| **i18n & Content Specialist** | Bilingual copy (TR / EN), Manifesto accuracy, Guides, SEO copy | `src/i18n/`, `src/data/guides.ts`, `src/pages/` | [i18n-content-specialist.md](file:///.agents/i18n-content-specialist.md) |
| **Nostr Protocol Specialist** | NIPs (NIP-01, NIP-05, NIP-19, NIP-57), Relays, WebSocket ping, npub/Zaps | `src/data/members.ts`, `src/data/relays.ts`, `src/components/RelayPingCard.astro` | [nostr-protocol-specialist.md](file:///.agents/nostr-protocol-specialist.md) |
| **Cloudflare & DevOps Specialist** | Cloudflare Workers, `wrangler.jsonc`, static asset pipeline, security headers | `wrangler.jsonc`, `package.json`, `.nvmrc` | [cloudflare-devops.md](file:///.agents/cloudflare-devops.md) |

---

## 📋 General Execution Rules for Agents

1. **Step-by-Step Execution**: Work incrementally function by function. Never deploy half-baked or placeholder code.
2. **Product Grade Quality**: No `TODO` comments. Always rethink and write complete, production-ready code.
3. **Node Versioning**: Always verify and use `nvm use` before running node commands.
4. **Light Theme Priority**: Design with clean light mode by default, supporting dark mode seamlessly.
5. **No URL prefix for Turkish**: Turkish routes are root (`/manifesto`, `/topluluk`), English routes are prefixed (`/en/manifesto`, `/en/community`).
6. **Minimalist Header**: Keep the header clean, icon-focused, and non-exhausting.
