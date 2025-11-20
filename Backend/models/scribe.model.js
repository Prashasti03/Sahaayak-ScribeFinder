import mongoose from "mongoose";

const scribeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  educational_qualification: { type: String, required: true },
  reader: { type: Boolean, default: false },
  writer: { type: Boolean, default: false },
  online: { type: Boolean, default: false },
  offline: { type: Boolean, default: false },
  written: { type: Boolean, default: false },
  mcq: { type: Boolean, default: false },
  numLanguages: { type: Number, default: 0 },
  languages: [{ type: String }],  // array of strings
  state: {type: String, required: true},
  city: {type: String, required: true},
  audio_sample_url:  { type: String, default: "" },
  writing_sample_url:  { type: String, default: "" },
});

export const Scribe =  mongoose.model("Scribe", scribeSchema)
