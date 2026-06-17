import type { LucideIcon } from 'lucide-react'

import type { SignalTone } from '@/types/common'

export interface FraudSignal {
  label: string
  detail: string
  weight: number
  tone: SignalTone
}

export interface RiskAction {
  id: string
  label: string
  detail: string
  outcome: string
  icon: LucideIcon
  recommended?: boolean
}

export interface FlaggedTxn {
  id: string
  amount: number
  network: string
  bin: string
  merchant: string
  country: string
  ip: string
  device: string
  fraudScore: number
  signals: FraudSignal[]
  actions: RiskAction[]
}

export interface FraudQueueRow {
  id: string
  amount: number
  merchant: string
  score: number
  status: SignalTone
  statusLabel: string
}

export interface ChargebackPred {
  id: string
  merchant: string
  amount: number
  cbProbability: number
  reason: string
  tone: SignalTone
}

export interface DisputeStat {
  label: string
  value: string
  sub: string
}
