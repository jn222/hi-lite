import { type TimeUnit } from "@/app/types/highlight.types"
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"

dayjs.extend(timezone)
dayjs.extend(utc)

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

export const clientTimeZone = dayjs.tz.guess()

export const convertToUTC = (date: string): string => {
  return dayjs(date).toISOString()
}

// Note: format() automatically converts UTC to local system time zone

/**
 * Returns start/end of a date in local time, in relation to a given time unit.
 * Uses previous unit (i.e. yesterday, last month, etc.) if no date is provided
 */
export const range = (unit: TimeUnit, date?: string): Range => {
  const start = dayjs(date ?? dayjs().subtract(1, unit).format())
  return {
    start: start.startOf(unit).format(),
    end: start.endOf(unit).format()
  }
}

/**
 * Formats ISO string based on time unit given
 */
export const formatIsoString = (unit: TimeFormat, date: string): string => {
  return dayjs(date).format(timeFormats[unit])
}
