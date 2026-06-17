import { GitBranch, Receipt, ShieldAlert, Store, TrendingUp } from 'lucide-react'

import { ROUTES } from '@/routes/paths'
import type { AppNotification } from '@/types/notifications'

export const notifications: AppNotification[] = [
  {
    id: 'ntf-1',
    title: 'Cardstream decline spike',
    detail: 'Approval rate on Cardstream dropped 7.2 pts in 15 min — traffic auto-rerouted to Helix & Paragon.',
    time: '3 min ago',
    tone: 'risk',
    icon: GitBranch,
    unread: true,
    to: ROUTES.routing,
  },
  {
    id: 'ntf-2',
    title: 'Optimization ready: −18% cost',
    detail: 'Shifting 30% of Visa-debit traffic Nexopay→Helix saves ~$42K/mo with no approval loss.',
    time: '21 min ago',
    tone: 'info',
    icon: Receipt,
    unread: true,
    to: ROUTES.optimization,
  },
  {
    id: 'ntf-3',
    title: '4 high-risk transactions held',
    detail: 'Velocity + geo-mismatch pattern flagged on merchant Lumen Retail — pre-auth step-up applied.',
    time: '38 min ago',
    tone: 'warning',
    icon: ShieldAlert,
    unread: true,
    to: ROUTES.fraud,
  },
  {
    id: 'ntf-4',
    title: 'Merchant health alert',
    detail: 'Northstar SaaS chargeback ratio crossed 0.9% — segment moved to at-risk.',
    time: '1 hr ago',
    tone: 'warning',
    icon: Store,
    unread: false,
    to: ROUTES.merchants,
  },
  {
    id: 'ntf-5',
    title: 'Approval rate at 94.2%',
    detail: 'Fleet approval rate up 1.6 pts week-over-week after the latest routing model refresh.',
    time: '2 hr ago',
    tone: 'positive',
    icon: TrendingUp,
    unread: false,
    to: ROUTES.root,
  },
]
