import { useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
import type { Event, EventType } from '../types/event.types'
import { PaginationBar } from './PaginationBar'
import { StatusBadge } from './StatusBadge'

const ROWS_PER_PAGE = 10
const NEW_ROW_HIGHLIGHT_MS = 2200

const TYPE_STYLES: Record<EventType, string> = {
  click: 'border-accent-blue/30 bg-accent-blue/10 text-accent-blue',
  pageview: 'border-accent-blue-light/30 bg-accent-blue-light/10 text-accent-blue-light',
  api_call: 'border-warning/30 bg-warning/10 text-warning',
  conversion: 'border-success/30 bg-success/10 text-success',
  error: 'border-danger/30 bg-danger/10 text-danger',
}

function formatTimestamp(iso: string) {
  const d = new Date(iso)
  return d.toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

function EventTypePill({ type }: { type: EventType }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-xs',
        TYPE_STYLES[type],
      )}
    >
      {type}
    </span>
  )
}

/**
 * Paginated events table (10 rows/page).
 * Mobile: wrapped in horizontal scroll with a 600px min table width.
 */
export function EventsTable({ events }: { events: Event[] }) {
  const [page, setPage] = useState(1)
  const [freshIds, setFreshIds] = useState<Set<string>>(() => new Set())

  useEffect(() => {
    const newest = events[0]
    if (!newest) return

    setFreshIds((prev) => new Set(prev).add(newest.id))
    const timeout = window.setTimeout(() => {
      setFreshIds((prev) => {
        const next = new Set(prev)
        next.delete(newest.id)
        return next
      })
    }, NEW_ROW_HIGHLIGHT_MS)

    return () => window.clearTimeout(timeout)
  }, [events])

  const totalPages = Math.max(1, Math.ceil(events.length / ROWS_PER_PAGE))

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  const pageEvents = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE
    return events.slice(start, start + ROWS_PER_PAGE)
  }, [events, page])

  return (
    <section className="rounded-xl border border-navy-border bg-navy-surface p-4 sm:p-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-outfit font-semibold text-text-primary">
          Live events
        </h2>
        <span className="font-outfit text-sm text-text-muted">
          {events.length.toLocaleString()} stored
        </span>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-[600px] w-full border-separate border-spacing-0">
          <thead>
            <tr className="text-left">
              {['Timestamp', 'Event Type', 'User ID', 'Page', 'Status'].map((h) => (
                <th
                  key={h}
                  className="border-b border-navy-border px-3 py-3 font-outfit text-xs uppercase tracking-wide text-text-muted"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageEvents.map((e, idx) => {
              const isFresh = freshIds.has(e.id)
              const rowTone = idx % 2 === 0 ? 'bg-navy-bg/25' : 'bg-navy-bg/10'
              return (
                <tr
                  key={e.id}
                  className={clsx(
                    rowTone,
                    'transition-all duration-200 ease-in-out hover:bg-navy-border/25',
                    isFresh && 'animate-slide-in-row',
                  )}
                >
                  <td className="px-3 py-3 font-mono text-xs text-text-primary">
                    {formatTimestamp(e.timestamp)}
                  </td>
                  <td className="px-3 py-3">
                    <EventTypePill type={e.type} />
                  </td>
                  <td className="px-3 py-3 font-mono text-xs text-text-primary">
                    {e.userId}
                  </td>
                  <td className="px-3 py-3 font-mono text-xs text-text-muted">
                    {e.page}
                  </td>
                  <td className="px-3 py-3">
                    <StatusBadge status={e.status} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <PaginationBar
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
      />
    </section>
  )
}

