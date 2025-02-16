import { NextApiRequest, NextApiResponse } from "next";
import { AuthService } from "../services/auth";

export const authRoutes = {
  async login(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }

      const result = await AuthService.login(email, password);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "An error occurred",
      });
    }
  },

  async signup(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { name, email, password, userType } = req.body;

      if (!name || !email || !password || !userType) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      const result = await AuthService.signup({
        name,
        email,
        password,
        userType,
      });
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "An error occurred",
      });
    }
  },
};
