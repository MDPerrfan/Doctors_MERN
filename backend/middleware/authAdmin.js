import jwt from 'jsonwebtoken';

const authAdmin = async(req, res, next) => {
    try {
        const { admintoken } = req.headers; // Token should be passed as 'admintoken' in headers

        if (!admintoken) {
            return res.status(401).json({ success: false, message: "Not authorized" });
        }

        // Verify and decode the token
        const decodedToken = jwt.verify(admintoken, process.env.JWT_SECRET);

        // Check if the decoded email matches the admin email
        if (decodedToken.email !== process.env.ADMIN_EMAIL) {
            return res.status(401).json({ success: false, message: "Not authorized" });
        }

        next(); // Proceed to the next middleware or route
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred during authentication.' });
    }
};

export default authAdmin;