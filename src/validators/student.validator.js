import {z} from 'zod'


const studentValidator = z.object({
    Name: z.string().min(1, 'Name is required'),
    Email: z.string().email('Invalid email'),
    RegNo: z.string().min(1, 'Registration number is required'),
    Faculty: z.string().min(1, 'Faculty is required'),
    Gender: z.enum(['Male', 'Female'])
})

export default studentValidator