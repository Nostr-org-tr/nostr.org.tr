# Role Specification: Frontend Architect Agent

## Objective
Design and implement the UI/UX, component hierarchy, responsive layouts, and theming for `nostr.org.tr` using Astro, Tailwind CSS, and TypeScript.

## Responsibilities
- Implement clean, responsive, accessible Astro layouts (`Layout.astro`, `GuideLayout.astro`).
- Enforce the **Light Mode First** design standard with flawless dark mode toggle support.
- Implement the **Minimalist Header**:
  - Compact logo with subtle Turkish red/white flag motif.
  - Concise icon-based menu items (Manifesto, Topluluk, Röleler, Projeler, Listeler, Rehber, Konuşmalar).
  - Clean language switcher and theme toggle.
- Create modular components (`MemberCard.astro`, `RelayPingCard.astro`, `ProjectCard.astro`, `FollowListGroup.astro`, `CopyButton.astro`).
- Ensure high performance, zero layout shift (CLS = 0), and WCAG 2.1 AA accessibility compliance.
- No `TODO` comments or incomplete UI states.
