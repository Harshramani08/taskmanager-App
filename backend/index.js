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

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   }),
// );
app.use(
  cors({
    origin:
      "https://taskmanager-r4shkpf04-harsh-ramanis-projects-089471d3.vercel.app",
    credentials: true,
  }),
);
app.use("/api/auth", userRouter);
app.use("/api/tasks", taskRouter);

app.get("/", (req, res) => {
  res.send("Backend running");
});

// app.listen(port, () => {
//   console.log(`server started http://localhost:${port}`);
// });

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
