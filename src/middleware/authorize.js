
const authorize = (roles) => {
    return (req, res, next) => {
        if (typeof roles === 'string') {
            roles = [roles];
        }

        if (req.user && roles.includes(req.user.role)) {
            //console.log('Role permitido:', req.user.role);
            next();
        } else {
            console.log('Role prohibido:', req.user.role);
            res.status(403).send('No tienes rango suficiente');
        }
    };
};

module.exports = authorize;
