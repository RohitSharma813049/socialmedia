import express from "express";
import {
  Login,
  Register,
  Logout,
  checkNickname,
 searchUser
} from "../controller/auth.controller.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);

// 🔥 Real-time nickname check
router.get("/check-nickname", checkNickname);
router.get("/serach", searchUser);


export default router;
