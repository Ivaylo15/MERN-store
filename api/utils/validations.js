const { check, validationResult } = require('express-validator');
const { ValidationMinLength } = require('../constants/constantValues');
const { UnprocessableEntity } = require('../constants/statusCodes');
const errorMessages = require('../constants/errorMessages');

exports.checkAddProduct =
    [
        check('title')
            .trim()
            .isLength({ min: ValidationMinLength })
            .withMessage(errorMessages.MinLength)
            .bail(),
        check('category')
            .trim()
            .isLength({ min: ValidationMinLength })
            .withMessage(errorMessages.MinLength)
            .bail(),
        check('color')
            .trim()
            .not()
            .isEmpty()
            .withMessage(errorMessages.EmptyField)
            .bail(),
        check('size')
            .trim()
            .not()
            .isEmpty()
            .withMessage(errorMessages.EmptyField)
            .bail(),
            check('price')
            .trim()
            .not()
            .isEmpty()
            .withMessage(errorMessages.EmptyField)
            .isFloat({min: 0})
            .withMessage(errorMessages.InvalidPriceField)
            .bail(),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(UnprocessableEntity).json({ errors: errors.array() });
            next();
        }
    ]

exports.checkEditProduct =
    [
        check('id')
            .trim()
            .not()
            .isEmpty()
            .withMessage(errorMessages.EmptyField)
            .bail(),
        check('title')
            .trim()
            .isLength({ min: ValidationMinLength })
            .withMessage(errorMessages.MinLength)
            .bail(),
        check('category')
            .trim()
            .isLength({ min: ValidationMinLength })
            .withMessage(errorMessages.MinLength)
            .bail(),
        check('color')
            .trim()
            .not()
            .isEmpty()
            .withMessage(errorMessages.EmptyField)
            .bail(),
        check('size')
            .trim()
            .not()
            .isEmpty()
            .withMessage(errorMessages.EmptyField)
            .bail(),
        check('price')
            .trim()
            .not()
            .isEmpty()
            .withMessage(errorMessages.EmptyField)
            .isFloat({min: 0})
            .withMessage(errorMessages.InvalidPriceField)
            .bail(),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(UnprocessableEntity).json({ errors: errors.array() });
            next();
        }
    ]