import classNames from "classnames"
import GrowWrapper from "../components/grow-wrapper"
import Pulse from "../components/pulse"
import { type TimeFormat, formatIsoString } from "../lib/utils/time"
import { type Highlight } from "../types/highlight.types"
import { type FC } from "react"

interface Props {
  highlight: Highlight
  onSelect?: (highlight: Highlight) => void
  animationOrder?: number
  timeWindow: TimeFormat
  variant?: "small" | "large"
}

const HighlightListItem: FC<Props> = ({
  highlight,
  onSelect,
  animationOrder,
  timeWindow,
  variant = "small"
}: Props) => {
  return variant === "small" ? (
    <div key={highlight.id} className="mb-4 text-xl">
      <div className="border-l-white border-[1px] w-0 h-16 mx-auto animate-y-scale" />
      <GrowWrapper
        className="inline-block"
        onClick={() => {
          onSelect && onSelect(highlight)
        }}
      >
        <Pulse
          variant="small"
          className="mx-auto mb-4 animate-in fade-in ease-in-out duration-500"
        />
        <div
          className={classNames(
            animationOrder && `delay-${500 * animationOrder}`,
            "animate-in fade-in slide-in-from-left-4 ease-in-out duration-500"
          )}
        >
          <p className="text-gray-400">
            {formatIsoString(timeWindow, highlight.created_at)}
          </p>
          <p>{highlight.content}</p>
        </div>
      </GrowWrapper>
    </div>
  ) : (
    <div>
      <GrowWrapper className="mt-10 text-2xl inline-block">
        <p className="text-gray-400">
          {formatIsoString(timeWindow, highlight.created_at)}
        </p>
        <p className="my-2">{highlight.content}</p>
        <Pulse variant="large" className="mx-auto" />
      </GrowWrapper>
    </div>
  )
}

export default HighlightListItem
