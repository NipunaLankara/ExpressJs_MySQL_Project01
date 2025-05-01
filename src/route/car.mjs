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

// One to One..............
// POST
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

// GET

carRouter.get("/get-all-cars",verifyToken,async (req,res)=>{
    try {
        const carData = await DB.car.findMany();
        return res.status(200).json({
            msg:"All Cars List",
            data:carData
        });

    }catch (err){
        console.log(err);
        return res.status(500).json({msg:"Something Wrong" , err:err});
    }

});

carRouter.get("/get-all-cars-with-user",verifyToken ,async (req, res) => {
    try {
        const carData = await DB.car.findMany({
            include: {
                User: {
                    select: {
                        Id: true,
                        UserName: true
                    }
                }
            }
        });

        return res.status(200).json({
            msg: "All Cars List with User ID and Username",
            data: carData
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Something went wrong", err: err.message });
    }
});

export default carRouter;