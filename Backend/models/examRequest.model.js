// models/ExamRequest.js
// import mongoose from "mongoose";

// const examRequestSchema = new mongoose.Schema({
//   candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   scribe: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   exam_type: {type: String, required: true},
//   duration: {type: String, required: true},
//   location: {type: String, required: true},
//   language: {type: Number, required: true},
//   date: {type: Date, required: true},
//   start_time: {type: String, required: true},
//   needs_reader: { type: Boolean, default: false },
//   needs_writer: { type: Boolean, default: false },
//   is_online_exam: { type: Boolean, default: false },
//   written_or_mcq: {type: Boolean, default: false},
//   status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
// });

// export const ExamRequest = mongoose.model("ExamRequest", examRequestSchema)


import mongoose from "mongoose";

const examRequestSchema = new mongoose.Schema({
  candidate: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  scribe: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  candidateDetails: {
    name: String,
    email: String,
    phone: String
  },
  scribeDetails: {
    name: String,
    email: String
  },
  examInfo: {
    examinationName: { type: String, required: true },
    type: [{ type: String }], // online, offline, written, mcq
    need: [{ type: String }], // reader, writer
    language: { type: String, required: true },
    date: { type: Date, required: true },
    reportingTime: { type: String, required: true },
    examLocation: { type: String, required: true }
  },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected'], 
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

examRequestSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export const ExamRequest = mongoose.model("ExamRequest", examRequestSchema);