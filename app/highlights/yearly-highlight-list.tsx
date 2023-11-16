import { type FC } from "react"
import { formatIsoString } from "../lib/utils/time"
import { type Highlight } from "../types/highlight.types"
import HighlightList from "./highlight-list"

/**
 * Utility function for grouping highlights by year
 */

const groupHighlightsByYear = (
  highlights: Highlight[]
): Record<string, Highlight[]> => {
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

interface Props {
  highlights?: Highlight[]
  onSelect: (highlight: Highlight) => void
}

/**
 * Top level highlight list. Separate from other designations
 * due to years being displayed altogether
 */

const YearlyHighlightList: FC<Props> = ({
  highlights = [],
  onSelect
}: Props) => {
  const highlightsByYear: Record<string, Highlight[]> =
    groupHighlightsByYear(highlights)
  return Object.keys(highlightsByYear).map((year) => {
    const yearlyHighlight = highlightsByYear[year].find(
      (highlight: Highlight) => highlight.designation.includes("year")
    )
    return (
      <div key={year}>
        {!yearlyHighlight && <p className="my-2 text-2xl">{year}</p>}
        <HighlightList
          selectedHighlight={yearlyHighlight}
          highlights={highlightsByYear[year]}
          timeWindow={"year"}
          onSelect={onSelect}
        />
      </div>
    )
  })
}

export default YearlyHighlightList
