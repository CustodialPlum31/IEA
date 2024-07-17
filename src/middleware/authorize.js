/*const authorize = (roles) => {
    return (req, res, next) => {
        if (typeof roles === 'string') {
            roles = [roles];
        }

        if (req.user && roles.includes(req.user.role)) {
            console.log(req.user.role);
            next();
        } else {
            console.log(req.user.role);
            res.status(403).send('Forbidden');
        }
    };
};

module.exports = authorize;

*/
const authorize = (roles) => {
    return (req, res, next) => {
        if (typeof roles === 'string') {
            roles = [roles];
        }

        if (req.user && roles.includes(req.user.role)) {
            console.log('Role authorized:', req.user.role);
            next();
        } else {
            console.log('Role forbidden:', req.user.role);
            res.status(403).send('Forbidden');
        }
    };
};

module.exports = authorize;
