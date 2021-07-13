const jwt = require('jsonwebtoken');
const constantValues = require('../constants/constantValues');

const createToken = (data) => {
    return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: constantValues.ExpirationTimeToken });
}

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
            if(err) return reject(err);
            resolve(data);
        });
    });
}

module.exports = {
    createToken,
    verifyToken
}