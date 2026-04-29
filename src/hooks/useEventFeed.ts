import { useEffect, useMemo, useReducer } from 'react'
import { mockEvents } from '../data/mockEvents'
import { generateEvent } from '../data/eventGenerator'
import type { Event, KPIData } from '../types/event.types'

const LIVE_EVENT_INTERVAL_MS = 3000
const MAX_EVENTS_STORED = 200

const KPI_WINDOW_MS = 60 * 60 * 1000 // 60 minutes

type State = {
  events: Event[]
}

type Action = { type: 'add_event'; event: Event }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add_event': {
      const next = [action.event, ...state.events]
      return { events: next.slice(0, MAX_EVENTS_STORED) }
    }
  }
}

function computeKpis(events: Event[]): KPIData {
  const totalEvents = events.length
  const activeUsers = new Set(events.map((e) => e.userId)).size
  const errorCount = events.filter((e) => e.status === 'error').length
  const errorRate = totalEvents === 0 ? 0 : (errorCount / totalEvents) * 100
  const avgResponseTime =
    totalEvents === 0
      ? 0
      : Math.round(events.reduce((sum, e) => sum + e.responseTime, 0) / totalEvents)

  const now = Date.now()
  const recent = events.filter((e) => now - Date.parse(e.timestamp) <= KPI_WINDOW_MS)
  const previous = events.filter((e) => {
    const age = now - Date.parse(e.timestamp)
    return age > KPI_WINDOW_MS && age <= KPI_WINDOW_MS * 2
  })

  const recentKpis = {
    totalEvents: recent.length,
    activeUsers: new Set(recent.map((e) => e.userId)).size,
    errorRate:
      recent.length === 0
        ? 0
        : (recent.filter((e) => e.status === 'error').length / recent.length) * 100,
    avgResponseTime:
      recent.length === 0
        ? 0
        : recent.reduce((sum, e) => sum + e.responseTime, 0) / recent.length,
  }

  const prevKpis = {
    totalEvents: previous.length,
    activeUsers: new Set(previous.map((e) => e.userId)).size,
    errorRate:
      previous.length === 0
        ? 0
        : (previous.filter((e) => e.status === 'error').length / previous.length) * 100,
    avgResponseTime:
      previous.length === 0
        ? 0
        : previous.reduce((sum, e) => sum + e.responseTime, 0) / previous.length,
  }

  const deltaPct = (current: number, baseline: number) => {
    if (baseline === 0) return current === 0 ? 0 : 100
    return ((current - baseline) / baseline) * 100
  }

  return {
    totalEvents,
    activeUsers,
    errorRate,
    avgResponseTime,
    deltas: {
      totalEvents: deltaPct(recentKpis.totalEvents, prevKpis.totalEvents),
      activeUsers: deltaPct(recentKpis.activeUsers, prevKpis.activeUsers),
      errorRate: deltaPct(recentKpis.errorRate, prevKpis.errorRate),
      avgResponseTime: deltaPct(recentKpis.avgResponseTime, prevKpis.avgResponseTime),
    },
  }
}

/**
 * Manages the live event feed in-memory.
 * - Starts with 50 seeded mock events
 * - Prepends a new event every 3 seconds
 * - Stores up to 200 events
 * - KPIs are recomputed from the live array on every update
 */
export function useEventFeed() {
  const [state, dispatch] = useReducer(reducer, { events: mockEvents })

  useEffect(() => {
    const id = window.setInterval(() => {
      dispatch({ type: 'add_event', event: generateEvent() })
    }, LIVE_EVENT_INTERVAL_MS)

    return () => window.clearInterval(id)
  }, [])

  const kpis = useMemo(() => computeKpis(state.events), [state.events])

  return { events: state.events, kpis }
}

