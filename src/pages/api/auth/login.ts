import type { NextApiRequest, NextApiResponse } from "next";
import { authRoutes } from "../../../server/routes/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  return authRoutes.login(req, res);
}
