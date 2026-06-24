import express from 'express'
import createCandidate from '../controllers/candidate.controller.js'

const router = express.Router();

router.post('/register', createCandidate)

export default router