import type { SignalTone } from '@/types/common'
import { cn } from '@/utils/cn'

const config: Record<SignalTone, { dot: string; text: string; bg: string; border: string }> = {
  positive: { dot: 'bg-signal-positive', text: 'text-signal-positive', bg: 'bg-signal-positive-soft', border: 'border-signal-positive/20' },
  info: { dot: 'bg-signal-info', text: 'text-signal-info', bg: 'bg-signal-info-soft', border: 'border-signal-info/20' },
  warning: { dot: 'bg-signal-warning', text: 'text-signal-warning', bg: 'bg-signal-warning-soft', border: 'border-signal-warning/20' },
  risk: { dot: 'bg-signal-risk', text: 'text-signal-risk', bg: 'bg-signal-risk-soft', border: 'border-signal-risk/20' },
  neutral: { dot: 'bg-signal-neutral', text: 'text-ink-muted', bg: 'bg-signal-neutral-soft', border: 'border-hairline-strong' },
}

/** Compact status pill. Pass a label and the signal tone to colour it. */
export function StatusBadge({ label, tone, className }: { label: string; tone: SignalTone; className?: string }) {
  const conf = config[tone]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium leading-none',
        conf.bg,
        conf.text,
        conf.border,
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', conf.dot)} aria-hidden />
      {label}
    </span>
  )
}
