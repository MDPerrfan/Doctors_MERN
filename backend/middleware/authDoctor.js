import jwt from 'jsonwebtoken';

const authDoctor = async(req, res, next) => {
    try {
        // Extract token from headers (using 'Authorization' or a custom key like 'docToken')
        const token = req.headers['doctoken'];

        if (!token) {
            return res.status(401).json({ success: false, message: "Not authorized, token missing" });
        }

        // Verify and decode the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.body.docId = decodedToken.id; // Attach the doctor ID to the request
        next(); // Proceed to the next middleware or route
    } catch (error) {
        console.error(error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
        return res.status(500).json({ success: false, message: 'Authentication error' });
    }
};

export default authDoctor;