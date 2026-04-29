/**
 * Simple Prev/Next pagination controls.
 * Used by the EventsTable (10 rows per page).
 */
export function PaginationBar(props: {
  page: number
  totalPages: number
  onPrev: () => void
  onNext: () => void
}) {
  const { page, totalPages, onPrev, onNext } = props
  const canPrev = page > 1
  const canNext = page < totalPages

  return (
    <div className="mt-4 flex items-center justify-between gap-3">
      <div className="font-outfit text-sm text-text-muted">
        Page <span className="font-mono text-text-primary">{page}</span> of{' '}
        <span className="font-mono text-text-primary">{totalPages}</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={!canPrev}
          className="rounded-lg border border-navy-border bg-navy-surface px-3 py-2 font-outfit text-sm text-text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 ease-in-out hover:bg-navy-border/30"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          className="rounded-lg border border-navy-border bg-navy-surface px-3 py-2 font-outfit text-sm text-text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 ease-in-out hover:bg-navy-border/30"
        >
          Next
        </button>
      </div>
    </div>
  )
}

