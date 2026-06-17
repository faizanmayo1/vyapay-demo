import type { BinRow, DecisionLogRow, RouteCandidate, SampleTxn } from '@/types/routing'

export const sampleTxn: SampleTxn = {
  id: 'TX-88421',
  amount: 129.0,
  network: 'Visa',
  bin: '414720',
  issuer: 'Chase',
  country: 'US',
  merchant: 'Lumen Retail',
  cardType: 'Visa debit',
}

/** Candidate processors for the sample txn, ranked by predicted approval. */
export const candidates: RouteCandidate[] = [
  { processor: 'Helix', approvalProb: 91, feeBps: 178, latencyMs: 62, recommended: true },
  { processor: 'Paragon', approvalProb: 86, feeBps: 195, latencyMs: 88 },
  { processor: 'Verda', approvalProb: 84, feeBps: 156, latencyMs: 68 },
  { processor: 'Nexopay', approvalProb: 72, feeBps: 212, latencyMs: 71 },
  { processor: 'Cardstream', approvalProb: 38, feeBps: 188, latencyMs: 142, declinedFirst: true },
]

export const routingRationale =
  'Cardstream declined (do-not-honor, 38% predicted). For Chase Visa-debit BIN 414720, Helix predicts 91% approval at 178 bps — the highest expected value across all 8 processors. Smart-retry rerouted in 41ms; no customer impact.'

export const binIntelligence: BinRow[] = [
  { bin: '414720', network: 'Visa', issuer: 'Chase', country: 'US', bestProcessor: 'Helix', approvalProb: 91 },
  { bin: '521000', network: 'Mastercard', issuer: 'Capital One', country: 'US', bestProcessor: 'Paragon', approvalProb: 95 },
  { bin: '378282', network: 'Amex', issuer: 'American Express', country: 'US', bestProcessor: 'Paragon', approvalProb: 93 },
  { bin: '455673', network: 'Visa', issuer: 'Barclays', country: 'UK', bestProcessor: 'Northwind', approvalProb: 90 },
  { bin: '550000', network: 'Mastercard', issuer: 'Itaú', country: 'BR', bestProcessor: 'Cygnus', approvalProb: 83 },
  { bin: '601100', network: 'Discover', issuer: 'Discover', country: 'US', bestProcessor: 'Verda', approvalProb: 92 },
  { bin: '400022', network: 'Visa', issuer: 'Wells Fargo', country: 'US', bestProcessor: 'Helix', approvalProb: 94 },
]

export const decisionLog: DecisionLogRow[] = [
  { id: 'TX-88421', bin: '414720', network: 'Visa', from: 'Cardstream', to: 'Helix', reason: 'Decline → higher approval prob', outcome: 'Approved', tone: 'positive' },
  { id: 'TX-88407', bin: '521000', network: 'Mastercard', to: 'Paragon', reason: 'Cost-optimal at equal approval', outcome: 'Approved', tone: 'positive' },
  { id: 'TX-88390', bin: '550000', network: 'Mastercard', from: 'Cardstream', to: 'Cygnus', reason: 'Latency failover (>120ms)', outcome: 'Approved', tone: 'positive' },
  { id: 'TX-88382', bin: '378282', network: 'Amex', to: 'Paragon', reason: 'Amex affinity routing', outcome: 'Approved', tone: 'positive' },
  { id: 'TX-88375', bin: '455673', network: 'Visa', from: 'Nexopay', to: 'Northwind', reason: 'UK issuer success prediction', outcome: 'Approved', tone: 'positive' },
  { id: 'TX-88361', bin: '550000', network: 'Mastercard', to: 'Cygnus', reason: 'Risk-based (score 71) low-risk path', outcome: 'Declined', tone: 'risk' },
]
