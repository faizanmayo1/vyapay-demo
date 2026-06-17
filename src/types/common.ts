/** Shared primitives across VyaPay domains. */

export type SignalTone = 'positive' | 'info' | 'warning' | 'risk' | 'neutral'

/** Transaction lifecycle states. */
export type TxnStatus = 'approved' | 'declined' | 'rerouted' | 'pending' | 'refunded' | 'chargeback'

/** Card networks / rails. */
export type Network = 'Visa' | 'Mastercard' | 'Amex' | 'Discover'

export interface TrendPoint {
  label: string
  value: number
}
