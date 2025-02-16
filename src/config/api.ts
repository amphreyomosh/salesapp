export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  endpoints: {
    auth: {
      login: "/auth/login",
      signup: "/auth/signup",
    },
  },
};
