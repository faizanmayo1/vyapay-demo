import { useNavigate } from 'react-router-dom'
import { Area, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Activity, ArrowRight, Globe2, Server } from 'lucide-react'

import { AIInsightCard } from '@/components/AIInsightCard'
import { ChartTooltip } from '@/components/charts/ChartTooltip'
import { HeaderStat, PageHeader } from '@/components/blueprint/PageHeader'
import { KPICard } from '@/components/blueprint/KPICard'
import { SectionHead } from '@/components/blueprint/SectionHead'
import { StatusBadge } from '@/components/StatusBadge'
import { Button } from '@/components/ui/button'
import { approvalTrend, dashboardInsight, declineMix, geoRows, kpis, recentTxns } from '@/data/dashboard'
import { processors } from '@/data/processors'
import { formatUSDCents } from '@/utils/format'
import { toneBg } from '@/utils/tone'
import { cn } from '@/utils/cn'

export function CommandCenter() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-[1320px] reveal px-4 py-7 lg:px-7">
      <PageHeader
        eyebrow="Overview · live"
        title="Payments Command Center"
        description="Real-time visibility across every processor, gateway and merchant — approval rate, volume, cost and risk on one observable control plane."
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={() => navigate('/routing')}>Routing</Button>
            <Button variant="amber" size="sm" onClick={() => navigate('/optimization')}>Optimize <ArrowRight className="h-4 w-4" /></Button>
          </>
        }
        meta={
          <>
            <HeaderStat value="$2.1M" label="volume today" />
            <HeaderStat value="48.2K" label="transactions" />
            <HeaderStat value="94.2%" label="approval" tone="positive" />
            <HeaderStat value="189 bps" label="blended cost" tone="volt" />
          </>
        }
      />

      <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        {kpis.map((k, i) => (
          <KPICard key={k.label} {...k} delayMs={i * 60} />
        ))}
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <SectionHead title="Approval rate" hint="Today · vs 93% target" icon={Activity} action={<StatusBadge label="▲ 1.6 pts" tone="positive" />} />
            <div className="mt-4 h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={approvalTrend} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                  <defs>
                    <linearGradient id="apprFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#5B5BF6" stopOpacity={0.28} />
                      <stop offset="100%" stopColor="#5B5BF6" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E6E8F2" vertical={false} />
                  <XAxis dataKey="t" tick={{ fontSize: 11, fill: '#767A93', fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[90, 96]} tick={{ fontSize: 11, fill: '#767A93', fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip valueFormatter={(v) => `${v}%`} />} />
                  <ReferenceLine y={93} stroke="#9A98C9" strokeDasharray="4 4" />
                  <Area type="monotone" dataKey="approval" stroke="#5B5BF6" strokeWidth={2.5} fill="url(#apprFill)" name="Approval" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead title="Decline mix" hint="Last hour" />
          <div className="mt-4 space-y-3">
            {declineMix.map((d) => (
              <div key={d.reason}>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-ink-muted">{d.reason}</span>
                  <span className="font-mono tabular font-semibold text-ink">{d.pct}%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-canvas-subtle">
                  <div className={cn('h-full rounded-full', toneBg(d.tone))} style={{ width: `${d.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live feed + processor health */}
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <SectionHead
              title="Live transactions"
              hint="Streaming · all processors"
              icon={Activity}
              action={<Button variant="ghost" size="sm" onClick={() => navigate('/routing')}>Routing <ArrowRight className="h-3.5 w-3.5" /></Button>}
            />
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse">
                <thead>
                  <tr className="border-b border-hairline text-left">
                    {['Txn', 'Amount', 'Network · BIN', 'Merchant', 'Processor', 'Status'].map((h) => (
                      <th key={h} className="pb-2 pr-3 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-ink-subtle">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentTxns.map((t, i) => (
                    <tr key={t.id} className="animate-stream-in border-b border-hairline/60 last:border-0 hover:bg-canvas-subtle/50" style={{ animationDelay: `${i * 50}ms` }}>
                      <td className="py-2.5 pr-3 font-mono text-[11.5px] font-semibold text-ink">{t.id}</td>
                      <td className="py-2.5 pr-3 font-mono text-[11.5px] tabular text-ink">{formatUSDCents(t.amount)}</td>
                      <td className="py-2.5 pr-3"><span className="text-[12px] text-ink-muted">{t.network}</span> <span className="font-mono text-[10.5px] text-ink-subtle">{t.bin}</span></td>
                      <td className="py-2.5 pr-3 text-[12px] text-ink-muted">{t.merchant}</td>
                      <td className="py-2.5 pr-3 font-mono text-[11px] text-ink-muted">{t.processor}</td>
                      <td className="py-2.5"><StatusBadge label={t.statusLabel} tone={t.tone} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <SectionHead title="Processor health" hint="Approval rate" icon={Server} />
            <div className="mt-4 space-y-2.5">
              {processors.slice(0, 6).map((p) => (
                <div key={p.id} className="flex items-center gap-3">
                  <span className="w-20 shrink-0 truncate text-[12px] text-ink-muted">{p.name}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-canvas-subtle">
                    <div className={cn('h-full rounded-full', p.status === 'warning' ? 'bg-signal-warning' : 'bg-volt')} style={{ width: `${p.approvalRate}%` }} />
                  </div>
                  <span className="w-12 shrink-0 text-right font-mono text-[11px] font-semibold tabular text-ink">{p.approvalRate}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <SectionHead title="Geographic performance" hint="By region" icon={Globe2} />
            <div className="mt-3 space-y-2">
              {geoRows.map((g) => (
                <div key={g.region} className="flex items-center justify-between rounded-lg border border-hairline bg-canvas-subtle/40 px-3 py-2">
                  <div>
                    <p className="text-[12.5px] font-medium text-ink">{g.region}</p>
                    <p className="font-mono text-[10.5px] text-ink-subtle">{g.volume}</p>
                  </div>
                  <StatusBadge label={`${g.approval}%`} tone={g.tone} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI insight */}
      <div className="mt-5">
        <AIInsightCard
          eyebrow="AI Insight · anomaly"
          title={dashboardInsight.headline}
          footer={
            <Button variant="amber" size="sm" onClick={() => navigate(dashboardInsight.to)}>
              {dashboardInsight.cta} <ArrowRight className="h-4 w-4" />
            </Button>
          }
        >
          {dashboardInsight.body}
        </AIInsightCard>
      </div>
    </div>
  )
}
