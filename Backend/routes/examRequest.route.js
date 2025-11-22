// import express from 'express'
// import { exam, getAllExams, getCandidateExam, getExamById} from '../controllers/examRequest.controller.js'
// import authenticateToken from '../middleware/isAuthenticated.js'

// const router = express.Router()

// router.route("/fillExamDetails").post(authenticateToken, exam)
// router.route("/get").get(authenticateToken, getAllExams)
// router.route("/get/:id").get(authenticateToken, getExamById)
// router.route("/getCandidateExam/:id").get(authenticateToken, getCandidateExam)

// export default router




import express from 'express';
import { 
  createExamRequest, 
  getIncomingRequests, 
  getCandidateRequests, 
  updateRequestStatus 
} from '../controllers/examRequest.controller.js';
import authenticateToken from '../middleware/isAuthenticated.js';

const router = express.Router();

// Candidate routes
router.post('/request', authenticateToken, createExamRequest);
router.get('/candidate/requests', authenticateToken, getCandidateRequests);

// Scribe routes
router.get('/scribe/incoming-requests', authenticateToken, getIncomingRequests);
router.patch('/request/:requestId/status', authenticateToken, updateRequestStatus);

export default router;