"use client"

import { useState, useEffect, type FC } from "react"
import MultipleChoiceGroup from "./components/multiple-choice-group"
import Button from "./components/button"
import { type TimeUnit } from "./types/highlight.types"
import ErrorText from "./components/error-text"
import { HighlightApi } from "./services/highlight-api/highlight-api"
import { clientTimeZone } from "./lib/utils/time"

// TODO document each component

const Page: FC = () => {
  const [highlights, setHighlights] = useState<any>([])
  const [highlight, setHighlight] = useState<string>("")
  const [designation, setDesignation] = useState<TimeUnit | undefined>()
  const [error, setError] = useState<string>("")
  const [selectionError, setSelectionError] = useState<string>("")

  const fetchPendingHighlights = (): void => {
    // Specify timezone to make sure ranges are in local time, not utc time
    HighlightApi.getPendingHighlights(clientTimeZone)
      .then((res) => {
        setHighlights([...res.data.highlights])
        setDesignation(res.data.designation)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    fetchPendingHighlights()
  }, [])

  const handleSubmit = (content: string): void => {
    setError("")
    HighlightApi.createHighlight(content)
      .then((_res) => {
        setHighlight("")
      })
      .catch((err) => {
        console.error(err)
        setError(err.message)
      })
  }

  const onSelect = (id: number, designation: TimeUnit): void => {
    setError("")
    HighlightApi.designateHighlight(id, designation)
      .then((_res) => {
        fetchPendingHighlights()
      })
      .catch((err) => {
        console.error(err)
        setSelectionError(err.message)
      })
  }
  return (
    <main className="h-full items-center">
      <div className="max-w-lg mx-auto p-5">
        <div className="align-middle">
          <textarea
            className="resize-none h-48 md:h-40 text-2xl flex w-full focus:outline-none bg-transparent focus:border-[1px] border-solid border-transparent border-b-white transition"
            maxLength={140}
            placeholder="What's one thing that went well today?"
            value={highlight}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              setHighlight(event.target.value)
            }}
          />
          <span className="text-gray-400">{140 - highlight.length}</span>
        </div>
        <div className="flex items-center justify-center">
          <Button
            onClick={() => {
              handleSubmit(highlight)
            }}
            disabled={!highlight}
          >
            Done
          </Button>
        </div>
        <div className="text-center">
          <ErrorText error={error} />
        </div>
      </div>
      <MultipleChoiceGroup
        className="m-5 my-[10vh] max-w-xl mx-auto"
        choices={highlights}
        onSelect={onSelect}
        designation={designation}
        error={selectionError}
      />
    </main>
  )
}

export default Page
