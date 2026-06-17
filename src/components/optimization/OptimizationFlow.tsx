import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check, Loader2, Sparkles, TrendingDown, Zap } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { OptStep, Recommendation } from '@/types/optimization'
import { formatUSD, formatUSDCompact } from '@/utils/format'
import { cn } from '@/utils/cn'

const STEP_MS = 640
type Phase = 'idle' | 'running' | 'done'

/**
 * The hero flow — AI cost auto-optimization. Streams the analysis, reveals a
 * before/after simulation (cost, approval, monthly spend), then Apply commits
 * the traffic shift and shows the revenue impact.
 */
export function OptimizationFlow({
  steps,
  rec,
  onApply,
  onAbTest,
}: {
  steps: OptStep[]
  rec: Recommendation
  onApply?: () => void
  onAbTest?: () => void
}) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [done, setDone] = useState(0)
  const [applied, setApplied] = useState(false)
  const timers = useRef<number[]>([])

  const run = () => {
    setApplied(false)
    setDone(0)
    setPhase('running')
  }

  useEffect(() => {
    if (phase !== 'running') return
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
    steps.forEach((_, i) => timers.current.push(window.setTimeout(() => setDone(i + 1), STEP_MS * (i + 1))))
    timers.current.push(window.setTimeout(() => setPhase('done'), STEP_MS * (steps.length + 1)))
    return () => {
      timers.current.forEach((t) => window.clearTimeout(t))
      timers.current = []
    }
  }, [phase, steps])

  return (
    <div className="relative overflow-hidden rounded-xl border border-amber/30 bg-card shadow-card-md">
      <div className="volt-rule" aria-hidden />
      {phase === 'running' && <div className="aurora-wash pointer-events-none absolute inset-0 opacity-70" aria-hidden />}

      <div className="relative flex items-center gap-2.5 border-b border-hairline px-5 py-3.5">
        <span className="grid h-8 w-8 place-items-center rounded-md bg-amber text-white shadow-volt-glow">
          {phase === 'done' ? <TrendingDown className="h-4 w-4" /> : <Sparkles className={cn('h-4 w-4', phase === 'running' && 'animate-pulse-soft')} />}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[9.5px] font-medium uppercase tracking-[0.16em] text-volt-deep">AI Cost Optimization</p>
          <p className="font-display text-[14px] font-semibold tracking-tight-bank text-ink">{rec.title}</p>
        </div>
        {phase === 'running' && <span className="font-mono text-[10px] tabular text-ink-subtle">{done}/{steps.length}</span>}
      </div>

      {/* the proposed change */}
      <div className="relative flex flex-wrap items-center gap-3 border-b border-hairline bg-canvas-subtle/40 px-5 py-3">
        <span className="grid h-7 w-7 place-items-center rounded-md bg-steel text-amber-200"><Zap className="h-3.5 w-3.5" /></span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-subtle">{rec.segment}</p>
          <p className="flex items-center gap-2 text-[13px] font-medium text-ink">
            {rec.trafficPct}% of traffic
            <span className="font-mono text-ink-faint">{rec.fromProcessor}</span>
            <ArrowRight className="h-3.5 w-3.5 text-volt" />
            <span className="font-mono font-semibold text-volt-deep">{rec.toProcessor}</span>
          </p>
        </div>
        {phase === 'idle' && (
          <Button variant="amber" size="sm" className="ml-auto" onClick={run}>
            <Sparkles className="h-4 w-4" /> Simulate impact
          </Button>
        )}
      </div>

      {/* running steps */}
      {phase === 'running' && (
        <div className="relative px-5 py-4">
          <ol className="space-y-2.5">
            {steps.map((step, i) => {
              const state = i < done ? 'done' : i === done ? 'running' : 'pending'
              return (
                <li key={step.id} className={cn('flex items-start gap-3 transition-opacity', state === 'pending' ? 'opacity-40' : 'opacity-100')}>
                  <span className={cn('mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border', state === 'done' ? 'border-signal-positive bg-signal-positive text-white' : state === 'running' ? 'border-volt text-volt' : 'border-hairline-strong text-ink-faint')}>
                    {state === 'done' ? <Check className="h-3 w-3" /> : state === 'running' ? <Loader2 className="h-3 w-3 animate-spin" /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[13px] font-medium text-ink">{step.label}</p>
                      <span className="shrink-0 font-mono text-[10px] tabular text-ink-subtle">{step.count}</span>
                    </div>
                    <p className="text-[12px] leading-snug text-ink-subtle">{step.detail}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      )}

      {/* done — before/after */}
      {phase === 'done' && (
        <div className="relative animate-fade-in p-5">
          <div className="grid gap-3 sm:grid-cols-3">
            <Compare label="Cost / txn" beforeText={`${rec.before.costBps} bps`} afterText={`${rec.after.costBps} bps`} before={rec.before.costBps} after={rec.after.costBps} lowerBetter />
            <Compare label="Approval rate" beforeText={`${rec.before.approval}%`} afterText={`${rec.after.approval}%`} before={rec.before.approval} after={rec.after.approval} />
            <Compare label="Monthly cost" beforeText={formatUSDCompact(rec.before.monthlyCost)} afterText={formatUSDCompact(rec.after.monthlyCost)} before={rec.before.monthlyCost} after={rec.after.monthlyCost} lowerBetter />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 rounded-lg border border-signal-positive/25 bg-signal-positive-soft/50 px-4 py-3">
            <TrendingDown className="h-5 w-5 text-signal-positive" />
            <div>
              <p className="font-display text-[18px] font-bold tabular tracking-tight-bank text-ink">
                −{rec.savingsPct}% cost · {formatUSD(rec.savingsMonthly)}/mo saved
              </p>
              <p className="text-[12px] text-ink-muted">
                Approval impact <span className="font-semibold text-signal-positive">+{rec.approvalDelta} pt</span> (no loss) · ≈ {formatUSDCompact(rec.savingsMonthly * 12)}/yr
              </p>
            </div>
          </div>

          {applied ? (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-volt/30 bg-amber-soft/40 px-3 py-2.5">
              <Check className="h-4 w-4 text-volt-deep" />
              <p className="text-[12.5px] text-ink-muted">
                <span className="font-semibold text-volt-deep">Applied.</span> Routing policy updated live — {rec.trafficPct}% of {rec.segment.split(' · ')[0]} now flows to {rec.toProcessor}.
              </p>
            </div>
          ) : (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Button variant="amber" size="sm" onClick={() => { setApplied(true); onApply?.() }}>
                <Check className="h-4 w-4" /> Apply optimization
              </Button>
              <Button variant="secondary" size="sm" onClick={onAbTest}>A/B test first</Button>
              <button type="button" onClick={run} className="ml-auto font-mono text-[10px] uppercase tracking-[0.1em] text-ink-subtle hover:text-ink">Re-run</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function Compare({
  label,
  beforeText,
  afterText,
  before,
  after,
  lowerBetter,
}: {
  label: string
  beforeText: string
  afterText: string
  before: number
  after: number
  lowerBetter?: boolean
}) {
  const max = Math.max(before, after)
  const improved = lowerBetter ? after < before : after > before
  return (
    <div className="rounded-lg border border-hairline bg-canvas-subtle/40 p-3">
      <p className="font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-subtle">{label}</p>
      <div className="mt-2 space-y-1.5">
        <Bar text={beforeText} pct={(before / max) * 100} muted />
        <Bar text={afterText} pct={(after / max) * 100} tone={improved ? 'good' : 'neutral'} />
      </div>
    </div>
  )
}

function Bar({ text, pct, muted, tone }: { text: string; pct: number; muted?: boolean; tone?: 'good' | 'neutral' }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-canvas-subtle">
        <div className={cn('h-full rounded-full', muted ? 'bg-ink-faint' : tone === 'good' ? 'bg-signal-positive' : 'bg-volt')} style={{ width: `${Math.max(8, pct)}%` }} />
      </div>
      <span className={cn('w-16 shrink-0 text-right font-mono text-[11px] font-semibold tabular', muted ? 'text-ink-subtle' : 'text-ink')}>{text}</span>
    </div>
  )
}
