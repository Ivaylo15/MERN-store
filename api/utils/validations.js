const { check, validationResult } = require('express-validator');

exports.checkAddProduct =
    [
        check('title')
            .trim()
            .isLength({ min: 3 })
            .withMessage('Minimum 3 characters required')
            .bail(),
        check('category')
            .trim()
            .isLength({ min: 3 })
            .withMessage('Minimum 3 characters required')
            .bail(),
        check('color')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Color can not be empty')
            .bail(),
        check('size')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Size can not be empty')
            .bail(),
        check('price')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Price can not be empty')
            .isNumeric()
            .withMessage('Price must be a number')
            .bail(),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(422).json({ errors: errors.array() });
            next();
        }
    ]

exports.checkEditProduct =
    [
        check('id')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Can not edit with no id')
            .bail(),
        check('title')
            .trim()
            .isLength({ min: 3 })
            .withMessage('Minimum 3 characters required')
            .bail(),
        check('category')
            .trim()
            .isLength({ min: 3 })
            .withMessage('Minimum 3 characters required')
            .bail(),
        check('color')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Color can not be empty')
            .bail(),
        check('size')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Size can not be empty')
            .bail(),
        check('price')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Price can not be empty')
            .isNumeric()
            .withMessage('Price must be a number')
            .bail(),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(422).json({ errors: errors.array() });
            next();
        }
    ]