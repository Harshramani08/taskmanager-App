import express from "express";
import {
  addTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controller/task.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.use(auth);
router.post("/", addTask);
router.get("/", getTasks);
router.delete("/:id", deleteTask);
router.put("/:id", updateTask);

export default router;
