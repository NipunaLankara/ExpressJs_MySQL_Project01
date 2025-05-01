import {body} from "express-validator";

export const validateUserRegister = [
    body("Name")
        .exists().withMessage("Name is Required")
        .isString().withMessage("Name must be a string")
        .notEmpty().withMessage("Name can not be a empty"),
    body("UserName")
        .exists().withMessage("UserName is required")
        .isString().withMessage("UserName must be a string")
        .notEmpty().withMessage("UserName cannot be empty"),
    body("Password")
        .exists().withMessage("Password is required")
        .isString().withMessage("Password must be a string")
        .isLength({min: 6}).withMessage("Password must be at least 6 characters"),
    body("PhoneNumber")
        .optional()
        .isNumeric().withMessage("PhoneNumber must be a number")
];

export const loginValidation = [
    body('UserName')
        .notEmpty().withMessage('UserName is required')
        .isString().withMessage('UserName must be a string'),

    body('Password')
        .notEmpty().withMessage('Password is required')
        .isString().withMessage('Password must be a string')
];