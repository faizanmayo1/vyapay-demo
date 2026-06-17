import { Ban, ShieldCheck, Split } from 'lucide-react'

import type { ChargebackPred, DisputeStat, FlaggedTxn, FraudQueueRow } from '@/types/fraud'

export const flaggedTxn: FlaggedTxn = {
  id: 'TX-90217',
  amount: 2150.0,
  network: 'Amex',
  bin: '371449',
  merchant: 'Atlas Travel',
  country: 'card US · IP BR',
  ip: '189.40.x.x (São Paulo)',
  device: 'new device · no history',
  fraudScore: 88,
  signals: [
    { label: 'Velocity spike', detail: '5 attempts in 2 min across 3 merchants', weight: 28, tone: 'risk' },
    { label: 'Device fingerprint', detail: 'Unrecognized device, emulator markers', weight: 24, tone: 'risk' },
    { label: 'Geo mismatch', detail: 'Card US, IP Brazil — 8,400 km delta', weight: 22, tone: 'warning' },
    { label: 'Ticket anomaly', detail: '$2,150 vs $180 merchant avg (12×)', weight: 14, tone: 'warning' },
  ],
  actions: [
    {
      id: 'stepup',
      label: 'Step-up 3DS',
      detail: 'Challenge the cardholder — clears legit users, shifts liability',
      outcome: '3DS challenge sent → cardholder failed verification → transaction stopped. Legit customers are never blocked; this one never cleared the challenge.',
      icon: ShieldCheck,
      recommended: true,
    },
    {
      id: 'block',
      label: 'Block pre-auth',
      detail: 'Hard-decline before authorization',
      outcome: 'Transaction blocked before authorization. Chargeback prevented before settlement — $2,150 + dispute fee saved.',
      icon: Ban,
    },
    {
      id: 'reroute',
      label: 'Low-risk reroute',
      detail: 'Route via a 3DS-mandatory low-risk lane',
      outcome: 'Rerouted through Verda’s 3DS-mandatory lane under liability shift — risk transferred to issuer if it settles.',
      icon: Split,
    },
  ],
}

export const fraudQueue: FraudQueueRow[] = [
  { id: 'TX-90217', amount: 2150.0, merchant: 'Atlas Travel', score: 88, status: 'risk', statusLabel: 'Held · review' },
  { id: 'TX-90211', amount: 940.0, merchant: 'Lumen Retail', score: 74, status: 'warning', statusLabel: 'Step-up sent' },
  { id: 'TX-90208', amount: 312.5, merchant: 'Verde Market', score: 61, status: 'warning', statusLabel: 'Monitoring' },
  { id: 'TX-90204', amount: 5400.0, merchant: 'Atlas Travel', score: 91, status: 'risk', statusLabel: 'Blocked' },
  { id: 'TX-90199', amount: 49.0, merchant: 'Pixel Games', score: 22, status: 'positive', statusLabel: 'Cleared' },
  { id: 'TX-90195', amount: 128.0, merchant: 'Northstar SaaS', score: 18, status: 'positive', statusLabel: 'Cleared' },
]

export const chargebackPreds: ChargebackPred[] = [
  { id: 'TX-89940', merchant: 'Atlas Travel', amount: 1280.0, cbProbability: 82, reason: 'Friendly fraud pattern · prior dispute', tone: 'risk' },
  { id: 'TX-89902', merchant: 'Lumen Retail', amount: 540.0, cbProbability: 64, reason: 'Mismatch ship/bill address', tone: 'warning' },
  { id: 'TX-89888', merchant: 'Northstar SaaS', amount: 99.0, cbProbability: 58, reason: 'Subscription · recurring complaint risk', tone: 'warning' },
  { id: 'TX-89860', merchant: 'Verde Market', amount: 760.0, cbProbability: 41, reason: 'High refund-history customer', tone: 'info' },
]

export const disputeStats: DisputeStat[] = [
  { label: 'Win rate', value: '71%', sub: 'vs 43% industry avg' },
  { label: 'Auto-evidence', value: '94%', sub: 'packets compiled by AI' },
  { label: 'Open disputes', value: '38', sub: '$48K at stake' },
]
