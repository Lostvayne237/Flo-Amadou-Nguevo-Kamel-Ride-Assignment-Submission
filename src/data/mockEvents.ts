import type { Event } from '../types/event.types'
import { generateEvent } from './eventGenerator'

const SEED_EVENTS_COUNT = 50
const SEED_WINDOW_HOURS = 24

/**
 * Static seed data: 50 events spread across the last 24 hours.
 * These events are used as the initial state before live updates start.
 */
export const mockEvents: Event[] = (() => {
  const now = Date.now()
  const windowMs = SEED_WINDOW_HOURS * 60 * 60 * 1000

  const events: Event[] = Array.from({ length: SEED_EVENTS_COUNT }, () => {
    const offsetMs = Math.floor(Math.random() * windowMs)
    const timestamp = new Date(now - offsetMs)
    return generateEvent(timestamp)
  })

  // Most recent first.
  events.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
  return events
})()

