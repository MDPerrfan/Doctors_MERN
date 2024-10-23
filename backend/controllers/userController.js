import validator from "validator"
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary';

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
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
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
export {
    registerUser,
    loginUser,
    getProfile,
    updateProfile
}