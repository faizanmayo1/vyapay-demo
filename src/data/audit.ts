import { FileBarChart, GitBranch, ScrollText, Store } from 'lucide-react'

import type { AuditTrail, CannedAnswer, ExecReport, SuggestedPrompt } from '@/types/audit'

export const suggestedPrompts: SuggestedPrompt[] = [
  { id: 'p-audit', label: 'Show the decision audit for TX-88421', sub: 'Full lifecycle + every AI decision logged', icon: ScrollText, kind: 'audit' },
  { id: 'p-cardstream', label: 'Why did approval rate drop on Cardstream?', sub: 'Explainable anomaly + what we did', icon: GitBranch, kind: 'text' },
  { id: 'p-recover', label: 'Which merchants have recoverable approval loss?', sub: 'Root-cause across the portfolio', icon: Store, kind: 'text' },
  { id: 'p-report', label: 'Generate this week’s executive report', sub: 'Leadership-grade performance summary', icon: FileBarChart, kind: 'report' },
]

export const auditTrail: AuditTrail = {
  txnId: 'TX-88421',
  summary: '$129.00 · Visa debit · BIN 414720 (Chase) · Lumen Retail — every system decision from initiation to settlement, hash-chained and tamper-evident.',
  steps: [
    { ts: '20:41:08.002', label: 'Initiated', detail: '$129.00 Visa-debit · BIN 414720 · Lumen Retail', decision: 'Ingested & normalized to unified schema', tone: 'info' },
    { ts: '20:41:08.015', label: 'Fraud scored', detail: 'Score 12 / 100 — known device, geo match, normal velocity', decision: 'Pass · no step-up required', tone: 'positive' },
    { ts: '20:41:08.021', label: 'Routing evaluated', detail: '8 processors scored for Chase Visa-debit', decision: 'Cardstream ranked first · cost-optimal at equal predicted approval', tone: 'info' },
    { ts: '20:41:08.034', label: 'Attempt 1 · Cardstream', detail: 'Declined · do-not-honor (latency 142ms)', decision: 'Classified soft-decline → retry alternate', tone: 'risk' },
    { ts: '20:41:08.075', label: 'Rerouted · Helix', detail: 'Approved · auth code 4471X', decision: 'Smart-retry → Helix (91% predicted) · approved in 41ms', tone: 'positive' },
    { ts: '20:41:09.300', label: 'Captured', detail: 'Settlement queued · interchange 178 bps', decision: 'Cost-optimal capture lane', tone: 'info' },
    { ts: 'Jun 11 · T+2d', label: 'Settled', detail: 'Funds settled · no dispute flag', decision: 'Closed · audit chain sealed', tone: 'positive' },
  ],
}

export const execReport: ExecReport = {
  period: 'Jun 9 – 15, 2026',
  metrics: [
    { label: 'Approval rate', value: '94.2%', delta: '▲ 1.6 pts', deltaTone: 'positive' },
    { label: 'Net revenue / txn', value: '$48.10', delta: '▲ $0.62', deltaTone: 'positive' },
    { label: 'Chargeback rate', value: '0.41%', delta: '▼ 0.07 pts', deltaTone: 'positive' },
    { label: 'Blended cost', value: '189 bps', delta: '▼ 12 bps', deltaTone: 'positive' },
    { label: 'Recovered (retry)', value: '$1.2M', delta: '▲ 14%', deltaTone: 'positive' },
    { label: 'Fraud blocked', value: '$2.1M', delta: '▲ 6%', deltaTone: 'positive' },
  ],
  highlights: [
    'AI routing added an estimated +1.6 pts of approval — ≈ $1.9M incremental authorized volume.',
    'Cost optimization shipped (Visa-debit Nexopay→Helix) saving $42K/mo with no approval loss.',
    'Cardstream latency incident auto-mitigated in 15 min — zero merchant downtime.',
    '71% dispute win rate held; AI compiled 94% of evidence packets automatically.',
  ],
}

export const cannedAnswers: CannedAnswer[] = [
  {
    match: 'cardstream',
    body: 'Cardstream’s approval fell 7.2 pts over 15 minutes — and the digital thread shows it wasn’t the cardholders:',
    bullets: [
      'Latency spiked to 142ms (2.4× baseline), driving a surge in technical timeouts.',
      'Issuer-decline rate was unchanged — so this is a processor problem, not card quality.',
      'VyaPay auto-rerouted in-flight Visa & Mastercard traffic to Helix and Paragon.',
      'Fleet approval held at 94.2% through the incident; recommend throttling Cardstream until latency recovers.',
    ],
  },
  {
    match: 'recover',
    body: '3 merchants have processor-driven approval loss you can recover today:',
    bullets: [
      'Lumen Retail · −6.4 pts — reroute Visa-debit Cardstream→Helix recovers +5.8 pts ($74K/mo).',
      'Verde Market · −0.4 pts — move LATAM issuers to Cygnus’ low-risk lane (~$9K/mo).',
      'Atlas Travel · loss is chargeback-driven, not approval — tighten pre-auth fraud rules instead.',
    ],
  },
]
