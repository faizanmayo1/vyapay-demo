import type { FeeRow, Opportunity, OptStep, Recommendation } from '@/types/optimization'

export const optSteps: OptStep[] = [
  { id: 'o1', label: 'Scanning fee schedules', detail: 'Interchange + processor markup across all 8 processors', count: '8 processors' },
  { id: 'o2', label: 'Modeling approval impact per segment', detail: 'BIN-level approval prediction for Visa-debit US issuers', count: 'Visa-debit US' },
  { id: 'o3', label: 'Simulating traffic reallocation', detail: 'Reallocating 30% of segment volume Nexopay → Helix', count: '30% shift' },
  { id: 'o4', label: 'Validating no approval-rate loss', detail: 'Projected approval holds — net +0.1 pt vs current', count: '+0.1 pt' },
  { id: 'o5', label: 'Computing net margin impact', detail: 'Blended cost per txn and monthly savings', count: '−18% cost' },
]

export const recommendation: Recommendation = {
  title: 'Shift 30% of Visa-debit traffic Nexopay → Helix',
  segment: 'Visa debit · US issuers · ~1.4M txns/mo',
  fromProcessor: 'Nexopay',
  toProcessor: 'Helix',
  trafficPct: 30,
  before: { costBps: 212, approval: 94.1, monthlyCost: 234000 },
  after: { costBps: 178, approval: 94.2, monthlyCost: 192000 },
  savingsMonthly: 42000,
  savingsPct: 18,
  approvalDelta: 0.1,
}

export const feeComparison: FeeRow[] = [
  { processor: 'Verda', avgFeeBps: 156, costPerTxn: 0.94, marginScore: 96, tone: 'positive' },
  { processor: 'Cygnus', avgFeeBps: 169, costPerTxn: 1.01, marginScore: 93, tone: 'positive' },
  { processor: 'Helix', avgFeeBps: 178, costPerTxn: 1.07, marginScore: 92, tone: 'positive' },
  { processor: 'Cardstream', avgFeeBps: 188, costPerTxn: 1.13, marginScore: 84, tone: 'warning' },
  { processor: 'Paragon', avgFeeBps: 195, costPerTxn: 1.17, marginScore: 86, tone: 'positive' },
  { processor: 'Aperture', avgFeeBps: 205, costPerTxn: 1.23, marginScore: 80, tone: 'warning' },
  { processor: 'Nexopay', avgFeeBps: 212, costPerTxn: 1.27, marginScore: 78, tone: 'warning' },
  { processor: 'Northwind', avgFeeBps: 224, costPerTxn: 1.34, marginScore: 74, tone: 'warning' },
]

export const opportunities: Opportunity[] = [
  { title: 'Route Amex to Paragon affinity lane', detail: 'Higher Amex approval at flat cost across all merchants', savings: '+1.2 pts approval', tone: 'positive' },
  { title: 'Cap Northwind at 6% volume share', detail: 'Highest cost-per-txn with no approval advantage', savings: '$18K/mo', tone: 'info' },
  { title: 'Enable Verda for low-risk subscriptions', detail: 'Lowest fee tier; ideal for recurring SaaS billing', savings: '$11K/mo', tone: 'info' },
]

export const recoveryStats = [
  { label: 'Recovered today', value: '$84K', sub: '1,920 txns via smart retry' },
  { label: 'Retry success rate', value: '41.6%', sub: 'soft declines recovered' },
  { label: 'Avg retries to win', value: '1.4', sub: 'alternate-processor recovery' },
]
