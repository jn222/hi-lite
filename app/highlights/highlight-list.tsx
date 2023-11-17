import { type FC } from "react"
import GrowWrapper from "../components/grow-wrapper"
import { orderedTimeUnits } from "../lib/utils/time"
import { type Highlight, type TimeUnit } from "../types/highlight.types"
import HighlightListItem from "./highlight-list-item"

interface Props {
  selectedHighlight?: Highlight
  timeWindow: TimeUnit
  highlights?: Highlight[]
  onSelect?: (highlight: Highlight) => void
}

/** Shows all highlights of a certain designation */

const HighlightList: FC<Props> = ({
  selectedHighlight,
  highlights,
  timeWindow,
  onSelect
}: Props) => {
  // Get one level down in time formatting to format main list
  const index = orderedTimeUnits.indexOf(timeWindow) - 1
  const listTimeWindow = orderedTimeUnits[index]
  return (
    <div>
      {selectedHighlight ?? highlights?.length ? (
        <>
          {selectedHighlight && (
            <HighlightListItem
              variant="large"
              highlight={selectedHighlight}
              timeWindow={timeWindow}
            />
          )}
          {highlights?.map((highlight, index) => (
            <HighlightListItem
              key={highlight.id}
              highlight={highlight}
              onSelect={onSelect}
              animationOrder={index}
              timeWindow={listTimeWindow}
            />
          ))}
        </>
      ) : (
        <GrowWrapper className="my-2 text-2xl inline-block">
          <p>No highlights to show.</p>
        </GrowWrapper>
      )}
    </div>
  )
}

export default HighlightList
