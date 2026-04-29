import { useMemo } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  type TooltipProps,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { Event } from '../types/event.types'

type Point = { label: string; value: number }

const BUCKETS = 12
const BUCKET_MS = 60 * 60 * 1000 // 1 hour

function formatHourLabel(d: Date) {
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

function AxisTick(props: { x?: number; y?: number; payload?: { value?: string } }) {
  const { x = 0, y = 0, payload } = props
  return (
    <text x={x} y={y + 12} className="fill-text-muted font-mono text-xs">
      {payload?.value ?? ''}
    </text>
  )
}

function ChartTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-navy-border bg-navy-surface px-3 py-2">
      <div className="font-outfit text-xs text-text-muted">{label}</div>
      <div className="mt-1 font-mono text-sm text-text-primary">
        {payload[0]?.value?.toLocaleString()} events
      </div>
    </div>
  )
}

/**
 * Events-over-time chart panel (smooth curve with filled area).
 * Uses the last 12 hours, grouped into hourly buckets.
 */
export function LineChartPanel({ events }: { events: Event[] }) {
  const data = useMemo<Point[]>(() => {
    const now = Date.now()
    const buckets = Array.from({ length: BUCKETS }, (_, i) => {
      const start = now - (BUCKETS - i) * BUCKET_MS
      return { start, end: start + BUCKET_MS, value: 0 }
    })

    for (const e of events) {
      const t = Date.parse(e.timestamp)
      const bucket = buckets.find((b) => t >= b.start && t < b.end)
      if (bucket) bucket.value += 1
    }

    return buckets.map((b) => ({
      label: formatHourLabel(new Date(b.start)),
      value: b.value,
    }))
  }, [events])

  return (
    <section className="rounded-xl border border-navy-border bg-navy-surface p-4 sm:p-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-outfit font-semibold text-text-primary">
          Events over time
        </h2>
        <span className="font-outfit text-sm text-text-muted">Last 12 hours</span>
      </div>

      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: 8, right: 12, top: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="eventsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1E2D40" strokeDasharray="4 4" vertical={false} />
            <XAxis
              dataKey="label"
              tick={<AxisTick />}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={<AxisTick />}
              axisLine={false}
              tickLine={false}
              width={34}
            />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              strokeWidth={2}
              fill="url(#eventsFill)"
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

