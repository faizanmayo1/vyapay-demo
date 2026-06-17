import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Bell, Command, Menu, Search, Sparkles, X } from 'lucide-react'

import { CommandPalette, OPEN_COMMAND_EVENT } from '@/components/CommandPalette'
import { NotificationsPanel } from '@/components/NotificationsPanel'
import { TxnTicker } from '@/components/TxnTicker'
import { Wordmark } from '@/components/Brand/Wordmark'
import { notifications } from '@/data/notifications'
import { findRouteByPath, groupRoutesBySection } from '@/routes/registry'
import { ROUTES } from '@/routes/paths'
import { cn } from '@/utils/cn'

const UNREAD = notifications.filter((n) => n.unread).length
const openCommand = () => window.dispatchEvent(new CustomEvent(OPEN_COMMAND_EVENT))

function NavSections({ onNavigate }: { onNavigate?: () => void }) {
  const sections = groupRoutesBySection()
  return (
    <nav className="flex-1 overflow-y-auto px-3 pb-2">
      {sections.map(({ section, entries }) => {
        if (entries.length === 0) return null
        return (
          <div key={section} className="mt-4 first:mt-1">
            <p className="px-2 pb-1.5 pt-1 font-mono text-[9.5px] font-medium uppercase tracking-[0.16em] text-ink-faint">
              {section}
            </p>
            <ul className="space-y-0.5">
              {entries.map((entry) => (
                <li key={entry.path}>
                  <NavLink
                    to={entry.path}
                    end={entry.end}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      cn(
                        'group relative flex items-center gap-2.5 overflow-hidden rounded-lg px-2.5 py-2 text-[12.5px] font-medium transition-colors',
                        isActive ? 'nav-active-wash text-ink' : 'text-ink-muted hover:bg-canvas-subtle hover:text-ink',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={cn('absolute left-0 top-1.5 bottom-1.5 w-[2.5px] rounded-r-full transition-colors', isActive ? 'bg-volt' : 'bg-transparent')}
                          aria-hidden
                        />
                        <entry.icon className={cn('h-[17px] w-[17px] shrink-0', isActive ? 'text-volt' : 'text-ink-faint group-hover:text-ink-muted')} />
                        <span className="flex-1 truncate">{entry.short}</span>
                        {entry.badge?.variant === 'amber' && (
                          <span className="rounded-full bg-amber-soft px-1.5 py-0.5 font-mono text-[8.5px] font-semibold uppercase tracking-[0.08em] text-volt-deep">
                            {entry.badge.text}
                          </span>
                        )}
                        {entry.badge?.variant === 'warning' && (
                          <span className="rounded-full bg-signal-warning-soft px-1.5 py-0.5 font-mono text-[9px] font-semibold text-signal-warning">
                            {entry.badge.text}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </nav>
  )
}

function ProcessorStatus() {
  return (
    <div className="px-4 pb-3 pt-3">
      <div className="relative overflow-hidden rounded-xl border border-hairline bg-canvas-subtle/60 px-3.5 py-3">
        <div className="volt-rule absolute inset-x-0 top-0 opacity-70" aria-hidden />
        <p className="font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-ink-faint">Processors</p>
        <p className="mt-1 font-display text-[13.5px] font-semibold tracking-tight-bank text-ink">8 connected</p>
        <div className="mt-2 flex items-center gap-3 border-t border-hairline pt-2.5 text-[10px]">
          <span className="flex items-center gap-1 font-mono text-ink-muted"><span className="h-1.5 w-1.5 rounded-full bg-signal-positive" />7 healthy</span>
          <span className="flex items-center gap-1 font-mono text-ink-muted"><span className="h-1.5 w-1.5 rounded-full bg-signal-warning" />1 degraded</span>
        </div>
      </div>
    </div>
  )
}

function UserCard() {
  return (
    <div className="border-t border-hairline px-3 py-3">
      <button type="button" className="flex w-full items-center gap-2.5 rounded-md p-1.5 text-left transition-colors hover:bg-canvas-subtle">
        <div className="grid h-8 w-8 place-items-center rounded-full bg-steel text-[11px] font-semibold tabular text-white">DC</div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-medium text-ink">Daniel Cho</p>
          <p className="truncate font-mono text-[9.5px] uppercase tracking-[0.06em] text-ink-faint">Head of Payments Ops</p>
        </div>
      </button>
    </div>
  )
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <div className="flex h-16 items-center px-5">
        <Wordmark size="md" tone="dark" />
      </div>
      <div className="mx-5 h-px bg-hairline" />
      <NavSections onNavigate={onNavigate} />
      <ProcessorStatus />
      <UserCard />
    </>
  )
}

function Topbar({ onOpenNav, onOpenNotes, unread }: { onOpenNav: () => void; onOpenNotes: () => void; unread: number }) {
  const location = useLocation()
  const route = findRouteByPath(location.pathname) ?? findRouteByPath(ROUTES.root)
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-hairline bg-canvas/70 px-4 backdrop-blur-xl lg:px-7">
      <button type="button" onClick={onOpenNav} className="grid h-9 w-9 shrink-0 place-items-center rounded-md text-ink-muted hover:bg-canvas-subtle lg:hidden" aria-label="Open navigation">
        <Menu className="h-5 w-5" />
      </button>

      <div className="min-w-0 shrink-0 lg:w-56">
        <p className="font-mono text-[9.5px] font-medium uppercase tracking-[0.16em] text-ink-faint">{route?.eyebrow}</p>
        <h1 className="truncate font-display text-[16px] font-semibold tracking-tight-bank text-ink">{route?.label}</h1>
      </div>

      {/* live ticker */}
      <div className="hidden items-center gap-2 lg:flex lg:flex-1">
        <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-hairline bg-card px-2 py-1">
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-positive opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal-positive" />
          </span>
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-ink-subtle">Live</span>
        </span>
        <TxnTicker />
      </div>

      <button type="button" onClick={openCommand} className="grid h-9 w-9 shrink-0 place-items-center rounded-md text-ink-muted hover:bg-canvas-subtle md:hidden" aria-label="Search">
        <Search className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={openCommand}
        className="hidden shrink-0 items-center gap-2 rounded-md border border-hairline bg-card px-2.5 py-2 text-left shadow-card-sm transition-colors hover:border-hairline-strong md:flex"
      >
        <Search className="h-4 w-4 text-ink-faint" />
        <kbd className="inline-flex items-center gap-0.5 rounded border border-hairline bg-canvas-subtle px-1.5 py-0.5 font-mono text-[10px] text-ink-subtle">
          <Command className="h-2.5 w-2.5" />K
        </kbd>
      </button>

      <button type="button" onClick={onOpenNotes} className="relative grid h-9 w-9 shrink-0 place-items-center rounded-md text-ink-muted hover:bg-canvas-subtle" aria-label="Notifications">
        <Bell className="h-5 w-5" />
        {unread > 0 && (
          <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-volt px-1 font-mono text-[9px] font-semibold text-white">{unread}</span>
        )}
      </button>

      <div className="hidden shrink-0 items-center gap-2 rounded-full border border-amber/30 bg-amber-soft px-3 py-1.5 xl:flex">
        <Sparkles className="h-3.5 w-3.5 text-volt" />
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-volt-deep">Copilot</span>
      </div>
    </header>
  )
}

export function AppShell() {
  const [navOpen, setNavOpen] = useState(false)
  const [notesOpen, setNotesOpen] = useState(false)
  const [notesCleared, setNotesCleared] = useState(false)
  const location = useLocation()

  useEffect(() => { setNavOpen(false) }, [location.pathname])

  return (
    <div className="relative flex min-h-screen">
      <div className="app-atmosphere pointer-events-none fixed inset-0 -z-10" aria-hidden />
      <div className="app-grain pointer-events-none fixed inset-0 -z-10" aria-hidden />
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-hairline bg-gradient-to-b from-white to-canvas-subtle/60 lg:flex">
        <Sidebar />
      </aside>

      {navOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button type="button" aria-label="Close navigation" className="absolute inset-0 bg-steel/40 backdrop-blur-[2px] animate-fade-in" onClick={() => setNavOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-72 flex-col border-r border-hairline bg-gradient-to-b from-white to-canvas-subtle/60 animate-slide-in-right">
            <button type="button" onClick={() => setNavOpen(false)} className="absolute right-3 top-4 grid h-8 w-8 place-items-center rounded-md text-ink-muted hover:bg-canvas-subtle" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
            <Sidebar onNavigate={() => setNavOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onOpenNav={() => setNavOpen(true)} onOpenNotes={() => setNotesOpen(true)} unread={notesCleared ? 0 : UNREAD} />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      <CommandPalette />
      <NotificationsPanel open={notesOpen} onClose={() => setNotesOpen(false)} cleared={notesCleared} onMarkAllRead={() => setNotesCleared(true)} />
    </div>
  )
}
