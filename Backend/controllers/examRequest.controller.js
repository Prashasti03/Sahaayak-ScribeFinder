import { ExamRequest } from "../models/examRequest.model.js"

export const exam = async (req, res) => {
    try {
        const {exam_type, duration, location, language, date, time, needs_reader, needs_writer, is_online_exam, written_or_mcq} = req.body
        const candidateId = req.candidateId
        if(!exam_type || !duration || !location || !language || !date || !time || !needs_reader || !needs_writer || !is_online_exam || !written_or_mcq){
            return res.status(400).json({
                message: "Please fill all the fields",
                success: false
            })
        }

        const examRequest = await create({exam_type, 
            duration, 
            location, 
            language, 
            date, 
            time, 
            needs_reader, 
            needs_writer, 
            is_online_exam, 
            written_or_mcq, 
            candidateId})
        return res.status(201).json({
            message: "Exam information filled successfully",
            success: true,
            examRequest
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server error while filling the form",
            success: false
        })
    }
}

// will be used in candidate's dashboard to filter scribes
export const getAllExams = async (req, res) => {
    try {
        const keyword = req.query.keyword || ""
        const query = {
        $or:[
            {exam_type:{$regex:keyword, $options:"i"}},
            {duration:{$regex:keyword, $options:"i"}},
            {location:{$regex:keyword, $options:"i"}},
            {language:{$regex:keyword, $options:"i"}},
            {date:{$regex:keyword, $options:"i"}},
            {needs_reader:{$regex:keyword, $options:"i"}},
            {needs_writer:{$regex:keyword, $options:"i"}},
            {is_online_exam:{$regex:keyword, $options:"i"}},
            {written_or_mcq:{$regex:keyword, $options:"i"}},
        ]}
        const exams = await ExamRequest.find(query)
        if(!exams){
            return res.status(404).json({
                message:"No exam found",
                success:false
            })
        }
        return res.status(200).json({
            exams,
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server error while getting exam information",
            success: false
        })
    }
}

export const getExamById = async (req, res) => {
    try {
        const examId = req.params.id
        const exam = await ExamRequest.findById(examId)
        if(!exam){
            return res.status(404).json({
                message:"No exam found",
                success:false
            })
        }
        return res.status(200).json({
            exam,
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server error while getting exam information by ID",
            success: false
        })
    }
}

export const getCandidateExam = async (req, res) => {
    try {
        const candidateId = req.id
        const exam = await ExamRequest.find({candidate: candidateId})
        if(!exam){
            return res.status(404).json({
                message:"No exam found",
                success:false
            })
        }
        return res.status(200).json({
            exam,
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server error while getting exam information for candidate",
            success: false
        })
    }
}