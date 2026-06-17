# VyaPay — AI Payments Intelligence & Orchestration

A pre-sales demo for an **AI-powered payments intelligence & orchestration platform**. VyaPay unifies transaction streams across processors and gateways, dynamically routes for approval-rate / cost / risk, stops fraud and chargebacks before settlement, and runs a fully observable AI payments control plane.

Light **"Voltage"** UI: near-white canvas, deep-indigo structure, a single electric **volt** accent for brand + AI, approve-green / decline-red for payment semantics, and a live **transaction ticker** + **routing-flow** motif. See `DESIGN.md`.

## Hero moment

**AI Cost Auto-Optimization** (`Cost & Fee Optimization`) — VyaPay finds that shifting 30% of Visa-debit traffic Nexopay→Helix cuts cost ~18% with no approval loss → **Simulate impact** streams the analysis and shows before/after (cost, approval, monthly spend) → **Apply** commits the routing shift and shows the revenue impact (~$42K/mo · ~$504K/yr).

Supporting signature: **Routing Intelligence** — a declined transaction reroutes to a higher-approval processor live (the routing-flow graph) with an explainable decision.

## Screens

| Section | Screen | State |
|---------|--------|-------|
| Overview | **Payments Command Center** — live flow, processor health, approval/cost/risk | ✅ built |
| Orchestration | **Routing Intelligence** — routing-flow graph + decline→reroute + BIN intelligence | ✅ built |
| Orchestration | **Cost & Fee Optimization** — AI cost auto-optimization *(hero)* | ✅ built |
| Risk | **Fraud & Chargeback Defense** | ✅ built |
| Merchants | **Merchant Intelligence** | ✅ built |
| Controls | **Policy & Rules Studio** | ✅ built |
| AI | **AI Copilot & Decision Audit** | ✅ built |

All 7 screens are fully built, with a premium visual pass (ambient atmosphere, gradient CTAs, floating cards, staggered reveals). Signature interactive moments: AI cost auto-optimization (hero), decline→reroute, pre-auth fraud review, merchant root-cause reroute, the live no-code rule builder, and the decision audit trail.

## Sample data

5M transactions · 50 merchants (e-comm / SaaS / subscriptions / marketplaces) · 8 processors · 5 fraud engines · 2,000 chargebacks · global BIN coverage · USD.

## Run

```bash
npm install
npm run dev      # open the printed port
npm run build    # tsc -b && vite build
```

## Stack

Vite · React 19 · TypeScript · React Router v7 · Tailwind 3 · Recharts · lucide-react · shadcn-style primitives.
