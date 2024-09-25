import express from "express";
import * as authController from "../Controllers/authController.js"
const router = express.Router()

router.route("/signup").post(authController.signUp)
router.route("/login").post(authController.signIn)



export default router