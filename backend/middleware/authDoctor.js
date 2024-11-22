import jwt from 'jsonwebtoken';

const authDoctor = async(req, res, next) => {
    try {
        const { doctoken } = req.headers;
        if (!doctoken) {
            return res.status(401).json({ success: false, message: "Not authorized" });
        }
        // Verify and decode the token
        const decodedToken = jwt.verify(doctoken, process.env.JWT_SECRET);
        req.body.docId = decodedToken.id
        next(); // Proceed to the next middleware or route
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred during authentication.' });
    }
};


export default authDoctor;