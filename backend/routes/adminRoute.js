import express from 'express'
import { addDoctor, adminDashboard, allDoctors, appointmentsAdmin, cancelAppointment, loginAdmin } from '../controllers/adminController.js'
import upload from '../middleware/multer.js'
import authAdmin from '../middleware/authAdmin.js'
import { changeAvailability } from '../controllers/doctorController.js'

const adminRouter = express.Router()

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)
adminRouter.post('/all-doctor', authAdmin, allDoctors)
adminRouter.post('/change-availibility', authAdmin, changeAvailability)
adminRouter.post('/login', loginAdmin)
adminRouter.get('/appointments', authAdmin, appointmentsAdmin)
adminRouter.post('/cancel-appointment', authAdmin, cancelAppointment)
adminRouter.get('/admin-dashboard', authAdmin, adminDashboard)

export default adminRouter