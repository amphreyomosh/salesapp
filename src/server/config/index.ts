export * from "./database";
export * from "./security";
export * from "./services";
export * from "./auth";

export const serverConfig = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  apiPrefix: "/api",
  isDev: process.env.NODE_ENV !== "production",
  logLevel: process.env.LOG_LEVEL || "info",
};
