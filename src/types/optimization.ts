import type { SignalTone } from '@/types/common'

export interface OptStep {
  id: string
  label: string
  detail: string
  count: string
}

export interface OptScenario {
  costBps: number
  approval: number
  monthlyCost: number
}

export interface Recommendation {
  title: string
  segment: string
  fromProcessor: string
  toProcessor: string
  trafficPct: number
  before: OptScenario
  after: OptScenario
  savingsMonthly: number
  savingsPct: number
  approvalDelta: number
}

export interface FeeRow {
  processor: string
  avgFeeBps: number
  costPerTxn: number
  marginScore: number
  tone: SignalTone
}

export interface Opportunity {
  title: string
  detail: string
  savings: string
  tone: SignalTone
}
