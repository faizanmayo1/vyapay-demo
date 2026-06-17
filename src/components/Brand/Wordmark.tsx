import { cn } from '@/utils/cn'

type Size = 'sm' | 'md' | 'lg'

const glyphSize: Record<Size, string> = { sm: 'h-7 w-7', md: 'h-8 w-8', lg: 'h-9 w-9' }
const wordSize: Record<Size, string> = { sm: 'text-[15px]', md: 'text-[17px]', lg: 'text-[20px]' }

/**
 * VyaPay wordmark — a volt "current" bolt mark beside the Sora wordmark.
 * `tone="dark"` for the light shell; `tone="inverse"` for dark surfaces.
 */
export function Wordmark({
  size = 'md',
  tone = 'dark',
  withSuffix = true,
  className,
}: {
  size?: Size
  tone?: 'dark' | 'inverse'
  withSuffix?: boolean
  className?: string
}) {
  const inverse = tone === 'inverse'
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <VoltGlyph className={glyphSize[size]} inverse={inverse} />
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display font-bold tracking-tight-bank',
            wordSize[size],
            inverse ? 'text-white' : 'text-ink',
          )}
        >
          Vya<span className={inverse ? 'text-volt-glow' : 'text-volt-gradient'}>Pay</span>
        </span>
        {withSuffix && (
          <span
            className={cn(
              'mt-1 font-mono text-[8.5px] font-medium uppercase tracking-[0.2em]',
              inverse ? 'text-white/55' : 'text-ink-faint',
            )}
          >
            Payments OS
          </span>
        )}
      </div>
    </div>
  )
}

function VoltGlyph({ className, inverse }: { className?: string; inverse?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" className={className} role="img" aria-label="VyaPay">
      <rect width="32" height="32" rx="8" fill={inverse ? 'rgba(255,255,255,0.10)' : '#312E81'} />
      <path d="M18.5 6 L11 17 L15.5 17 L13.5 26 L21 14.5 L16.5 14.5 Z" fill="#5B5BF6" />
    </svg>
  )
}
