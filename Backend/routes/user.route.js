import express from 'express'
import { login, logout, register, updateProfile } from '../controllers/user.controller.js'
import authenticateToken from '../middleware/isAuthenticated.js'
import upload from '../middleware/multer.js'

const router = express.Router()

// Use upload.fields for multiple file types
router.post("/register", upload.fields([
  { name: "profile_photo", maxCount: 1 },
  { name: "audio_sample", maxCount: 1 },
  { name: "writing_sample", maxCount: 1 }
]), register);

// router.route("/register").post(upload.single("profile_photo"),register)
router.route("/login").post(login)
// router.route("/profile/update").patch(authenticateToken,updateProfile)
router.route("/logout").post(logout)

// Protected routes
router.get("/profile/update", authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

export default router
