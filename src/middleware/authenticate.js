const authenticate = (req, res, next) => {
    console.log('Authenticating user...');
    if (!req.session.user) {
        console.log('No user in session, redirecting to login');
        return res.redirect('/login');
    }

    req.user = req.session.user;
    console.log('User authenticated:',req.user);
    console.log(req.session.user);
    next();
};

module.exports = authenticate;
