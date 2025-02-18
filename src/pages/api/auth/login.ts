import type { NextApiRequest, NextApiResponse } from "next";
import { AuthUtils } from "../../../server/utils/auth";
import { UsersDB } from "../../../server/db/users";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { email, password } = req.body;

    const user = await UsersDB.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await AuthUtils.verifyPassword(
      password,
      user.password
    );
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = AuthUtils.generateToken(user.id, user.userType === "seller");

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
