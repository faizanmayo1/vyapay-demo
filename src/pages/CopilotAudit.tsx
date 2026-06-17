import { useRef, useState } from 'react'
import { ArrowUp, Check, Database, ScrollText, Sparkles, User } from 'lucide-react'

import { DecisionAuditTrail } from '@/components/audit/DecisionAuditTrail'
import { ExecReportCard } from '@/components/audit/ExecReportCard'
import { PageHeader } from '@/components/blueprint/PageHeader'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/toast'
import { auditTrail, cannedAnswers, execReport, suggestedPrompts } from '@/data/audit'
import type { SuggestedPrompt } from '@/types/audit'
import { cn } from '@/utils/cn'

interface Msg {
  id: number
  role: 'user' | 'assistant'
  kind: 'text' | 'audit' | 'report'
  text?: string
  bullets?: string[]
}

const corpus = [
  '5M transactions · 400K/day',
  '50 merchants · 8 processors',
  '5 fraud engines · global BINs',
  'every routing & risk decision logged',
]

export function CopilotAudit() {
  const { toast } = useToast()
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const idRef = useRef(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const nextId = () => ++idRef.current

  const respond = (text: string) => {
    const q = text.toLowerCase()
    if (/audit|tx-88421|trail|lifecycle/.test(q)) {
      setMessages((m) => [...m, { id: nextId(), role: 'assistant', kind: 'audit' }])
      return
    }
    if (/report|executive|weekly|summary/.test(q)) {
      setMessages((m) => [...m, { id: nextId(), role: 'assistant', kind: 'report' }])
      return
    }
    const canned = cannedAnswers.find((c) => q.includes(c.match))
    if (canned) {
      setMessages((m) => [...m, { id: nextId(), role: 'assistant', kind: 'text', text: canned.body, bullets: canned.bullets }])
      return
    }
    setMessages((m) => [
      ...m,
      { id: nextId(), role: 'assistant', kind: 'text', text: 'I can answer across the whole payments brain — routing, fraud, cost and merchants. Try a suggested prompt, e.g. “Show the decision audit for TX-88421”.' },
    ])
  }

  const send = (text: string) => {
    const value = text.trim()
    if (!value) return
    setMessages((m) => [...m, { id: nextId(), role: 'user', kind: 'text', text: value }])
    setInput('')
    window.setTimeout(() => respond(value), 280)
    window.setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }), 360)
  }

  const runPrompt = (p: SuggestedPrompt) => send(p.label)
  const started = messages.length > 0

  return (
    <div className="mx-auto max-w-[1320px] reveal px-4 py-7 lg:px-7">
      <PageHeader
        eyebrow="AI · Copilot & Audit"
        title="AI Copilot & Decision Audit"
        description="Ask the entire payments brain in plain language, and trace every AI decision — explainable routing & risk logs and a full, tamper-evident transaction audit trail."
        actions={<Badge variant="amber">Beta</Badge>}
      />

      <div className="mt-7 grid gap-5 lg:grid-cols-[1fr_300px]">
        {/* Chat */}
        <div className="flex min-h-[560px] flex-col rounded-xl border border-hairline bg-card shadow-card-sm">
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5" style={{ maxHeight: '64vh' }}>
            {!started && (
              <div className="flex h-full flex-col">
                <div className="relative overflow-hidden rounded-xl border border-amber/30 bg-canvas-subtle/40 p-5">
                  <div className="aurora-wash pointer-events-none absolute inset-0 opacity-70" aria-hidden />
                  <div className="relative flex items-center gap-2.5">
                    <span className="grid h-9 w-9 place-items-center rounded-md bg-amber text-white shadow-volt-glow"><Sparkles className="h-4 w-4" /></span>
                    <div>
                      <p className="font-display text-[15px] font-semibold tracking-tight-bank text-ink">Hi Daniel — ask me anything about your payments.</p>
                      <p className="text-[12.5px] text-ink-subtle">Routing, fraud, cost, merchants — every answer is backed by a logged decision trail.</p>
                    </div>
                  </div>
                </div>

                <p className="mb-2 mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-subtle">Suggested</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {suggestedPrompts.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => runPrompt(p)}
                      className={cn('card-lift group flex items-start gap-3 rounded-xl border bg-card p-3.5 text-left shadow-card-sm hover:shadow-volt-lift', p.kind !== 'text' ? 'border-amber/40' : 'border-hairline')}
                    >
                      <span className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-md', p.kind !== 'text' ? 'bg-amber text-white' : 'bg-canvas-subtle text-ink-muted')}>
                        <p.icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[13px] font-medium text-ink">{p.label}</span>
                        <span className="block text-[11.5px] text-ink-subtle">{p.sub}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg) =>
              msg.role === 'user' ? (
                <div key={msg.id} className="flex justify-end">
                  <div className="flex max-w-[78%] items-start gap-2.5">
                    <div className="rounded-2xl rounded-tr-sm bg-steel px-3.5 py-2.5 text-[13px] text-white">{msg.text}</div>
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-canvas-subtle text-ink-muted"><User className="h-3.5 w-3.5" /></span>
                  </div>
                </div>
              ) : (
                <div key={msg.id} className="flex justify-start">
                  <div className="flex w-full max-w-[92%] items-start gap-2.5">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-amber text-white"><Sparkles className="h-3.5 w-3.5" /></span>
                    <div className="min-w-0 flex-1">
                      {msg.kind === 'audit' ? (
                        <DecisionAuditTrail trail={auditTrail} />
                      ) : msg.kind === 'report' ? (
                        <ExecReportCard report={execReport} onExport={() => toast({ title: 'Report exported', description: `payments-report-${execReport.period.replace(/[^0-9]/g, '').slice(0, 8) || 'week'}.pdf`, tone: 'success' })} />
                      ) : (
                        <div className="rounded-2xl rounded-tl-sm border border-hairline bg-card px-3.5 py-3 shadow-card-sm">
                          <p className="text-[13px] leading-relaxed text-ink">{msg.text}</p>
                          {msg.bullets && (
                            <ul className="mt-2 space-y-1.5">
                              {msg.bullets.map((b, i) => (
                                <li key={i} className="flex items-start gap-2 text-[12.5px] text-ink-muted">
                                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal-positive" />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>

          {/* composer */}
          <div className="border-t border-hairline p-3">
            <form
              onSubmit={(e) => { e.preventDefault(); send(input) }}
              className="flex items-center gap-2 rounded-xl border border-hairline bg-canvas-subtle/50 px-3 py-2 focus-within:border-volt/50 focus-within:bg-card"
            >
              <Sparkles className="h-4 w-4 shrink-0 text-volt" />
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask the payments brain… e.g. “Show the decision audit for TX-88421”"
                className="w-full border-0 bg-transparent text-[13px] text-ink outline-none placeholder:text-ink-faint"
              />
              <button type="submit" disabled={!input.trim()} className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-volt to-volt-deep text-white transition-opacity disabled:opacity-40" aria-label="Send">
                <ArrowUp className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Context rail */}
        <aside className="space-y-5">
          <div className="rounded-xl border border-hairline bg-card p-4 shadow-card-sm">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-subtle">What VyaPay can see</p>
            <ul className="mt-3 space-y-2">
              {corpus.map((c) => (
                <li key={c} className="flex items-center gap-2.5">
                  <span className="grid h-7 w-7 place-items-center rounded-md bg-canvas-subtle text-ink-muted"><Database className="h-3.5 w-3.5" /></span>
                  <span className="text-[12.5px] text-ink-muted">{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-amber/30 bg-card p-4 shadow-card-sm">
            <div className="volt-rule" aria-hidden />
            <div className="flex items-center gap-2">
              <ScrollText className="h-4 w-4 text-volt" />
              <p className="font-display text-[13px] font-semibold tracking-tight-bank text-ink">Explainable by default</p>
            </div>
            <p className="mt-1.5 text-[12px] leading-relaxed text-ink-muted">
              Every routing, fraud and cost decision is logged with its inputs and rationale — replayable as a tamper-evident audit trail for any transaction or auditor.
            </p>
          </div>

          <div className="rounded-xl border border-hairline bg-card p-4 shadow-card-sm">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-subtle">Try the hero flow</p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-ink-muted">
              Ask <span className="font-medium text-ink">“Show the decision audit for TX-88421”</span> to replay a transaction’s full lifecycle with every AI decision logged.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
