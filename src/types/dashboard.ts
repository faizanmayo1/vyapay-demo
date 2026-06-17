import type { LucideIcon } from 'lucide-react'

import type { RoutePath } from '@/routes/paths'
import type { SignalTone } from '@/types/common'

export interface KpiTile {
  label: string
  value: string
  delta?: string
  deltaTone?: 'positive' | 'negative' | 'neutral'
  sub?: string
  icon: LucideIcon
  accent?: boolean
}

export interface ApprovalPoint {
  t: string
  approval: number
  target: number
}

export interface DeclineReason {
  reason: string
  pct: number
  tone: SignalTone
}

export interface GeoRow {
  region: string
  volume: string
  approval: number
  tone: SignalTone
}

export interface DashboardInsight {
  headline: string
  body: string
  cta: string
  to: RoutePath
}
