import type { LucideIcon } from 'lucide-react'

import type { RoutePath } from '@/routes/paths'

export interface AppNotification {
  id: string
  title: string
  detail: string
  time: string
  tone: 'risk' | 'warning' | 'info' | 'positive'
  icon: LucideIcon
  unread: boolean
  to?: RoutePath
}
