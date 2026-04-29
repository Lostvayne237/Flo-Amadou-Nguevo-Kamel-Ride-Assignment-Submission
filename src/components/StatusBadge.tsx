import clsx from 'clsx'
import type { EventStatus } from '../types/event.types'

const STYLES: Record<
  EventStatus,
  { className: string; label: string }
> = {
  success: {
    label: 'Success',
    className: 'border-success/30 bg-success/10 text-success',
  },
  warning: {
    label: 'Warning',
    className: 'border-warning/30 bg-warning/10 text-warning',
  },
  error: {
    label: 'Error',
    className: 'border-danger/30 bg-danger/10 text-danger',
  },
}

/**
 * Pill badge for the "Status" column in the events table.
 */
export function StatusBadge({ status }: { status: EventStatus }) {
  const s = STYLES[status]
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-xs',
        s.className,
      )}
    >
      {s.label}
    </span>
  )
}

