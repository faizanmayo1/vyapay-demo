/**
 * VyaPay route constants. All page links and redirects MUST import from here —
 * never hard-code a route string in a page or component.
 */
export const ROUTES = {
  root: '/',
  routing: '/routing',
  optimization: '/optimization',
  fraud: '/fraud',
  merchants: '/merchants',
  policy: '/policy',
  copilot: '/copilot',
} as const

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]
