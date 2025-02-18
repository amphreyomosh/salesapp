const isProd = process.env.NODE_ENV === "production";

export const apiConfig = {
  baseUrl: isProd ? process.env.NEXT_PUBLIC_API_URL : "http://localhost:3000",
  endpoints: {
    auth: {
      login: "/api/auth/login",
      signup: "/api/auth/signup",
      verify: "/api/auth/verify",
    },
  },
};
