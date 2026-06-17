import type { SignalTone } from '@/types/common'

export interface RouteCandidate {
  processor: string
  approvalProb: number
  feeBps: number
  latencyMs: number
  recommended?: boolean
  declinedFirst?: boolean
}

export interface SampleTxn {
  id: string
  amount: number
  network: string
  bin: string
  issuer: string
  country: string
  merchant: string
  cardType: string
}

export interface BinRow {
  bin: string
  network: string
  issuer: string
  country: string
  bestProcessor: string
  approvalProb: number
}

export interface DecisionLogRow {
  id: string
  bin: string
  network: string
  from?: string
  to: string
  reason: string
  outcome: string
  tone: SignalTone
}
