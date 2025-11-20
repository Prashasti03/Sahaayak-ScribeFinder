// models/Candidate.js
import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  educational_qualification: { type: String, required: true }
});

export const Candidate = mongoose.model("Candidate", candidateSchema)
