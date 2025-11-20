// models/ExamRequest.js
import mongoose from "mongoose";

const examRequestSchema = new mongoose.Schema({
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
  scribe: { type: mongoose.Schema.Types.ObjectId, ref: 'Scribe', required: true },
  exam_type: {type: String, required: true},
  duration: {type: String, required: true},
  location: {type: String, required: true},
  language: {type: Number, required: true},
  date: {type: Date, required: true},
  start_time: {type: String, required: true},
  needs_reader: { type: Boolean, default: false },
  needs_writer: { type: Boolean, default: false },
  is_online_exam: { type: Boolean, default: false },
  written_or_mcq: {type: Boolean, default: false},
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
});

export const ExamRequest = mongoose.model("ExamRequest", examRequestSchema)
