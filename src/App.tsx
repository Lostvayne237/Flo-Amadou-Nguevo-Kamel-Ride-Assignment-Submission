import { Header } from './components/Header'
import { KPIRow } from './components/KPIRow'
import { ChartsRow } from './components/ChartsRow'
import { EventsTable } from './components/EventsTable'
import { useEventFeed } from './hooks/useEventFeed'

/**
 * NavyTrack dashboard page layout.
 * Desktop-first with mobile/tablet responsive behavior per spec.
 */
export default function App() {
  const { events, kpis } = useEventFeed()

  return (
    <div className="min-h-screen bg-navy-bg">
      <Header />

      <main className="px-4 py-5 sm:px-8 sm:py-6 space-y-4 sm:space-y-6">
        <KPIRow kpis={kpis} />
        <ChartsRow events={events} />
        <EventsTable events={events} />
      </main>
    </div>
  )
}

