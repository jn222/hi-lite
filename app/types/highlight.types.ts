export type TimeUnit = "day" | "week" | "month" | "year"

export interface Highlight {
  id: number
  userid: number
  content: string
  created_at: string
  designation: TimeUnit[]
}
