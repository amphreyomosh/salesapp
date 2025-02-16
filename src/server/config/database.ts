export const dbConfig = {
  // Mock DB config for now
  // Replace with actual DB configuration when implementing
  mockDb: {
    maxUsers: 1000,
    defaultPageSize: 10,
  },
  // Example MongoDB config
  mongodb: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017",
    dbName: process.env.DB_NAME || "marketplace",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
