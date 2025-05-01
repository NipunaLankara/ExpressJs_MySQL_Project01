import {Router} from "express";
import {validationResult} from "express-validator";
import {validateAddNewCar} from "../validation/car-validation.mjs";
import DB from "../db/DB.mjs";
import {verifyToken} from "../util/verifyToken.mjs";



const carRouter = Router();

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();

};

// POST  One to One...
carRouter.post("/add-new-car",verifyToken,validateAddNewCar,handleValidationErrors,async (req,res)=>{
    const carData = req.body;
    const carNumber = req.body.CarNumber;

    try {
        await DB.car.create({data:carData});
        return res.status(200).json({msg:"Car "+carNumber+" Created"});

    }catch (err){
       return  res.status(500).json({msg: "Car Create Failed", err: err});

    }

});


export default carRouter;