const { check, validationResult } = require('express-validator');
const { validationMinLength } = require('../constants/constant-values');
const status = require('../constants/status-codes');
const errorMessages = require('../constants/error-messages');

exports.checkAddProduct =
    [
        check('title')
            .trim()
            .isLength({ min: validationMinLength })
            .withMessage(errorMessages.MinLength)
            .bail(),
        check('category')
            .trim()
            .isLength({ min: validationMinLength })
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
            .isNumeric()
            .withMessage(errorMessages.FieldNumber)
            .bail(),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(status.UnprocessableEntity).json({ errors: errors.array() });
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
            .isLength({ min: validationMinLength })
            .withMessage(errorMessages.MinLength)
            .bail(),
        check('category')
            .trim()
            .isLength({ min: validationMinLength })
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
            .isNumeric()
            .withMessage(errorMessages.FieldNumber)
            .bail(),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(status.UnprocessableEntity).json({ errors: errors.array() });
            next();
        }
    ]