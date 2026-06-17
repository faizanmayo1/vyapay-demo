import { Activity, BadgePercent, CheckCircle2, CircleDollarSign, RotateCcw, ShieldAlert } from 'lucide-react'

import { ROUTES } from '@/routes/paths'
import type { ApprovalPoint, DashboardInsight, DeclineReason, GeoRow, KpiTile } from '@/types/dashboard'
import type { Transaction } from '@/types/payments'

export const kpis: KpiTile[] = [
  { label: 'Approval rate', value: '94.2%', delta: '▲ 1.6 pts', deltaTone: 'positive', sub: 'wk-over-wk', icon: CheckCircle2, accent: true },
  { label: 'Volume today', value: '$2.1M', delta: '▲ 8.4%', deltaTone: 'positive', sub: '48.2K txns', icon: CircleDollarSign },
  { label: 'Processors live', value: '8', delta: '7 healthy', deltaTone: 'neutral', sub: '1 degraded', icon: Activity },
  { label: 'Chargeback rate', value: '0.41%', delta: '▼ 0.07 pts', deltaTone: 'positive', sub: 'below 0.9% target', icon: ShieldAlert },
  { label: 'Cost / txn', value: '189 bps', delta: '▼ 12 bps', deltaTone: 'positive', sub: 'after AI routing', icon: BadgePercent },
  { label: 'Recovered today', value: '$84K', delta: '▲ 1,920 txns', deltaTone: 'positive', sub: 'via smart retry', icon: RotateCcw },
]

export const approvalTrend: ApprovalPoint[] = [
  { t: '08:00', approval: 92.4, target: 93 },
  { t: '10:00', approval: 93.1, target: 93 },
  { t: '12:00', approval: 92.8, target: 93 },
  { t: '14:00', approval: 91.6, target: 93 },
  { t: '16:00', approval: 93.6, target: 93 },
  { t: '18:00', approval: 94.0, target: 93 },
  { t: '20:00', approval: 94.2, target: 93 },
  { t: 'now', approval: 94.4, target: 93 },
]

export const declineMix: DeclineReason[] = [
  { reason: 'Issuer decline (do-not-honor)', pct: 41, tone: 'warning' },
  { reason: 'Insufficient funds', pct: 23, tone: 'neutral' },
  { reason: 'Fraud / risk block', pct: 16, tone: 'risk' },
  { reason: 'Technical / timeout', pct: 12, tone: 'info' },
  { reason: 'Expired / invalid card', pct: 8, tone: 'neutral' },
]

export const geoRows: GeoRow[] = [
  { region: 'North America', volume: '$1.24M', approval: 94.8, tone: 'positive' },
  { region: 'Europe', volume: '$512K', approval: 93.1, tone: 'positive' },
  { region: 'LATAM', volume: '$208K', approval: 89.4, tone: 'warning' },
  { region: 'APAC', volume: '$141K', approval: 92.0, tone: 'positive' },
]

export const recentTxns: Transaction[] = [
  { id: 'TX-88421', amount: 129.0, network: 'Visa', bin: '414720', merchant: 'Lumen Retail', processor: 'Cardstream→Helix', status: 'rerouted', statusLabel: 'Rerouted ✓', tone: 'info', ts: '20:41:08' },
  { id: 'TX-88420', amount: 42.5, network: 'Mastercard', bin: '521000', merchant: 'Northstar SaaS', processor: 'Helix', status: 'approved', statusLabel: 'Approved', tone: 'positive', ts: '20:41:06' },
  { id: 'TX-88419', amount: 1420.0, network: 'Amex', bin: '378282', merchant: 'Atlas Travel', processor: 'Paragon', status: 'pending', statusLabel: 'Step-up 3DS', tone: 'warning', ts: '20:41:03' },
  { id: 'TX-88418', amount: 18.99, network: 'Visa', bin: '400022', merchant: 'Pixel Games', processor: 'Nexopay', status: 'approved', statusLabel: 'Approved', tone: 'positive', ts: '20:41:01' },
  { id: 'TX-88417', amount: 312.0, network: 'Mastercard', bin: '550000', merchant: 'Verde Market', processor: 'Cygnus', status: 'declined', statusLabel: 'Declined', tone: 'risk', ts: '20:40:58' },
  { id: 'TX-88416', amount: 2150.0, network: 'Amex', bin: '371449', merchant: 'Atlas Travel', processor: 'Verda', status: 'chargeback', statusLabel: 'Fraud blocked', tone: 'risk', ts: '20:40:55' },
  { id: 'TX-88415', amount: 76.4, network: 'Discover', bin: '601100', merchant: 'Lumen Retail', processor: 'Northwind', status: 'approved', statusLabel: 'Approved', tone: 'positive', ts: '20:40:52' },
  { id: 'TX-88414', amount: 540.0, network: 'Visa', bin: '414720', merchant: 'Northstar SaaS', processor: 'Helix', status: 'approved', statusLabel: 'Approved', tone: 'positive', ts: '20:40:49' },
]

export const dashboardInsight: DashboardInsight = {
  headline: 'Cardstream is dragging approval rate — traffic already rerouted',
  body: 'Cardstream approval fell 7.2 pts in the last 15 minutes (latency 142ms, 2.4× baseline). VyaPay auto-rerouted in-flight Visa & Mastercard traffic to Helix and Paragon, holding fleet approval at 94.2%. Recommend keeping Cardstream throttled until latency recovers.',
  cta: 'Open Routing Intelligence',
  to: ROUTES.routing,
}
