import type { Event, EventStatus, EventType } from '../types/event.types'

const EVENT_TYPES: readonly EventType[] = [
  'click',
  'error',
  'conversion',
  'pageview',
  'api_call',
]

const PAGES: readonly string[] = [
  '/dashboard',
  '/login',
  '/settings',
  '/pricing',
  '/checkout',
  '/docs',
]

const USERS_MIN = 1000
const USERS_MAX = 9999

const RESPONSE_TIME_MS_MIN = 45
const RESPONSE_TIME_MS_MAX = 1250

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pickOne<T>(items: readonly T[]): T {
  return items[randomInt(0, items.length - 1)]!
}

function generateStatus(type: EventType): EventStatus {
  if (type === 'error') return 'error'
  const roll = Math.random()
  if (roll < 0.88) return 'success'
  if (roll < 0.96) return 'warning'
  return 'error'
}

function generateId() {
  return `evt_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

/**
 * Generates a single random event.
 * Used by the live feed simulator (new event every N seconds).
 */
export function generateEvent(now = new Date()): Event {
  const type = pickOne(EVENT_TYPES)
  const responseTime = randomInt(RESPONSE_TIME_MS_MIN, RESPONSE_TIME_MS_MAX)

  return {
    id: generateId(),
    timestamp: now.toISOString(),
    type,
    userId: `user_${randomInt(USERS_MIN, USERS_MAX)}`,
    page: pickOne(PAGES),
    status: generateStatus(type),
    responseTime,
  }
}

