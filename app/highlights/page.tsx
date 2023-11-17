"use client"

import GrowWrapper from "../components/grow-wrapper"
import { type FC, useEffect, useState } from "react"
import { orderedTimeUnits, range, convertToUTC } from "../lib/utils/time"
import { type Highlight, type TimeUnit } from "../types/highlight.types"
import HighlightList from "./highlight-list"
import { useRouter } from "next/navigation"
import { HighlightApi } from "../services/highlight-api/highlight-api"
import YearlyHighlightList from "./yearly-highlight-list"

/**
 * Page displaying user's past recorded yearly, monthly, weekly,
 * and daily highlights hierarchically
 */
const Page: FC = () => {
  const router = useRouter()
  const [highlights, setHighlights] = useState<Highlight[]>()
  const [selectedHighlight, setSelectedHighlight] = useState<
    Highlight | undefined
  >()
  const [timeWindow, setTimeWindow] = useState<TimeUnit>("year")

  const fetchHighlights = (
    designation?: TimeUnit,
    date?: string,
    callback?: (highlights: Highlight[]) => void
  ): void => {
    let queryStart, queryEnd
    if (date && designation) {
      // Assume all dates are returned in UTC
      const { start, end } = range(designation, date)
      queryStart = convertToUTC(start)
      queryEnd = convertToUTC(end)
    }
    // TODO: Relook at implementation
    const listDesignations: Record<TimeUnit, Array<TimeUnit | undefined>> = {
      year: ["month"],
      // Not all weekly highlights are monthly highlights
      month: ["month", "week"],
      week: ["day"],
      day: ["day", undefined]
    }
    const queryDesignation = designation
      ? listDesignations[designation]
      : undefined
    HighlightApi.getHighlights(queryDesignation, queryStart, queryEnd)
      .then((res) => {
        // TODO if empty, refetch one level lower
        // TODO genericize top level list
        setHighlights([...res.data])
        callback && callback(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    fetchHighlights(timeWindow)
  }, [])

  /**
   * We call fetchHighlights manually instead of through a useEffect hook
   * to handle the back call, so we can find the highest ranking highlight and
   * re-set it to the selected highlight. Storing it in a tree is another option,
   * but that may get convoluted.
   * Caution note: state will not change within a call to a callback so use precalculated newTimeWindow
   */

  const selectHighlight = (highlight: Highlight): void => {
    // Whenever a highlight is drilled down into, fetch all highlights with the designation below
    const newTimeWindow =
      orderedTimeUnits[orderedTimeUnits.indexOf(timeWindow) - 1]
    // TODO: Ugly workaround for typing for now. window will never be "time" in this case
    if (newTimeWindow === "time") return
    setTimeWindow(newTimeWindow)
    setSelectedHighlight(highlight)
    fetchHighlights(newTimeWindow, highlight.created_at)
  }

  const back = (): void => {
    // Whenever we go back, fetch all highlights with the designation above
    if (timeWindow === "year") {
      router.push("/")
    } else {
      const newTimeWindow =
        orderedTimeUnits[orderedTimeUnits.indexOf(timeWindow) + 1]
      // TODO: Ugly workaround for typing for now. window will never be "time" in this case
      if (newTimeWindow === "time") return
      setTimeWindow(newTimeWindow)
      if (newTimeWindow === "year") {
        setSelectedHighlight(undefined)
        fetchHighlights("year")
      } else {
        const callback = (highlights: Highlight[]): void => {
          // Fetch in broader time window, set selected highlight based on which has the selected designation
          setSelectedHighlight(
            highlights?.find((highlight) =>
              highlight.designation.includes(newTimeWindow)
            )
          )
        }
        fetchHighlights(newTimeWindow, selectedHighlight?.created_at, callback)
      }
    }
  }

  return (
    <main>
      <GrowWrapper className="fixed px-5 text-4xl ml-[10vw]" onClick={back}>
        {"<"}
      </GrowWrapper>
      <div className="w-full px-5 text-center">
        {/* Use Different formatting for displaying all year/month highlights */}
        {timeWindow === "year" ? (
          <YearlyHighlightList
            highlights={highlights}
            onSelect={selectHighlight}
          />
        ) : (
          <HighlightList
            selectedHighlight={selectedHighlight}
            highlights={highlights}
            timeWindow={timeWindow}
            onSelect={timeWindow !== "day" ? selectHighlight : undefined}
          />
        )}
      </div>
    </main>
  )
}

export default Page
