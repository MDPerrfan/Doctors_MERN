import validator from "validator"
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

//api to register user
const registerUser = async(req, res) => {

        try {
            const { name, email, password } = req.body
            if (!name || !email || !password) {
                res.json({ success: false, message: "Missing Details" })
            }
            if (!validator.isEmail(email)) {
                return res.status(400).json({ message: 'Invalid email format.' });
            }

            if (!validator.isLength(password, { min: 8 })) {
                return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
            }

            if (!validator.isLength(name, { min: 3 })) {
                return res.status(400).json({ message: 'Name must be at least 3 characters long.' });
            }
            // 2. Check if the doctor already exists (by email)
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User with this email already exists.' });
            }
            // 3. Hash the password before saving
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new userModel({
                name,
                email,
                password: hashedPassword
            })
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ success: true, token })
        } catch (error) {
            res.json({ success: false, message: error.message })
            console.log(error);
        }

    }
    //api for user login

const loginUser = async(req, res) => {
        try {
            const { email, password } = req.body;

            const user = await userModel.findOne({ email })
            if (!user) {
                res.status(401).json({ success: false, message: "User does not exist!" });
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (isMatch) {
                // Create a token with email as the payload
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
                res.json({
                    success: true,
                    token
                });
            } else {
                res.status(401).json({ success: false, message: "INVALID CREDENTIALS!" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred during user login.' });
        }
    }
    //api to get user profile data
const getProfile = async(req, res) => {
        try {
            const { userId } = req.body
            const userData = await userModel.findById(userId).select('-password')
            res.json({ success: true, userData })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }
    //api to update user profile
const updateProfile = async(req, res) => {
        try {
            const { userId, name, phone, address, dob, gender } = req.body
            const imageFile = req.file
            if (!name || !gender || !phone || !address || !dob) {
                return res.json({ success: false, message: "Data missing!" });
            }
            await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })
            if (imageFile) {
                //upload image to cloudinary
                const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
                const imageUrl = imageUpload.secure_url;

                await userModel.findByIdAndUpdate(userId, { image: imageUrl })
            }
            res.json({ success: true, message: "Profile Updated!" })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }
    //API for booking appointment
const bookAppointment = async(req, res) => {
        try {
            const { userId, docId, slotDate, slotTime } = req.body
            const docData = await doctorModel.findById(docId).select('-password')
            if (!docData.availabe) {
                return res.json({ success: false, message: "Doctor is not avaialble" })
            }
            let slots_booked = docData.slots_booked;
            //checking for slot availibility
            if (slots_booked) {
                // Check if slots_booked[slotDate] exists; if not, initialize it as an empty array
                if (!slots_booked[slotDate]) {
                    slots_booked[slotDate] = [];
                }

                // Now you can safely check if the slotTime is already booked
                if (slots_booked[slotDate].includes(slotTime)) {
                    return res.json({ success: false, message: "Slot not available" });
                } else {
                    slots_booked[slotDate].push(slotTime);
                }
            } else {
                slots_booked[slotDate] = []
                slots_booked[slotDate].push(slotTime)
            }
            delete docData.slots_booked;

            const userData = await userModel.findById(userId).select('-password')
            const appointmentData = new appointmentModel({
                userId,
                docId,
                userData,
                docData,
                amount: docData.fees,
                slotTime,
                slotDate,
                date: Date.now()
            })
            await appointmentData.save();
            //save new slots data in doctors data 
            await doctorModel.findByIdAndUpdate(docId, { slots_booked })
            res.json({ success: true, message: "Appointment Booked!" })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }
    //API to fetch appointment data
const userAppointment = async(req, res) => {
        try {
            const { userId } = req.body
            const appointment = await appointmentModel.find({ userId })
            res.json({ success: true, appointment })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    } //API to cancel the appointment
const cancelAppointment = async(req, res) => {
    try {
        const { userId, appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
            //verify appointment
        if (appointmentData.userId !== userId) {
            return res.josn({ success: true, message: "Unauthorized action" })
        }
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            //releasing doctor slot
        const { docId, slotDate, slotTime } = appointmentData
        const doctorData = await doctorModel.findById(docId)
        let slots_booked = doctorData.slots_booked
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })
        res.json({ success: true, message: "Appointment Cancelled!" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}
export {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    bookAppointment,
    userAppointment,
    cancelAppointment
}