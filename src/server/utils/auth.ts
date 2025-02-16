import { hash, compare } from "bcryptjs";
import jwt, { SignOptions, Secret } from "jsonwebtoken";
import { authConfig } from "../config/config";
import { securityConfig } from "../config";

// You might need to install these type definitions if not already present:
// npm install --save-dev @types/bcryptjs @types/jsonwebtoken

interface JWTPayload {
  userId: string;
  isAdmin: boolean;
}

export const AuthUtils = {
  hashPassword: async (password: string): Promise<string> => {
    if (!password) throw new Error("Password is required");
    return hash(password, 10); // Using standard saltRounds since authConfig.password is not defined
  },

  verifyPassword: async (
    password: string,
    hashedPassword: string
  ): Promise<boolean> => {
    if (!password || !hashedPassword)
      throw new Error("Password and hashed password are required");
    return compare(password, hashedPassword);
  },

  generateToken: (userId: string, isAdmin: boolean): string => {
    if (!userId) throw new Error("User ID is required");
    if (!authConfig.jwt.secret) {
      throw new Error("JWT secret is not configured");
    }

    const payload: JWTPayload = { userId, isAdmin };
    const options: SignOptions = {
      expiresIn: parseInt(authConfig.jwt.expiresIn) || "24h",
    };

    return jwt.sign(payload, authConfig.jwt.secret as Secret, options);
  },

  verifyToken: async (token: string): Promise<JWTPayload> => {
    if (!token) throw new Error("Token is required");
    if (!authConfig.jwt.secret) {
      throw new Error("JWT secret is not configured");
    }

    return jwt.verify(token, authConfig.jwt.secret) as JWTPayload;
  },

  validateOrigin: (origin: string) => {
    if (securityConfig.cors.origin === "*") return true;
    return origin === securityConfig.cors.origin;
  },

  validatePayloadSize: (size: number) => {
    const maxSize = parseInt(securityConfig.validation.maxPayloadSize);
    return size <= maxSize;
  },
};
