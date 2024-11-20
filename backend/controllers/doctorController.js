import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"
const changeAvailability = async(req, res) => {
    try {
        const { docId } = req.body

        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { availabe: !docData.availabe })
        res.json({ success: true, message: "Availability Changed!" })
    } catch (error) {
        res.json({ success: false, message: error.message })
        console.log(error);
    }
}

const doctorList = async(req, res) => {
        try {
            const doctors = await doctorModel.find({}).select(['-password', '-email'])
            res.json({ success: true, doctors })
        } catch (error) {
            res.json({ success: false, message: error.message })
            console.log(error);
        }
    }
    //API for login doctor
const doctorLogin = async(req, res) => {
        try {
            const { email, password } = req.body
            const doctor = await doctorModel.findOne({ email })
            if (!doctor) {
                res.json({ success: false, message: "Invalid Credentials" })

            }
            const isMatch = await bcrypt.compare(password, doctor.password)
            if (isMatch) {
                const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
                res.json({
                    success: true,
                    token
                })
            } else {
                res.json({ success: false, message: "Wrong Password!" })
            }
        } catch (error) {
            res.json({ success: false, message: error.message })
            console.log(error);
        }
    }
    //API to get doctor appointments for doctro panel
const appointmentsDoctor = async(req, res) => {
    try {
        const { docId } = req.body
        const appointments = await appointmentModel.find({ docId })
        res.json({
            success: true,
            appointments
        })
    } catch (error) {
        res.json({ success: false, message: error.message })
        console.log(error);
    }
}
export {
    changeAvailability,
    doctorList,
    doctorLogin,
    appointmentsDoctor
}