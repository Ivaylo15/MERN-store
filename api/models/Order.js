const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, ObjectId, Date } = Schema.Types;

const orderSchema = Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    products: [{ 
        type: ObjectId,
        ref: 'Product',
        required: true
    }],
    price: {
        type: String,
        required: true
    },
    date: {
        type: Date,
    }
})

module.exports = new Model('Order', orderSchema);
