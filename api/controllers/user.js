const jwt = require('../utils/jwt');
const User = require('../models/User');
const TokenBlacklist = require('../models/TokenBlacklist');
const statusCodes = require('../constants/status-codes');
const errorMessages = require('../constants/error-messages');

module.exports = {
    authUser: (req, res, next) => {
        const token = req.cookies[process.env.COOKIE_NAME];
        jwt.verifyToken(token)
            .then(({ id }) => User.findById(id)
                .then(user => res.send(user))
                .catch((e) => res.status(401).send(e.message))
            )
    },
    register: async (req, res, next) => {
        const { username, password } = req.body;

        try {
            const createdUser = await User.create({ username, password })
            res.status(statusCodes.OK).send(createdUser);
        } catch (e) {
            res.status(statusCodes.InternalServerError).json({ message: e.message });
            next();
        }
    },
    login: async (req, res, next) => {
        const { username, password } = req.body;

        try {
            const user = await User.findOne({ username });
            Promise.all([user, user.matchPassword(password)])
                .then(([user, match]) => {
                    if (!match) {
                        res.status(statusCodes.Unauthorized).send(errorMessages.IvalidPassword);
                        return;
                    }
                    const token = jwt.createToken({ id: user._id });
                    res.cookie(process.env.COOKIE_NAME, token).status(statusCodes.OK).send(user);
                }).catch(next);
        } catch (e) {
            res.status(statusCodes.InternalServerError).json({ message: e.message });
            next();
        }
    },
    logout: async (req, res, next) => {
        const token = req.cookies[process.env.COOKIE_NAME];
        try {
            const blacklistedToken = await TokenBlacklist.create({ token });
            res.clearCookie(process.env.COOKIE_NAME).status(statusCodes.OK).send('logout successfully')
        } catch (e) {
            res.status(statusCodes.InternalServerError).json({ message: e.message });
            next();
        }
    }
}