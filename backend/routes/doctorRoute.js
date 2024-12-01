import express from 'express'
import { appointmentCancel, appointmentComplete, appointmentsDoctor, doctorList, doctorLogin, getDashboardData } from '../controllers/doctorController.js';
import authDoctor from '../middleware/authDoctor.js';

const doctorRouter = express.Router();

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', doctorLogin)
doctorRouter.get('/doc-appointments', authDoctor, appointmentsDoctor)
doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete)
doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancel)
doctorRouter.get('/dashboard', authDoctor, getDashboardData)

export default doctorRouter;