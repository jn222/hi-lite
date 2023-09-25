import Axios, { type AxiosResponse } from "axios"
import { type User } from "@/app/types/user.types"

const url = process.env.NEXT_PUBLIC_API_URL

export const UserApi = {
  authenticate: async (): Promise<AxiosResponse<User>> => {
    return await Axios.get<User>(url + "/authenticate", {
      withCredentials: true
    })
  },

  signup: async (
    name: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<User>> => {
    return await Axios.post<User>(
      url + "/signup",
      { name, email, password },
      {
        withCredentials: true
      }
    )
  },

  login: async (
    email: string,
    password: string
  ): Promise<AxiosResponse<User>> => {
    return await Axios.post<User>(
      url + "/login",
      { email, password },
      {
        withCredentials: true
      }
    )
  },

  logout: async (): Promise<void> => {
    await Axios.post(
      url + "/logout",
      {},
      {
        withCredentials: true
      }
    )
  }
}
