const dbConnection = require('./config/database');
require('dotenv').config();
const app = require('./app');

dbConnection().then(() => {

    require('./config/express')(app);
    require('./config/routes')(app);

    app.listen(process.env.PORT, console.log(`At port ${process.env.PORT}`));
}).catch(console.error);