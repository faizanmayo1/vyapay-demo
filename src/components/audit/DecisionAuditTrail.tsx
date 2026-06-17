import { Lock, Sparkles } from 'lucide-react'

import type { AuditTrail } from '@/types/audit'
import { cn } from '@/utils/cn'

const dot: Record<string, string> = {
  positive: 'border-signal-positive bg-signal-positive',
  info: 'border-volt bg-volt',
  warning: 'border-signal-warning bg-signal-warning',
  risk: 'border-signal-risk bg-signal-risk',
  neutral: 'border-signal-neutral bg-signal-neutral',
}

/** Full transaction lifecycle with every AI decision logged — the audit artifact. */
export function DecisionAuditTrail({ trail }: { trail: AuditTrail }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-amber/30 bg-card shadow-card-md">
      <div className="volt-rule" aria-hidden />
      <div className="flex items-center gap-2.5 border-b border-hairline px-5 py-3.5">
        <span className="grid h-8 w-8 place-items-center rounded-md bg-amber text-white shadow-volt-glow"><Sparkles className="h-4 w-4" /></span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[9.5px] font-medium uppercase tracking-[0.16em] text-volt-deep">Decision audit · {trail.txnId}</p>
          <p className="font-display text-[14px] font-semibold tracking-tight-bank text-ink">Full lifecycle · every decision logged</p>
        </div>
      </div>

      <div className="px-5 py-4">
        <p className="mb-4 text-[12.5px] leading-relaxed text-ink-muted">{trail.summary}</p>
        <ol className="space-y-0">
          {trail.steps.map((s, i) => (
            <li key={i} className="relative flex gap-3 pb-4 last:pb-0">
              <div className="flex flex-col items-center">
                <span className={cn('mt-1 h-3 w-3 shrink-0 rounded-full border-2 bg-card', dot[s.tone])} aria-hidden />
                {i < trail.steps.length - 1 && <span className="w-px flex-1 bg-hairline-strong" aria-hidden />}
              </div>
              <div className="min-w-0 flex-1 pb-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                  <p className="text-[12.5px] font-semibold text-ink">{s.label}</p>
                  <span className="font-mono text-[10px] tabular text-ink-faint">{s.ts}</span>
                </div>
                <p className="text-[11.5px] leading-snug text-ink-muted">{s.detail}</p>
                <p className="mt-1 inline-flex items-center gap-1.5 rounded-md bg-amber-soft/50 px-2 py-0.5 font-mono text-[10.5px] text-volt-deep">
                  <Sparkles className="h-2.5 w-2.5" /> {s.decision}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex items-center gap-2 border-t border-hairline bg-canvas-subtle/40 px-5 py-2.5">
        <Lock className="h-3.5 w-3.5 text-ink-subtle" />
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-subtle">Hash-chained · tamper-evident · PCI-aligned audit log</span>
      </div>
    </div>
  )
}
