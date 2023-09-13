import { withSessionRoute } from "../../lib/session"
import { NextApiRequest, NextApiResponse } from "next"
import type { User } from "./user"

export default withSessionRoute(logoutRoute)

function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy()
  res.send({ ok: true })
}
