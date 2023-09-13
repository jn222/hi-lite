import { withSessionRoute } from "../../lib/session"
import { NextApiRequest, NextApiResponse } from "next"

export type User = {
  id: number
  admin?: boolean
}

export default withSessionRoute(userRoute)

async function userRoute(
  req: NextApiRequest,
  res: NextApiResponse<{ user: any }>
) {
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.send({ user: req.session.user })
  }
}
