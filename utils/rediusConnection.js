import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

let Client = null;

export const initialConnectionRedis = async () => {
  if (!Client) {
    Client = createClient({
      url: process.env.REDIS_URL,
    }).on("error", (err) => {
      console.log(err);
    });

    Client.on("ready", () => {
      console.log("Redis is ready ✅");
    });

    await Client.connect().then(() => {
      console.log("Redis connected");
      return Client;
    });
  }

  return Client;
};
