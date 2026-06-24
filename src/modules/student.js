import mongoose from 'mongoose'

const GENDER = {
    MALE: 'Male',
    FEMALE:'Female'
}


const studentSchema = new mongoose.Schema(
    {
        Name: {
            type: String,
            required: true,
        },
        Email: {
            type: String,
            required:true,
            lowercase: true,
            trim: true,
            unique:true
        },
        RegNo: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
            unique:true
        },
        Password: {
            type: String,
            required: true,
            minlength: 8,
        },
        Role: {
            type: String,
            default: 'student'
        },
        Faculty: {
            type: String,
            required: true,
            enum:['FST','FBM','FoE','FoL']
        },
        Gender: {
            type: String,
            required: true,
            enum:Object.values(GENDER)
        },
        isPasswordChanged: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps:true
    }
)

const Student = mongoose.model('Student', studentSchema)

export default Student