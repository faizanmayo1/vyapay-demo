import { tickerFeed } from '@/data/ticker'
import { formatUSDCents } from '@/utils/format'
import { toneBg } from '@/utils/tone'
import { cn } from '@/utils/cn'

/**
 * Header live-transaction ticker — a seamless marquee of the live feed. The
 * signature "always-on payments" motif. The list is duplicated and each item
 * carries its own right padding (no flex gap) so one copy tiles to an exact
 * period and the -50% loop has no seam.
 */
export function TxnTicker() {
  const items = [...tickerFeed, ...tickerFeed]
  return (
    <div className="ticker-mask relative hidden min-w-0 flex-1 overflow-hidden md:block">
      <div className="flex w-max animate-ticker items-center">
        {items.map((t, i) => (
          <span key={`${t.id}-${i}`} className="flex shrink-0 items-center gap-2 whitespace-nowrap pr-5">
            <span className={cn('h-1.5 w-1.5 rounded-full', toneBg(t.tone))} aria-hidden />
            <span className="font-mono text-[11px] tabular text-ink-subtle">{t.id}</span>
            <span className="font-mono text-[11px] font-semibold tabular text-ink">{formatUSDCents(t.amount)}</span>
            <span className="text-[10.5px] text-ink-faint">{t.network}·{t.processor}</span>
            <span
              className={cn(
                'text-[10.5px] font-medium',
                t.tone === 'positive' ? 'text-signal-positive' : t.tone === 'risk' ? 'text-signal-risk' : t.tone === 'warning' ? 'text-signal-warning' : 'text-signal-info',
              )}
            >
              {t.status}
            </span>
            <span className="text-ink-faint/50">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
