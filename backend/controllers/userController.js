import validator from "validator"
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
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
export { registerUser, loginUser }