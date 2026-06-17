interface TooltipPayloadItem {
  name?: string
  value?: number | string
  color?: string
  dataKey?: string | number
  payload?: Record<string, unknown>
}

/** Recharts custom tooltip — VyaPay card style with mono labels. */
export function ChartTooltip({
  active,
  payload,
  label,
  valueFormatter,
}: {
  active?: boolean
  payload?: TooltipPayloadItem[]
  label?: string | number
  valueFormatter?: (value: number | string, item: TooltipPayloadItem) => string
}) {
  if (!active || !payload || payload.length === 0) return null
  return (
    <div className="rounded-lg border border-hairline bg-card/95 px-3 py-2 shadow-card-md backdrop-blur-sm">
      {label !== undefined && <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-subtle">{label}</p>}
      <div className="space-y-1">
        {payload.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color ?? '#5B5BF6' }} aria-hidden />
            <span className="text-[12px] text-ink-muted">{item.name}</span>
            <span className="ml-auto font-mono text-[12px] font-semibold tabular text-ink">
              {item.value !== undefined && valueFormatter ? valueFormatter(item.value, item) : item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
