import type { Processor } from '@/types/payments'

/** The 8 connected processors. Cardstream is the degraded one (matches the alert). */
export const processors: Processor[] = [
  { id: 'helix', name: 'Helix', approvalRate: 95.8, uptime: 99.99, avgFeeBps: 178, avgLatencyMs: 62, volumeShare: 24, status: 'positive', statusLabel: 'Healthy' },
  { id: 'nexopay', name: 'Nexopay', approvalRate: 94.1, uptime: 99.98, avgFeeBps: 212, avgLatencyMs: 71, volumeShare: 21, status: 'positive', statusLabel: 'Healthy' },
  { id: 'paragon', name: 'Paragon', approvalRate: 95.2, uptime: 99.97, avgFeeBps: 195, avgLatencyMs: 88, volumeShare: 16, status: 'positive', statusLabel: 'Healthy' },
  { id: 'cardstream', name: 'Cardstream', approvalRate: 87.4, uptime: 99.6, avgFeeBps: 188, avgLatencyMs: 142, volumeShare: 14, status: 'warning', statusLabel: 'Degraded' },
  { id: 'northwind', name: 'Northwind', approvalRate: 93.6, uptime: 99.95, avgFeeBps: 224, avgLatencyMs: 79, volumeShare: 9, status: 'positive', statusLabel: 'Healthy' },
  { id: 'cygnus', name: 'Cygnus', approvalRate: 92.8, uptime: 99.94, avgFeeBps: 169, avgLatencyMs: 95, volumeShare: 7, status: 'positive', statusLabel: 'Healthy' },
  { id: 'aperture', name: 'Aperture', approvalRate: 93.1, uptime: 99.93, avgFeeBps: 205, avgLatencyMs: 84, volumeShare: 6, status: 'positive', statusLabel: 'Healthy' },
  { id: 'verda', name: 'Verda', approvalRate: 94.6, uptime: 99.96, avgFeeBps: 156, avgLatencyMs: 68, volumeShare: 3, status: 'positive', statusLabel: 'Healthy' },
]
