import type { Event } from '../types/event.types'
import { BarChartPanel } from './BarChartPanel'
import { LineChartPanel } from './LineChartPanel'

/**
 * Two-chart row.
 * - Desktop: 60/40 split
 * - Tablet/Mobile: stacked vertically
 */
export function ChartsRow({ events }: { events: Event[] }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
      <div className="lg:col-span-3">
        <LineChartPanel events={events} />
      </div>
      <div className="lg:col-span-2">
        <BarChartPanel events={events} />
      </div>
    </section>
  )
}

