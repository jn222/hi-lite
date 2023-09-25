import { type Highlight, type TimeUnit } from "@/app/types/highlight.types"

export interface PendingHighlightData {
  highlights: Highlight[]
  designation?: TimeUnit
}
