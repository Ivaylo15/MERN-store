const statusCodes = require('../constants/status-codes');
const Product = require('../models/Product');

module.exports = {
    addProduct: async (req, res, next) => {
        const { title, category, price, size, color, image } = req.body;

        try {
            const createdProduct = await Product.create({ title, category, size, color, price, image });
            res.status(statusCodes.OK).send(createdProduct);
        } catch (e) {
            res.status(statusCodes.InternalServerError).json({ message: e.message });
        }
    },
    editProduct: async (req, res, next) => {
        const { id, title, category, size, color, price, image } = req.body;
        try {
            const updatedProduct = await Product.updateOne({ _id: id }, { title, category, size, color, price, image });
            res.send(updatedProduct);
        } catch (e) {
            res.status(statusCodes.InternalServerError).json({ message: e.message });
        }
    },
    deleteProduct: async (req, res, next) => {
        const productId = req.params.id;

        try {
            const deletedProduct = await Product.deleteOne({ _id: productId });
            res.send(deletedProduct);
        } catch (e) {
            res.status(statusCodes.InternalServerError).json({ message: e.message });
        }
    },
    paginatedResults: async (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const category = req.query.category;
        const color = req.query.color;
        const size = req.query.size;
        const price = req.query.price;

        const filterObject = {};
        const sortObject = {};
        if (category) {
            filterObject.category = category;
        }
        if (color) {
            filterObject.color = { $in: color.split(',') };
        }
        if (size) {
            filterObject.size = { $in: size.split(',') };
        }
        if (price) {
            sortObject.price = price;
        }

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
            const rawResults = await Product.find(filterObject);
            results.results = await Product.find(filterObject).sort(sortObject).limit(limit).skip(startIndex).exec();
            results.pageCount = Math.ceil(rawResults.length / limit);
            res.status(statusCodes.OK).send(results)
        } catch (e) {
            res.status(statusCodes.InternalServerError).json({ message: e.message });
        }
    },
    filterOptions: async (req, res, next) => {
        const category = req.query.category;
        let filterObject = {};
        if (category) {
            filterObject.category = category;
        }

        const filters = {};

        try {
            const rawResults = await Product.find(filterObject);
            const category = [...new Set(rawResults.map(item => item.category))];
            const size = [...new Set(rawResults.map(item => item.size))];
            const color = [...new Set(rawResults.map(item => item.color))];
            if (category) {
                filters.category = category;
            }
            if (size) {
                filters.size = size;
            }
            if (color) {
                filters.color = color;
            }

            res.send(filters);
        } catch (e) {
            res.status(statusCodes.InternalServerError).json({ message: e.message });
        }
    },
    singleProduct: async (req, res, next) => {
        const productId = req.params.id;
        try {
            const result = await Product.findOne({ _id: productId });
            res.status(statusCodes.OK).send(result);
        } catch (e) {
            res.status(statusCodes.InternalServerError).json({ message: e.message });
        }
    }
}