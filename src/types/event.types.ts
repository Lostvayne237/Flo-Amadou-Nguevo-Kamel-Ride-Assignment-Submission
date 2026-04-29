export type EventType = 'click' | 'error' | 'conversion' | 'pageview' | 'api_call'

export type EventStatus = 'success' | 'warning' | 'error'

export interface Event {
  id: string
  /** ISO string */
  timestamp: string
  type: EventType
  /** e.g. "user_4821" */
  userId: string
  /** e.g. "/dashboard" */
  page: string
  status: EventStatus
  /** milliseconds */
  responseTime: number
}

export interface KPIData {
  totalEvents: number
  activeUsers: number
  errorRate: number
  avgResponseTime: number
  deltas: {
    totalEvents: number
    activeUsers: number
    errorRate: number
    avgResponseTime: number
  }
}

