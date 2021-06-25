const productRoutes = require('../routes/product');

module.exports = (app) => {
    app.use('/', productRoutes);

    app.use('*', (req, res, next) => res.send(`<h1> Somthing went wrong. Try again </h1>`));
}