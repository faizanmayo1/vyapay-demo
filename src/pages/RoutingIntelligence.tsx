import { useState } from 'react'
import { ArrowRight, Check, Cpu, GitBranch, RotateCcw, Sparkles, X, Zap } from 'lucide-react'

import { HeaderStat, PageHeader } from '@/components/blueprint/PageHeader'
import { SectionHead } from '@/components/blueprint/SectionHead'
import { StatusBadge } from '@/components/StatusBadge'
import { RoutingFlowGraph } from '@/components/routing/RoutingFlowGraph'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { binIntelligence, candidates, decisionLog, routingRationale, sampleTxn } from '@/data/routing'
import { formatUSDCents } from '@/utils/format'
import { cn } from '@/utils/cn'

export function RoutingIntelligence() {
  const { toast } = useToast()
  const [routed, setRouted] = useState(false)
  const chosen = candidates.find((c) => c.recommended)!
  const declined = candidates.find((c) => c.declinedFirst)!

  return (
    <div className="mx-auto max-w-[1320px] reveal px-4 py-7 lg:px-7">
      <PageHeader
        eyebrow="Orchestration"
        title="Routing Intelligence"
        description="Sub-100ms AI routing across 8 processors — approval-probability and cost-aware decisions, BIN-level issuer intelligence and smart retry with cascading failover."
        meta={
          <>
            <HeaderStat value="42 ms" label="avg decision" tone="volt" />
            <HeaderStat value="+6.8 pts" label="reroute uplift" tone="positive" />
            <HeaderStat value="8" label="processors" />
            <HeaderStat value="94.4%" label="blended approval" tone="positive" />
          </>
        }
      />

      {/* Live routing flow */}
      <div className="mt-7 rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
        <SectionHead
          title={`Smart route · ${sampleTxn.id}`}
          hint={`${sampleTxn.merchant} · ${formatUSDCents(sampleTxn.amount)} · ${sampleTxn.issuer} ${sampleTxn.cardType}`}
          icon={GitBranch}
          action={
            routed ? (
              <Button variant="secondary" size="sm" onClick={() => setRouted(false)}><RotateCcw className="h-3.5 w-3.5" /> Reset</Button>
            ) : (
              <Button variant="amber" size="sm" onClick={() => { setRouted(true); toast({ title: 'Rerouted & approved', description: `${declined.processor} declined → ${chosen.processor} approved in 41ms.`, tone: 'success' }) }}>
                <Zap className="h-4 w-4" /> Run smart route
              </Button>
            )
          }
        />

        {/* status banner */}
        <div className={cn('mt-4 flex flex-wrap items-center gap-3 rounded-lg border px-4 py-2.5', routed ? 'border-signal-positive/30 bg-signal-positive-soft/50' : 'border-signal-risk/30 bg-signal-risk-soft/40')}>
          {routed ? (
            <>
              <Check className="h-4 w-4 text-signal-positive" />
              <p className="text-[12.5px] text-ink-muted"><span className="font-semibold text-signal-positive">Approved.</span> {declined.processor} declined ({declined.approvalProb}% predicted) → rerouted to {chosen.processor} ({chosen.approvalProb}%) — recovered, no customer impact.</p>
            </>
          ) : (
            <>
              <X className="h-4 w-4 text-signal-risk" />
              <p className="text-[12.5px] text-ink-muted"><span className="font-semibold text-signal-risk">{declined.processor} declined</span> (do-not-honor · {declined.approvalProb}% predicted). VyaPay is ready to reroute to a higher-approval processor.</p>
            </>
          )}
        </div>

        <div className="mt-5">
          <RoutingFlowGraph txn={sampleTxn} candidates={candidates} routed={routed} />
        </div>

        {/* explainable decision */}
        {routed && (
          <div className="mt-5 grid animate-fade-in gap-4 lg:grid-cols-[1.6fr_1fr]">
            <div className="relative overflow-hidden rounded-xl border border-amber/30 bg-card p-4 shadow-card-sm">
              <div className="volt-rule" aria-hidden />
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-md bg-amber text-white shadow-volt-glow"><Sparkles className="h-3.5 w-3.5" /></span>
                <p className="font-mono text-[9.5px] font-medium uppercase tracking-[0.16em] text-volt-deep">Explainable routing decision</p>
              </div>
              <p className="mt-2.5 text-[13px] leading-relaxed text-ink-muted">{routingRationale}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-hairline bg-canvas-subtle/40 p-3 text-center">
                <p className="font-display text-[24px] font-bold tabular tracking-tight-bank text-signal-positive">+6.8</p>
                <p className="font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-subtle">conversion pts</p>
              </div>
              <div className="rounded-xl border border-hairline bg-canvas-subtle/40 p-3 text-center">
                <p className="font-display text-[24px] font-bold tabular tracking-tight-bank text-volt-deep">41ms</p>
                <p className="font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-subtle">reroute time</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* BIN intelligence + decision log */}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead title="BIN intelligence" hint="Issuer-specific best route" icon={Cpu} />
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse">
              <thead>
                <tr className="border-b border-hairline text-left">
                  {['BIN', 'Issuer', 'Best route', 'Appr.'].map((h, i) => (
                    <th key={h} className={cn('pb-2 pr-3 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-ink-subtle', i === 3 && 'text-right')}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {binIntelligence.map((b) => (
                  <tr key={b.bin} className="border-b border-hairline/60 last:border-0 hover:bg-canvas-subtle/50">
                    <td className="py-2.5 pr-3"><span className="font-mono text-[11.5px] text-ink">{b.bin}</span> <span className="font-mono text-[10px] text-ink-subtle">{b.network}</span></td>
                    <td className="py-2.5 pr-3 text-[12px] text-ink-muted">{b.issuer} <span className="text-ink-faint">· {b.country}</span></td>
                    <td className="py-2.5 pr-3"><span className="rounded-md bg-amber-soft px-2 py-0.5 font-mono text-[11px] font-medium text-volt-deep">{b.bestProcessor}</span></td>
                    <td className="py-2.5 text-right font-mono text-[11.5px] font-semibold tabular text-signal-positive">{b.approvalProb}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead title="Routing decision log" hint="Last decisions · explainable" icon={GitBranch} />
          <div className="mt-3 space-y-2">
            {decisionLog.map((d) => (
              <div key={d.id} className="flex items-center gap-3 rounded-lg border border-hairline bg-canvas-subtle/40 px-3 py-2">
                <span className="font-mono text-[11px] font-semibold text-ink">{d.id}</span>
                <span className="flex items-center gap-1 font-mono text-[10.5px] text-ink-muted">
                  {d.from && <><span className="text-ink-faint line-through">{d.from}</span><ArrowRight className="h-3 w-3 text-volt" /></>}
                  <span className="font-medium text-volt-deep">{d.to}</span>
                </span>
                <span className="min-w-0 flex-1 truncate text-[11.5px] text-ink-subtle">{d.reason}</span>
                <StatusBadge label={d.outcome} tone={d.tone} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
