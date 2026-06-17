import { FileCheck2, Gavel, ShieldAlert, Siren } from 'lucide-react'

import { HeaderStat, PageHeader } from '@/components/blueprint/PageHeader'
import { SectionHead } from '@/components/blueprint/SectionHead'
import { StatusBadge } from '@/components/StatusBadge'
import { FraudReview } from '@/components/fraud/FraudReview'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { chargebackPreds, disputeStats, flaggedTxn, fraudQueue } from '@/data/fraud'
import { formatUSDCents } from '@/utils/format'
import { cn } from '@/utils/cn'

export function FraudDefense() {
  const { toast } = useToast()

  return (
    <div className="mx-auto max-w-[1320px] reveal px-4 py-7 lg:px-7">
      <PageHeader
        eyebrow="Risk"
        title="Fraud & Chargeback Defense"
        description="Stop fraud and chargebacks before settlement — real-time scoring, behavioral anomaly detection, pre-auth blocking and AI-automated dispute handling."
        meta={
          <>
            <HeaderStat value="$312K" label="fraud blocked today" tone="positive" />
            <HeaderStat value="0.41%" label="chargeback rate" tone="positive" />
            <HeaderStat value="96.4%" label="pre-auth catch rate" tone="volt" />
            <HeaderStat value="71%" label="dispute win rate" tone="positive" />
          </>
        }
      />

      <div className="mt-7 grid gap-5 lg:grid-cols-12">
        {/* Hero pre-auth review */}
        <div className="lg:col-span-7">
          <FraudReview
            txn={flaggedTxn}
            onResolve={(a) => toast({ title: `${a.label} applied · ${flaggedTxn.id}`, description: a.id === 'block' ? 'Chargeback prevented before settlement.' : a.id === 'stepup' ? '3DS challenge issued — liability shifted to issuer.' : 'Rerouted via low-risk 3DS lane.', tone: a.id === 'block' ? 'warning' : 'success' })}
          />
        </div>

        {/* Chargeback prediction watchlist */}
        <div className="lg:col-span-5">
          <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <SectionHead title="Chargeback prediction" hint="Pre-settlement early warning" icon={Siren} />
            <div className="mt-3 space-y-2">
              {chargebackPreds.map((c) => (
                <div key={c.id} className="flex items-center gap-3 rounded-lg border border-hairline bg-canvas-subtle/40 p-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11.5px] font-semibold text-ink">{c.id}</span>
                      <span className="text-[11.5px] text-ink-muted">{c.merchant}</span>
                      <span className="ml-auto font-mono text-[11px] tabular text-ink">{formatUSDCents(c.amount)}</span>
                    </div>
                    <p className="mt-0.5 truncate text-[11px] text-ink-subtle">{c.reason}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-canvas-subtle">
                        <div className={cn('h-full rounded-full', c.cbProbability >= 70 ? 'bg-signal-risk' : c.cbProbability >= 50 ? 'bg-signal-warning' : 'bg-signal-info')} style={{ width: `${c.cbProbability}%` }} />
                      </div>
                      <span className={cn('w-9 text-right font-mono text-[11px] font-semibold tabular', c.cbProbability >= 70 ? 'text-signal-risk' : c.cbProbability >= 50 ? 'text-signal-warning' : 'text-signal-info')}>{c.cbProbability}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="secondary" size="sm" className="mt-3 w-full" onClick={() => toast({ title: 'Preventative actions queued', description: 'AI drafted outreach + evidence holds for the 2 highest-risk transactions.', tone: 'info' })}>
              Take preventative action
            </Button>
          </div>
        </div>
      </div>

      {/* Fraud queue + dispute automation */}
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <SectionHead title="Live fraud review queue" hint="Real-time scoring · all merchants" icon={ShieldAlert} />
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse">
                <thead>
                  <tr className="border-b border-hairline text-left">
                    {['Txn', 'Amount', 'Merchant', 'Fraud score', 'Status'].map((h, i) => (
                      <th key={h} className={cn('pb-2 pr-3 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-ink-subtle', i === 3 && 'text-right')}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fraudQueue.map((r) => (
                    <tr key={r.id} className="border-b border-hairline/60 last:border-0 hover:bg-canvas-subtle/50">
                      <td className="py-2.5 pr-3 font-mono text-[11.5px] font-semibold text-ink">{r.id}</td>
                      <td className="py-2.5 pr-3 font-mono text-[11.5px] tabular text-ink">{formatUSDCents(r.amount)}</td>
                      <td className="py-2.5 pr-3 text-[12px] text-ink-muted">{r.merchant}</td>
                      <td className="py-2.5 pr-3 text-right">
                        <span className={cn('font-mono text-[12px] font-semibold tabular', r.score >= 80 ? 'text-signal-risk' : r.score >= 50 ? 'text-signal-warning' : 'text-signal-positive')}>{r.score}</span>
                      </td>
                      <td className="py-2.5"><StatusBadge label={r.statusLabel} tone={r.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <SectionHead title="Dispute automation" hint="Evidence + win-rate" icon={Gavel} />
            <div className="mt-4 space-y-3">
              {disputeStats.map((d) => (
                <div key={d.label} className="rounded-lg border border-hairline bg-canvas-subtle/40 p-3">
                  <div className="flex items-baseline justify-between">
                    <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-subtle">{d.label}</p>
                    <p className="font-display text-[18px] font-bold tabular tracking-tight-bank text-ink">{d.value}</p>
                  </div>
                  <p className="mt-0.5 text-[11px] text-ink-subtle">{d.sub}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-amber/30 bg-amber-soft/30 px-3 py-2.5">
              <FileCheck2 className="h-4 w-4 text-volt" />
              <p className="text-[11.5px] text-ink-muted">AI auto-compiles dispute evidence packets on flagged transactions before the issuer deadline.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
