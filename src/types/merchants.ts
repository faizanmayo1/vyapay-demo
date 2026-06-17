import type { SignalTone } from '@/types/common'

export type Segment = 'Growth' | 'Stable' | 'At-risk' | 'High-risk'

export interface HealthComponent {
  label: string
  score: number
  tone: SignalTone
}

export interface DeclineSplit {
  label: string
  pct: number
  tone: SignalTone
}

export interface RootCause {
  headline: string
  body: string
  from: string
  to: string
  recovery: number
  lostRevenue: string
}

export interface Merchant {
  id: string
  name: string
  industry: string
  segment: Segment
  segmentTone: SignalTone
  health: number
  approval: number
  approvalDelta: number
  chargeback: number
  refund: number
  volume: string
  components: HealthComponent[]
  declineSplit: DeclineSplit[]
  rootCause?: RootCause
  note: string
}

export interface SegmentCount {
  segment: Segment
  count: number
  tone: SignalTone
}
