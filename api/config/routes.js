const productRoutes = require('../routes/product');
const userRoutes = require('../routes/user');

module.exports = (app) => {
    app.use('/', productRoutes);

    app.use('/', userRoutes);

    app.use('*', (req, res, next) => res.send(`<h1> Somthing went wrong. Try again </h1>`));
}