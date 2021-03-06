const productRoutes = require('../routes/product');
const userRoutes = require('../routes/user');
const orderRoutes = require('../routes/order');

module.exports = (app) => {
    app.use('/', userRoutes);
    
    app.use('/products', productRoutes);

    app.use('/order', orderRoutes);

    app.use('*', (req, res, next) => res.send(`<h1> Somthing went wrong. Try again </h1>`));
}