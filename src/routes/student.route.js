import express from 'express'
import {studentRegistration, studentLogin} from "../controllers/student.controller.js"


const router = express.Router();

router.post('/register', studentRegistration);
router.post('/login', studentLogin)

export default router;