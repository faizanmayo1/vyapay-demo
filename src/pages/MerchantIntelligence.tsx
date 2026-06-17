import { useMemo, useState } from 'react'
import { ArrowRight, Check, GitBranch, Layers, Search, Sparkles, Store } from 'lucide-react'

import { HeaderStat, PageHeader } from '@/components/blueprint/PageHeader'
import { SectionHead } from '@/components/blueprint/SectionHead'
import { StatusBadge } from '@/components/StatusBadge'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { merchants, segmentCounts } from '@/data/merchants'
import { toneBg } from '@/utils/tone'
import { cn } from '@/utils/cn'

export function MerchantIntelligence() {
  const { toast } = useToast()
  const [selectedId, setSelectedId] = useState(merchants[0].id)
  const [appliedFor, setAppliedFor] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const m = useMemo(() => merchants.find((x) => x.id === selectedId) ?? merchants[0], [selectedId])
  const applied = appliedFor === m.id && !!m.rootCause
  const approval = applied && m.rootCause ? m.approval + m.rootCause.recovery : m.approval

  const filtered = merchants.filter(
    (x) => x.name.toLowerCase().includes(query.toLowerCase()) || x.industry.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="mx-auto max-w-[1320px] reveal px-4 py-7 lg:px-7">
      <PageHeader
        eyebrow="Merchants"
        title="Merchant Intelligence"
        description="Operational and financial visibility per merchant — health scoring, decline root-cause analytics, revenue-leakage detection and segmentation across the portfolio."
        meta={
          <>
            <HeaderStat value="50" label="merchants" />
            <HeaderStat value="82" label="avg health" tone="positive" />
            <HeaderStat value="14" label="at / high-risk" tone="warning" />
            <HeaderStat value="$74K/mo" label="recoverable leakage" tone="volt" />
          </>
        }
      />

      <div className="mt-7 grid gap-5 lg:grid-cols-12">
        {/* Merchant list */}
        <aside className="rounded-xl border border-hairline bg-card p-3 shadow-card-sm lg:col-span-4">
          <div className="flex items-center gap-2 rounded-lg border border-hairline bg-canvas-subtle/60 px-2.5 py-2">
            <Search className="h-4 w-4 text-ink-faint" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search merchants…" className="w-full border-0 bg-transparent text-[12.5px] text-ink outline-none placeholder:text-ink-faint" />
          </div>
          <ul className="mt-2 space-y-1">
            {filtered.map((x) => {
              const sel = x.id === selectedId
              return (
                <li key={x.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(x.id)}
                    className={cn('w-full rounded-lg border px-3 py-2.5 text-left transition-colors', sel ? 'border-volt/40 bg-amber-soft/40' : 'border-transparent hover:bg-canvas-subtle')}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[13px] font-semibold text-ink">{x.name}</span>
                      <span className={cn('font-mono text-[12px] font-bold tabular', x.health >= 85 ? 'text-signal-positive' : x.health >= 70 ? 'text-signal-warning' : 'text-signal-risk')}>{x.health}</span>
                    </div>
                    <div className="mt-0.5 flex items-center justify-between gap-2">
                      <span className="truncate font-mono text-[10px] uppercase tracking-[0.06em] text-ink-subtle">{x.industry}</span>
                      <StatusBadge label={x.segment} tone={x.segmentTone} />
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        </aside>

        {/* Merchant detail */}
        <div className="space-y-5 lg:col-span-8">
          {/* header */}
          <div className="relative overflow-hidden rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <div className="hero-aurora pointer-events-none absolute inset-0" aria-hidden />
            <div className="relative flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-steel text-amber-200"><Store className="h-5 w-5" /></span>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-[20px] font-bold tracking-tight-bank text-ink">{m.name}</h2>
                    <StatusBadge label={m.segment} tone={m.segmentTone} />
                  </div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-subtle">{m.industry}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={cn('font-display text-[30px] font-bold tabular leading-none tracking-tight-bank', m.health >= 85 ? 'text-signal-positive' : m.health >= 70 ? 'text-signal-warning' : 'text-signal-risk')}>{m.health}</p>
                <p className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-ink-subtle">health score</p>
              </div>
            </div>

            <div className="relative mt-4 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-hairline pt-4 sm:grid-cols-4">
              <Metric label="Approval" value={`${approval.toFixed(1)}%`} delta={applied ? `▲ ${m.rootCause!.recovery} recovered` : `${m.approvalDelta >= 0 ? '▲' : '▼'} ${Math.abs(m.approvalDelta)}`} tone={applied || m.approvalDelta >= 0 ? 'positive' : 'risk'} />
              <Metric label="Chargeback" value={`${m.chargeback}%`} tone={m.chargeback > 0.9 ? 'risk' : 'positive'} />
              <Metric label="Refund" value={`${m.refund}%`} tone={m.refund > 5 ? 'warning' : 'neutral'} />
              <Metric label="Volume / mo" value={m.volume} tone="neutral" />
            </div>
          </div>

          {/* health components + decline split */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
              <SectionHead title="Health breakdown" hint="Component scores" icon={Layers} />
              <div className="mt-4 space-y-2.5">
                {m.components.map((c) => (
                  <div key={c.label}>
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-ink-muted">{c.label}</span>
                      <span className="font-mono tabular font-semibold text-ink">{c.score}</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-canvas-subtle">
                      <div className={cn('h-full rounded-full', toneBg(c.tone))} style={{ width: `${c.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
              <SectionHead title="Decline analytics" hint="Why this merchant declines" />
              <div className="mt-4 space-y-2.5">
                {m.declineSplit.map((d) => (
                  <div key={d.label}>
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-ink-muted">{d.label}</span>
                      <span className="font-mono tabular font-semibold text-ink">{d.pct}%</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-canvas-subtle">
                      <div className={cn('h-full rounded-full', toneBg(d.tone))} style={{ width: `${d.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI root cause / insight */}
          {m.rootCause ? (
            <div className="relative overflow-hidden rounded-xl border border-amber/30 bg-card shadow-card-md">
              <div className="volt-rule" aria-hidden />
              <div className="aurora-wash pointer-events-none absolute inset-0 opacity-70" aria-hidden />
              <div className="relative p-5">
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-md bg-amber text-white shadow-volt-glow"><Sparkles className="h-3.5 w-3.5" /></span>
                  <p className="font-mono text-[9.5px] font-medium uppercase tracking-[0.16em] text-volt-deep">AI root-cause analysis</p>
                </div>
                <p className="mt-2.5 font-display text-[15px] font-semibold leading-snug tracking-tight-bank text-ink">{m.rootCause.headline}</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">{m.rootCause.body}</p>

                {applied ? (
                  <div className="mt-4 flex items-center gap-2 rounded-lg border border-signal-positive/25 bg-signal-positive-soft/50 px-3 py-2.5">
                    <Check className="h-4 w-4 text-signal-positive" />
                    <p className="text-[12.5px] text-ink-muted">
                      <span className="font-semibold text-signal-positive">Reroute applied.</span> {m.name}’s Visa-debit now flows to {m.rootCause.to} — approval recovered <span className="font-semibold text-signal-positive">+{m.rootCause.recovery} pts</span>, reclaiming {m.rootCause.lostRevenue}.
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 rounded-lg border border-hairline bg-canvas-subtle/50 px-3 py-2 font-mono text-[12px]">
                      <span className="text-ink-faint line-through">{m.rootCause.from}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-volt" />
                      <span className="font-semibold text-volt-deep">{m.rootCause.to}</span>
                    </div>
                    <span className="text-[12px] text-ink-muted">recovers <span className="font-semibold text-signal-positive">+{m.rootCause.recovery} pts</span> · {m.rootCause.lostRevenue}</span>
                    <Button variant="amber" size="sm" className="ml-auto" onClick={() => { setAppliedFor(m.id); toast({ title: 'Routing adjustment applied', description: `${m.name}: Visa-debit ${m.rootCause!.from} → ${m.rootCause!.to}. ${m.rootCause!.lostRevenue} recovered.`, tone: 'success' }) }}>
                      <GitBranch className="h-4 w-4" /> Apply reroute fix
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-xl border border-signal-positive/25 bg-signal-positive-soft/40 px-4 py-3">
              <Check className="h-4 w-4 shrink-0 text-signal-positive" />
              <p className="text-[12.5px] text-ink-muted"><span className="font-semibold text-signal-positive">No action needed. </span>{m.note}</p>
            </div>
          )}
        </div>
      </div>

      {/* Segmentation + benchmarking */}
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead title="Portfolio segmentation" hint="50 merchants" icon={Layers} />
          <div className="mt-4 space-y-3">
            {segmentCounts.map((s) => (
              <div key={s.segment}>
                <div className="flex items-center justify-between text-[12.5px]">
                  <span className="flex items-center gap-2 text-ink-muted"><span className={cn('h-2 w-2 rounded-full', toneBg(s.tone))} />{s.segment}</span>
                  <span className="font-mono tabular font-semibold text-ink">{s.count}</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-canvas-subtle">
                  <div className={cn('h-full rounded-full', toneBg(s.tone))} style={{ width: `${(s.count / 50) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <SectionHead title="Merchant benchmarking" hint="Top accounts · health-ranked" icon={Store} />
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse">
                <thead>
                  <tr className="border-b border-hairline text-left">
                    {['Merchant', 'Health', 'Approval', 'Chargeback', 'Volume', 'Segment'].map((h, i) => (
                      <th key={h} className={cn('pb-2 pr-3 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-ink-subtle', i > 0 && i < 4 && 'text-right')}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...merchants].sort((a, b) => b.health - a.health).map((x) => (
                    <tr key={x.id} className="cursor-pointer border-b border-hairline/60 last:border-0 hover:bg-canvas-subtle/50" onClick={() => setSelectedId(x.id)}>
                      <td className="py-2.5 pr-3 text-[12.5px] font-medium text-ink">{x.name}</td>
                      <td className="py-2.5 pr-3 text-right"><span className={cn('font-mono text-[12px] font-semibold tabular', x.health >= 85 ? 'text-signal-positive' : x.health >= 70 ? 'text-signal-warning' : 'text-signal-risk')}>{x.health}</span></td>
                      <td className="py-2.5 pr-3 text-right font-mono text-[11.5px] tabular text-ink-muted">{x.approval}%</td>
                      <td className="py-2.5 pr-3 text-right font-mono text-[11.5px] tabular text-ink-muted">{x.chargeback}%</td>
                      <td className="py-2.5 pr-3 text-right font-mono text-[11.5px] tabular text-ink-muted">{x.volume}</td>
                      <td className="py-2.5"><StatusBadge label={x.segment} tone={x.segmentTone} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">+ 44 more merchants</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Metric({ label, value, delta, tone }: { label: string; value: string; delta?: string; tone: 'positive' | 'risk' | 'warning' | 'neutral' }) {
  const color = tone === 'positive' ? 'text-signal-positive' : tone === 'risk' ? 'text-signal-risk' : tone === 'warning' ? 'text-signal-warning' : 'text-ink-subtle'
  return (
    <div>
      <p className="font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-subtle">{label}</p>
      <p className="mt-0.5 font-display text-[18px] font-bold tabular tracking-tight-bank text-ink">{value}</p>
      {delta && <p className={cn('font-mono text-[10px] tabular', color)}>{delta}</p>}
    </div>
  )
}
