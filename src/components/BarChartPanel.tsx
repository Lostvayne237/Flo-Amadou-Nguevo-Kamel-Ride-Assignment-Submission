import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  type TooltipProps,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { Event, EventType } from '../types/event.types'

type Row = { type: EventType; count: number; label: string }

const TYPE_LABELS: Record<EventType, string> = {
  click: 'Clicks',
  error: 'Errors',
  conversion: 'Conversions',
  pageview: 'Pageviews',
  api_call: 'API Calls',
}

function XAxisTick(props: { x?: number; y?: number; payload?: { value?: number } }) {
  const { x = 0, y = 0, payload } = props
  return (
    <text x={x} y={y + 12} className="fill-text-muted font-mono text-xs">
      {payload?.value?.toLocaleString() ?? ''}
    </text>
  )
}

function YAxisTick(props: { x?: number; y?: number; payload?: { value?: string } }) {
  const { x = 0, y = 0, payload } = props
  return (
    <text x={x} y={y + 4} className="fill-text-primary font-outfit text-xs">
      {payload?.value ?? ''}
    </text>
  )
}

function ChartTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-navy-border bg-navy-surface px-3 py-2">
      <div className="font-outfit text-xs text-text-muted">Count</div>
      <div className="mt-1 font-mono text-sm text-text-primary">
        {payload[0]?.value?.toLocaleString()}
      </div>
    </div>
  )
}

/**
 * Event breakdown chart panel (horizontal bars by event type).
 */
export function BarChartPanel({ events }: { events: Event[] }) {
  const data = useMemo<Row[]>(() => {
    const counts: Record<EventType, number> = {
      click: 0,
      error: 0,
      conversion: 0,
      pageview: 0,
      api_call: 0,
    }

    for (const e of events) counts[e.type] += 1

    return (Object.keys(counts) as EventType[])
      .map((type) => ({ type, count: counts[type], label: TYPE_LABELS[type] }))
      .sort((a, b) => b.count - a.count)
  }, [events])

  return (
    <section className="rounded-xl border border-navy-border bg-navy-surface p-4 sm:p-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-outfit font-semibold text-text-primary">
          Event types
        </h2>
        <span className="font-outfit text-sm text-text-muted">All events</span>
      </div>

      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 6, right: 10 }}>
            <CartesianGrid stroke="#1E2D40" strokeDasharray="4 4" horizontal={false} />
            <XAxis
              type="number"
              tick={<XAxisTick />}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="label"
              tick={<YAxisTick />}
              axisLine={false}
              tickLine={false}
              width={90}
            />
            <Tooltip content={<ChartTooltip />} />
            <Bar
              dataKey="count"
              radius={[8, 8, 8, 8]}
              fill="#60A5FA"
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

