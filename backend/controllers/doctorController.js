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
const appointmentsDoctor = async(req, res) => {
    try {
        const { docId } = req.body;

        if (!docId) {
            return res.status(400).json({ success: false, message: "Doctor ID is missing" });
        }

        const appointments = await appointmentModel.find({ docId });
        res.json({
            success: true,
            appointments,
        });
    } catch (error) {
        console.error("Error in appointmentsDoctor controller:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
//API to mark appointment completed
const appointmentComplete = async(req, res) => {
        try {
            const { docId, appointmentId } = req.body
            const appointmentData = await appointmentModel.findById(appointmentId)
            if (appointmentData && appointmentData.docId === docId) {
                await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
                return res.json({ success: true, message: "Appointment completed" })
            } else {
                return res.json({ success: false, message: "Failed!" })
            }
        } catch (error) {
            console.error("Error in appointmentsDoctor controller:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    }
    //API to cancel appointment completed
const appointmentCancel = async(req, res) => {
        try {
            const { docId, appointmentId } = req.body
            const appointmentData = await appointmentModel.findById(appointmentId)
            if (appointmentData && appointmentData.docId === docId) {
                await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
                return res.json({ success: true, message: "Appointment Cancelled!" })
            } else {
                return res.json({ success: false, message: "Failed!" })

            }
        } catch (error) {
            console.error("Error in appointmentsDoctor controller:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    }
    //API to get doctor dashboard data
const getDashboardData = async(req, res) => {
        try {
            const { docId } = req.body
            const appointments = await appointmentModel.find({ docId })
            let earnings = 0;
            appointments.map((item) => {
                if (item.isCompleted || item.payment) {
                    earnings += item.payment;
                }
            })
            let patients = []
            appointments.map((item) => {
                if (!patients.includes(item.userId)) {
                    patients.push(item.userId)
                }
            })
            const dashData = {
                earnings,
                appointments: appointments.length,
                patients: patients.length,
                latestAppointments: appointments.reverse().slice(0, 5)
            }
            res.json({
                success: true,
                dashData
            })
        } catch (error) {
            console.error("Error in getdashboarddata controller:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    }
    //API for doctor profile
const docProfile = async(req, res) => {
        try {
            const { docId } = req.body
            const profileData = await doctorModel.findById(docId).select('-password')
            res.json({ success: true, profileData })
        } catch (error) {
            console.error("Error in docProfile controller:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    }
    //API to udpate doctor profile data
const updateDocProfile = async(req, res) => {
    try {
        const { docId, fees, address, available } = req.body
        await doctorModel.findByIdAndUpdate(docId, { fees, address, available })
        res.json({ success: true, message: "Profile Updated!" })
    } catch (error) {
        console.error("Error in docProfile controller:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}
export {
    changeAvailability,
    doctorList,
    doctorLogin,
    appointmentsDoctor,
    appointmentCancel,
    appointmentComplete,
    getDashboardData,
    docProfile,
    updateDocProfile
}