const statusCodes = require("../constants/statusCodes");
const Order = require("../models/Order");
const User = require("../models/User");


module.exports = {
    createOrder: async (req, res, next) => {
        const { userId, orderItems, price } = req.body;

        try {
            createdOrder = await Order.create({ user: userId, products: orderItems, price });
            updatedUser = await User.updateOne({ _id: userId }, { $push: { orders: createdOrder } })
            res.status(statusCodes.OK).send(updatedUser);

        } catch (e) {
            res.status(statusCodes.InternalServerError).json({ message: e.message });
            next();

        }
    },
    ordersForUser: async (req, res, next) => {
        const userId = req.params.id;

        try {
            const orders = await Order.find({user: userId}).populate('products');
            res.status(statusCodes.OK).send(orders);
        } catch (e) {
            res.status(statusCodes.InternalServerError).json({ message: e.message });
        }
    }
}