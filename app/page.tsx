"use client"

import { useState, useEffect } from "react"
import MultipleChoiceGroup from "./components/multiple-choice-group"
import Button from "./components/button"
import { range } from "./lib/utils/time"
import { type TimeUnit } from "./types/highlight.types"
import ErrorText from "./components/error-text"

// TODO page not found
// TODO document each component

const Page = () => {
  const [highlights, setHighlights] = useState<any>([])
  const [highlight, setHighlight] = useState<string>("")
  const [designation, setDesignation] = useState<TimeUnit | undefined>()
  // TODO Use better state?
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string>("")
  async function fetchPendingHighlights () {
    try {
      const response = await fetch("http://localhost:3001/highlights/pending", {
        credentials: "include"
      })
      const data = await response.json()
      if (!response.ok) throw data
      setHighlights([...data.highlights])
      setDesignation(data.designation)
    } catch (error: any) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchPendingHighlights()
  }, [])

  const handleSubmit = async () => {
    try {
      setError("")
      // TODO Abstract this, use useSWR or getServerSideProps
      const res = await fetch("http://localhost:3001/highlights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ content: highlight })
      })

      const response = await res.json()
      if (!res.ok) throw response
      setHighlight("")
    } catch (error: any) {
      console.error(error)
      setError(error.message)
    } finally {
      setSubmitting(false)
    }
  }
  const onSelect = async (id: number, designation: TimeUnit) => {
    try {
      setError("")
      const res = await fetch(`http://localhost:3001/highlights/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ designation })
      })
      const response = await res.json()
      if (!res.ok) throw response
      fetchPendingHighlights()
    } catch (error: any) {
      console.error(error)
      setError(error.message)
    }
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
          <Button onClick={handleSubmit} disabled={!highlight}>
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
      />
    </main>
  )
}

export default Page
