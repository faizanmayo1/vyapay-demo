import type { SignalTone } from '@/types/common'

export interface ProcessorOption {
  id: string
  name: string
  approval: number
  costBps: number
  recommended?: boolean
}

export interface ActiveRule {
  id: string
  priority: number
  name: string
  when: string
  then: string
  hits: string
  enabled: boolean
  tone: SignalTone
}

export interface AbVariant {
  name: string
  strategy: string
  approval: number
  costBps: number
}

export interface AbTest {
  variantA: AbVariant
  variantB: AbVariant
  days: number
  winner: 'A' | 'B'
  recommendation: string
}

export interface MerchantOverride {
  merchant: string
  rule: string
  tone: SignalTone
}
