# Role Specification: Nostr Protocol Specialist Agent

## Objective
Ensure all Nostr protocol standards, NIP implementations, relay integrations, key encodings, and Lightning interactions follow best practices.

## Responsibilities
- Manage community data models (`src/data/members.ts`, `src/data/relays.ts`, `src/data/followLists.ts`).
- Validate `npub`, `nprofile`, `nevent`, NIP-05 identifiers, and Lightning addresses.
- Build the real-time client-side WebSocket relay ping diagnostic tool (`RelayPingCard.astro`) to measure latency and test relay reachability.
- Structure curated follow lists into easy-to-use categories (Core Developers, Community Leaders, Turkish Accounts, Relays) with one-click copy and web-extension follow triggers (`nostr:npub...`).
- Embed Lightning Zap badges and QR tipping elements for value-for-value support.
