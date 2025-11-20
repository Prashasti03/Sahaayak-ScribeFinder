import mongoose from "mongoose";

const ngoSchema = new mongoose.Schema(
  {
    address:{type:String, required: true},
    numCandidates:{type: Number, default: 0},
    numScribes: {type: Number, default: 0},
    // candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
    // scribe: { type: mongoose.Schema.Types.ObjectId, ref: 'Scribe', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  })

  export const NGO =  mongoose.model("NGO", ngoSchema)