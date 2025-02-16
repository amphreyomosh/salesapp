import { UsersDB } from "../db/users";
import { AuthUtils } from "../utils/auth";

export const AuthService = {
  login: async (email: string, password: string) => {
    const user = await UsersDB.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const isValidPassword = await AuthUtils.verifyPassword(
      password,
      user.password
    );

    if (!isValidPassword) {
      throw new Error("Invalid password");
    }

    const token = AuthUtils.generateToken(user.id, user.userType === "seller");

    return {
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
      },
    };
  },

  signup: async (userData: {
    name: string;
    email: string;
    password: string;
    userType: "buyer" | "seller";
  }) => {
    const existingUser = UsersDB.findByEmail(userData.email);

    if (existingUser) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await AuthUtils.hashPassword(userData.password);

    const user = UsersDB.create({
      ...userData,
      password: hashedPassword,
    });

    const token = AuthUtils.generateToken(user.id, false); // Pass isAdmin=false for new users

    return {
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
      },
    };
  },
};
