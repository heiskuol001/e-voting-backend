import Admin from "../modules/admin.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const adminController = async (req, res) => {
    const { Email, Password, } = req.body
    try {
        const admin = await Admin.findOne({ Email })
        if (!admin) {
            return res.status(404).json({
                message:'Admin not found'
            })
        }
        const isMatch = await bcrypt.compare(Password, admin.Password)
        if (!isMatch) {
            return res.status(401).json({
                message:'Invalid credentials'
            })
        }
        const token = jwt.sign(
            { id: admin._id, Role: admin.Role },
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        )
        await Admin.findByIdAndUpdate(admin._id, {
            LastLogIn: new Date()
        })
        return res.status(200).json({
            message: 'Admin logged in successfully',
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}

export default adminController