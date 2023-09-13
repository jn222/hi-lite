import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next"
import { sessionOptions } from "./iron-config"
import type { User } from "../app/api/user"

export function withSessionRoute(handler: any) {
  return withIronSessionApiRoute(handler, sessionOptions)
}

export function withSessionSsr(handler: any) {
  return withIronSessionSsr(handler, sessionOptions)
}

declare module "iron-session" {
  interface IronSessionData {
    user?: User
  }
}
