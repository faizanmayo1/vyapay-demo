import {
  GitBranch,
  LayoutDashboard,
  type LucideIcon,
  Receipt,
  ShieldAlert,
  Sparkles,
  Store,
  SlidersHorizontal,
} from 'lucide-react'

import { ROUTES, type RoutePath } from './paths'

export type RouteSection = 'Overview' | 'Orchestration' | 'Risk' | 'Merchants' | 'Controls' | 'AI'

export interface RouteEntry {
  path: RoutePath
  label: string
  short: string
  eyebrow: string
  description: string
  icon: LucideIcon
  section: RouteSection
  badge?: { text: string; variant?: 'info' | 'positive' | 'warning' | 'risk' | 'secondary' | 'sky' | 'amber' | 'red' }
  end?: boolean
}

export const routeRegistry: RouteEntry[] = [
  {
    path: ROUTES.root,
    label: 'Payments Command Center',
    short: 'Command Center',
    eyebrow: 'Overview',
    description: 'Live transaction flow, processor health, approval rate and anomaly detection across the payment ecosystem.',
    icon: LayoutDashboard,
    section: 'Overview',
    end: true,
  },
  {
    path: ROUTES.routing,
    label: 'Routing Intelligence',
    short: 'Routing',
    eyebrow: 'Orchestration',
    description: 'AI-driven multi-processor routing — approval-probability, BIN intelligence, smart retry and explainable decisions.',
    icon: GitBranch,
    section: 'Orchestration',
    badge: { text: 'AI', variant: 'amber' },
  },
  {
    path: ROUTES.optimization,
    label: 'Cost & Fee Optimization',
    short: 'Optimization',
    eyebrow: 'Orchestration',
    description: 'Real-time fee comparison and AI margin routing — recommend and apply cost optimizations with approval-impact simulation.',
    icon: Receipt,
    section: 'Orchestration',
    badge: { text: 'AI', variant: 'amber' },
  },
  {
    path: ROUTES.fraud,
    label: 'Fraud & Chargeback Defense',
    short: 'Fraud & CB',
    eyebrow: 'Risk',
    description: 'Real-time fraud scoring, chargeback prediction, pre-auth blocking and automated dispute handling.',
    icon: ShieldAlert,
    section: 'Risk',
    badge: { text: '4', variant: 'warning' },
  },
  {
    path: ROUTES.merchants,
    label: 'Merchant Intelligence',
    short: 'Merchants',
    eyebrow: 'Merchants',
    description: 'Merchant health scoring, decline analytics, revenue-leakage detection and segmentation.',
    icon: Store,
    section: 'Merchants',
  },
  {
    path: ROUTES.policy,
    label: 'Policy & Rules Studio',
    short: 'Policy',
    eyebrow: 'Controls',
    description: 'No-code routing and risk rules, conditional logic and A/B testing of routing strategies.',
    icon: SlidersHorizontal,
    section: 'Controls',
  },
  {
    path: ROUTES.copilot,
    label: 'AI Copilot & Decision Audit',
    short: 'Copilot',
    eyebrow: 'AI',
    description: 'Ask the payments brain in plain language; explainable AI decision logs and full transaction audit trail.',
    icon: Sparkles,
    section: 'AI',
    badge: { text: 'Beta', variant: 'amber' },
  },
]

export const sectionOrder: RouteSection[] = ['Overview', 'Orchestration', 'Risk', 'Merchants', 'Controls', 'AI']

export function findRouteByPath(pathname: string): RouteEntry | undefined {
  return routeRegistry.find((entry) => entry.path === pathname)
}

export function groupRoutesBySection(): Array<{ section: RouteSection; entries: RouteEntry[] }> {
  return sectionOrder.map((section) => ({
    section,
    entries: routeRegistry.filter((entry) => entry.section === section),
  }))
}
