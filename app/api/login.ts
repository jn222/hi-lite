import { withSessionRoute } from "../../lib/session"
import { NextApiRequest, NextApiResponse } from "next"
import { User } from "./user"

export default withSessionRoute(loginRoute)

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  res.status(200)
}
