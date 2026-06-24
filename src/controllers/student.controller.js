import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Student from '../modules/student.js'


const studentRegistration = async (req,res) => {
    const { Name, Email, RegNo, Faculty, Gender } = req.body
    try {
        const student = await Student.findOne({ Email })
        if (student) {
            return res.status(400).json({
                message:'student already exist'
            })
        }
        const defaultPassword = '00000000'
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(defaultPassword, salt)
        const newStudent = new Student({
            Name,
            Email,
            RegNo,
            Faculty,
            Gender,
            Password: hashedPassword
        })
        await newStudent.save();
        res.status(201).json({
            message: 'student added successfully',
            student: newStudent
        })

    } catch (error) {
        console.log('server error',error)
        res.status(500).json({
            message:'server error'
        })
    }
}

const studentLogin = async (req, res) => {
    const { RegNo, Password } = req.body
    try {
        const student = await Student.findOne({ RegNo })
        if (!student) {
            return res.status(404).json({
                message:'Invalid credentials'
            })
        }
        const isMatch = await bcrypt.compare(Password, student.Password)
        if (!isMatch) {
            return res.status(401).json({
                message:'Invalid credentials'
            })
        }
        const token = jwt.sign(
            { id: student._id, RegNo: student.RegNo, Role: student.Role },
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        )
        res.status(201).json({
            message: 'Login successful',
            token,
            student
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'server error'
        })
    }
}

export {studentRegistration, studentLogin}