const app = require('express')();

require('./config/express')(app);
require('./config/routes')(app);

app.post('/product', (req, res) => {res.sendStatus(200)})

module.exports = app;