import express from 'express'
import { login, logout, register, updateProfile } from '../controllers/user.controller.js'
import authenticateToken from '../middleware/isAuthenticated.js'
import upload from '../middleware/multer.js'

const router = express.Router()

router.route("/register").post(upload.single("profile_photo"),register)
router.route("/login").post(login)
router.route("/profile/update").patch(authenticateToken,updateProfile)
router.route("/logout").post(logout)

export default router
