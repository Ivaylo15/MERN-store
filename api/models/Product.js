const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number } = Schema.Types;

const productSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    category: {
        type: String,
    },
    size: {
        type: String,
    },
    color: {
        type: String,
    },
    price: {
        type: Number,
    },
    image: {
        type: String,
    }
});

module.exports = new Model('Product', productSchema);