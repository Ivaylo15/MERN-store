const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const rateLimit = require("express-rate-limit");
const constantValues = require('../constants/constantValues');

const limiter = rateLimit({
    windowMs: constantValues.RateLimitTimeFrame, // 15 minutes
    max: constantValues.RateLimitRequests // limit each IP to 100 requests per windowMs
  });

module.exports = (app) => {
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }));

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());
    
    app.use(cookieParser(process.env.COOKIE_SECRET));

    app.use(limiter);
};