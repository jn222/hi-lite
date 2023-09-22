import * as
import { ReactNode } from "react"
import GrowWrapper from "../components/grow-wrapper"
import { orderedTimeUnits } from "../lib/utils/time"
import { Highlight, TimeUnit } from "../types/highlight.types"
import HighlightListItem from "./highlight-list-item"

interface Props {
  selectedHighlight?: Highlight
  timeWindow: TimeUnit
  highlights?: Highlight[]
  onSelect?: (highlight: Highlight) => void
}

const HighlightList = ({
  selectedHighlight,
  highlights,
  timeWindow,
  onSelect
}: Props): ReactNode => {
  // Get one level down in time formatting to format main list
  const index = orderedTimeUnits.indexOf(timeWindow) - 1
  const listTimeWindow = orderedTimeUnits[index]
  return (
    <div>
      {selectedHighlight && (
        <HighlightListItem
          variant="large"
          highlight={selectedHighlight}
          timeWindow={timeWindow}
        />
      )}
      {highlights?.length ? (
        highlights.map((highlight, index) => (
          <HighlightListItem
            highlight={highlight}
            onSelect={onSelect}
            animationOrder={index}
            timeWindow={listTimeWindow}
          />
        ))
      ) : (
        <GrowWrapper className="my-2 text-2xl inline-block">
          <p>No highlights to show.</p>
        </GrowWrapper>
      )}
    </div>
  )
}

export default HighlightList
