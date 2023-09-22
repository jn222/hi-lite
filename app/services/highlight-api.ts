import Axios from "axios"
import { type Highlight, type TimeUnit } from "../types/highlight.types"

// TODO
const url = "http://localhost:3001"

export const HighlightApi = {
  getHighlights: async (
    designation?: TimeUnit[],
    start?: string,
    end?: string
  ): Promise<Highlight[]> => {
    return await Axios.get(url + "/highlights", {
      params: {
        // Params serializer comma format not supported
        designation: designation?.join(","),
        start,
        end
      },
      withCredentials: true
    })
  }
}
