import express from "express";
import dotenv from "dotenv";
import daysRouter from "./Routers/Days/dayRouter.js";
import authRouter from "./Routers/Auth/authRouter.js";
import taskRouter from "./Routers/Tasks/tasksRouter.js";
import { connectDB } from "./utils/connectdataBase.js";
import cors from "cors";

dotenv.config({ path: ".env" });
const app = express();
const Port = process.env.PORT;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Routes
app.use("/days", daysRouter);
app.use("/auth", authRouter);

//listening
app
  .listen(Port)
  .on("listening", async () => {
    console.log(`listening successfully on port ${Port}`);
    await connectDB();
  })
  .on("error", (err) => {
    console.log(err);
  });
