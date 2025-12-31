module.exports = function adminMiddleware(req, res, next) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized access.' });
        }

        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({
                message: 'Access denied. Admin privileges required.'
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            message: 'Admin authorization failed',
            error: error.message
        });
    }
};
