const Product = require('../models/Product');

module.exports = {
    addProduct: async (req, res, next) => {
        const { title, category, price, size, color, image } = req.body;

        try {
            const createdProduct = await Product.create({ title, category, size, color, price, image });
            res.send(createdProduct);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },
    editProduct: async (req, res, next) => {
        // const id = req.params.id;
        const { id, title, category, size, color, price, image } = req.body;
        try {
            const updatedProduct = await Product.updateOne({ _id: id }, { title, category, size, color, price, image });
            res.send(updatedProduct);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },
    deleteProduct: async (req, res, next) => {
        const { id } = req.body;

        try {
            const deletedProduct = await Product.deleteOne({ _id: id });
            res.send(deletedProduct);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },
    filterProducts: async (req, res, next) => {
        const { category, color, size, price } = req.body;
        let filterObject = {};
        if (category) {
            filterObject.category = category;
        }
        if (color) {
            filterObject.color = color;
        }
        if (size) {
            filterObject.size = size;
        }
        if (price) {
            filterObject.price = { $lte: price };
        }

        try {
            const filteredProduct = await Product.find(filterObject);
            res.send(filteredProduct);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },
    paginatedResults: async (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        console.log(page)

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {};

        if (endIndex < await Product.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }

        try {
            results.results = await Product.find().limit(limit).skip(startIndex).exec();
            res.send(results)
            next();
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
        console.log(results)
    }
}