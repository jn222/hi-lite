import { type TimeUnit } from "@/app/types/highlight.types"
import dayjs from "dayjs"

interface Range {
  start: string
  end: string
}

// For local formatting
export type TimeFormat = TimeUnit | "time"

export const orderedTimeUnits: TimeFormat[] = [
  "time",
  "day",
  "week",
  "month",
  "year"
]

export const timeFormats: Record<TimeFormat, string> = {
  time: "h[:]mm A",
  day: "dddd",
  week: "[Week of] MMM D",
  month: "MMMM",
  year: "YYYY"
}

/**
 * Returns ISO start/end of a date in relation to a given time unit.
 * Uses previous unit (i.e. yesterday, last month, etc.) if no date is provided
 */
export const range = (unit: TimeUnit, date?: string): Range => {
  const start = dayjs(date ?? dayjs().subtract(1, unit).toISOString())
  return {
    start: start.startOf(unit).toISOString(),
    end: start.endOf(unit).toISOString()
  }
}

/**
 * Formats ISO string based on time unit given
 */
// TODO localize
export const formatIsoString = (unit: TimeFormat, date: string): string => {
  return dayjs(date).format(timeFormats[unit])
}
