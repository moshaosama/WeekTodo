import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
const app = express();
const Port = process.env.PORT;

// Middleware
app.use(express.json());

app
  .listen(Port)
  .on("listening", () => {
    console.log(`listening successfully on port ${Port}`);
  })
  .on("error", (err) => {
    console.log(err);
  });
