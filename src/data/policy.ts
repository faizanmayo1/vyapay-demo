import type { AbTest, ActiveRule, MerchantOverride, ProcessorOption } from '@/types/policy'

/** Builder baseline — the current routing for the Visa-debit US segment. */
export const baseline = { processor: 'Nexopay', approval: 94.1, costBps: 212, volume: '1.4M txns/mo' }

/** Target options for the rule's THEN clause; selecting one updates the preview. */
export const processorOptions: ProcessorOption[] = [
  { id: 'helix', name: 'Helix', approval: 95.8, costBps: 178, recommended: true },
  { id: 'paragon', name: 'Paragon', approval: 95.2, costBps: 195 },
  { id: 'verda', name: 'Verda', approval: 94.6, costBps: 156 },
  { id: 'nexopay', name: 'Nexopay', approval: 94.1, costBps: 212 },
]

export const activeRules: ActiveRule[] = [
  { id: 'R-01', priority: 1, name: 'Chase Visa-debit → Helix', when: 'BIN 414720 · Visa debit', then: 'Route → Helix, fallback Paragon', hits: '1.24M', enabled: true, tone: 'positive' },
  { id: 'R-02', priority: 2, name: 'High-risk step-up', when: 'fraud score > 75', then: 'Step-up 3DS, then block', hits: '6.1K', enabled: true, tone: 'warning' },
  { id: 'R-03', priority: 3, name: 'Amex affinity lane', when: 'network = Amex', then: 'Route → Paragon', hits: '218K', enabled: true, tone: 'info' },
  { id: 'R-04', priority: 4, name: 'Cost cap · Northwind', when: 'Northwind share > 6%', then: 'Divert overflow → Verda', hits: '44K', enabled: true, tone: 'info' },
  { id: 'R-05', priority: 5, name: 'LATAM issuer routing', when: 'issuer region = LATAM', then: 'Route → Cygnus', hits: '0', enabled: false, tone: 'neutral' },
]

export const abTest: AbTest = {
  variantA: { name: 'A · Control', strategy: 'Cost-priority routing', approval: 94.1, costBps: 198 },
  variantB: { name: 'B · Challenger', strategy: 'Approval-priority routing', approval: 95.6, costBps: 206 },
  days: 14,
  winner: 'B',
  recommendation: 'Promote B — +1.5 pts approval for +8 bps cost nets ~$310K/yr in recovered revenue after the cost delta.',
}

export const merchantOverrides: MerchantOverride[] = [
  { merchant: 'Atlas Travel', rule: 'Mandatory 3DS on amounts > $1,000', tone: 'risk' },
  { merchant: 'Lumen Retail', rule: 'Visa-debit pinned → Helix (root-cause fix)', tone: 'positive' },
  { merchant: 'Northstar SaaS', rule: 'Retry ×3 on soft decline (dunning)', tone: 'info' },
]
