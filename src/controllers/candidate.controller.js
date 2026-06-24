import mongoose from 'mongoose'
import Student from '../modules/student.js'
import Candidate from '../modules/candidate.js'


const createCandidate = async (req, res) => {
    try {
        const { RegNo, Position, Manifesto } = req.body
        if (!RegNo || !Position) {
            return res.status(400).json({
                message:'regNo and position required'
            })
        }
        const student = await Student.findOne({ RegNo })
        if (!student) {
            return res.status(404).json({
                message:'Student not found'
            })
        }
        const existingCandidate = await Candidate.findOne({
            student: student._id
        })
        if (existingCandidate) {
            return res.status(400).json({
                message:'This student already exist as a candidate'
            })
        }
        const candidate = await Candidate.create({
            student: student._id,
            Position,
            Manifesto
        })
        return res.status(201).json({
            message: 'Candidate created successfully',
            candidate
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Server error',
            error:error.message
        })
    }
}

export default createCandidate