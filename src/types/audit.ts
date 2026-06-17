import type { LucideIcon } from 'lucide-react'

import type { SignalTone } from '@/types/common'

export interface SuggestedPrompt {
  id: string
  label: string
  sub: string
  icon: LucideIcon
  kind: 'audit' | 'report' | 'text'
}

export interface AuditStep {
  ts: string
  label: string
  detail: string
  decision: string
  tone: SignalTone
}

export interface AuditTrail {
  txnId: string
  summary: string
  steps: AuditStep[]
}

export interface ReportMetric {
  label: string
  value: string
  delta: string
  deltaTone: 'positive' | 'negative' | 'neutral'
}

export interface ExecReport {
  period: string
  metrics: ReportMetric[]
  highlights: string[]
}

export interface CannedAnswer {
  match: string
  body: string
  bullets?: string[]
}
