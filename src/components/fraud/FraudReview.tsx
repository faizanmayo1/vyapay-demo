import { useState } from 'react'
import { Check, Sparkles } from 'lucide-react'

import type { FlaggedTxn, RiskAction } from '@/types/fraud'
import { formatUSDCents } from '@/utils/format'
import { cn } from '@/utils/cn'

/**
 * Pre-authorization risk review — the signature fraud moment. A high-risk txn is
 * caught BEFORE auth: fraud-score gauge + weighted signal breakdown + the AI's
 * recommended action (block / step-up / reroute). Choosing an action resolves it.
 */
export function FraudReview({ txn, onResolve }: { txn: FlaggedTxn; onResolve?: (action: RiskAction) => void }) {
  const [applied, setApplied] = useState<RiskAction | null>(null)
  const recommended = txn.actions.find((a) => a.recommended)

  const choose = (a: RiskAction) => {
    setApplied(a)
    onResolve?.(a)
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-signal-risk/30 bg-card shadow-card-md">
      <div className="h-[3px] bg-signal-risk" aria-hidden />
      <div className="flex items-center gap-2.5 border-b border-hairline px-5 py-3.5">
        <span className="grid h-8 w-8 place-items-center rounded-md bg-signal-risk-soft text-signal-risk">
          <Sparkles className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[9.5px] font-medium uppercase tracking-[0.16em] text-signal-risk">Pre-authorization risk review</p>
          <p className="font-display text-[14px] font-semibold tracking-tight-bank text-ink">{txn.id} · held before auth</p>
        </div>
        <span className="rounded-full bg-signal-risk-soft px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-signal-risk">High risk</span>
      </div>

      <div className="grid gap-5 p-5 lg:grid-cols-[230px_1fr]">
        {/* score + meta */}
        <div className="flex flex-col items-center text-center">
          <ScoreGauge score={txn.fraudScore} />
          <p className="mt-3 font-mono text-[13px] font-semibold tabular text-ink">{formatUSDCents(txn.amount)}</p>
          <p className="font-mono text-[10.5px] text-ink-subtle">{txn.network} · {txn.merchant}</p>
          <div className="mt-3 w-full space-y-1 border-t border-hairline pt-3 text-left">
            <Meta label="Device" value={txn.device} />
            <Meta label="Geo" value={txn.country} />
            <Meta label="IP" value={txn.ip} />
          </div>
        </div>

        {/* signals */}
        <div>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-subtle">Risk signals · contribution to score</p>
          <div className="space-y-2.5">
            {txn.signals.map((s) => (
              <div key={s.label}>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[12.5px] font-medium text-ink">{s.label}</span>
                  <span className={cn('font-mono text-[11px] font-semibold tabular', s.tone === 'risk' ? 'text-signal-risk' : 'text-signal-warning')}>+{s.weight}</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-canvas-subtle">
                  <div className={cn('h-full rounded-full', s.tone === 'risk' ? 'bg-signal-risk' : 'bg-signal-warning')} style={{ width: `${(s.weight / 30) * 100}%` }} />
                </div>
                <p className="mt-0.5 text-[11px] leading-snug text-ink-subtle">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI recommendation + actions */}
      <div className="border-t border-hairline px-5 py-4">
        {applied ? (
          <div className="animate-fade-in rounded-lg border border-signal-positive/25 bg-signal-positive-soft/50 px-4 py-3">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-signal-positive" />
              <p className="font-display text-[13.5px] font-semibold tracking-tight-bank text-ink">Resolved · {applied.label}</p>
            </div>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-muted">{applied.outcome}</p>
            <button type="button" onClick={() => setApplied(null)} className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-subtle hover:text-ink">Review again</button>
          </div>
        ) : (
          <>
            <div className="relative mb-3 overflow-hidden rounded-lg border border-amber/30 bg-amber-soft/30 px-3.5 py-2.5">
              <div className="volt-rule" aria-hidden />
              <p className="flex items-center gap-1.5 text-[12.5px] text-ink-muted">
                <Sparkles className="h-3.5 w-3.5 text-volt" />
                <span className="font-semibold text-volt-deep">Recommend · {recommended?.label}.</span>
                3DS challenges clear genuine cardholders while neutralizing this attack — protects conversion without eating the chargeback.
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              {txn.actions.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => choose(a)}
                  className={cn(
                    'card-lift group rounded-lg border p-3 text-left',
                    a.recommended ? 'border-volt/40 bg-amber-soft/40 hover:shadow-volt-lift' : 'border-hairline bg-card hover:shadow-card-md',
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className={cn('grid h-7 w-7 place-items-center rounded-md', a.recommended ? 'bg-volt text-white' : 'bg-canvas-subtle text-ink-muted')}>
                      <a.icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[12.5px] font-semibold text-ink">{a.label}</span>
                  </div>
                  <p className="mt-1.5 text-[11px] leading-snug text-ink-subtle">{a.detail}</p>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function ScoreGauge({ score }: { score: number }) {
  const r = 34
  const c = 2 * Math.PI * r
  const pct = Math.min(100, Math.max(0, score)) / 100
  return (
    <div className="relative grid h-[104px] w-[104px] place-items-center">
      <svg viewBox="0 0 84 84" className="h-full w-full -rotate-90">
        <circle cx="42" cy="42" r={r} fill="none" stroke="#EDEFF6" strokeWidth="8" />
        <circle cx="42" cy="42" r={r} fill="none" stroke="#DC2626" strokeWidth="8" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct)} />
      </svg>
      <div className="absolute text-center">
        <p className="font-display text-[26px] font-bold tabular leading-none tracking-tight-bank text-signal-risk">{score}</p>
        <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-ink-subtle">fraud score</p>
      </div>
    </div>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-2">
      <span className="font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-subtle">{label}</span>
      <span className="text-right text-[11px] font-medium text-ink">{value}</span>
    </div>
  )
}
