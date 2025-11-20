import { User } from "../models/user.model.js";
import { Candidate } from "../models/candidate.model.js";
import { Scribe } from "../models/scribe.model.js";
import { NGO } from "../models/ngo.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  console.log("Incoming register request - Body:", req.body);
  console.log("Incoming register request - Role:", req.body.role);
  console.log("Incoming register request - Files:", req.files);
  console.log("Files received:", req.files); // Debug log

  console.log("=== REGISTRATION DEBUG ===");
  console.log("Role:", req.body.role);
  console.log("Body fields:", Object.keys(req.body));
  console.log("Files received:", req.files);
  console.log("=== END DEBUG ===");

  try {
    const {
      name,
      email,
      phone,
      password,
      // profile_photo,
      role,
      educational_qualification,
      reader,
      writer,
      online,
      offline,
      written,
      mcq,
      state,
      city,
      numLanguages,
      languages,
      // audio_sample_url,
      // writing_sample_url,
      address,
      numCandidates,
      numScribes,
    } = req.body;

    // Handle file paths
    const profile_photo = req.files?.profile_photo ? `/uploads/profiles/${req.files.profile_photo[0].filename}` : "";
    const audio_sample_url = req.files?.audio_sample ? `/uploads/audio/${req.files.audio_sample[0].filename}` : "";
    const writing_sample_url = req.files?.writing_sample ? `/uploads/writing/${req.files.writing_sample[0].filename}` : "";
    
    if (!name || !email || !phone || !password || !role) {
      return res.status(404).json({
        message: "Missing required fields",
        success: false,
      });
    }
    // check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already exists",
        success: false,
      });
    }
    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      profile_photo: req.file ? `/uploads/${req.file.filename}` : "",
      role,
    });

    await newUser.save();

    // Role-based creation
    let roleData;
    if (role === "candidate") {
      if (!educational_qualification) {
        return res.status(400).json({
          message: "Missing educational qualification",
          success: false,
        });
      }
      roleData = await Candidate.create({
        user: newUser._id,
        educational_qualification,
      });
    } else if (role === "scribe") {
      if (!educational_qualification) {
        return res.status(400).json({
          message: "Missing educational qualification",
          success: false,
        });
      }
      let parsedLanguages = [];
      if (req.body.languages) {
        try {
          parsedLanguages = JSON.parse(req.body.languages);
        } catch {
          parsedLanguages = [];
        }
      }
      const bool = (val) => val === "true" || val === true;
      roleData = await Scribe.create({
        user: newUser._id,
        educational_qualification,
        reader: bool(reader),
        writer: bool(writer),
        online: bool(online),
        offline: bool(offline),
        written: bool(written),
        mcq: bool(mcq),
        numLanguages,
        languages: parsedLanguages,
        state,
        city,
        audio_sample_url,
        writing_sample_url,
      });
    } else if (role === "ngo") {
      if (!address) {
        return res
          .status(400)
          .json({ message: "Missing address for NGO", success: false });
      }
      const newNGO = await NGO.create({
        user: newUser._id,
        address,
        numCandidates: numCandidates || 0,
        numScribes: numScribes || 0,
      });
      // Create all candidates under this NGO
      if (req.body.candidates && Array.isArray(req.body.candidates)) {
        for (const c of req.body.candidates) {
          try {
            const user = await User.create({
            name: c.name,
            email: c.email,
            phone: c.phone,
            password: await bcrypt.hash(c.password || "default123", 10),
            role: "candidate",
          });
          await Candidate.create({
            user: user._id,
            educational_qualification: c.educational_qualification,
          });

          newNGO.numCandidates += 1;

          } catch (error) {
            console.error(`Error creating NGO candidate ${c.email}:`, error);
          }
        }
      }

      // Create all scribes under this NGO
      if (req.body.scribes && Array.isArray(req.body.scribes)) {
        for (const s of req.body.scribes) {
          try {
            const user = await User.create({
            name: s.name,
            email: s.email,
            phone: s.phone,
            password: await bcrypt.hash(s.password || "default123", 10),
            role: "scribe",
          });
          await Scribe.create({
            user: user._id,
            educational_qualification: s.educational_qualification,
            reader: s.reader,
            writer: s.writer,
            online: s.online,
            offline: s.offline,
            written: s.written,
            mcq: s.mcq,
            numLanguages: s.numLanguages,
            languages: s.languages,
            state: s.state,
            city: s.city,
            audio_sample_url: s.audio_sample_url, // Add this
            writing_sample_url: s.writing_sample_url
          });

          newNGO.numScribes +=1;

          } catch (error) {
            console.error(`Error creating NGO scribe ${s.email}:`, error);
          }
        }
      }
      await newNGO.save();
      roleData = newNGO;
    }

    
    const { password: _, ...userSafe } = newUser.toObject();
    // send response if everything is done properly
    return res.status(201).json({
      message: `${role} registered successfully`,
      user: userSafe,
      roleData,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error while registering new user",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(404).json({
        message: "Missing required fields",
        success: false,
      });
    }
    // check if email exists in db or not
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Incorrect email",
        success: false,
      });
    }
    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        message: "Incorrect password",
        success: false,
      });
    }
    // check role
    if (user.role !== role) {
      return res.status(403).json({
        message: "You don't have the necessary role to access this resource",
        success: false,
      });
    }
    // token generation
    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    // create user
    user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.hashedPassword,
      profile_photo: user.profile_photo,
      role: user.role,
    };
    // store token in cookies
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true, // for security, so that hackers cannot manipulate it
        sameSite: "Strict",
      })
      .json({
        message: "logged in successfully",
        user,
        success: true,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error during login",
      success: false,
    });
  }
};

export const logout = (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error during logout",
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      profile_photo,
      educational_qualification,
      reader,
      writer,
      online,
      offline,
      written,
      mcq,
      numLanguages,
      languages,
      state,
      city,
      audio_sample_url,
      writing_sample_url,
      address,
      numCandidates,
      numScribes,
    } = req.body;

    if (!name || !email || !phone) {
      return res.status(404).json({
        message: "Missing required fields",
        success: false,
      });
    }

    // check if user is logged in or not
    const userId = req.id; // middleware authentication
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found. You need to login first to update profile",
        success: false,
      });
    }
    // update database profile
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (phone) {
      user.phone = phone;
    }
    if (profile_photo) {
      user.profile_photo = profile_photo;
    }

    await user.save();

    // Update role-specific info
    let roleDoc;
    if (user.role === "candidate") {
      roleDoc = await Candidate.findOneAndUpdate(
        { user: user._id },
        { educational_qualification },
        { new: true }
      );
    } else if (user.role === "scribe") {
      const updateData = {
        educational_qualification,
        reader,
        writer,
        online,
        offline,
        written,
        mcq,
        numLanguages,
        languages,
        state,
        city,
        audio_sample_url,
        writing_sample_url,
      };
      roleDoc = await Scribe.findOneAndUpdate({ user: user._id }, updateData, {
        new: true,
      });
    } else if (user.role === "ngo") {
      const updateData = {
        address,
        numCandidates,
        numScribes,
      };
      roleDoc = await NGO.findOneAndUpdate({ user: user._id }, updateData, {
        new: true,
      });
    }

    // create user
    user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.hashedPassword,    // not mentioned in job portal project
      profile_photo: user.profile_photo,
      role: user.role,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      roleData: roleDoc,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error while updating profile",
      success: false,
    });
  }
};
