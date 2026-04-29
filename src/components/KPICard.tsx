import clsx from 'clsx'

type Props = {
  label: string
  value: string
  deltaPct: number
  index: number
}

function formatDelta(deltaPct: number) {
  const sign = deltaPct > 0 ? '+' : ''
  return `${sign}${deltaPct.toFixed(1)}%`
}

/**
 * Small KPI summary card used in the KPI row.
 * Includes a numeric value (mono), a label, and a delta badge.
 */
export function KPICard({ label, value, deltaPct, index }: Props) {
  const isGood =
    label.toLowerCase().includes('error') ? deltaPct <= 0 : deltaPct >= 0

  return (
    <div
      className={clsx(
        'rounded-xl border border-navy-border bg-navy-surface p-4 sm:p-5',
        'border-t-2 border-t-accent-blue',
        'transition-all duration-200 ease-in-out',
        'animate-slide-up-fade',
        index === 0 && 'kpi-stagger-0',
        index === 1 && 'kpi-stagger-1',
        index === 2 && 'kpi-stagger-2',
        index === 3 && 'kpi-stagger-3',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="font-mono text-2xl sm:text-3xl text-text-primary">
            {value}
          </div>
          <div className="mt-1 font-outfit text-sm text-text-muted">{label}</div>
        </div>

        <span
          className={clsx(
            'shrink-0 rounded-full border px-2.5 py-1 font-mono text-xs',
            isGood
              ? 'border-success/30 bg-success/10 text-success'
              : 'border-danger/30 bg-danger/10 text-danger',
          )}
        >
          {formatDelta(deltaPct)}
        </span>
      </div>
    </div>
  )
}

