"use client"

import GrowWrapper from "../components/grow-wrapper"
import { useEffect, useState } from "react"
import { formatIsoString, orderedTimeUnits, range } from "../lib/utils/time"
import { type Highlight, type TimeUnit } from "../types/highlight.types"
import HighlightList from "./highlight-list"
import { useRouter } from "next/navigation"
import { HighlightApi } from "../services/highlight-api"

const groupHighlightsByYear = (highlights: Highlight[]) => {
  const highlightsByYear: Record<string, Highlight[]> = {}
  for (let i = 0; i < highlights.length; i++) {
    const highlight = highlights[i]
    const year = formatIsoString("year", highlight.created_at)
    if (highlightsByYear[year]) {
      highlightsByYear[year].push(highlight)
    } else {
      highlightsByYear[year] = [highlight]
    }
  }
  return highlightsByYear
}

const YearlyHighlightList = ({
  highlights = [],
  onSelect
}: {
  highlights?: Highlight[]
  onSelect: (highlight: Highlight) => void
}) => {
  const highlightsByYear: Record<string, Highlight[]> =
    groupHighlightsByYear(highlights)
  return Object.keys(highlightsByYear).map((year) => {
    const yearlyHighlight = highlightsByYear[year].find(
      (highlight: Highlight) => highlight.designation.includes("year")
    )
    return (
      <>
        {!yearlyHighlight && <p className="my-2 text-2xl">{year}</p>}
        <HighlightList
          selectedHighlight={yearlyHighlight}
          highlights={highlightsByYear[year]}
          timeWindow={"year"}
          onSelect={onSelect}
        />
      </>
    )
  })
}

const Page = () => {
  const router = useRouter()
  //  TODO type highlights
  const [highlights, setHighlights] = useState<Highlight[]>()
  const [selectedHighlight, setSelectedHighlight] = useState<
  Highlight | undefined
  >()
  const [timeWindow, setTimeWindow] = useState<TimeUnit>("year")

  // TODO useSWR, maybe throw in service
  async function fetchHighlights (designation?: TimeUnit, date?: string) {
    let dateQuery = ""
    if (date && designation) {
      const { start, end } = range(designation, date)
      dateQuery = `&start=${start}&end=${end}`
    }
    const response = await fetch(
      `http://localhost:3001/highlights?designations=${
        designation || "year,month"
      }${dateQuery}`,
      {
        credentials: "include"
      }
    )
    const data = await response.json()
    data.length && setHighlights([...data])
  }

  useEffect(() => {
    HighlightApi.getHighlights(
      timeWindow === "year" ? ["year", "month"] : [timeWindow],
      selectedHighlight?.created_at
    )
  }, [selectedHighlight, timeWindow])

  const selectHighlight = (highlight: Highlight) => {
    setSelectedHighlight(highlight)
    const newTimeWindow =
      orderedTimeUnits[orderedTimeUnits.indexOf(timeWindow) - 1]
    // Ugly workaround for typing
    newTimeWindow !== "time" && setTimeWindow(newTimeWindow)
  }

  const back = () => {
    if (timeWindow === "year") {
      router.push("/")
    } else {
      const newTimeWindow =
        orderedTimeUnits[orderedTimeUnits.indexOf(timeWindow) + 1]
      // Ugly workaround for typing
      newTimeWindow !== "time" && setTimeWindow(newTimeWindow)
      if (timeWindow === "month") {
        setSelectedHighlight(undefined)
        fetchHighlights()
      } else {
        await fetchHighlights(timeWindow, selectedHighlight?.created_at)
        // Fetch in broader time window, set selected highlight based on which has correct designation
        setSelectedHighlight(
          highlights?.find((highlight) =>
            highlight.designation.includes(timeWindow)
          )
        )
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
