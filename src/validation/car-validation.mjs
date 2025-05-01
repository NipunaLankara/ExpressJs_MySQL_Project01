import {body} from "express-validator";

export const validateAddNewCar = [
    body("CarNumber")
        .exists().withMessage("CarNumber is Required")
        .isString().withMessage("CarNumber must be a string")
        .notEmpty().withMessage("CarNumber can not be a empty"),
    body("Model")
        .exists().withMessage("Model is Required")
        .isString().withMessage("Model must be a string")
        .notEmpty().withMessage("Model can not be a empty")

];