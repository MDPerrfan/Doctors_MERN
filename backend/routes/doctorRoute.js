import express from 'express'
import { appointmentCancel, appointmentComplete, appointmentsDoctor, docProfile, doctorList, doctorLogin, getDashboardData, updateDocProfile } from '../controllers/doctorController.js';
import authDoctor from '../middleware/authDoctor.js';

const doctorRouter = express.Router();

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', doctorLogin)
doctorRouter.get('/doc-appointments', authDoctor, appointmentsDoctor)
doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete)
doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancel)
doctorRouter.get('/dashboard', authDoctor, getDashboardData)
doctorRouter.get('/get-profile', authDoctor, docProfile)
doctorRouter.post('/update-profile', authDoctor, updateDocProfile)
export default doctorRouter;