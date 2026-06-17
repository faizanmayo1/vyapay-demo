import { useMemo, useState } from 'react'
import { Beaker, Check, FlaskConical, Plus, SlidersHorizontal, Store, Trophy } from 'lucide-react'

import { HeaderStat, PageHeader } from '@/components/blueprint/PageHeader'
import { SectionHead } from '@/components/blueprint/SectionHead'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { abTest, activeRules, baseline, merchantOverrides, processorOptions } from '@/data/policy'
import { cn } from '@/utils/cn'

export function PolicyStudio() {
  const { toast } = useToast()
  const [target, setTarget] = useState('helix')
  const [fallback, setFallback] = useState(true)
  const [rules, setRules] = useState(activeRules)

  const sel = useMemo(() => processorOptions.find((p) => p.id === target) ?? processorOptions[0], [target])
  const afterApproval = +(sel.approval + (fallback ? 0.6 : 0)).toFixed(1)
  const apprDelta = +(afterApproval - baseline.approval).toFixed(1)
  const costDelta = sel.costBps - baseline.costBps

  const toggle = (id: string) => setRules((rs) => rs.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)))

  return (
    <div className="mx-auto max-w-[1320px] reveal px-4 py-7 lg:px-7">
      <PageHeader
        eyebrow="Controls"
        title="Policy & Rules Studio"
        description="Define routing and risk policy without engineering — a no-code rule builder with conditional logic, merchant overrides and live A/B testing of strategies."
        meta={
          <>
            <HeaderStat value="24" label="active rules" />
            <HeaderStat value="3" label="A/B tests running" tone="volt" />
            <HeaderStat value="+2.1 pts" label="approval from rules" tone="positive" />
            <HeaderStat value="$96K/mo" label="cost saved by policy" tone="positive" />
          </>
        }
      />

      <div className="mt-7 grid gap-5 lg:grid-cols-12">
        {/* Rule builder */}
        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-xl border border-amber/30 bg-card shadow-card-md">
            <div className="volt-rule" aria-hidden />
            <div className="flex items-center gap-2.5 border-b border-hairline px-5 py-3.5">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-amber text-white shadow-volt-glow"><SlidersHorizontal className="h-4 w-4" /></span>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[9.5px] font-medium uppercase tracking-[0.16em] text-volt-deep">No-code routing rule</p>
                <p className="font-display text-[14px] font-semibold tracking-tight-bank text-ink">Adjust the rule — impact updates live</p>
              </div>
            </div>

            <div className="p-5">
              {/* WHEN */}
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-subtle">When</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {['Network = Visa', 'Card type = debit', 'Issuer region = US'].map((c) => (
                  <span key={c} className="rounded-lg border border-hairline bg-canvas-subtle/60 px-2.5 py-1.5 font-mono text-[11.5px] text-ink">{c}</span>
                ))}
                <button type="button" className="inline-flex items-center gap-1 rounded-lg border border-dashed border-hairline-strong px-2.5 py-1.5 font-mono text-[11px] text-ink-subtle hover:border-volt/40 hover:text-volt-deep">
                  <Plus className="h-3 w-3" /> condition
                </button>
              </div>

              {/* THEN */}
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-subtle">Then route to</p>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {processorOptions.map((p) => {
                  const active = p.id === target
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setTarget(p.id)}
                      className={cn('rounded-lg border px-3 py-2 text-left transition-colors', active ? 'border-volt/50 bg-amber-soft/50' : 'border-hairline bg-card hover:bg-canvas-subtle')}
                    >
                      <div className="flex items-center justify-between">
                        <span className={cn('text-[12.5px] font-semibold', active ? 'text-volt-deep' : 'text-ink')}>{p.name}</span>
                        {p.recommended && <span className="font-mono text-[8px] uppercase tracking-[0.08em] text-volt-deep">rec</span>}
                      </div>
                      <span className="font-mono text-[10px] tabular text-ink-subtle">{p.approval}% · {p.costBps}bps</span>
                    </button>
                  )
                })}
              </div>

              {/* fallback toggle */}
              <button type="button" onClick={() => setFallback((v) => !v)} className="mt-3 flex w-full items-center gap-3 rounded-lg border border-hairline bg-canvas-subtle/40 px-3 py-2.5 text-left">
                <span className={cn('relative h-5 w-9 shrink-0 rounded-full transition-colors', fallback ? 'bg-volt' : 'bg-hairline-strong')}>
                  <span className={cn('absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-all', fallback ? 'left-[18px]' : 'left-0.5')} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[12.5px] font-medium text-ink">Smart-retry fallback</span>
                  <span className="block text-[11px] text-ink-subtle">Retry soft declines on the next-best processor (+0.6 pts approval)</span>
                </span>
              </button>

              {/* live impact preview */}
              <div className="mt-4 rounded-lg border border-hairline bg-canvas-subtle/40 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-subtle">Projected impact · {baseline.volume}</p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <ImpactStat label="Approval rate" before={`${baseline.approval}%`} after={`${afterApproval}%`} delta={`${apprDelta >= 0 ? '▲' : '▼'} ${Math.abs(apprDelta)} pts`} good={apprDelta >= 0} />
                  <ImpactStat label="Cost / txn" before={`${baseline.costBps} bps`} after={`${sel.costBps} bps`} delta={`${costDelta <= 0 ? '▼' : '▲'} ${Math.abs(costDelta)} bps`} good={costDelta <= 0} />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Button variant="amber" size="sm" onClick={() => toast({ title: 'Rule published live', description: `Visa-debit US → ${sel.name}${fallback ? ' (smart-retry on)' : ''}. Projected approval ${afterApproval}%.`, tone: 'success' })}>
                  <Check className="h-4 w-4" /> Publish rule
                </Button>
                <Button variant="secondary" size="sm" onClick={() => toast({ title: 'A/B test created', description: `New rule vs current routing · 50/50 split.`, tone: 'info' })}>
                  <Beaker className="h-4 w-4" /> Test before publish
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* A/B test */}
        <div className="lg:col-span-5">
          <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <SectionHead title="A/B test · routing strategy" hint={`Running ${abTest.days} days`} icon={FlaskConical} />
            <div className="mt-4 space-y-3">
              {[abTest.variantA, abTest.variantB].map((v, i) => {
                const isWinner = (i === 0 ? 'A' : 'B') === abTest.winner
                return (
                  <div key={v.name} className={cn('rounded-lg border p-3', isWinner ? 'border-signal-positive/40 bg-signal-positive-soft/30' : 'border-hairline bg-canvas-subtle/40')}>
                    <div className="flex items-center justify-between">
                      <p className="text-[12.5px] font-semibold text-ink">{v.name}</p>
                      {isWinner && <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-signal-positive"><Trophy className="h-3 w-3" /> winning</span>}
                    </div>
                    <p className="font-mono text-[10.5px] text-ink-subtle">{v.strategy}</p>
                    <div className="mt-2 flex gap-4">
                      <span className="font-mono text-[11.5px] tabular text-ink"><span className="text-ink-subtle">appr</span> {v.approval}%</span>
                      <span className="font-mono text-[11.5px] tabular text-ink"><span className="text-ink-subtle">cost</span> {v.costBps}bps</span>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-3 rounded-lg border border-amber/30 bg-amber-soft/30 px-3 py-2.5">
              <p className="text-[12px] leading-relaxed text-ink-muted">{abTest.recommendation}</p>
            </div>
            <Button variant="amber" size="sm" className="mt-3 w-full" onClick={() => toast({ title: 'Variant B promoted', description: 'Approval-priority routing is now live for 100% of traffic.', tone: 'success' })}>
              <Trophy className="h-4 w-4" /> Promote winner
            </Button>
          </div>
        </div>
      </div>

      {/* Active rules + overrides */}
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <SectionHead title="Active rules" hint="Priority order · evaluated top-down" icon={SlidersHorizontal} />
            <div className="mt-3 space-y-2">
              {rules.map((r) => (
                <div key={r.id} className="flex items-center gap-3 rounded-lg border border-hairline bg-canvas-subtle/40 px-3 py-2.5">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-steel font-mono text-[10px] font-semibold text-white">{r.priority}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[12.5px] font-semibold text-ink">{r.name}</span>
                      <span className="font-mono text-[10px] text-ink-faint">{r.id}</span>
                    </div>
                    <p className="truncate font-mono text-[10.5px] text-ink-subtle">
                      <span className="text-ink-muted">when</span> {r.when} <span className="text-ink-muted">→</span> {r.then}
                    </p>
                  </div>
                  <span className="hidden shrink-0 font-mono text-[10px] tabular text-ink-faint sm:inline">{r.hits} hits</span>
                  <button type="button" onClick={() => toggle(r.id)} className={cn('relative h-5 w-9 shrink-0 rounded-full transition-colors', r.enabled ? 'bg-volt' : 'bg-hairline-strong')} aria-label="Toggle rule">
                    <span className={cn('absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-all', r.enabled ? 'left-[18px]' : 'left-0.5')} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <SectionHead title="Merchant overrides" hint="Per-account policy" icon={Store} />
            <div className="mt-3 space-y-2">
              {merchantOverrides.map((o) => (
                <div key={o.merchant} className="rounded-lg border border-hairline bg-canvas-subtle/40 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[12.5px] font-semibold text-ink">{o.merchant}</p>
                    <span className={cn('h-2 w-2 rounded-full', o.tone === 'risk' ? 'bg-signal-risk' : o.tone === 'positive' ? 'bg-signal-positive' : 'bg-signal-info')} aria-hidden />
                  </div>
                  <p className="mt-0.5 text-[11.5px] leading-snug text-ink-subtle">{o.rule}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ImpactStat({ label, before, after, delta, good }: { label: string; before: string; after: string; delta: string; good: boolean }) {
  return (
    <div className="rounded-lg border border-hairline bg-card p-3">
      <p className="font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-subtle">{label}</p>
      <p className="mt-1 flex items-baseline gap-1.5">
        <span className="font-mono text-[11px] tabular text-ink-faint line-through">{before}</span>
        <span className="font-display text-[18px] font-bold tabular tracking-tight-bank text-ink">{after}</span>
      </p>
      <p className={cn('font-mono text-[11px] font-semibold tabular', good ? 'text-signal-positive' : 'text-signal-risk')}>{delta}</p>
    </div>
  )
}
