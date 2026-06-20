import express from "express";
import cors from "cors";
import userRouter from "./routers/auth.routes.js";
import taskRouter from "./routers/task.routes.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config();
connectDB();

const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://taskmanager-app-gamma.vercel.app",
    ],
    credentials: true,
  }),
);

app.use("/api/auth", userRouter);
app.use("/api/tasks", taskRouter);

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(port, hostname, () => {
  console.log(`server started http://${hostname}:${port}`);
});
