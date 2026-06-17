import type { SignalTone, TxnStatus } from '@/types/common'

export interface Processor {
  id: string
  name: string
  approvalRate: number
  uptime: number
  avgFeeBps: number
  avgLatencyMs: number
  volumeShare: number
  status: SignalTone
  statusLabel: string
}

export interface Transaction {
  id: string
  amount: number
  network: string
  bin: string
  merchant: string
  processor: string
  status: TxnStatus
  statusLabel: string
  tone: SignalTone
  ts: string
}
