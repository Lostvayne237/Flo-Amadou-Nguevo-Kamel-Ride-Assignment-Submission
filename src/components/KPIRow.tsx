import type { KPIData } from '../types/event.types'
import { KPICard } from './KPICard'

const MS_PER_SECOND = 1000

function formatNumber(n: number) {
  return n.toLocaleString()
}

function formatPercent(n: number) {
  return `${n.toFixed(1)}%`
}

function formatMsToSeconds(ms: number) {
  return `${(ms / MS_PER_SECOND).toFixed(2)}s`
}

/**
 * Row of 4 KPI cards: Total Events, Active Users, Error Rate, Avg Response Time.
 * Responsive: 2x2 on mobile/tablet, 4-in-row on desktop.
 */
export function KPIRow({ kpis }: { kpis: KPIData }) {
  const cards = [
    {
      label: 'Total Events',
      value: formatNumber(kpis.totalEvents),
      deltaPct: kpis.deltas.totalEvents,
    },
    {
      label: 'Active Users',
      value: formatNumber(kpis.activeUsers),
      deltaPct: kpis.deltas.activeUsers,
    },
    {
      label: 'Error Rate',
      value: formatPercent(kpis.errorRate),
      deltaPct: kpis.deltas.errorRate,
    },
    {
      label: 'Avg Response Time',
      value: formatMsToSeconds(kpis.avgResponseTime),
      deltaPct: kpis.deltas.avgResponseTime,
    },
  ] as const

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {cards.map((card, idx) => (
        <KPICard key={card.label} {...card} index={idx} />
      ))}
    </section>
  )
}

