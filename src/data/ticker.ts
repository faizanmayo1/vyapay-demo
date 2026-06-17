import type { SignalTone } from '@/types/common'

export interface TickerItem {
  id: string
  amount: number
  network: string
  processor: string
  status: string
  tone: SignalTone
}

/** Lightweight live-transaction feed for the header ticker. */
export const tickerFeed: TickerItem[] = [
  { id: 'TX-8842', amount: 129.0, network: 'Visa', processor: 'Cardstream', status: 'rerouted ✓', tone: 'info' },
  { id: 'TX-8843', amount: 42.5, network: 'Mastercard', processor: 'Helix', status: 'approved', tone: 'positive' },
  { id: 'TX-8844', amount: 1420.0, network: 'Amex', processor: 'Paragon', status: 'step-up', tone: 'warning' },
  { id: 'TX-8845', amount: 18.99, network: 'Visa', processor: 'Nexopay', status: 'approved', tone: 'positive' },
  { id: 'TX-8846', amount: 312.0, network: 'Mastercard', processor: 'Cygnus', status: 'declined', tone: 'risk' },
  { id: 'TX-8847', amount: 76.4, network: 'Discover', processor: 'Northwind', status: 'approved', tone: 'positive' },
  { id: 'TX-8848', amount: 540.0, network: 'Visa', processor: 'Helix', status: 'approved', tone: 'positive' },
  { id: 'TX-8849', amount: 9.99, network: 'Mastercard', processor: 'Aperture', status: 'approved', tone: 'positive' },
  { id: 'TX-8850', amount: 2150.0, network: 'Amex', processor: 'Verda', status: 'fraud-blocked', tone: 'risk' },
  { id: 'TX-8851', amount: 64.0, network: 'Visa', processor: 'Cardstream', status: 'approved', tone: 'positive' },
  { id: 'TX-8852', amount: 233.1, network: 'Mastercard', processor: 'Paragon', status: 'rerouted ✓', tone: 'info' },
  { id: 'TX-8853', amount: 88.0, network: 'Visa', processor: 'Nexopay', status: 'approved', tone: 'positive' },
]
