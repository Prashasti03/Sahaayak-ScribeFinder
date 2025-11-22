// import { ExamRequest } from "../models/examRequest.model.js"

// export const exam = async (req, res) => {
//     try {
//         const {exam_type, duration, location, language, date, time, needs_reader, needs_writer, is_online_exam, written_or_mcq} = req.body
//         const candidateId = req.candidateId
//         if(!exam_type || !duration || !location || !language || !date || !time || !needs_reader || !needs_writer || !is_online_exam || !written_or_mcq){
//             return res.status(400).json({
//                 message: "Please fill all the fields",
//                 success: false
//             })
//         }

//         const examRequest = await create({exam_type, 
//             duration, 
//             location, 
//             language, 
//             date, 
//             time, 
//             needs_reader, 
//             needs_writer, 
//             is_online_exam, 
//             written_or_mcq, 
//             candidateId})
//         return res.status(201).json({
//             message: "Exam information filled successfully",
//             success: true,
//             examRequest
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message: "Server error while filling the form",
//             success: false
//         })
//     }
// }

// // will be used in candidate's dashboard to filter scribes
// export const getAllExams = async (req, res) => {
//     try {
//         const keyword = req.query.keyword || ""
//         const query = {
//         $or:[
//             {exam_type:{$regex:keyword, $options:"i"}},
//             {duration:{$regex:keyword, $options:"i"}},
//             {location:{$regex:keyword, $options:"i"}},
//             {language:{$regex:keyword, $options:"i"}},
//             {date:{$regex:keyword, $options:"i"}},
//             {needs_reader:{$regex:keyword, $options:"i"}},
//             {needs_writer:{$regex:keyword, $options:"i"}},
//             {is_online_exam:{$regex:keyword, $options:"i"}},
//             {written_or_mcq:{$regex:keyword, $options:"i"}},
//         ]}
//         const exams = await ExamRequest.find(query)
//         if(!exams){
//             return res.status(404).json({
//                 message:"No exam found",
//                 success:false
//             })
//         }
//         return res.status(200).json({
//             exams,
//             success:true
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message: "Server error while getting exam information",
//             success: false
//         })
//     }
// }

// export const getExamById = async (req, res) => {
//     try {
//         const examId = req.params.id
//         const exam = await ExamRequest.findById(examId)
//         if(!exam){
//             return res.status(404).json({
//                 message:"No exam found",
//                 success:false
//             })
//         }
//         return res.status(200).json({
//             exam,
//             success:true
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message: "Server error while getting exam information by ID",
//             success: false
//         })
//     }
// }

// export const getCandidateExam = async (req, res) => {
//     try {
//         const candidateId = req.id
//         const exam = await ExamRequest.find({candidate: candidateId})
//         if(!exam){
//             return res.status(404).json({
//                 message:"No exam found",
//                 success:false
//             })
//         }
//         return res.status(200).json({
//             exam,
//             success:true
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message: "Server error while getting exam information for candidate",
//             success: false
//         })
//     }
// }




import { ExamRequest } from "../models/examRequest.model.js";
import { User } from "../models/user.model.js";
import { Scribe } from "../models/scribe.model.js";
import { Candidate } from "../models/candidate.model.js";

// Create exam request
export const createExamRequest = async (req, res) => {
  try {
    const { scribeId, examInfo } = req.body;
    const candidateId = req.userId; // From authentication middleware

    // Validate required fields
    if (!scribeId || !examInfo || !examInfo.examinationName) {
      return res.status(400).json({
        message: "Scribe ID and exam information are required",
        success: false
      });
    }

    // Check if scribe exists
    const scribe = await Scribe.findById(scribeId).populate('user');
    if (!scribe) {
      return res.status(404).json({
        message: "Scribe not found",
        success: false
      });
    }

    // Get candidate details
    const candidate = await User.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
        success: false
      });
    }

    // Check if request already exists
    const existingRequest = await ExamRequest.findOne({
      candidate: candidateId,
      scribe: scribe.user._id,
      status: 'pending'
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "You already have a pending request with this scribe",
        success: false
      });
    }

    // Create new exam request
    const examRequest = new ExamRequest({
      candidate: candidateId,
      scribe: scribe.user._id,
      candidateDetails: {
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone
      },
      scribeDetails: {
        name: scribe.user.name,
        email: scribe.user.email
      },
      examInfo: examInfo,
      status: 'pending'
    });

    await examRequest.save();

    // Populate the saved request for response
    const populatedRequest = await ExamRequest.findById(examRequest._id)
      .populate('candidate', 'name email phone')
      .populate('scribe', 'name email');

    res.status(201).json({
      message: "Exam request sent successfully",
      success: true,
      examRequest: populatedRequest
    });

  } catch (error) {
    console.error('Create exam request error:', error);
    res.status(500).json({
      message: "Server error while creating exam request",
      success: false,
      error: error.message
    });
  }
};

// Get incoming requests for scribe
export const getIncomingRequests = async (req, res) => {
  try {
    const scribeUserId = req.userId; // Logged-in scribe's user ID

    const requests = await ExamRequest.find({ 
      scribe: scribeUserId 
    })
    .populate('candidate', 'name email phone profile_photo')
    .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      requests: requests
    });

  } catch (error) {
    console.error('Get incoming requests error:', error);
    res.status(500).json({
      message: "Server error while fetching requests",
      success: false,
      error: error.message
    });
  }
};

// Get candidate's request status
export const getCandidateRequests = async (req, res) => {
  try {
    const candidateId = req.userId; // Logged-in candidate's user ID

    const requests = await ExamRequest.find({ 
      candidate: candidateId 
    })
    .populate('scribe', 'name email')
    .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      requests: requests
    });

  } catch (error) {
    console.error('Get candidate requests error:', error);
    res.status(500).json({
      message: "Server error while fetching requests",
      success: false,
      error: error.message
    });
  }
};

// Update request status (accept/reject)
export const updateRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;
    const scribeUserId = req.userId; // Logged-in scribe's user ID

    // Validate status
    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({
        message: "Invalid status. Must be 'accepted' or 'rejected'",
        success: false
      });
    }

    // Find and update request
    const request = await ExamRequest.findOne({
      _id: requestId,
      scribe: scribeUserId
    });

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
        success: false
      });
    }

    // Check if request is already processed
    if (request.status !== 'pending') {
      return res.status(400).json({
        message: `Request is already ${request.status}`,
        success: false
      });
    }

    request.status = status;
    request.updatedAt = new Date();
    await request.save();

    // Populate the updated request for response
    const updatedRequest = await ExamRequest.findById(requestId)
      .populate('candidate', 'name email phone')
      .populate('scribe', 'name email');

    res.status(200).json({
      message: `Request ${status} successfully`,
      success: true,
      examRequest: updatedRequest
    });

  } catch (error) {
    console.error('Update request status error:', error);
    res.status(500).json({
      message: "Server error while updating request",
      success: false,
      error: error.message
    });
  }
};