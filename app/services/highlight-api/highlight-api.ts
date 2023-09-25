import Axios, { type AxiosResponse } from "axios"
import { type Highlight, type TimeUnit } from "../../types/highlight.types"
import { type PendingHighlightData } from "./highlight-api.types"

const url = process.env.NEXT_PUBLIC_API_URL + "/highlights"
console.log(url)

export const HighlightApi = {
  getHighlights: async (
    designations?: TimeUnit[],
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

  getPendingHighlights: async (): Promise<
    AxiosResponse<PendingHighlightData>
  > => {
    return await Axios.get<PendingHighlightData>(url + "/pending", {
      withCredentials: true
    })
  }
}
