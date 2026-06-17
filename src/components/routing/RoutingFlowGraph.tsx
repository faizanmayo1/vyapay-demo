import { Check, CreditCard, Landmark, Sparkles, Store, X } from 'lucide-react'

import type { RouteCandidate, SampleTxn } from '@/types/routing'
import { formatUSDCents } from '@/utils/format'
import { cn } from '@/utils/cn'

/**
 * The signature routing-flow visual — merchant → VyaPay routing engine →
 * candidate processors → issuer. Animated "current" rails carry the live
 * transaction; the chosen processor lights up volt, the declined one is struck.
 */
export function RoutingFlowGraph({
  txn,
  candidates,
  routed,
}: {
  txn: SampleTxn
  candidates: RouteCandidate[]
  routed: boolean
}) {
  const chosen = candidates.find((c) => c.recommended)
  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-[860px] items-stretch gap-0">
        {/* Merchant */}
        <Stage>
          <Node icon={Store} label="Merchant" title={txn.merchant} />
          <div className="mt-2 rounded-lg border border-hairline bg-canvas-subtle/50 px-2.5 py-1.5 text-center">
            <p className="font-mono text-[13px] font-semibold tabular text-ink">{formatUSDCents(txn.amount)}</p>
            <p className="font-mono text-[9.5px] text-ink-subtle">{txn.network} · {txn.cardType}</p>
          </div>
        </Stage>

        <Rail active={routed} />

        {/* Routing engine */}
        <Stage>
          <div className="relative grid h-[52px] w-[52px] place-items-center rounded-xl border-2 border-volt bg-card shadow-volt-glow">
            <Sparkles className="h-5 w-5 text-volt" />
          </div>
          <p className="mt-2 font-mono text-[9.5px] font-semibold uppercase tracking-[0.1em] text-volt-deep">VyaPay engine</p>
          <p className="text-[10.5px] text-ink-faint">routing decision</p>
        </Stage>

        <Rail active={routed} fan />

        {/* Candidate processors */}
        <div className="flex min-w-[300px] flex-1 flex-col justify-center gap-1.5 py-2">
          {candidates.map((c) => {
            const isChosen = !!c.recommended && routed
            const isDeclined = !!c.declinedFirst
            return (
              <div
                key={c.processor}
                className={cn(
                  'flex items-center gap-3 rounded-lg border px-3 py-2 transition-colors',
                  isChosen
                    ? 'border-volt/50 bg-amber-soft/50'
                    : isDeclined
                      ? 'border-signal-risk/30 bg-signal-risk-soft/30'
                      : 'border-hairline bg-card',
                )}
              >
                <span
                  className={cn(
                    'grid h-6 w-6 shrink-0 place-items-center rounded-md',
                    isChosen ? 'bg-volt text-white' : isDeclined ? 'bg-signal-risk text-white' : 'bg-canvas-subtle text-ink-muted',
                  )}
                >
                  {isChosen ? <Check className="h-3.5 w-3.5" /> : isDeclined ? <X className="h-3.5 w-3.5" /> : <CreditCard className="h-3.5 w-3.5" />}
                </span>
                <span className={cn('w-20 shrink-0 text-[12.5px] font-medium', isDeclined && 'text-ink-muted line-through')}>{c.processor}</span>
                {/* approval prob bar */}
                <div className="flex flex-1 items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-canvas-subtle">
                    <div
                      className={cn('h-full rounded-full', isChosen ? 'bg-volt' : isDeclined ? 'bg-signal-risk' : 'bg-steel-300')}
                      style={{ width: `${c.approvalProb}%` }}
                    />
                  </div>
                  <span className={cn('w-9 text-right font-mono text-[11px] font-semibold tabular', isChosen ? 'text-volt-deep' : isDeclined ? 'text-signal-risk' : 'text-ink-muted')}>
                    {c.approvalProb}%
                  </span>
                </div>
                <span className="hidden w-14 shrink-0 text-right font-mono text-[10px] tabular text-ink-subtle sm:inline">{c.feeBps}bps</span>
              </div>
            )
          })}
        </div>

        <Rail active={routed} />

        {/* Issuer / outcome */}
        <Stage>
          <Node icon={Landmark} label="Issuer" title={txn.issuer} />
          <div
            className={cn(
              'mt-2 flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5',
              routed ? 'border-signal-positive/30 bg-signal-positive-soft/60' : 'border-hairline bg-canvas-subtle/50',
            )}
          >
            {routed ? <Check className="h-3.5 w-3.5 text-signal-positive" /> : <span className="h-1.5 w-1.5 rounded-full bg-ink-faint" />}
            <span className={cn('font-mono text-[11px] font-semibold', routed ? 'text-signal-positive' : 'text-ink-subtle')}>
              {routed ? `Approved · ${chosen?.processor}` : 'Awaiting route'}
            </span>
          </div>
        </Stage>
      </div>
    </div>
  )
}

function Stage({ children }: { children: React.ReactNode }) {
  return <div className="flex w-[120px] shrink-0 flex-col items-center justify-center py-2 text-center">{children}</div>
}

function Node({ icon: Icon, label, title }: { icon: React.ComponentType<{ className?: string }>; label: string; title: string }) {
  return (
    <>
      <div className="grid h-[52px] w-[52px] place-items-center rounded-xl border border-hairline bg-card shadow-card-sm">
        <Icon className="h-5 w-5 text-steel" />
      </div>
      <p className="mt-2 font-mono text-[9.5px] font-medium uppercase tracking-[0.1em] text-ink-subtle">{label}</p>
      <p className="text-[11.5px] font-medium text-ink">{title}</p>
    </>
  )
}

function Rail({ active, fan }: { active: boolean; fan?: boolean }) {
  return (
    <div className="flex min-w-[44px] flex-1 items-center px-1" aria-hidden>
      <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-hairline-strong">
        {active && <div className="rail-current absolute inset-0" />}
      </div>
      {fan && <span className="ml-0.5 text-ink-faint">⋮</span>}
    </div>
  )
}
