import { ArrowRight, BadgePercent, Lightbulb, RotateCcw } from 'lucide-react'

import { HeaderStat, PageHeader } from '@/components/blueprint/PageHeader'
import { SectionHead } from '@/components/blueprint/SectionHead'
import { OptimizationFlow } from '@/components/optimization/OptimizationFlow'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { feeComparison, opportunities, optSteps, recommendation, recoveryStats } from '@/data/optimization'
import { toneBg } from '@/utils/tone'
import { cn } from '@/utils/cn'

// Margin score → colour, shared by the score number and its bar so they always agree.
const marginText = (s: number) => (s >= 90 ? 'text-signal-positive' : s >= 80 ? 'text-signal-warning' : 'text-signal-risk')
const marginBar = (s: number) => (s >= 90 ? 'bg-signal-positive' : s >= 80 ? 'bg-signal-warning' : 'bg-signal-risk')

export function CostOptimization() {
  const { toast } = useToast()

  return (
    <div className="mx-auto max-w-[1320px] reveal px-4 py-7 lg:px-7">
      <PageHeader
        eyebrow="Orchestration · cost"
        title="Cost & Fee Optimization"
        description="Cut processing cost while protecting approval rate — real-time fee comparison, AI margin routing and smart recovery, with every recommendation simulated before it ships."
        meta={
          <>
            <HeaderStat value="189 bps" label="blended cost" tone="volt" />
            <HeaderStat value="$42K/mo" label="top opportunity" tone="positive" />
            <HeaderStat value="$84K" label="recovered today" tone="positive" />
            <HeaderStat value="3" label="open opportunities" />
          </>
        }
      />

      <div className="mt-7 grid gap-5 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <OptimizationFlow
            steps={optSteps}
            rec={recommendation}
            onApply={() => toast({ title: 'Optimization applied', description: `${recommendation.trafficPct}% shift live — projected $${(recommendation.savingsMonthly / 1000).toFixed(0)}K/mo saved.`, tone: 'success' })}
            onAbTest={() => toast({ title: 'A/B test scheduled', description: '50/50 split vs current routing — auto-promote on a statistically significant win.', tone: 'info' })}
          />
        </div>

        <div className="space-y-5 lg:col-span-5">
          {/* Recovery */}
          <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <SectionHead title="Smart retry & recovery" hint="Failed-txn recovery" icon={RotateCcw} />
            <div className="mt-4 grid grid-cols-3 gap-2">
              {recoveryStats.map((r) => (
                <div key={r.label} className="rounded-lg border border-hairline bg-canvas-subtle/40 p-3 text-center">
                  <p className="font-display text-[19px] font-bold tabular tracking-tight-bank text-ink">{r.value}</p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.06em] text-ink-subtle">{r.label}</p>
                  <p className="mt-1 text-[10px] leading-tight text-ink-subtle">{r.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Opportunities */}
          <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <SectionHead title="Optimization queue" hint="AI-found opportunities" icon={Lightbulb} />
            <div className="mt-3 space-y-2">
              {opportunities.map((o) => (
                <div key={o.title} className="flex items-start gap-3 rounded-lg border border-hairline bg-canvas-subtle/40 p-3">
                  <span className={cn('mt-1 h-2 w-2 shrink-0 rounded-full', toneBg(o.tone))} aria-hidden />
                  <div className="min-w-0 flex-1">
                    <p className="text-[12.5px] font-semibold text-ink">{o.title}</p>
                    <p className="text-[11.5px] leading-snug text-ink-subtle">{o.detail}</p>
                  </div>
                  <span className="shrink-0 font-mono text-[11px] font-semibold text-signal-positive">{o.savings}</span>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full" onClick={() => toast({ title: 'Optimization queue', description: 'All 3 opportunities can be applied or A/B tested individually.', tone: 'info' })}>
                Review all opportunities <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Fee comparison */}
      <div className="mt-5 rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
        <SectionHead title="Processor fee comparison" hint="Blended cost · margin score" icon={BadgePercent} />
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-hairline text-left">
                {['Processor', 'Avg fee', 'Cost / txn', 'Margin score', ''].map((h, i) => (
                  <th key={h || i} className={cn('pb-2 pr-3 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-ink-subtle', i > 0 && i < 4 && 'text-right')}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {feeComparison.map((f) => (
                <tr key={f.processor} className="border-b border-hairline/60 last:border-0 hover:bg-canvas-subtle/50">
                  <td className="py-2.5 pr-3 text-[12.5px] font-medium text-ink">{f.processor}</td>
                  <td className="py-2.5 pr-3 text-right font-mono text-[11.5px] tabular text-ink-muted">{f.avgFeeBps} bps</td>
                  <td className="py-2.5 pr-3 text-right font-mono text-[11.5px] tabular text-ink">${f.costPerTxn.toFixed(2)}</td>
                  <td className="py-2.5 pr-3 text-right">
                    <span className={cn('font-mono text-[12px] font-semibold tabular', marginText(f.marginScore))}>{f.marginScore}</span>
                  </td>
                  <td className="py-2.5 w-40">
                    <div className="h-1.5 overflow-hidden rounded-full bg-canvas-subtle">
                      <div className={cn('h-full rounded-full', marginBar(f.marginScore))} style={{ width: `${f.marginScore}%` }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
