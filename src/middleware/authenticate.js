const authenticate = (req, res, next) => {
    console.log('Autenticando usuario');
    if (!req.session.user) {
        console.log('No accedio usuario');
        return res.redirect('/login');
    }

    req.user = req.session.user;
    console.log('Usuario autenticado:',req.user);
    console.log(req.session.user);
    next();
};

module.exports = authenticate;
