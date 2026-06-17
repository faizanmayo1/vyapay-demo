import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, CornerDownLeft, GitBranch, type LucideIcon, Receipt, Search, Sparkles } from 'lucide-react'

import { useToast } from '@/components/ui/toast'
import { routeRegistry } from '@/routes/registry'
import { ROUTES } from '@/routes/paths'
import { cn } from '@/utils/cn'

export const OPEN_COMMAND_EVENT = 'vyapay:open-command'

interface Command {
  id: string
  label: string
  hint: string
  group: 'Go to' | 'Actions'
  icon: LucideIcon
  run: () => void
}

export function CommandPalette() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const commands = useMemo<Command[]>(() => {
    const nav: Command[] = routeRegistry.map((r) => ({
      id: `nav-${r.path}`,
      label: r.label,
      hint: r.eyebrow,
      group: 'Go to',
      icon: r.icon,
      run: () => navigate(r.path),
    }))
    const actions: Command[] = [
      {
        id: 'act-optimize',
        label: 'Run AI cost optimization',
        hint: 'Cost & Fee Optimization · AI',
        group: 'Actions',
        icon: Receipt,
        run: () => {
          navigate(ROUTES.optimization)
          toast({ title: 'Optimization ready', description: 'Review the recommended traffic shift and projected savings.', tone: 'info' })
        },
      },
      {
        id: 'act-reroute',
        label: 'Inspect a declined transaction',
        hint: 'Routing Intelligence',
        group: 'Actions',
        icon: GitBranch,
        run: () => {
          navigate(ROUTES.routing)
          toast({ title: 'Routing Intelligence', description: 'See how a declined txn reroutes to a higher-approval processor.', tone: 'info' })
        },
      },
      {
        id: 'act-copilot',
        label: 'Ask the Payments Copilot',
        hint: 'AI Copilot',
        group: 'Actions',
        icon: Sparkles,
        run: () => {
          navigate(ROUTES.copilot)
          toast({ title: 'Copilot ready', description: 'Ask “why did approval rate drop on Cardstream?”', tone: 'info' })
        },
      },
    ]
    return [...nav, ...actions]
  }, [navigate, toast])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q) || c.group.toLowerCase().includes(q))
  }, [commands, query])

  useEffect(() => setActive(0), [query, open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      } else if (e.key === 'Escape') setOpen(false)
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener(OPEN_COMMAND_EVENT, onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(OPEN_COMMAND_EVENT, onOpen)
    }
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      const t = window.setTimeout(() => inputRef.current?.focus(), 20)
      return () => window.clearTimeout(t)
    }
  }, [open])

  if (!open) return null

  const choose = (cmd: Command | undefined) => {
    if (!cmd) return
    setOpen(false)
    cmd.run()
  }

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      choose(filtered[active])
    }
  }

  let runningIndex = -1

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[14vh]">
      <button type="button" aria-label="Close command palette" className="absolute inset-0 bg-steel/40 backdrop-blur-[2px] animate-fade-in" onClick={() => setOpen(false)} />

      <div className="relative w-full max-w-[560px] overflow-hidden rounded-xl border border-hairline bg-card shadow-card-lg animate-fade-in" onKeyDown={onListKey}>
        <div className="volt-rule" aria-hidden />
        <div className="flex items-center gap-2.5 border-b border-hairline px-4 py-3">
          <Search className="h-4 w-4 text-ink-subtle" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to a screen or run an action…"
            className="w-full border-0 bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
          />
          <kbd className="rounded border border-hairline bg-canvas-subtle px-1.5 py-0.5 font-mono text-[10px] text-ink-subtle">Esc</kbd>
        </div>

        <div className="max-h-[360px] overflow-y-auto py-2">
          {filtered.length === 0 && <p className="px-4 py-6 text-center text-[13px] text-ink-subtle">No matches for “{query}”</p>}

          {(['Go to', 'Actions'] as const).map((group) => {
            const groupItems = filtered.filter((c) => c.group === group)
            if (groupItems.length === 0) return null
            return (
              <div key={group} className="px-2 pb-1.5">
                <p className="px-2 py-1.5 eyebrow">{group}</p>
                <ul>
                  {groupItems.map((c) => {
                    runningIndex += 1
                    const idx = runningIndex
                    const isActive = idx === active
                    return (
                      <li key={c.id}>
                        <button
                          type="button"
                          onMouseEnter={() => setActive(idx)}
                          onClick={() => choose(c)}
                          className={cn('flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-left transition-colors', isActive ? 'bg-amber/10' : 'hover:bg-canvas-subtle')}
                        >
                          <span
                            className={cn(
                              'grid h-7 w-7 shrink-0 place-items-center rounded-md',
                              c.group === 'Actions' ? 'bg-amber-soft text-volt-deep' : 'bg-canvas-subtle text-ink-muted',
                              isActive && c.group !== 'Actions' && 'text-volt',
                            )}
                          >
                            <c.icon className="h-4 w-4" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className={cn('block truncate text-[13px] font-medium', isActive ? 'text-volt-deep' : 'text-ink')}>{c.label}</span>
                            <span className="block truncate text-[11px] text-ink-subtle">{c.hint}</span>
                          </span>
                          {isActive && <ArrowRight className="h-3.5 w-3.5 shrink-0 text-volt" />}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="flex items-center justify-between border-t border-hairline bg-canvas-subtle/40 px-4 py-2 text-[10.5px] text-ink-subtle">
          <span className="inline-flex items-center gap-1.5"><Sparkles className="h-3 w-3 text-volt" /> VyaPay command palette</span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-flex items-center gap-1"><CornerDownLeft className="h-3 w-3" /> select</span>
            <span>↑↓ navigate</span>
          </span>
        </div>
      </div>
    </div>
  )
}
