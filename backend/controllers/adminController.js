import bcrypt from 'bcrypt'; // For password hashing
import doctorModel from '../models/doctorModel.js'; // Assuming you have a Doctor model for MongoDB
import validator from 'validator'; // For input validation
import { v2 as cloudinary } from 'cloudinary';
import jwt from 'jsonwebtoken'
const addDoctor = async(req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file; // The uploaded image file

        // 1. Validate inputs
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
            return res.status(400).json({ message: 'All fields are required, including the image file.' });
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
        const existingDoctor = await doctorModel.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ message: 'Doctor with this email already exists.' });
        }

        // 3. Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        // 5. Create the new doctor object
        const newDoctor = new doctorModel({
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            date: Date.now(),
            address: JSON.parse(address),
            image: imageUrl, // Store the path of the uploaded image
        });

        // 6. Save the doctor to the database
        await newDoctor.save();

        // 7. Send a success response
        return res.status(201).json({
            message: 'Doctor added!',
            doctor: {
                id: newDoctor._id,
                name: newDoctor.name,
                email: newDoctor.email,
                speciality: newDoctor.speciality,
                image: newDoctor.image
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'An error occurred while adding the doctor.' });
    }
};
//Api for admin login
const loginAdmin = async(req, res) => {
    try {
        const { email, password } = req.body;

        // Verify email and password against environment variables
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
            // Create a token with email as the payload
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return res.json({
                success: true,
                token
            });
        } else {
            return res.status(401).json({ success: false, message: "Failed to login!" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred during admin login.' });
    }
};
//api to get all doctors list 

const allDoctors = async(req, res) => {

    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred during admin login.' });
    }

}
export { addDoctor, loginAdmin, allDoctors };