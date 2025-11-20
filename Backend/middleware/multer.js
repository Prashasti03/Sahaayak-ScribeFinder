// import multer from "multer";
// import path from "path";
// import fs from "fs"

// // Ensure uploads folder exists
// const uploadDir = "uploads";
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// // Configure storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir); // files will be stored in /uploads folder
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });

// // File filter (optional, restrict to images)
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image/")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only image files are allowed"), false);
//   }
// };

// const upload = multer({ storage, fileFilter });

// export default upload;



import multer from "multer";
import path from "path";
import fs from "fs"

// Ensure uploads folder and subdirectories exist
const uploadDirs = ["uploads", "uploads/audio", "uploads/writing", "uploads/profiles"];
uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure storage with different destinations based on file type
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = "uploads";
    
    // Determine subdirectory based on field name
    if (file.fieldname === "audio_sample") {
      uploadPath = "uploads/audio";
    } else if (file.fieldname === "writing_sample") {
      uploadPath = "uploads/writing";
    } else if (file.fieldname === "profile_photo") {
      uploadPath = "uploads/profiles";
    }
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Updated file filter to accept multiple file types
const fileFilter = (req, file, cb) => {
  // Allow profile photos (images only)
  if (file.fieldname === "profile_photo") {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed for profile photos"), false);
    }
  }
  // Allow audio files for audio samples
  else if (file.fieldname === "audio_sample") {
    if (file.mimetype.startsWith("audio/")) {
      cb(null, true);
    } else {
      cb(new Error("Only audio files are allowed for audio samples"), false);
    }
  }
  // Allow documents and images for writing samples
  else if (file.fieldname === "writing_sample") {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
      "image/jpg"
    ];
    if (allowedTypes.includes(file.mimetype) || file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, DOC, DOCX, or image files are allowed for writing samples"), false);
    }
  }
  // Default case - reject unknown field names
  else {
    cb(new Error(`Unexpected file field: ${file.fieldname}`), false);
  }
};

const upload = multer({ 
  storage, 
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit for all files
  }
});

export default upload;