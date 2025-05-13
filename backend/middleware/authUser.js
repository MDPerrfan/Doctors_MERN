import jwt from 'jsonwebtoken';

const authUser = async(req, res, next) => {
    try {
        const { token } = req.headers; // Token should be passed as 'token' in headers

        if (!token) {
            return res.status(401).json({ success: false, message: "Not authorized" });
        }
        // Verify and decode the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decodedToken.id }; // Set user ID in req.user instead of req.body
        next(); // Proceed to the next middleware or route
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred during authentication.' });
    }
};

export default authUser;