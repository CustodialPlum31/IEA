const authorize = (roles) => {
    return (req, res, next) => {
        if (typeof roles === 'string') {
            roles = [roles];
        }

        if (req.user && roles.includes(req.user.role)) {
            next();
        } else {
            res.status(403).send('Forbidden');
        }
    };
};

module.exports = authorize;

