import type { NextApiRequest, NextApiResponse } from "next";
import { authRoutes } from "../../../server/routes/auth";

type SignupResponse = {
  success: boolean;
  message?: string;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    userType: "buyer" | "seller";
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SignupResponse>
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  return authRoutes.signup(req, res);
}
