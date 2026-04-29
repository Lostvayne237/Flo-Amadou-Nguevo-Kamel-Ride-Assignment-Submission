/**
 * Top application header for NavyTrack.
 * Shows the app name + a live collection indicator and today's date (desktop/tablet only).
 */
export function Header() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className="border-b border-navy-border px-4 py-4 sm:px-8 sm:py-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-accent-blue/15 border border-navy-border flex items-center justify-center">
          <span className="font-mono text-accent-blue text-sm">NT</span>
        </div>
        <h1 className="font-outfit font-bold text-xl sm:text-2xl text-text-primary">
          NavyTrack
        </h1>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        <div className="flex items-center gap-2 rounded-full border border-navy-border bg-navy-surface px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-success animate-pulseDot" />
          <span className="font-outfit text-sm text-text-primary">Collecting Events</span>
        </div>

        <span className="hidden sm:inline font-outfit text-sm text-text-muted">
          {today}
        </span>
      </div>
    </header>
  )
}

