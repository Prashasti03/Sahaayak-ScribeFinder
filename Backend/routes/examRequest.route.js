import express from 'express'
import { exam, getAllExams, getCandidateExam, getExamById} from '../controllers/examRequest.controller.js'
import authenticateToken from '../middleware/isAuthenticated.js'

const router = express.Router()

router.route("/fillExamDetails").post(authenticateToken, exam)
router.route("/get").get(authenticateToken, getAllExams)
router.route("/get/:id").get(authenticateToken, getExamById)
router.route("/getCandidateExam/:id").get(authenticateToken, getCandidateExam)

export default router