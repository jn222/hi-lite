import { withSessionRoute } from "../../lib/session"
import { NextApiRequest, NextApiResponse } from "next"
import { User } from "./user"

export default withSessionRoute(loginRoute)

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  // get user from database then:
  req.session.user = {
    id: 230,
    admin: true,
  }
  await req.session.save()
  res.send({ ok: true })
}
