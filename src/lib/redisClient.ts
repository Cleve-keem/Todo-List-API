import dotenv from "dotenv";
dotenv.config();

import { createClient } from "redis";

export const client = createClient({
  // 1. password
  password: process.env.REDIS_PASSWORD || undefined,
  // 2. socket
  socket: {
    // host
    host: process.env.REDIS_HOST || "localhost",
    // port
    port: Number(process.env.REDIS_PORT),
    // reconnectStrategy
    reconnectStrategy: (retries) => Math.min(retries * 50 * 2000),
  },
});

// on error
client.on("error", (err) =>
  console.log("❌ [Redis] Client Error:", err.message),
);

// connect redis client
export const connectRedis = async () => {
  if (!client.isOpen) {
    try {
      await client.connect();
      console.log("🆙 [Redis] connected successfully!");
    } catch (err) {
      console.error("❌ [Redis] connection failed:", err);
    }
  }
};
