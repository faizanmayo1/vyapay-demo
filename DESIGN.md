# VyaPay — Design System

A light **"Voltage"** control-plane aesthetic for a payments orchestration platform: a calm near-white canvas, a deep-indigo structure, and a single electric **volt** accent that carries both brand and AI (VyaPay's pitch is that the AI *is* the product). Approve-green / decline-red are reserved strictly for payment semantics. Deliberately distinct from PesaPesa (light-emerald + gold rail, violet-AI, mobile-money).

## Palette

| Role | Token | Hex |
|------|-------|-----|
| Canvas | `canvas` | `#F6F7FB` |
| Card | `card` | `#FFFFFF` |
| Ink (text) | `ink` | `#11132B` |
| Structure / primary (indigo) | `steel` (alias `navy`) | `#312E81` |
| Electric accent — brand + AI (volt) | `amber` (alias `red`/`sky`) + `volt` | `#5B5BF6` |
| Hairline | `hairline` | `#E6E8F2` (indigo-tinted) |
| Payment semantics | `signal` | approved `#16A34A` · pending/retry `#D97706` · declined/fraud `#DC2626` · routed/info `#2563EB` |

> Token **keys** stay `steel`/`amber` (+ `navy`/`red`/`sky` aliases) so the shared shadcn primitives render on-brand unedited; only the **values** are remapped. `amber → volt` routes every AI surface (`AIInsightCard`, AI badges, the flows) to the electric accent. HSL channels live in `src/index.css`; literal scales in `tailwind.config.js`.

## Colour discipline

- **Indigo** carries structure — primary buttons, dark chips, the wordmark mark, primary chart series.
- **Volt** means brand + AI — active nav, CTAs, the routing "current", AI flows, "AI" badges.
- **Signal green/amber/red** are reserved for payment outcomes (approved / pending / declined / fraud) — never decoration.

## Type

- **Display / headings:** Sora (geometric, techy fintech)
- **UI / body:** Manrope (clean geometric)
- **Amounts / BINs / IDs:** JetBrains Mono, tabular (`.tabular`)

## Motion & signatures

- **Live transaction ticker** (`TxnTicker`) in the header — the always-on payments motif (`animate-ticker`, `.ticker-mask`).
- `.rail-current` — animated dashed routing "current" between nodes in `RoutingFlowGraph`.
- `.volt-rule` — indigo→volt hairline crowning AI / spotlight cards.
- `.aurora-wash` + streaming step lists — the "thinking" backdrop behind the AI flows.
- `animate-stream-in` on live transaction rows; `.top-rail` hover reveal on KPI cards.

## Primitives & patterns

shadcn `Button` (indigo default, `amber`(volt)/`secondary`/`ghost`), `Badge`, `Card`, `Table`, `Input`, `Toast`. Reusable: `KPICard`, `PageHeader`/`HeaderStat`, `SectionHead`, `AIInsightCard`, `StatusBadge`, `TxnTicker`, `RoutingFlowGraph`, `OptimizationFlow`, `CommandPalette`, `NotificationsPanel`, `ScreenScaffold`, Recharts `ChartTooltip`.

## Domain framing

- **Currency:** USD primary. **Networks:** Visa / Mastercard / Amex / Discover. **Processors (8):** Helix, Nexopay, Paragon, Cardstream, Northwind, Cygnus, Aperture, Verda.
- **Entities:** transactions, merchants, processors, issuers/BINs, fraud engines.
- Headline dataset: 5M txns · 50 merchants · 8 processors · 5 fraud engines · 2,000 chargebacks · global BIN coverage. Persona: Daniel Cho, Head of Payments Ops.
