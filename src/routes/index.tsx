import { Navigate, type RouteObject } from 'react-router-dom'

import { AppShell } from '@/layouts/AppShell'
import { CommandCenter } from '@/pages/CommandCenter'
import { CopilotAudit } from '@/pages/CopilotAudit'
import { CostOptimization } from '@/pages/CostOptimization'
import { FraudDefense } from '@/pages/FraudDefense'
import { MerchantIntelligence } from '@/pages/MerchantIntelligence'
import { PolicyStudio } from '@/pages/PolicyStudio'
import { RoutingIntelligence } from '@/pages/RoutingIntelligence'
import { ROUTES } from '@/routes/paths'

export const routes: RouteObject[] = [
  {
    path: ROUTES.root,
    element: <AppShell />,
    children: [
      { index: true, element: <CommandCenter /> },
      { path: ROUTES.routing.slice(1), element: <RoutingIntelligence /> },
      { path: ROUTES.optimization.slice(1), element: <CostOptimization /> },
      { path: ROUTES.fraud.slice(1), element: <FraudDefense /> },
      { path: ROUTES.merchants.slice(1), element: <MerchantIntelligence /> },
      { path: ROUTES.policy.slice(1), element: <PolicyStudio /> },
      { path: ROUTES.copilot.slice(1), element: <CopilotAudit /> },
      { path: '*', element: <Navigate to={ROUTES.root} replace /> },
    ],
  },
]
