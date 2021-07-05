const jwt = require('./jwt');
const TokenBlacklist = require('../models/TokenBlacklist');
const User = require('../models/User');
const statusCodes = require('../constants/status-codes');
const errorMessages = require('../constants/error-messages');

module.exports = (redirectAuthenticated = true) => {
    return (req, res, next) => {
        const token = req.cookies[process.env.COOKIE_NAME] || '';

        Promise.all([
            jwt.verifyToken(token),
            TokenBlacklist.findOne({ token })
        ])
            .then(([data, blacklistToken]) => {
                if (blacklistToken) { return Promise.reject(new Error('blacklist token')) }

                User.findById(data.id)
                    .then((user) => {
                        req.user = user;
                        next();
                    })
            })
            .catch( err => {
                if(!redirectAuthenticated) { next(); return; }
                
                if(['token expired', 'blacklisted token', 'jwt must be provided'].includes(err.message)){
                    res.status(statusCodes.Unauthorized).send(errorMessages.Unauthorized);
                    return;
                }
                next(err);
            })
    }
}