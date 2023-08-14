function authMiddleware(req, res, next) {
    if (req.session.loggedUser !== undefined) {
        next();
    } else {
        res.send('Esta página es solo para usuarios registrados')
    }
}

module.exports = authMiddleware;