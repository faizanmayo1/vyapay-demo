import { Check, Download, FileBarChart } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { ExecReport } from '@/types/audit'
import { cn } from '@/utils/cn'

/** Leadership-grade weekly performance report artifact. */
export function ExecReportCard({ report, onExport }: { report: ExecReport; onExport?: () => void }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-amber/30 bg-card shadow-card-md">
      <div className="volt-rule" aria-hidden />
      <div className="flex items-center gap-2.5 border-b border-hairline px-5 py-3.5">
        <span className="grid h-8 w-8 place-items-center rounded-md bg-amber text-white shadow-volt-glow"><FileBarChart className="h-4 w-4" /></span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[9.5px] font-medium uppercase tracking-[0.16em] text-volt-deep">Executive report</p>
          <p className="font-display text-[14px] font-semibold tracking-tight-bank text-ink">Payments performance · {report.period}</p>
        </div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {report.metrics.map((m) => (
            <div key={m.label} className="rounded-lg border border-hairline bg-canvas-subtle/40 p-3">
              <p className="font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-subtle">{m.label}</p>
              <p className="mt-1 font-display text-[18px] font-bold tabular tracking-tight-bank text-ink">{m.value}</p>
              <p className={cn('font-mono text-[10px] tabular', m.deltaTone === 'positive' ? 'text-signal-positive' : m.deltaTone === 'negative' ? 'text-signal-risk' : 'text-ink-subtle')}>{m.delta}</p>
            </div>
          ))}
        </div>

        <p className="mb-2 mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-subtle">What the AI drove this week</p>
        <ul className="space-y-1.5">
          {report.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-[12.5px] text-ink-muted">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal-positive" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button variant="amber" size="sm" onClick={onExport}><Download className="h-4 w-4" /> Export PDF</Button>
          <Button variant="secondary" size="sm">Schedule weekly</Button>
        </div>
      </div>
    </div>
  )
}
