"use client"

import GrowWrapper from "../components/grow-wrapper"
import { type FC, useEffect, useState } from "react"
import { orderedTimeUnits, range } from "../lib/utils/time"
import { type Highlight, type TimeUnit } from "../types/highlight.types"
import HighlightList from "./highlight-list"
import { useRouter } from "next/navigation"
import { HighlightApi } from "../services/highlight-api/highlight-api"
import YearlyHighlightList from "./yearly-highlight-list"

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
      const { start, end } = range(designation, date)
      queryStart = start
      queryEnd = end
    }
    HighlightApi.getHighlights(
      designation === "year"
        ? ["year", "month"]
        : designation
        ? [designation]
        : undefined,
      queryStart,
      queryEnd
    )
      .then((res) => {
        if (res.data.length) {
          setHighlights([...res.data])
          callback && callback(res.data)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    fetchHighlights(timeWindow)
  }, [])

  const selectHighlight = (highlight: Highlight): void => {
    const newTimeWindow =
      orderedTimeUnits[orderedTimeUnits.indexOf(timeWindow) - 1]
    // Ugly workaround for typing
    newTimeWindow !== "time" && setTimeWindow(newTimeWindow)
    setSelectedHighlight(highlight)
    fetchHighlights(
      // Ugly workaround for typing
      newTimeWindow !== "time" ? newTimeWindow : undefined,
      highlight.created_at
    )
  }

  const back = (): void => {
    if (timeWindow === "year") {
      router.push("/")
    } else {
      const newTimeWindow =
        orderedTimeUnits[orderedTimeUnits.indexOf(timeWindow) + 1]
      // Ugly workaround for typing
      newTimeWindow !== "time" && setTimeWindow(newTimeWindow)
      if (newTimeWindow === "year") {
        setSelectedHighlight(undefined)
        fetchHighlights("year")
      } else {
        const callback = (highlights: Highlight[]): void => {
          // Fetch in broader time window, set selected highlight based on which has correct designation
          setSelectedHighlight(
            highlights?.find((highlight) =>
              highlight.designation.includes(timeWindow)
            )
          )
        }
        fetchHighlights(timeWindow, selectedHighlight?.created_at, callback)
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
