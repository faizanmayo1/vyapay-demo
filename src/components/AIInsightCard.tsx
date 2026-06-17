import type { ReactNode } from 'react'
import { Sparkles } from 'lucide-react'

import { cn } from '@/utils/cn'

/**
 * AI insight card — volt-rule crown, a "thinking" aurora wash and the Sparkles
 * mark. Used wherever VyaPay surfaces a model-generated recommendation.
 */
export function AIInsightCard({
  title = 'VyaPay AI',
  eyebrow = 'AI Insight',
  children,
  footer,
  className,
}: {
  title?: string
  eyebrow?: string
  children: ReactNode
  footer?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('relative overflow-hidden rounded-xl border border-amber/30 bg-card shadow-card', className)}>
      <div className="volt-rule" aria-hidden />
      <div className="aurora-wash pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div className="relative p-4">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-amber text-white shadow-volt-glow">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <div>
            <p className="font-mono text-[9.5px] font-medium uppercase tracking-[0.16em] text-volt-deep">{eyebrow}</p>
            <p className="font-display text-[13.5px] font-semibold tracking-tight-bank text-ink">{title}</p>
          </div>
        </div>
        <div className="mt-3 text-[13px] leading-relaxed text-ink-muted">{children}</div>
        {footer && <div className="mt-4 flex flex-wrap items-center gap-2">{footer}</div>}
      </div>
    </div>
  )
}
