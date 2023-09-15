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

const Page = () => {
  return (
    <main>
      <div className="fixed px-5">
        {"<"}
      </div>
      <div className="w-full px-5 text-center">
        <div className="my-2">
          <div>
            <span className="text-gray-400">{weeklyHighlight.created_at}</span>
          </div>
          <div>
            <span>{weeklyHighlight.content}</span>
          </div>
        </div>
        <span className="relative flex h-6 w-6 mx-auto">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-6 w-6 bg-white"></span>
        </span>
        {dailyHighlights.map((highlight) => (
          <div key={highlight.id} className="mb-4">
            <div className="border-l-white border-[1px] w-0 h-16 mx-auto" />
            {/* TODO figure out flex */}
            <span className="relative flex h-3 w-3 mx-auto mb-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <div>
              <span className="text-gray-400">{highlight.created_at}</span>
            </div>
            <div>
              <span>{highlight.content}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Page
