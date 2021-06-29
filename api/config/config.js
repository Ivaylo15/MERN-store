require('dotenv').config();

const env = process.env.NODE_ENV || process.env.ENV;


const config = {
    development: {
        port: process.env.PORT,
        dbURL: process.env.DB_URL,
    },
    production: {}
};


module.exports = config[env];
