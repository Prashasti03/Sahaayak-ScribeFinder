// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_photo: {type: String, default: "" },
    role: {
      type: String,
      enum: ["candidate", "scribe", "ngo"],
      required: true,
      default: "candidate",
    },
    created_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
