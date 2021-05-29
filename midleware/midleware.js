exports.loginRequired = (req, res, next) => {
    if (req.session.user && req.session) {
        return next();
    } else {
        return res.redirect('/auth/login');
    }
}
