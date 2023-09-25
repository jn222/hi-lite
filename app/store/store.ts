import { create } from "zustand"
import { type User } from "../types/user.types"

interface UserState {
  user: User | undefined
  setUser: (user: User | undefined) => void
}

export const useUserStore = create<UserState>()((set) => ({
  user: undefined,
  setUser: (user) => {
    set({ user })
  }
}))
