import express from "express";
import {
  getUser,
  loginUser,
  logoutUser,
  userRegister,
} from "../controller/auth.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", auth, getUser);

export default router;
