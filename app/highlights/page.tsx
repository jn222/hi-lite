import classNames from "classnames"
import Pulse from "../components/pulse"
import GrowWrapper from "../components/grow-wrapper"

const weeklyHighlight = {
  id: 1,
  created_at: "Week of Sep 13",
  content: "Ate an apple",
}

const dailyHighlights = [
  {
    id: 1,
    created_at: "Sep 13, 1:10PM",
    content: "Ate an apple",
  },
  {
    id: 2,
    created_at: "Sep 12, 1:10PM",
    content: "Ate an orange",
  },
  {
    id: 3,
    created_at: "Sep 13, 1:10PM",
    content: "Ate a banana",
  },
]

// TODO Make wrapper for grow animation

const Page = () => {
  return (
    <main>
      <div className="fixed px-5 text-4xl">{"<"}</div>
      <div className="w-full px-5 text-center">
        <GrowWrapper className="my-2">
          <h1 className="text-xl">No highlights yet</h1>
        </GrowWrapper>
        <GrowWrapper className="my-2 text-xl">
          <p className="text-gray-400">{weeklyHighlight.created_at}</p>
          <p>{weeklyHighlight.content}</p>
        </GrowWrapper>
        <Pulse variant="large" className="mx-auto" />
        {dailyHighlights.map((highlight, index) => (
          <div key={highlight.id} className="mb-4">
            <div className="border-l-white border-[1px] w-0 h-16 mx-auto animate-y-scale" />
            <GrowWrapper>
              <Pulse
                variant="small"
                className="mx-auto mb-4 animate-in fade-in ease-in-out duration-500"
              />
              <div
                className={classNames(
                  `delay-${500 * index}`,
                  "animate-in fade-in slide-in-from-left-4 ease-in-out duration-500"
                )}
              >
                <p className="text-gray-400">{highlight.created_at}</p>
                <p>{highlight.content}</p>
              </div>
            </GrowWrapper>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Page
