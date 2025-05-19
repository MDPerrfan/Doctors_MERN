import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongoDB.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()
    //middlewares
app.use(express.json())
const allowedOrigins = [
    'http://localhost:5173',
    'https://doctorsbd24.onrender.com',
    'https://doctors-mern.vercel.app',
    'https://doctors-mern-4frp.vercel.app',
    'https://doctorsbdadmin.onrender.com'
]
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

//api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)
app.get('/', (req, res) => {
    res.send("Api working")
})

app.listen(port, () => console.log("Server Started", port))