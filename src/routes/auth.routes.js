import express from "express";

import authController from "../controller/auth.controller.js";

const router = express.Router();

router.post("/login", authController.login.bind(authController));
router.post("/register", authController.register.bind(authController));
router.post("/logout", authController.logout.bind(authController));

export default router;
// This code defines an Express router for handling authentication routes.
