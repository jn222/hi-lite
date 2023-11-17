import Axios, { type AxiosResponse } from "axios"
import { type Highlight, type TimeUnit } from "../../types/highlight.types"
import { type PendingHighlightData } from "./highlight-api.types"

const url = process.env.NEXT_PUBLIC_API_URL + "/highlights"

export const HighlightApi = {
  getHighlights: async (
    designations?: Array<TimeUnit | undefined>,
    start?: string,
    end?: string
  ): Promise<AxiosResponse<Highlight[]>> => {
    return await Axios.get<Highlight[]>(url, {
      params: {
        // Params serializer comma format not supported
        designations: designations?.join(","),
        start,
        end
      },
      withCredentials: true
    })
  },

  createHighlight: async (
    content: string
  ): Promise<AxiosResponse<Highlight>> => {
    return await Axios.post<Highlight>(
      url,
      { content },
      {
        withCredentials: true
      }
    )
  },

  designateHighlight: async (
    id: number,
    designation: TimeUnit
  ): Promise<AxiosResponse<Highlight>> => {
    return await Axios.post<Highlight>(
      url + `/${id}`,
      { designation },
      { withCredentials: true }
    )
  },

  getPendingHighlights: async (
    timezone: string
  ): Promise<AxiosResponse<PendingHighlightData>> => {
    return await Axios.get<PendingHighlightData>(url + "/pending", {
      params: {
        timezone
      },
      withCredentials: true
    })
  }
}
