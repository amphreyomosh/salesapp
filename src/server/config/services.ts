export const servicesConfig = {
  email: {
    from: process.env.EMAIL_FROM || "noreply@marketplace.com",
    smtp: {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  },
  storage: {
    uploadDir: process.env.UPLOAD_DIR || "./uploads",
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
  },
};
