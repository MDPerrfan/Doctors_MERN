import express from 'express'
import { appointmentsDoctor, doctorList, doctorLogin } from '../controllers/doctorController.js';
import authDoctor from '../middleware/authDoctor.js';

const doctorRouter = express.Router();

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', doctorLogin)
doctorRouter.get('/doc-appointments', authDoctor, appointmentsDoctor)
export default doctorRouter;