import express from 'express'
import { login, logout, register, updateProfile, getProfile } from '../controllers/user.controller.js'
import authenticateToken from '../middleware/isAuthenticated.js'
import upload from '../middleware/multer.js'
import { Candidate } from '../models/candidate.model.js'
import { Scribe } from '../models/scribe.model.js'
import { NGO } from '../models/ngo.model.js'

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

// Profile routes - FIXED
router.get("/profile", authenticateToken, getProfile); // This is what Navbar needs

// Role-specific profile routes
router.get("/candidate/profile", authenticateToken, async (req, res) => {
  try {
    const profile = await Candidate.findOne({ user: req.userId });
    res.status(200).json({
      success: true,
      profile: profile || {}
    });
  } catch (error) {
    console.error('Candidate profile error:', error);
    res.status(500).json({
      message: "Server error while fetching candidate profile",
      success: false
    });
  }
});

router.get("/scribe/profile", authenticateToken, async (req, res) => {
  try {
    const profile = await Scribe.findOne({ user: req.userId });
    res.status(200).json({
      success: true,
      profile: profile || {}
    });
  } catch (error) {
    console.error('Scribe profile error:', error);
    res.status(500).json({
      message: "Server error while fetching scribe profile",
      success: false
    });
  }
});

router.get("/ngo/profile", authenticateToken, async (req, res) => {
  try {
    const profile = await NGO.findOne({ user: req.userId });
    res.status(200).json({
      success: true,
      profile: profile || {}
    });
  } catch (error) {
    console.error('NGO profile error:', error);
    res.status(500).json({
      message: "Server error while fetching NGO profile",
      success: false
    });
  }
});

// Update profile route - FIXED: Use router.patch (not router.route)
router.patch("/profile/update", authenticateToken, upload.fields([
  { name: "profile_photo", maxCount: 1 },
  { name: "audio_sample", maxCount: 1 },
  { name: "writing_sample", maxCount: 1 }
]), updateProfile);

export default router
