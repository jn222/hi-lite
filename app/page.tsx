"use client"

import { useState, useEffect } from "react"
import MultipleChoiceGroup from "./components/multiple-choice-group"
import Button from "./components/button"

const Page = () => {
  // TODO type this correctly
  const [highlights, setHighlights] = useState<any>([])
  const [highlight, setHighlight] = useState<string>("")
  // TODO Use better state?
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string>("")
  async function fetchHighlights() {
    const response = await fetch("/api/highlights")
    const data = await response.json()
    setHighlights(data.data)
  }
  useEffect(() => {
    fetchHighlights()
  }, [])

  const handleSubmit = async () => {
    try {
      setError("")
      // TODO Abstract this
      const res = await fetch("http://localhost:3001/highlights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //   "API-Key": process.env.DATA_API_KEY,
        },
        body: JSON.stringify({ content: highlight }),
      })

      const data = await res.json()
      setHighlights([...highlights, ...data])
      setHighlight("")
    } catch (error: any) {
      // TODO display error msg
      console.error(error)
      setError(error.message)
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <main className="h-full items-center">
      <div className="max-w-lg mx-auto">
        <div className="m-5 align-middle">
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
          {/* TODO: put in separate component */}
          <Button onClick={handleSubmit}>Done</Button>
        </div>
      </div>
      <div className="m-5">
        {highlights && <MultipleChoiceGroup choices={highlights} />}
      </div>
    </main>
  )
}

export default Page
