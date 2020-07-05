exports.isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
        next();
        return;
    }
    return res.status(401).json();
}

exports.isNotAuthenticated = (req, res, next) => {
    if (!req.session.userId) {
        next();
        return;
    }
    return res.status(403).json();
}