import mongoose from 'mongoose'

const candidateSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Types.ObjectId,
            ref: 'Student',
            required: true,
            unique: true
        },
        Position: {
            type: String,
            required: true
        },
        Manifesto: {
            type: String
        },
        Votes: {
            type: Number,
            default:0
        }
    },
    {
        timestamps: true
    }
)

const Candidate = mongoose.model('Candidate', candidateSchema)

export default Candidate