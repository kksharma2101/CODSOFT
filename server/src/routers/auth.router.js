import express from "express";
import { login, register } from "../controllers/auth.controller.js";

const router = express.Router();

// register router
router.post("/register", register);

// login router
router.post("/login", login);

export default router;
