export const apiConfig = {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
    endpoints: {
      auth: {
        login: '/api/auth/login',
        register: '/api/auth/register',
        logout: '/api/auth/logout',
        forgotPassword: '/api/auth/forgot-password',
        resetPassword: '/api/auth/reset-password',
      },
    },
  };
  
  export const authConfig = {
    jwt: {
    secret: process.env.JWT_SECRET || "your-secret-key",
    expiresIn: "1d",
  },
};
