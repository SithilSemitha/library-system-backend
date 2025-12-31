const jwt = require('jsonwebtoken');

module.exports = function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        // Expected format: Bearer <token>
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Invalid token format.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user info to request
        req.user = {
            uid: decoded.uid,
            role: decoded.role,
            email: decoded.email
        };

        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired token',
            error: error.message
        });
    }
};
