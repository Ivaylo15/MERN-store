const app = require('express')();

require('./config/express')(app);
require('./config/routes')(app);


module.exports = app;