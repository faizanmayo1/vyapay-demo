import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, X } from 'lucide-react'

import { notifications } from '@/data/notifications'
import type { AppNotification } from '@/types/notifications'
import { cn } from '@/utils/cn'

const toneChip: Record<AppNotification['tone'], string> = {
  risk: 'bg-signal-risk-soft text-signal-risk',
  warning: 'bg-signal-warning-soft text-signal-warning',
  info: 'bg-amber-soft text-volt-deep',
  positive: 'bg-signal-positive-soft text-signal-positive',
}

export function NotificationsPanel({
  open,
  onClose,
  cleared = false,
  onMarkAllRead,
}: {
  open: boolean
  onClose: () => void
  cleared?: boolean
  onMarkAllRead?: () => void
}) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const go = (n: AppNotification) => {
    onClose()
    if (n.to) navigate(n.to)
  }

  const unread = cleared ? 0 : notifications.filter((n) => n.unread).length

  return (
    <div className="fixed inset-0 z-[75]">
      <button type="button" aria-label="Close notifications" className="absolute inset-0 bg-steel/40 backdrop-blur-[2px] animate-fade-in" onClick={onClose} />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-[380px] flex-col border-l border-hairline bg-canvas shadow-card-lg animate-slide-in-right">
        <div className="volt-rule" aria-hidden />
        <header className="flex items-center justify-between gap-3 border-b border-hairline px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-steel text-amber-200">
              <Bell className="h-4 w-4" />
            </span>
            <div>
              <h3 className="font-display text-[15px] font-semibold tracking-tight-bank text-ink">Notifications</h3>
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-subtle">{unread} unread · {notifications.length} total</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="grid h-7 w-7 place-items-center rounded-md text-ink-subtle hover:bg-canvas-subtle hover:text-ink" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </header>

        <ul className="flex-1 overflow-y-auto">
          {notifications.map((n) => {
            const Icon = n.icon
            return (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => go(n)}
                  className={cn('flex w-full items-start gap-3 border-b border-hairline/70 px-5 py-3.5 text-left transition-colors hover:bg-canvas-subtle', n.unread && !cleared && 'bg-amber-soft/25')}
                >
                  <span className={cn('mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md', toneChip[n.tone])}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-[13px] font-semibold text-ink">{n.title}</p>
                      {n.unread && !cleared && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-volt" aria-hidden />}
                    </div>
                    <p className="mt-0.5 text-[12px] leading-snug text-ink-muted">{n.detail}</p>
                    <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-faint">{n.time}</p>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>

        <footer className="flex items-center justify-between border-t border-hairline bg-canvas-subtle/40 px-5 py-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-subtle">Payments &amp; risk alerts</span>
          <button type="button" onClick={() => onMarkAllRead?.()} className="font-mono text-[10px] uppercase tracking-[0.1em] text-volt-deep hover:underline">Mark all read</button>
        </footer>
      </aside>
    </div>
  )
}
