import express from 'express'
import connectDB from './configs/database.js'
import registration from './routes/student.route.js'
import candidateRegistration from './routes/candidate.route.js'
import {config} from 'dotenv'



const app = express()

config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 8000

app.use('/student', registration)
app.use('/candidate', candidateRegistration)

const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log('server failed to start')
    }
}

export default startServer